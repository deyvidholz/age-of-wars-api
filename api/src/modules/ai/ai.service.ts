import 'dotenv/config';
import {
  CountryPassiveType,
  CountryPassiveValueType,
} from '../../data/templates/country-passives.template';
import { Focus, focuses } from '../../data/templates/focuses.template';
import { PersonalityType } from '../../data/templates/personalities.template';
import { MathHelper } from '../../helpers/math.helper';
import { ActionType } from '../action/action.typing';
import { Country } from '../country/country.entity';
import { CountryService } from '../country/country.service';
import { CountrySimplified, RankingType } from '../country/country.typing';
import { Game } from '../game/game.entity';
import { ShopService } from '../shop/shop.service';
import { ItemType, Order, OrderItem } from '../shop/shop.typing';
import { acceptAllianceRequestAiDecision } from './ai-decisions/accept-alliance-request.ai-decision';
import { acceptJoinWarAiDecision } from './ai-decisions/accept-join-war.ai-decision';
import { demandAiDecision } from './ai-decisions/demand.ai-decision';
import { AiHelper } from './ai.helper';
import { AiStrategyHelper } from './ai-strategy.helper';

export class AiService {
  static async generateActions(data: GenerateActionsParam) {
    const { country, game } = data;
    const forceChangeFocus = game.stageCount < 2;

    // NEW: Strategic Analysis - AI now thinks before acting!
    const strategicAnalysis = AiStrategyHelper.analyzeStrategicSituation(country, game);
    const budget = AiStrategyHelper.calculateBudgetAllocation(
      country,
      strategicAnalysis.recommendedStrategy
    );

    // Store analysis on country for use in action methods
    (country as any)._strategicAnalysis = strategicAnalysis;
    (country as any)._budget = budget;

    const actionTypes = AiHelper.generateActionTypes({
      game,
      country,
      gameStageCount: game.stageCount,
      forceChangeFocus,
    });

    for (const actionType of actionTypes) {
      switch (actionType) {
        case ActionType.CHANGE_FOCUS:
          AiService.changeFocus({ country });
          break;

        case ActionType.IMPROVE_PROVINCES:
          await AiService.improveProvinces({ country });
          break;

        case ActionType.SHOP:
          await AiService.shop({ country });
          break;

        case ActionType.SEND_INSULT:
          AiService.sendInsult({ country, game });
          break;

        case ActionType.DECLARE_WAR:
          await AiService.declareWar({ country, game });
          break;

        case ActionType.REQUEST_ALLY:
          await AiService.requestAlly({ country, game });
          break;
      }
    }
  }

  static async runDecisions(data: RunDecisionsParam) {
    const { country, game } = data;

    for (const decision of country.decisions) {
      switch (decision.actionType) {
        case ActionType.ACCEPT_ALLY_REQUEST:
          await acceptAllianceRequestAiDecision({
            country,
            game,
            decision,
          });
          break;

        case ActionType.JOIN_WAR:
          await acceptJoinWarAiDecision({
            country,
            game,
            decision,
          });
          break;

        case ActionType.DEMAND:
          await demandAiDecision({
            country,
            game,
            decision,
          });
          break;
      }
    }
  }

  static changeFocus(data: ChangeFocusParam) {
    const { country } = data;
    let randomNumber: number = MathHelper.getRandomNumber(30, 60);

    if (!MathHelper.chanceOf(randomNumber)) {
      return;
    }

    let focus: Focus;

    const passiveTypes = [
      CountryPassiveType.AI_INCREASE_ECONOMIC_FOCUS_CHANCE,
      CountryPassiveType.AI_INCREASE_WAR_FOCUS_CHANCE,
      CountryPassiveType.AI_INCREASE_DEFENSIVE_FOCUS_CHANCE,
      CountryPassiveType.AI_INCREASE_STRATEGIC_FOCUS_CHANCE,
    ];

    const focusChancePassive = country.passives.find((passive) =>
      passiveTypes.includes(passive.type)
    );

    if (focusChancePassive) {
      if (MathHelper.chanceOf(focusChancePassive.value)) {
        if (!focusChancePassive.data || !focusChancePassive.data.focusType) {
          throw new Error(
            'Invalid Focus Chance passive. No focusType property found in passive data'
          );
        }

        focus = focuses.find(
          (focus) => focus.type === focusChancePassive.data.focusType
        );
      }
    }

    if (!focus) {
      focus = MathHelper.getRandomItem(focuses);
    }

    if (country.focus?.type === focus.type) {
      return;
    }

    country.actions.push({
      type: ActionType.CHANGE_FOCUS,
      data: {
        focusType: focus.type,
      },
    });
  }

