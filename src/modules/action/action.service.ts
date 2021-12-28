import 'dotenv/config';
import { v4 } from 'uuid';
import {
  CountryPassiveType,
  CountryPassiveValueType,
} from '../../data/templates/country-passives.template';
import { ProvincePassiveType } from '../../data/templates/province-passive.template';
import { GameHelper } from '../../helpers/game.helper';
import { MathHelper } from '../../helpers/math.helper';
import { ErrorResponse, SuccessResponse } from '../../helpers/response.helper';
import { AiService } from '../ai/ai.service';
import { CoalitionHelper } from '../coalition/coalition.helper';
import { ConsoleService } from '../console/console.service';
import { Country } from '../country/country.entity';
import { CountryHelper } from '../country/country.helper';
import { countryRepository } from '../country/country.repository';
import { Game } from '../game/game.entity';
import { WarHelper } from '../war/war.helper';
import { WarParticipantType, WarStage } from '../war/war.typing';
import { ActionType } from './action.typing';
import { acceptAllyRequestAction } from './services/accept-ally-request-action.service';
import { acceptPeaceRequestAction } from './services/accept-peace-request-action.service';
import { acceptSellOfferAction } from './services/accept-sell-offer-action.service';
import { breakAllianceAction } from './services/break-alliance-action.service';
import { changeFocusAction } from './services/change-focus-action.service';
import { declareWarAction } from './services/declare-war-action.service';
import { dismissArmyAction } from './services/dismiss-army-action.service';
import { guaranteeIndependenceAction } from './services/guarantee-independence-action.service';
import { improveProvincesAction } from './services/improve-provinces-action.service';
import { improveRelationsAction } from './services/improve-relations-action.service';
import { joinWarAction } from './services/join-war-action.service';
import { nextTurnAction } from './services/next-turn-action.service';
import { refuseAllyRequestAction } from './services/refuse-ally-request-action.service';
import { removeIndependenceGuaranteeingAction } from './services/remove-independence-guaranteeing-action.service';
import { requestAllyAction } from './services/request-ally-action.service';
import { sendInsultAction } from './services/send-insult-action.service';
import { sendResourcesAction } from './services/send-resources-action.service';
import { shopAction } from './services/shop-action.service';

