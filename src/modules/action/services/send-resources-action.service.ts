import { v4 } from 'uuid';
import {
  ErrorResponse,
  ResponseHelper,
  SuccessResponse,
} from '../../../helpers/response.helper';
import {
  AvailableGiveResources,
  ResourceItem,
} from '../../console/console.typing';
import { Country } from '../../country/country.entity';
import {
  DecisionEventAction,
  DecisionMakeType,
  ResourceRefundItemConditionType,
} from '../../country/country.typing';
import { Game } from '../../game/game.entity';
import { ActionType } from '../action.typing';

export async function sendResourcesAction(
  data: SendResourcesActionParam
): Promise<SuccessResponse | ErrorResponse> {
  const { game, country, resources, targetId } = data;

  const target: Country = game.countries.find(
    (country: Country) => country.id === data.targetId
  );

  if (!target) {
    return ResponseHelper.error({
      message: 'Target not found',
      data: {
        id: data.targetId,
      },
    });
  }

  let totalPrice: number = 0;

  // Getting total price
  for (const resource of resources) {
    totalPrice += +resource.price;
  }

  for (const index in resources) {
    const resource = resources[index];

    // Adding +1 to duration because when it runs it will subtract 1 firstly.
    let [decisionId, duration] = [
      v4(),
      +process.env.TRADING_DECISION_DURATION + 1,
    ];

    switch (resource.type) {
      case AvailableGiveResources.MONEY:
        if (country.economy.balance < resource.amount) {
          resources.splice(+index, 1);
          country.messages.push({
            title: `You do not have this money ($${resource.amount}) to send`,
            stage: data.game.stageCount + 1,
          });
        }

        // Removing from country
        country.economy.balance += -Math.abs(resource.amount);

        // Creating refund to country
        country.refunds.push({
          id: decisionId,
          validFor: duration,
          resource,
        });

        // Creating decision to target
        target.decisions.push({
          id: decisionId,
          actionType: ActionType.ACCEPT_SELL_OFFER,
          duration,
          target: country.getCountrySimplifiedData(),
          types: [
            DecisionMakeType.ACCEPT_SELL_OFFER,
            DecisionMakeType.REFUSE_SELL_OFFER,
          ],
          description: `${country.name} wants to give you $${resource.amount}`,
          events: [
            {
              // When target accept this decision, he will receive the resource
              type: DecisionMakeType.ACCEPT_SELL_OFFER,
              action: DecisionEventAction.GIVE,
              sender: country.getCountrySimplifiedData(),
              targetId: target.id,
              resources: [resource],
            },
            {
              // When target accept this decision, it will delete the refund item from country (sender)
              type: DecisionMakeType.ACCEPT_SELL_OFFER,
              action: DecisionEventAction.DELETE_REFUND,
              sender: country.getCountrySimplifiedData(),
              targetId: country.id,
              refundId: decisionId,
              resources: [resource],
            },
          ],
        });
        break;

      case AvailableGiveResources.OIL:
        if (country.resources.oil < resource.amount) {
          resources.splice(+index, 1);
          country.messages.push({
            title: `You do not have this oil (${resource.amount}) to send`,
            stage: data.game.stageCount + 1,
          });
        }

        // Removing from country
        country.resources.oil += -Math.abs(resource.amount);

        // Creating refund to country
        country.refunds.push({
          id: decisionId,
          validFor: duration,
          resource,
        });

        // Creating decision to target
        target.decisions.push({
          id: decisionId,
          actionType: ActionType.ACCEPT_SELL_OFFER,
          duration,
          target: country.getCountrySimplifiedData(),
          types: [
            DecisionMakeType.ACCEPT_SELL_OFFER,
            DecisionMakeType.REFUSE_SELL_OFFER,
          ],
          description: `${country.name} wants to sell you ${resource.amount} of oil for $${resource.price}`,
          events: [
            {
              type: DecisionMakeType.ACCEPT_SELL_OFFER,
              action: DecisionEventAction.GIVE,
              sender: country.getCountrySimplifiedData(),
              targetId: target.id,
              resources: [resource],
            },
            {
              type: DecisionMakeType.ACCEPT_SELL_OFFER,
              action: DecisionEventAction.DELETE_REFUND,
              sender: country.getCountrySimplifiedData(),
              targetId: country.id,
              refundId: decisionId,
              resources: [resource],
            },
          ],
          data: {
            totalPrice,
          },
        });
        break;

      case AvailableGiveResources.PROVINCE:
        const province = country.provinces.find(
          (province) => province.mapRef === resource.provinceMapRef
        );

        if (!province) {
          resources.splice(+index, 1);
          country.messages.push({
            title: `You do not own province "${resource.provinceMapRef}"`,
            stage: data.game.stageCount + 1,
          });
          return;
        }

        /**
         * It's not necessary to remove province here,
         * ConsoleService.give already does it.
         */

        if (province.isCapital) {
          country.messages.push({
            title: `You cannot sell capitals`,
            stage: data.game.stageCount + 1,
          });
          return;
        }

        // Creating refund to country
        country.refunds.push({
          id: decisionId,
          validFor: duration,
          resource,
        });

        // Creating decision to target
        target.decisions.push({
          id: decisionId,
          actionType: ActionType.ACCEPT_SELL_OFFER,
          target: country.getCountrySimplifiedData(),
          duration,
          types: [
            DecisionMakeType.ACCEPT_SELL_OFFER,
            DecisionMakeType.REFUSE_SELL_OFFER,
          ],
          description: `${country.name} wants to sell you province "${province.name}" for $${resource.price}`,
          data: {
            provinceLevels: province.levels,
            totalPrice,
          },
          events: [
            {
              type: DecisionMakeType.ACCEPT_SELL_OFFER,
              action: DecisionEventAction.GIVE,
              sender: country.getCountrySimplifiedData(),
              targetId: target.id,
              resources: [resource],
            },
            {
              type: DecisionMakeType.ACCEPT_SELL_OFFER,
              action: DecisionEventAction.DELETE_REFUND,
              sender: country.getCountrySimplifiedData(),
              targetId: country.id,
              refundId: decisionId,
              resources: [resource],
            },
          ],
        });

        game.tradingProvinces.push({
          decisionId,
          provinceMapRef: province.mapRef,
          buyer: target.getCountrySimplifiedData(),
          owner: country.getCountrySimplifiedData(),
          /**
           * tradingProvinces are removed by Game.handler method
           * which runs after all the actions (such as runActions, runCoalitions, runWars).
           *
           * Adding +2 of duration this record will be removed at the same turn
           * of the decision.
           */
          duration: duration + 2,
        });
        break;

      default:
        // If it falls here, then it's not a valid resource to give
        resources.splice(+index, 1);
    }
  }

  return ResponseHelper.success({
    message: 'Resource sent, waiting acceptation',
  });
}

type SendResourcesActionParam = {
  resources: ResourceItem[];
  targetId: string;
  country: Country;
  game: Game;
};