  static async improveProvinces(data: ImproveProvincesParam) {
    const { country } = data;

    // NEW: Use strategic budget for economy
    const analysis = (country as any)._strategicAnalysis;
    const budget = (country as any)._budget;

    if (!budget || budget.economy <= 0) {
      return; // No budget for economic development
    }

    let maxProvincesImprovementPerStg: number =
      +process.env.MAX_PROVINCES_IMPROVEMENT_PER_STG;

    // NEW: Adjust province count based on economic strategy
    if (analysis?.recommendedStrategy.focus === 'economic') {
      maxProvincesImprovementPerStg = Math.ceil(maxProvincesImprovementPerStg * 1.5);
    }

    const provinces = [...country.provinces];
    const mapRefs: { mapRef: string; isCapital: boolean }[] = [];

    // NEW: Always prioritize capital when economy is struggling
    const shouldPrioritizeCapital =
      analysis?.economicHealth.status === 'poor' ||
      analysis?.economicHealth.status === 'struggling';

    for (let i = 0; i < maxProvincesImprovementPerStg; i++) {
      if (!provinces.length) {
        continue;
      }

      // Higher chance to improve capital when economy is struggling
      const capitalChance = shouldPrioritizeCapital ? 80 : 60;

      if (MathHelper.chanceOf(capitalChance)) {
        const capitalProvinceMapRefIndex = provinces.findIndex(
          (province) => province.isCapital
        );

        if (capitalProvinceMapRefIndex !== -1) {
          mapRefs.push({
            isCapital: true,
            mapRef: provinces[capitalProvinceMapRefIndex].mapRef,
          });

          provinces.splice(capitalProvinceMapRefIndex, 1);
          continue;
        }
      }

      if (MathHelper.chanceOf(50)) {
        const provinceIndex = MathHelper.getRandomIndex(provinces);

        mapRefs.push({
          isCapital: provinces[provinceIndex].isCapital,
          mapRef: provinces[provinceIndex].mapRef,
        });

        provinces.splice(provinceIndex, 1);
      }
    }

    let availableMoneyToSpend = budget.economy;

    // Optimize: Calculate total shop costs in single pass
    if (country.actions.length) {
      for (const action of country.actions) {
        if (action.type === ActionType.SHOP) {
          const response = await ShopService.getOrderPrice({
            items: action.data.order.items,
            countryId: country.id,
            country,
          });

          if (!response.error) {
            availableMoneyToSpend -= response.data.totalPrice;
          }
        }
      }
    }

    for (const mapRef of mapRefs) {
      const provinceToImprove = {
        mapRef: mapRef.mapRef,
        qty: {
          production: MathHelper.getRandomNumber(1, 5),
          taxation: MathHelper.getRandomNumber(1, 5),
        },
      };

      let response = await ShopService.getProvincesImprovementPrice({
        country,
        countryId: country.id,
        provincesToImprove: [provinceToImprove],
      });

      if (response.error) {
        continue;
      }

      if (availableMoneyToSpend < response.data.totalPrice) {
        // Trying again with less levels
        provinceToImprove.qty.production = 1;
        provinceToImprove.qty.taxation = 1;

        response = await ShopService.getProvincesImprovementPrice({
          country,
          countryId: country.id,
          provincesToImprove: [provinceToImprove],
        });

        if (availableMoneyToSpend < response.data.totalPrice) {
          // Trying again with less levels
          const availableProvinceLevels = ['production', 'taxation'];
          const randomProvinceLevel = MathHelper.getRandomItem(
            availableProvinceLevels
          );

          provinceToImprove.qty.production = 0;
          provinceToImprove.qty.taxation = 0;
          provinceToImprove.qty[randomProvinceLevel] = 1;

          response = await ShopService.getProvincesImprovementPrice({
            country,
            countryId: country.id,
            provincesToImprove: [provinceToImprove],
          });

          if (availableMoneyToSpend < response.data.totalPrice) {
            continue;
          }

          country.actions.push({
            type: ActionType.IMPROVE_PROVINCES,
            data: {
              provincesToImprove: [provinceToImprove],
            },
          });
          continue;
        }

        country.actions.push({
          type: ActionType.IMPROVE_PROVINCES,
          data: {
            provincesToImprove: [provinceToImprove],
          },
        });

        continue;
      }

      country.actions.push({
        type: ActionType.IMPROVE_PROVINCES,
        data: {
          provincesToImprove: [provinceToImprove],
        },
      });
    }
  }