export class ActionService {
  static async runActions(data: RunActionsParam) {
    const countriesRemoved: Country[] = data.game.countries.filter(
      (country) => !country.provinces.length
    );

    const playersRemovedIds: string[] = [];
    for (const country of countriesRemoved) {
      if (!country.owner) {
        continue;
      }

      playersRemovedIds.push(country.owner.id);
    }

    data.game.countries = data.game.countries.filter(
      (country) => country.provinces.length
    );

    data.game.players = data.game.players.filter(
      (player) => !playersRemovedIds.includes(player.id)
    );

    const countriesRemovedIds = countriesRemoved.map((country) => country.id);

    CoalitionHelper.removeCountriesFromCoalitionsByIds({
      countryIds: countriesRemovedIds,
      game: data.game,
    });

    if (countriesRemoved.length) {
      await countryRepository().remove(countriesRemoved);
    }

    const canChangeFocus = GameHelper.canChangeFocus(data.game.stageCount);

    const aggressivenessReduction =
      +process.env.AGGRESSIVENESS_REDUCTION_PER_STAGE;

    for (const country of data.game.countries) {
      // TODO create method to do these filters
      // TODO do this when the last province of a country is demanded
      country.allies = country.allies.filter(
        (target) => !countriesRemovedIds.includes(target.id)
      );
      country.enemies = country.enemies.filter(
        (target) => !countriesRemovedIds.includes(target.id)
      );
      country.inWarWith = country.inWarWith.filter(
        (target) => !countriesRemovedIds.includes(target.id)
      );
      country.guaranteeingIndependence =
        country.guaranteeingIndependence.filter(
          (target) => !countriesRemovedIds.includes(target.id)
        );
      country.independenceGuaranteedBy =
        country.independenceGuaranteedBy.filter(
          (target) => !countriesRemovedIds.includes(target.id)
        );

      // Coalitions
      if (!country.isAi && country.aggressiveness.current > 200) {
        const chanceOfFormingCoalition = country.aggressiveness.current / 5;

        const alreadyHasCoalitionAgainst = data.game.coalitions.some(
          (coalition) => coalition.against.id === country.id
        );

        if (
          !alreadyHasCoalitionAgainst &&
          MathHelper.chanceOf(chanceOfFormingCoalition)
        ) {
          const coalition = CoalitionHelper.create({
            game: data.game,
            against: country,
          });

          country.messages.push({
            title: `${coalition.owner.name} created a coalition against us`,
            stage: data.game.stageCount + 1,
            data: { coalition },
          });

          data.game.coalitions.push(coalition);
        }
      }

      // Running actions
      const hasCapital = country.provinces.some(
        (province) => province.isCapital
      );

      if (!hasCapital) {
        country.setNewCapital();
      }

      for (const passive of country.passives) {
        if (typeof passive.duration === 'undefined') {
          continue;
        }

        passive.duration--;
      }

      country.passives = country.passives.filter(
        (passive) =>
          typeof passive.duration !== 'undefined' && passive.duration > -1
      );

      for (const decision of country.decisions) {
        if (typeof decision.duration === 'undefined') {
          continue;
        }

        decision.duration--;
      }

      country.decisions = country.decisions.filter(
        (decision) =>
          !decision.decided &&
          typeof decision.duration !== 'undefined' &&
          decision.duration > -1
      );

      if (country.isAi) {
        await AiService.runDecisions({
          country,
          game: data.game,
        });

        await AiService.generateActions({
          country,
          game: data.game,
        });
      }

      // Refunds
      for (const refundItem of country.refunds) {
        refundItem.validFor--;

        if (refundItem.validFor > 0) {
          continue;
        }

        ConsoleService.give({
          game: data.game,
          target: country,
          order: { items: [refundItem.resource] },
        });
      }

      country.refunds = country.refunds.filter(
        (refundItem) => refundItem.validFor > 0
      );

      country.economy.balance += country.incoming.balance || 0;
      country.resources.oil += country.incoming.oil || 0;
      country.reduceAggressiveness(aggressivenessReduction);

      for (const message of country.messages) {
        if (!message.stage) {
          message.stage = data.game.stageCount;
        }
      }

      country.messages = country.messages.filter(
        (message) => message.stage >= data.game.stageCount
      );

      if (!country.actions.length) {
        continue;
      }

      if (canChangeFocus) {
        country.messages.push({
          title: `Change focus is allowed`,
          stage: data.game.stageCount + 1,
        });
      }

      for (const action of country.actions) {
        let response: SuccessResponse | ErrorResponse;

        switch (action.type) {
          case ActionType.DECLARE_WAR:
            response = await declareWarAction({
              country,
              callToWar: action.data?.callToWar || [],
              game: data.game,
              targetId: action.data?.targetId,
            });
            break;

          case ActionType.ACCEPT_PEACE_REQUEST:
            response = await acceptPeaceRequestAction({
              country,
              game: data.game,
              decisionId: action.data.decisionId,
            });
            break;

          case ActionType.CHANGE_FOCUS:
            response = await changeFocusAction({
              country,
              focusType: action.data?.focusType,
              game: data.game,
            });
            break;

          case ActionType.CREATE_COALITION:
            break;

          case ActionType.IMPROVE_PROVINCES:
            response = await improveProvincesAction({
              country,
              game: data.game,
              provincesToImprove: action.data?.provincesToImprove,
            });
            break;

          case ActionType.IMPROVE_RELATIONS:
            response = await improveRelationsAction({
              country,
              game: data.game,
              targetId: action.data.targetId,
            });
            break;

          case ActionType.JOIN_COALITION:
            break;

          case ActionType.JOIN_WAR:
            response = await joinWarAction({
              allyCountryId: action.data?.allyCountryId,
              decisionId: action.data?.decisionId,
              country,
              game: data.game,
              warId: action.data?.warId,
            });
            break;

          case ActionType.NEXT_TURN:
            response = await nextTurnAction({
              actions: action.data?.actions,
              country,
              game: data.game,
              playerId: action.playerId,
            });
            break;

          case ActionType.REQUEST_ALLY:
            response = await requestAllyAction({
              country,
              game: data.game,
              targetId: action.data?.targetId,
            });
            break;

          case ActionType.BREAK_ALLIANCE:
            response = await breakAllianceAction({
              country,
              game: data.game,
              targetId: action.data?.targetId,
            });
            break;

          case ActionType.REQUEST_PEACE:
            break;

          case ActionType.SEND_INSULT:
            response = await sendInsultAction({
              country,
              game: data.game,
              targetId: action.data?.targetId,
            });
            break;

          case ActionType.SHOP:
            response = await shopAction({
              country,
              game: data.game,
              order: action.data?.order,
            });
            break;

          case ActionType.GUARANTEE_INDEPENDENCE:
            response = await guaranteeIndependenceAction({
              country,
              game: data.game,
              targetId: action.data?.targetId,
            });
            break;

          case ActionType.REMOVE_INDEPENDENCE_GUARANTEEING:
            response = await removeIndependenceGuaranteeingAction({
              country,
              game: data.game,
              targetId: action.data?.targetId,
            });
            break;

          case ActionType.DISMISS_ARMY:
            response = await dismissArmyAction({
              country,
              qty: action.data.qty,
            });
            break;

          case ActionType.ACCEPT_ALLY_REQUEST:
            response = await acceptAllyRequestAction({
              country,
              decisionId: action.data.decisionId,
              game: data.game,
            });
            break;

          case ActionType.REFUSE_ALLY_REQUEST:
            response = await refuseAllyRequestAction({
              country,
              decisionId: action.data.decisionId,
              game: data.game,
            });
            break;

          case ActionType.SEND_RESOURCES:
            response = await sendResourcesAction({
              resources: action.data.resources,
              country,
              targetId: action.data?.targetId,
              game: data.game,
            });
            break;

          case ActionType.ACCEPT_SELL_OFFER:
            response = await acceptSellOfferAction({
              country,
              decisionId: action.data.decisionId,
              game: data.game,
            });
            break;
        }

        if (!response) {
          response = {
            message: 'Invalid Action Type',
            error: true,
          };
        }

        if (response.error) {
          country.messages.push({
            stage: data.game.stageCount,
            title: response.message,
            data: response.data || null,
          });
        }
      } // for (country.actions)

      country.actions = [];
    } // for (data.game.countries)
  }

