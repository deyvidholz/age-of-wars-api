import 'dotenv/config';
import { v4 } from 'uuid';
import {
  ErrorResponse,
  ResponseHelper,
  SuccessResponse,
} from '../../../helpers/response.helper';
import { Country } from '../../country/country.entity';
import { SetOpinionOfActionParam } from '../../country/country.typing';
import { Game } from '../../game/game.entity';
import { Losses, War, WarStage } from '../../war/war.typing';
import { DeclareWarActionHelper } from '../helpers/declare-war-action.helper';

type DeclareWarParam = {
  game: Game;
  country: Country;
  targetId: string;
  callToWar: string[];
};

export async function declareWarAction(
  data: DeclareWarParam
): Promise<SuccessResponse | ErrorResponse> {
  const { game, country } = data;

  const target: Country = game.countries.find(
    (country: Country) => country.id === data.targetId
  );

  if (!target) {
    return ResponseHelper.error({
      message: 'Target country not found',
      data: {
        id: data.targetId,
      },
    });
  }

  if (country.id === target.id) {
    return ResponseHelper.error({
      message: 'You cannot declare war on your own country',
    });
  }

  if (country.isAlliedWith(target.id)) {
    return ResponseHelper.error({
      message: 'You cannot declare war on a allied country',
    });
  }

  if (country.isAtWarWith(target.id)) {
    return ResponseHelper.error({
      message: 'You are already at war with this country',
    });
  }

  if (country.hasIndependenceGuaranteeRelations(target.id)) {
    target.removeIndependenceGuaranteeingRelations(country.id);
    country.removeIndependenceGuaranteeingRelations(target.id);
  }

  country.setOpinionOf(
    target.name,
    +process.env.SUBTRACT_OPINION_WHEN_DECLARE_WAR,
    SetOpinionOfActionParam.SUBTRACT
  );

  target.setOpinionOf(
    country.name,
    +process.env.SUBTRACT_OPINION_WHEN_DECLARE_WAR_TARGET,
    SetOpinionOfActionParam.SUBTRACT
  );

  // Adding as enemy and inWarWith
  country.addEnemy({
    flag: target.flag,
    name: target.name,
    id: target.id,
  });

  country.addInWarWith({
    flag: target.flag,
    name: target.name,
    id: target.id,
  });

  target.addEnemy({
    flag: country.flag,
    name: country.name,
    id: country.id,
  });

  target.addInWarWith({
    flag: country.flag,
    name: country.name,
    id: country.id,
  });

  const lossesTemplate: Losses = {
    aircrafts: 0,
    balance: 0,
    divisions: 0,
    tanks: 0,
    warships: 0,
  };

  // TODO calculate based on military power diff
  const startAtStage: number = game.stageCount + 2;

  const war: War = {
    id: v4(),
    startAtStage,
    gameId: game.id,
    stage: WarStage.PREPARING,
    details: {
      attacker: {
        flag: country.flag,
        id: country.id,
        name: country.name,
        allies: [],
        losses: { ...lossesTemplate },
      },
      victim: {
        flag: target.flag,
        id: target.id,
        name: target.name,
        allies: [],
        losses: { ...lossesTemplate },
      },
    },
  };

  const refusedJoinWar = {
    country: [],
    target: [],
  };

  for (const countryName of data.callToWar) {
    const requestedCountry: Country = game.countries.find(
      (c: Country) => c.name === countryName
    );

    if (!requestedCountry) {
      continue;
    }

    DeclareWarActionHelper.sendCallToWar({
      country,
      refusedJoinWar,
      requestedCountry,
      target,
      warId: war.id,
    });
  }

  for (const ally of target.allies) {
    const requestedCountry: Country = game.countries.find(
      (c: Country) => c.id === ally.id
    );

    if (!requestedCountry) {
      continue;
    }

    DeclareWarActionHelper.sendCallToWar({
      country: target,
      refusedJoinWar,
      requestedCountry,
      target: country,
      warId: war.id,
    });
  }

  if (refusedJoinWar.country.length) {
    country.messages.push({
      stage: data.game.stageCount,
      title: `Some countries cannot join our war`,
      data: [...refusedJoinWar.country],
    });
  }

  if (refusedJoinWar.target.length) {
    target.messages.push({
      stage: data.game.stageCount,
      title: `Some countries cannot join our war`,
      data: [...refusedJoinWar.target],
    });
  }

  game.wars.push(war);

  country.messages.push({
    stage: data.game.stageCount,
    title: `We declared war on ${target.name}!`,
    data: {
      target: target.getCountrySimplifiedData(),
    },
  });

  target.messages.push({
    stage: data.game.stageCount,
    title: `${country.name} declared war on us!`,
    data: {
      target: country.getCountrySimplifiedData(),
    },
  });

  return ResponseHelper.success({
    message: `${country.name} declared war on ${target.name}`,
    data: war,
  });
}