  static async shop(data: ShopParam) {
    const { country } = data;

    // NEW: Use strategic budget instead of spending everything!
    const analysis = (country as any)._strategicAnalysis;
    const budget = (country as any)._budget;

    if (!budget || budget.military <= 0) {
      return; // No budget for military
    }

    // Calculate available money after accounting for province improvements
    let availableMoneyToSpend = budget.military;

    if (country.actions.length) {
      for (const action of country.actions) {
        if (action.type === ActionType.IMPROVE_PROVINCES) {
          const response = await ShopService.getProvincesImprovementPrice({
            countryId: country.id,
            provincesToImprove: [...action.data.provincesToImprove],
            country,
          });

          if (!response.error) {
            availableMoneyToSpend -= response.data.totalPrice;
          }
        }
      }
    }

    if (availableMoneyToSpend < 1000) {
      return; // Not enough budget
    }

    // NEW: Smart army composition based on current forces
    const currentArmy = country.army;
    const totalUnits =
      currentArmy.divisions +
      currentArmy.tanks +
      currentArmy.aircrafts +
      currentArmy.warships;

    // Define ideal army ratios (balanced force)
    const idealRatios = {
      divisions: 0.4, // 40% divisions (cheap, bulk)
      tanks: 0.3, // 30% tanks (medium cost, good power)
      aircrafts: 0.2, // 20% aircrafts (expensive, high power)
      warships: 0.1, // 10% warships (very expensive)
    };

    // Calculate which units we need based on ideal ratios
    const priorities: { type: ItemType; deficit: number; priority: number }[] = [];

    if (totalUnits > 0) {
      // Calculate deficit from ideal ratio
      Object.entries(currentArmy).forEach(([type, count]) => {
        const currentRatio = count / totalUnits;
        const idealRatio = idealRatios[type] || 0.25;
        const deficit = idealRatio - currentRatio;

        priorities.push({
          type: ItemType[type.toUpperCase()],
          deficit,
          priority: deficit > 0 ? deficit * 100 : 0, // Higher priority for units we lack
        });
      });
    } else {
      // No army yet, prioritize divisions first
      priorities.push(
        { type: ItemType.DIVISIONS, deficit: 1, priority: 100 },
        { type: ItemType.TANKS, deficit: 0.5, priority: 50 },
        { type: ItemType.AIRCRAFTS, deficit: 0.3, priority: 30 },
        { type: ItemType.WARSHIPS, deficit: 0.1, priority: 10 }
      );
    }

    // Sort by priority (highest deficit first)
    priorities.sort((a, b) => b.priority - a.priority);

    // NEW: Buy units in a smart, balanced way
    const order: Order = { items: [] };
    let spentMoney = 0;
    let roundsWithoutPurchase = 0;

    // Buy in rounds, prioritizing unit types we lack
    while (availableMoneyToSpend - spentMoney > 1000 && roundsWithoutPurchase < 10) {
      let purchasedInRound = false;

      for (const priorityItem of priorities) {
        if (priorityItem.priority <= 0) continue;

        // Try to buy this type
        const testItem: OrderItem = { itemType: priorityItem.type, qty: 1 };
        const testResponse = await ShopService.getOrderPrice({
          items: [testItem],
          country,
        });

        if (testResponse.error) continue;

        const price = testResponse.data.totalPrice;

        // Can we afford it within our budget?
        if (spentMoney + price <= availableMoneyToSpend) {
          // Add to order
          let existingItem = order.items.find((i) => i.itemType === priorityItem.type);
          if (!existingItem) {
            existingItem = { itemType: priorityItem.type, qty: 0 };
            order.items.push(existingItem);
          }

          existingItem.qty++;
          spentMoney += price;
          purchasedInRound = true;

          // Reduce priority slightly for next round (to balance purchases)
          priorityItem.priority *= 0.9;
        }
      }

      if (!purchasedInRound) {
        roundsWithoutPurchase++;
      } else {
        roundsWithoutPurchase = 0;
      }
    }

    // Create individual shop actions for each unit type
    for (const item of order.items) {
      if (item.qty > 0) {
        country.actions.push({
          type: ActionType.SHOP,
          data: { order: { items: [item] } },
        });
      }
    }
  }