  static async runWars(data: RunWarsParam) {
    const { game } = data;

    for (const war of game.wars) {
      if (game.stageCount < war.startAtStage) {
        continue;
      }

      if (war.stage === WarStage.OVER) {
        continue;
      }

      const attackers = WarHelper.getAttackers(game, war);
      const victims = WarHelper.getVictims(game, war);

      const attacker = game.countries.find(
        (country) => country.id === war.details.attacker.id
      );
      const victim = game.countries.find(
        (country) => country.id === war.details.victim.id
      );

      const comparedInfo = WarHelper.getComparedInfo(
        game,
        war,
        attackers,
        victims
      );
      const lossesBySide = WarHelper.getLosses(game, war, comparedInfo);
      const splittedLosses = WarHelper.getSpllitedLosses(
        comparedInfo,
        lossesBySide,
        true
      );

      WarHelper.setLosses(game, war, splittedLosses);

      const mps = CountryHelper.sumWarMilitaryPowers({
        attackers,
        victims,
      });

      // Attacker or victim may be already conquered by other enemies
      if (attacker && victim) {
        const attackerHasNoArmy = CountryHelper.countryHasNoArmy(attacker.army);
        const victimHasNoArmy = CountryHelper.countryHasNoArmy(victim.army);

        if (attackerHasNoArmy && !victimHasNoArmy) {
          mps.attackers.militaryPower.totals.total = 0;
        } else if (!attackerHasNoArmy && victimHasNoArmy) {
          mps.victims.militaryPower.totals.total = 0;
        }
      }

      const isOver: boolean =
        mps.attackers.militaryPower.totals.total <= 1 ||
        mps.victims.militaryPower.totals.total <= 1;

      if (!isOver) {
        war.stage = WarStage.FIGHTING;
        continue;
      }

      war.stage = WarStage.OVER;
      WarHelper.setParticipationPercentage(war.details);

      if (war.isByCoalition) {
        victim.aggressiveness.current = 0;

        const coalition = game.coalitions.find(
          (coalition) => coalition.warId === war.id
        );

        if (coalition) {
          coalition.isOver = true;
        }

        for (const province of victim.provinces) {
          province.passives.push({
            type: ProvincePassiveType.REDUCE_INCOMING,
            value: 95,
            valueType: CountryPassiveValueType.PERCENT,
            description: `Incoming reduced by 95% due to recent wars`,
            duration:
              +process.env.PROVINCE_INCOMING_REDUCTION_BY_COALITION_DURATION,
          });
        }
      }

      let winner: WarParticipantType;

      if (mps.attackers.militaryPower.totals.total <= 1) {
        winner = WarParticipantType.VICTIM;

        const provincesToFill: string[] = [];
        const attackersIds: string[] = [];
        const victimsIds = victims.map((c) => c.id);

        let balanceToSubtractMultiplier = 0;

        if (war.isByCoalition) {
          balanceToSubtractMultiplier = 30;
        } else {
          balanceToSubtractMultiplier = 14;
        }

        let attackersBalanceLost: number = 0;

        for (const attacker of attackers) {
          let balanceToSubtract =
            attacker.incoming.balance * balanceToSubtractMultiplier;
          attacker.economy.balance -= Math.abs(balanceToSubtract);

          attackersBalanceLost += Math.abs(balanceToSubtract);

          attacker.inWarWith = attacker.inWarWith.filter(
            (c) => !victimsIds.includes(c.id)
          );

          attacker.messages.push({
            title: `We lost the war against ${war.details.victim.name}`,
          });

          attackersIds.push(attacker.id);

          // Attacker may be already conquered by other enemies
          if (attacker && attacker.provinces.length) {
            provincesToFill.push(
              ...attacker.provinces.map((province) => province.mapRef)
            );
          }
        }

        const victimsCanDemandProvincesWhenWinWars = Boolean(
          +process.env.VICTIMS_CAN_DEMAND_PROVINCES_WHEN_WIN_WARS
        );

        for (const country of victims) {
          const participant = WarHelper.getParticipant(war, country.id);

          country.inWarWith = country.inWarWith.filter(
            (c) => !attackersIds.includes(c.id)
          );

          country.messages.push({
            title: `You won the war against ${war.details.attacker.name}`,
          });

          country.economy.balance += Math.abs(attackersBalanceLost);

          if (victimsCanDemandProvincesWhenWinWars) {
            country.decisions.push({
              id: v4(),
              actionType: ActionType.DEMAND,
              types: [],
              description: `You won the war against ${war.details.attacker.name} and can demand provinces/resources.`,
              duration: 3,
              data: {
                warId: war.id,
                winner,
                allies: victims
                  .filter((ally) => ally.id !== country.id)
                  .map(
                    (ally) =>
                      ally.getCountrySimplifiedData() && ally.id !== country.id
                  ),
                targets: attackers.map((target) =>
                  target.getCountrySimplifiedData()
                ),
                isByCoalition: war.isByCoalition,
                provincesToFill,
                participation: participant.participation,
                maxProvincesAllowedToDemand: Math.ceil(
                  MathHelper.getPercetageValue(
                    provincesToFill.length,
                    participant.participation
                  )
                ),
              },
            });
          }
        }
      } else if (mps.victims.militaryPower.totals.total <= 1) {
        winner = WarParticipantType.ATTACKER;

        const provincesToFill: string[] = [];
        const victimsIds: string[] = [];
        const attackersIds = attackers.map((c) => c.id);

        for (const victim of victims) {
          const balanceToSubtract = victim.incoming.balance * 3;
          victim.economy.balance -= Math.abs(balanceToSubtract);

          victimsIds.push(victim.id);

          victim.messages.push({
            title: `We lost the war against ${war.details.attacker.name}`,
          });

          victim.inWarWith = victim.inWarWith.filter(
            (c) => !attackersIds.includes(c.id)
          );

          if (victim.id === war.details.victim.id) {
            let duration: number = 20;
            let value: number = 230;

            if (war.isByCoalition) {
              duration = 30;
              value = 800;
            }

            victim.passives.push({
              type: CountryPassiveType.INCREASE_TARGET_AGGRESSION_WHEN_ATTACKED,
              value,
              valueType: CountryPassiveValueType.STATIC,
              duration,
              description: `Increase attacker aggression by +${value}`,
            });
          }
        }

        // Victim may be already conquered by other enemies
        if (victim && victim.provinces.length) {
          provincesToFill.push(
            ...victim.provinces.map((province) => province.mapRef)
          );
        }

        for (const country of attackers) {
          const participant = WarHelper.getParticipant(war, country.id);

          country.inWarWith = country.inWarWith.filter(
            (c) => !victimsIds.includes(c.id)
          );

          country.enemies = country.enemies.filter(
            (c) => c.id !== war.details.victim.id
          );

          country.messages.push({
            title: `You won the war against ${war.details.victim.name}`,
          });

          let maxProvincesAllowedToDemand: number = Math.ceil(
            MathHelper.getPercetageValue(
              provincesToFill.length,
              participant.participation
            )
          );

          if (maxProvincesAllowedToDemand <= 0) {
            maxProvincesAllowedToDemand = 1;
          }

          country.decisions.push({
            id: v4(),
            actionType: ActionType.DEMAND,
            types: [],
            description: `You won the war against ${war.details.victim.name}.`,
            duration: 3,
            data: {
              warId: war.id,
              winner,
              allies: attackers
                .filter((ally) => ally.id !== country.id)
                .map((ally) => ally.getCountrySimplifiedData()),
              targets: victims.map((target) =>
                target.getCountrySimplifiedData()
              ),
              isByCoalition: war.isByCoalition,
              provincesToFill,
              participation: participant.participation,
              maxProvincesAllowedToDemand,
            },
          });
        }
      }

      war.winner = winner;
    }

    // Remove inWarWith

    game.wars = game.wars.filter((war) => war.stage !== WarStage.OVER);
  }

