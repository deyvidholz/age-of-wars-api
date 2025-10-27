import { ConsoleService } from '../console/console.service';
import { Game } from '../game/game.entity';
import { gameRepository } from '../game/game.repository';
import { Country } from './country.entity';
import {
  Decision,
  DecisionEventAction,
  DecisionMakeType,
} from './country.typing';

export class DecisionHelper {
  static async runEvents(data: RunEventParam) {
    let { game } = data;
    const { country, decision, decidedTo } = data;

    if (typeof game === 'string') {
      game = await gameRepository().findOne(game);
    }

    if (!decision.events || !decision.events.length) {
      return;
    }

    const requiredTargetEvents: DecisionEventAction[] = [
      DecisionEventAction.GIVE,
      DecisionEventAction.DELETE_REFUND,
    ];

    if (decidedTo === DecisionMakeType.ACCEPT_SELL_OFFER) {
      const target = game.countries.find(
        (country) => country.id === decision.target.id
      );
      if (decision.data.totalPrice) {
        if (country.economy.balance < decision.data.totalPrice) {
          country.messages.push({
            title: `You do not have enough money for this`,
            stage: game.stageCount + 1,
          });

          return;
        }

        country.economy.balance += -Math.abs(decision.data.totalPrice);
        target.economy.balance += decision.data.totalPrice;
      }
    }

    for (const event of decision.events) {
      let sender: Country;

      if (event.targetId) {
        sender = game.countries.find(
          (country) => country.id === event.sender.id
        );
      }

      // Checking events that require a target
      if (requiredTargetEvents.includes(event.action)) {
        if (!sender) {
          country.messages.push({
            title: `Decision Event Error: target not sent or found`,
            stage: game.stageCount + 1,
          });
          continue;
        }
      }

      switch (event.action) {
        case DecisionEventAction.GIVE:
          ConsoleService.give({
            game,
            target: country, // Who sent the resource
            order: { items: event.resources },
            notify: true,
            from: sender.name,
          });

          sender.messages.push({
            title: `${country.name} accepted your offer`,
            stage: game.stageCount + 1,
          });
          break;

        case DecisionEventAction.DELETE_REFUND:
          const refundItemIndex = sender.refunds.findIndex(
            (refundItem) =>
              refundItem.id === decision.id || decision.data?.refundId
          );

          if (refundItemIndex === -1) {
            continue;
          }

          sender.refunds.splice(refundItemIndex, 1);
          break;
      }
    }
  }
}

type RunEventParam = {
  decision: Decision;
  decidedTo: DecisionMakeType;
  country: Country;
  game: Game | string;
};
