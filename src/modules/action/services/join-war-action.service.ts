import {
  ErrorResponse,
  ResponseHelper,
  SuccessResponse,
} from '../../../helpers/response.helper';
import { Country } from '../../country/country.entity';
import { CountryHelper } from '../../country/country.helper';
import { Game } from '../../game/game.entity';
import { WarHelper } from '../../war/war.helper';

export async function joinWarAction(
  data: JoinWarActionParam
): Promise<SuccessResponse | ErrorResponse> {
  const { game, country, decisionId } = data;

  const war = game.wars.find((w) => w.id === data.warId);

  if (!war) {
    return ResponseHelper.error({
      message: 'War not found',
      data: {
        warId: data.warId,
      },
    });
  }

  const isAlreadyParticipating: boolean =
    war.details.attacker.id === country.id ||
    war.details.victim.id === country.id ||
    war.details.attacker.allies.some((c) => c.id === country.id) ||
    war.details.victim.allies.some((c) => c.id === country.id);

  if (isAlreadyParticipating) {
    return ResponseHelper.error({
      message: 'You are already in this war',
    });
  }

  const attacker = game.countries.find((c) => c.id === war.details.attacker.id);
  const victim = game.countries.find((c) => c.id === war.details.victim.id);
  const attackerAllies = game.countries.filter((c) =>
    war.details.attacker.allies.some((a) => a.id === c.id)
  );
  const victimAllies = game.countries.filter((c) =>
    war.details.victim.allies.some((a) => a.id === c.id)
  );

  if (!attacker || !victim) {
    return ResponseHelper.error({
      message: 'Attacker or victim country not found',
      data: { war },
    });
  }

  if (war.details.attacker.id === data.allyCountryId) {
    // Join Attacker's side
    if (country.isAlliedWith(war.details.victim.id)) {
      return ResponseHelper.error({
        message: `You cannot join the war on ${war.details.attacker.name} side because you are allied with their enemies`,
      });
    }

    if (country.hasIndependenceGuaranteeRelations(war.details.victim.id)) {
      victim.removeIndependenceGuaranteeingRelations(country.id);
      country.removeIndependenceGuaranteeingRelations(victim.id);
    }

    CountryHelper.addMessages([...attackerAllies, attacker], {
      title: `${country.name} joined the war on our side`,
      data: {
        id: country.id,
        flag: country.flag,
        name: country.name,
      },
    });

    country.messages.push({
      stage: data.game.stageCount,
      title: `We are at war against ${victim.name}`,
    });

    const warParticipant = WarHelper.getWarParticipantMounted(country);
    war.details.attacker.allies.push(warParticipant);

    country.addInWarWith(victim.getCountrySimplifiedData());
    victim.addInWarWith(country.getCountrySimplifiedData());
  } else if (war.details.victim.id === data.allyCountryId) {
    // Join Victim's side
    if (country.isAlliedWith(war.details.attacker.id)) {
      return ResponseHelper.error({
        message: `You cannot join the war on ${war.details.victim.name} side because you are allied with their enemies`,
      });
    }

    if (country.hasIndependenceGuaranteeRelations(war.details.attacker.id)) {
      attacker.removeIndependenceGuaranteeingRelations(country.id);
      country.removeIndependenceGuaranteeingRelations(attacker.id);
    }

    CountryHelper.addMessages([...victimAllies, victim], {
      title: `${country.name} joined the war on our side`,
      data: {
        id: country.id,
        flag: country.flag,
        name: country.name,
      },
    });

    country.messages.push({
      stage: data.game.stageCount,
      title: `We are at war against ${attacker.name}`,
    });

    const warParticipant = WarHelper.getWarParticipantMounted(country);
    war.details.victim.allies.push(warParticipant);

    country.addInWarWith(attacker.getCountrySimplifiedData());
    attacker.addInWarWith(country.getCountrySimplifiedData());
  } else {
    return ResponseHelper.error({
      message: 'Ally country not found',
      data: {
        allyCountryId: data.allyCountryId,
      },
    });
  }

  country.decisions = country.decisions.filter(
    (decision) => decision.id !== decisionId
  );

  return ResponseHelper.success({
    data: { war },
  });
}

type JoinWarActionParam = {
  allyCountryId: string;
  warId: string;
  decisionId: string;
  country: Country;
  game: Game;
};