  static async runCoalitions(data: RunCoalitionsParam) {
    const { game } = data;

    console.log('running coalitions');
    for (const coalition of game.coalitions) {
      if (coalition.warId) {
        continue;
      }

      const target = game.countries.find(
        (country) => country.id === coalition.against.id
      );

      if (target.aggressiveness.current < 20) {
        target.messages.push({
          title: `${coalition.owner.name} ended his coalition against us`,
        });
        coalition.isOver = true;
        continue;
      }

      if (target.aggressiveness.current < 200) {
        continue;
      }

      const alliesIds = coalition.allies.map((ally) => ally.id);
      CoalitionHelper.calculateMilitaryPower({ coalition, game });

      const chanceOfDeclareWar = target.aggressiveness.current / 7;
      const mpDiff = MathHelper.percentDiff(
        coalition.totalMp,
        coalition.targetTotalMp
      );

      if (!MathHelper.chanceOf(chanceOfDeclareWar)) {
        continue;
      }

      const availableCountries = game.countries.filter(
        (country) =>
          country.isAi &&
          country.id !== target.id &&
          !country.hasFriendlyRelations(target.id) &&
          !alliesIds.includes(country.id)
      );

      const randomAlly: Country = MathHelper.getRandomItem(availableCountries);
      coalition.allies.push(randomAlly.getCountrySimplifiedData());

      if (mpDiff < 40) {
        continue;
      }

      CoalitionHelper.declareWar({ coalition, game });
    }

    game.coalitions = game.coalitions.filter((coalition) => !coalition.isOver);
  }
}

type RunActionsParam = {
  game: Game;
};

type RunWarsParam = {
  game: Game;
};
type RunCoalitionsParam = {
  game: Game;
};
