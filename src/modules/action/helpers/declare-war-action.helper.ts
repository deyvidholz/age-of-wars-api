import { v4 } from 'uuid';
import { Country } from '../../country/country.entity';
import { DecisionMakeType } from '../../country/country.typing';
import { ActionType } from '../action.typing';

export class DeclareWarActionHelper {
  static sendCallToWar(data: SendCallToWarParam) {
    const { country, target, requestedCountry, refusedJoinWar } = data;

    if (!requestedCountry.isAlliedWith(country.id)) {
      refusedJoinWar.country.push({
        id: requestedCountry.id,
        flag: requestedCountry.flag,
        name: requestedCountry.name,
        reason: `${requestedCountry.name} is not your ally`,
      });

      return;
    }

    if (requestedCountry.isAlliedWith(target.id)) {
      refusedJoinWar.country.push({
        id: requestedCountry.id,
        flag: requestedCountry.flag,
        name: requestedCountry.name,
        reason: `${requestedCountry.name} is allied with ${target.name}`,
      });

      return;
    }

    if (requestedCountry.hasIndependenceGuaranteeRelations(target.id)) {
      refusedJoinWar.country.push({
        id: requestedCountry.id,
        flag: requestedCountry.flag,
        name: requestedCountry.name,
        reason: `${requestedCountry.name} has relations with ${target.name}`,
      });

      return;
    }

    requestedCountry.messages.push({
      title: `${country.name} is requested us to join their war against ${target.name}`,
    });

    requestedCountry.decisions.push({
      id: v4(),
      actionType: ActionType.JOIN_WAR,
      types: [
        DecisionMakeType.ACCEPT_JOIN_WAR,
        DecisionMakeType.REFUSE_JOIN_WAR,
      ],
      description: `Join war of ${country.name} against ${target.name}`,
      requester: country.getCountrySimplifiedData(),
      target: target.getCountrySimplifiedData(),
      data: { warId: data.warId },
    });
  }
}

type SendCallToWarParam = {
  country: Country;
  target: Country;
  requestedCountry: Country;
  refusedJoinWar: any; // TODO add typing
  warId: string;
};
