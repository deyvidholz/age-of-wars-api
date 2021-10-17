import 'dotenv/config';
import { CountryPassiveValueType } from '../../../data/templates/country-passives.template';
import { ProvincePassiveType } from '../../../data/templates/province-passive.template';
import { MathHelper } from '../../../helpers/math.helper';
import { ActionType } from '../../action/action.typing';
import { AggressivenessHelper } from '../../country/aggressiveness.helper';
import { Country } from '../../country/country.entity';
import { Decision, Province } from '../../country/country.typing';
import { Game } from '../../game/game.entity';

export async function demandAiDecision(data: DemandAiDecisionParam) {
  const { country, decision, game } = data;
  const targetIds = decision.data.targets.map((target) => target.id);
  let targets = game.countries.filter((target) =>
    targetIds.includes(target.id)
  );

  let maxProvincesAllowedToDemand = decision.data.maxProvincesAllowedToDemand;
  decision.decided = true;

  while (maxProvincesAllowedToDemand > 0 && targets.length) {
    if (country.aggressiveness.current > 149) {
      return;
    }

    maxProvincesAllowedToDemand--;
    targets = targets.filter((target) => target.provinces.length);

    const target: Country = MathHelper.getRandomItem(targets);

    if (!target) {
      return;
    }

    const provinceIndex = MathHelper.getRandomIndex(target.provinces);
    const province = target.provinces[provinceIndex];

    province.isCapital = false;
    province.passives.push({
      type: ProvincePassiveType.REDUCE_INCOMING,
      value: 90,
      valueType: CountryPassiveValueType.PERCENT,
      description: `Incoming reduced by 90% due to recent wars`,
      duration: +process.env.PROVINCE_INCOMING_REDUCTION_BY_WARS_DURATION,
    });

    let aggressivenessToAdd =
      AggressivenessHelper.calculateAggressivenessTakeProvince({
        country,
        isCapital: province.isCapital,
        target,
      });

    country.addAggressiveness(aggressivenessToAdd);

    country.provinces.push(province);
    target.provinces.splice(provinceIndex, 1);
  }
}

type DemandAiDecisionParam = {
  country: Country;
  game: Game;
  decision: Decision;
};