  static async requestAlly(data: RequestAllyParam) {
    const { country, game } = data;

    // NEW: Strategic analysis for diplomatic decisions
    const analysis = (country as any)._strategicAnalysis;

    if (!analysis) {
      return; // No strategic analysis available
    }

    // NEW: Prioritize allies when under threat or isolated
    const urgentlyNeedsAllies =
      analysis.diplomaticPosition.isIsolated ||
      analysis.diplomaticPosition.needsAllies ||
      analysis.threats.isUnderThreat;

    // NEW: Use strategically identified potential allies if available
    let targetId: string;
    let baseChance = 50;

    if (
      analysis.opportunities.potentialAllies &&
      analysis.opportunities.potentialAllies.length > 0
    ) {
      // Pick from strategically identified potential allies
      const potentialAlly = MathHelper.getRandomItem(
        analysis.opportunities.potentialAllies
      );
      targetId = potentialAlly.id;

      // Higher chance when allies are strategically recommended
      baseChance = urgentlyNeedsAllies ? 80 : 70;
    } else {
      // Fall back to opinion-based ally selection
      const possibleTargets: {
        country: CountrySimplified;
        opinionValue: number;
        militaryValue: number;
      }[] = [];

      const response = await CountryService.getCountriesSortedByRanking({
        gameId: game.id,
        rankingType: RankingType.OPINION,
        countryId: country.id,
        country,
        game,
      });

      if (response.error) {
        return;
      }

      const opinionRanking = response.data.opinions;

      // Optimize: Create Map for O(1) country lookup
      const availableCountriesMap = new Map<string, Country>();
      for (const c of game.countries) {
        if (c.id !== country.id && !country.hasFriendlyRelations(c.id, false)) {
          availableCountriesMap.set(c.id, c);
        }
      }

      let max = availableCountriesMap.size < 10 ? availableCountriesMap.size : 10;

      for (let i = 0; i < max; i++) {
        // Optimize: Use Map for O(1) lookup instead of find()
        const target = availableCountriesMap.get(opinionRanking[i].id);

        if (!target) {
          continue;
        }

        let maxAiAlliesAllowed: number = +process.env.MAX_AI_ALLIES_ALLOWED;

        if (target.allies.length >= maxAiAlliesAllowed) {
          continue;
        }

        // Don't ally with countries in coalitions
        const targetHasCoalitions = game.coalitions.some(
          (coalition) => coalition.against.id === target.id
        );

        if (targetHasCoalitions) {
          continue;
        }

        // NEW: Prefer militarily stronger allies when under threat
        const militaryValue = target.militaryPower?.total || 0;

        possibleTargets.push({
          country: target.getCountrySimplifiedData(),
          opinionValue: opinionRanking[i].opinionValue,
          militaryValue,
        });
      }

      if (!possibleTargets.length) {
        return;
      }

      // NEW: When under threat, prioritize strong allies
      if (urgentlyNeedsAllies) {
        // Sort by military power when we need protection
        possibleTargets.sort((a, b) => b.militaryValue - a.militaryValue);
        // Pick from top 3 strongest
        const strongAllies = possibleTargets.slice(0, 3);
        const randomTarget = MathHelper.getRandomItem(strongAllies);
        targetId = randomTarget.country.id;
        baseChance = 75; // Higher chance when we need allies urgently
      } else {
        // Normal: pick based on opinion
        const randomTarget = MathHelper.getRandomItem(possibleTargets);
        targetId = randomTarget.country.id;
        baseChance = randomTarget.opinionValue / 20;
      }
    }

    // Apply chance
    if (!MathHelper.chanceOf(baseChance)) {
      return;
    }

    country.actions.push({
      type: ActionType.REQUEST_ALLY,
      data: {
        targetId,
      },
    });
  }

  static sendInsult(data: SendInsultParam) {
    const { country, game } = data;

    // Getting the first 10 countries with worst opinion
    const availableCountries = game.countries.filter(
      (c) => c.id !== country.id && !country.hasFriendlyRelations(c.id)
    );

    const randomTarget: Country = MathHelper.getRandomItem(availableCountries);
    const opinion = country.getOpinionOf(randomTarget.name);
    let chance = Math.abs(opinion.value) / 20;

    if (country.personality.type === PersonalityType.PACIFIC) {
      chance = chance / 2;
    }

    if (!MathHelper.chanceOf(chance)) {
      return;
    }

    country.actions.push({
      type: ActionType.SEND_INSULT,
      data: {
        targetId: randomTarget.id,
      },
    });
  }

