import {
  ErrorResponse,
  ResponseHelper,
  SuccessResponse,
} from '../../../helpers/response.helper';
import { Country } from '../../country/country.entity';
import { DecisionMakeType } from '../../country/country.typing';
import { DecisionHelper } from '../../country/decision.helper';
import { Game } from '../../game/game.entity';

export async function acceptSellOfferAction(
  data: AcceptSellOfferActionParam
): Promise<SuccessResponse | ErrorResponse> {
  const { decisionId, game, country } = data;

  const decision = country.decisions.find(
    (decision) => decision.id === decisionId
  );

  if (!decision) {
    return;
  }

  if (!decision.types.includes(DecisionMakeType.ACCEPT_SELL_OFFER)) {
    return ResponseHelper.error({
      message: 'Invalid decision type',
      data: { decision },
    });
  }

  decision.decided = true;
  game.tradingProvinces = game.tradingProvinces.filter(
    (tradingProvince) => tradingProvince.decisionId !== decision.id
  );

  DecisionHelper.runEvents({
    decision,
    game,
    country,
    decidedTo: DecisionMakeType.ACCEPT_SELL_OFFER,
  });

  return ResponseHelper.success({
    message: `message`,
  });
}

type AcceptSellOfferActionParam = {
  decisionId: string;
  country: Country;
  game: Game;
};
