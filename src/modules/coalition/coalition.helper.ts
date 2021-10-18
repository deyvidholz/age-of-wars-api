import { v4 } from 'uuid';
import { MathHelper } from '../../helpers/math.helper';
import { ActionType } from '../action/action.typing';
import { Country } from '../country/country.entity';
import { CountryHelper } from '../country/country.helper';
import {
  DecisionMakeType,
  SetOpinionOfActionParam,
} from '../country/country.typing';
import { Game } from '../game/game.entity';
import { Coalition } from '../game/game.typing';
import { Losses, War, WarParticipant, WarStage } from '../war/war.typing';

export class CoalitionHelper {
  static create(data: CreateParam): Coalition {
    const { against, game } = data;

    const availableCountries = game.countries.filter(
      (country) =>
        country.isAi &&
        country.id !== against.id &&
        !country.hasFriendlyRelations(against.id)
    );
    availableCountries.sort(
      (a, b) => b.militaryPower.total - a.militaryPower.total
    );

    const maxIndexes =
      availableCountries.length > 11 ? 10 : availableCountries.length - 1;
    const index = MathHelper.getRandomNumber(1, maxIndexes);
    const owner = availableCountries[index];

    const coalition: Coalition = {
      id: v4(),
      against: against.getCountrySimplifiedData(),
      owner: owner.getCountrySimplifiedData(),
      allies: [],
      createdAtStage: game.stageCount,
      totalMp: owner.militaryPower.total,
      targetTotalMp: against.militaryPower.total,
    };

    return coalition;
  }

  static joinCoalition(data: JoinCoalitionParam) {
    const { coalition, country } = data;

    if (country.hasFriendlyRelations(coalition.against.id)) {
      return;
    }

    coalition.allies.push(country.getCountrySimplifiedData());
  }

  static declareWar(data: DeclareWarParam): War {
    console.log('declaring war');
    const { game, coalition } = data;
    const owner = game.countries.find(
      (country) => country.id === coalition.owner.id
    );
    const target = game.countries.find(
      (country) => country.id === coalition.against.id
    );

    const lossesTemplate: Losses = {
      aircrafts: 0,
      balance: 0,
      divisions: 0,
      tanks: 0,
      warships: 0,
    };

    const alliesIds = coalition.allies.map((ally) => ally.id);

    const allies = game.countries.filter((country) =>
      alliesIds.includes(country.id)
    );

    owner.addInWarWith(target.getCountrySimplifiedData());
    target.addInWarWith(owner.getCountrySimplifiedData());

    target.setOpinionOf(owner.name, 200, SetOpinionOfActionParam.SUBTRACT);
    owner.setOpinionOf(target.name, 200, SetOpinionOfActionParam.SUBTRACT);

    for (const ally of allies) {
      ally.addInWarWith(target.getCountrySimplifiedData());
      target.addInWarWith(ally.getCountrySimplifiedData());

      ally.setOpinionOf(target.name, 200, SetOpinionOfActionParam.SUBTRACT);
      target.setOpinionOf(ally.name, 40, SetOpinionOfActionParam.SUBTRACT);
    }

    const alliesAsParticipants: WarParticipant[] = coalition.allies.map(
      (ally) => ({
        id: ally.id,
        flag: ally.flag,
        name: ally.name,
        losses: { ...lossesTemplate },
      })
    );

    const war: War = {
      id: v4(),
      gameId: game.id,
      stage: WarStage.PREPARING,
      startAtStage: game.stageCount + 3,
      isByCoalition: true,
      details: {
        attacker: {
          id: owner.id,
          flag: owner.flag,
          name: owner.name,
          allies: alliesAsParticipants,
          losses: { ...lossesTemplate },
        },
        victim: {
          id: target.id,
          flag: target.flag,
          name: target.name,
          allies: [],
          losses: { ...lossesTemplate },
        },
      },
    };

    const targetAlliesIds = target.allies.map((ally) => ally.id);

    const targetAllies = game.countries.filter((country) =>
      targetAlliesIds.includes(country.id)
    );

    for (const ally of targetAllies) {
      ally.messages.push({
        title: `${target.name} is requesting us to join their war against ${owner.name}'s coalition with more than ${coalition.allies.length} enemies`,
        hasDecision: true,
      });

      ally.decisions.push({
        id: v4(),
        actionType: ActionType.JOIN_WAR,
        duration: 3,
        types: [DecisionMakeType.JOIN_WAR, DecisionMakeType.REFUSE_JOIN_WAR],
        description: `Join war of ${target.name} against ${target.name}`,
        requester: target.getCountrySimplifiedData(),
        target: target.getCountrySimplifiedData(),
        data: { warId: war.id, allyCountryId: target.id },
      });
    }

    target.messages.push({
      title: `${coalition.owner.name} and his ${coalition.allies.length} allies declared war on us by their coalition`,
      data: { warId: war.id },
    });

    coalition.warId = war.id;
    game.wars.push(war);
    return war;
  }

  static calculateMilitaryPower(data: CalculateMilitaryPowerParam) {
    const { coalition, game } = data;
    const owner = game.countries.find(
      (country) => country.id === coalition.owner.id
    );
    const alliesIds = coalition.allies.map((ally) => ally.id);
    const allies = game.countries.filter((country) =>
      alliesIds.includes(country.id)
    );

    const target = game.countries.find(
      (country) => country.id === coalition.against.id
    );
    const targetAlliesIds = target.allies.map((ally) => ally.id);
    const targetAllies = game.countries.filter((country) =>
      targetAlliesIds.includes(country.id)
    );

    const totalMp = CountryHelper.sumWarMilitaryPowers({
      attackers: [owner, ...allies],
      victims: [target, ...targetAllies],
    });

    coalition.totalMp = totalMp.attackers.militaryPower.totals.total;
    coalition.targetTotalMp = totalMp.victims.militaryPower.totals.total;

    return {
      totalMp: totalMp.attackers.militaryPower.totals.total,
      targetTotalMp: totalMp.victims.militaryPower.totals.total,
    };
  }

  static isParticipatingOfAnyCoalition(
    data: IsParticipatingOfAnyCoalitionParam
  ): boolean {
    const { country, game } = data;

    for (const coalition of game.coalitions) {
      if (coalition.owner.id === country.id) {
        return true;
      }

      if (coalition.against.id === country.id) {
        return true;
      }

      let isAlly = coalition.allies.some((ally) => ally.id === country.id);

      if (isAlly) {
        return true;
      }
    }

    return false;
  }
}

type CreateParam = {
  game: Game;
  against: Country;
};

type JoinCoalitionParam = {
  coalition: Coalition;
  country: Country;
};

type DeclareWarParam = {
  game: Game;
  coalition: Coalition;
};

type CalculateMilitaryPowerParam = {
  game: Game;
  coalition: Coalition;
};

type IsParticipatingOfAnyCoalitionParam = {
  game: Game;
  country: Country;
};