  static async declareWar(data: DeclareWarParam) {
    const { country, game } = data;

    // NEW: Strategic analysis before declaring war
    const analysis = (country as any)._strategicAnalysis;

    if (!analysis) {
      return; // No strategic analysis available
    }

    // NEW: Don't attack if we're under threat ourselves
    if (
      analysis.threats.level >= 2 || // MEDIUM threat or higher
      analysis.threats.isUnderThreat
    ) {
      return; // Focus on defense, not expansion
    }

    // NEW: Pacific personalities avoid war unless provoked
    if (country.personality.type === PersonalityType.PACIFIC) {
      if (!analysis.threats.isUnderThreat) {
        return; // Pacific countries don't start wars
      }
    }

    // NEW: Don't attack if economy is struggling (need to build up first)
    if (
      analysis.economicHealth.status === 'poor' ||
      analysis.economicHealth.status === 'struggling'
    ) {
      return; // Fix economy before starting wars
    }

    // NEW: Only attack if strategy recommends expansion
    if (
      analysis.recommendedStrategy.priority !== 'EXPANSION' &&
      analysis.recommendedStrategy.focus !== 'aggressive'
    ) {
      return; // Strategy doesn't recommend war right now
    }

    // NEW: Prefer weak targets identified by strategic analysis
    let targetId: string;

    if (
      analysis.opportunities.weakTargets &&
      analysis.opportunities.weakTargets.length > 0
    ) {
      // Pick from strategically identified weak targets
      const weakTarget = MathHelper.getRandomItem(analysis.opportunities.weakTargets);
      targetId = weakTarget.id;
    } else {
      // Fall back to opinion-based targeting
      let response = await CountryService.getCountriesSortedByRanking({
        gameId: game.id,
        rankingType: RankingType.OPINION,
        countryId: country.id,
        country,
        game,
      });

      if (response.error) {
        return;
      }

      // Optimize: Filter and reverse in single operation, limit results
      const opinionRanking = response.data.opinions
        .filter(
          (c) => !country.hasFriendlyRelations(c.id) && !country.isAtWarWith(c.id)
        )
        .reverse();

      let max = opinionRanking.length < 10 ? opinionRanking.length : 10;

      // Optimize: Build possibleTargets directly from slice
      const possibleTargets = opinionRanking.slice(0, max).map((c) => c.id);

      if (!possibleTargets.length) {
        return;
      }

      targetId = MathHelper.getRandomItem(possibleTargets);
    }

    // Optimize: Create Map for O(1) country lookup
    const countriesById = new Map<string, Country>();
    for (const c of game.countries) {
      countriesById.set(c.id, c);
    }
    const target = countriesById.get(targetId);

    if (!target) {
      return;
    }

    // Don't attack countries already at war
    if (target.inWarWith.length) {
      return;
    }

    const response = await CountryService.getWarSimulation({
      attacker: country.name,
      target: target.name,
      gameId: game.id,
      game,
    });

    if (response.error) {
      return;
    }

    const attackersTotalMP =
      response.data.simulation.totals.attackers.militaryPower.totals.total;
    const victimsTotalMP =
      response.data.simulation.totals.victims.militaryPower.totals.total;

    // NEW: Require stronger advantage before attacking (60% instead of 40%)
    // This prevents AI from making risky attacks
    if (MathHelper.getDiffPercentage(attackersTotalMP, victimsTotalMP) < 60) {
      return;
    }

    country.actions.push({
      type: ActionType.DECLARE_WAR,
      data: {
        targetId,
        callToWar: [country.allies.map((ally) => ally.name)],
      },
    });
  }
}

type GenerateActionsParam = {
  country: Country;
  game: Game;
};

type RunDecisionsParam = {
  country: Country;
  game: Game;
};

type ChangeFocusParam = {
  country: Country;
};

type ImproveProvincesParam = {
  country: Country;
};

type ShopParam = {
  country: Country;
};

type RequestAllyParam = {
  country: Country;
  game: Game;
};

type SendInsultParam = {
  country: Country;
  game: Game;
};

type DeclareWarParam = {
  country: Country;
  game: Game;
};
