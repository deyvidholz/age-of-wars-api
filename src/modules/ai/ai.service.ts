import 'dotenv/config';
import {
  CountryPassiveType,
  CountryPassiveValueType,
} from '../../data/templates/country-passives.template';
import { Focus, focuses } from '../../data/templates/focuses.template';
import { PersonalityType } from '../../data/templates/personalities.template';
import { MathHelper } from '../../helpers/math.helper';
import { ErrorResponse, SuccessResponse } from '../../helpers/response.helper';
import { ActionType } from '../action/action.typing';
import { Country } from '../country/country.entity';
import { CountryService } from '../country/country.service';
import {
  CountrySimplified,
  Province,
  ProvinceLevels,
  RankingType,
} from '../country/country.typing';
import { Game } from '../game/game.entity';
import { ShopService } from '../shop/shop.service';
import { Item, ItemType, Order, OrderItem } from '../shop/shop.typing';
import { AiHelper } from './ai.helper';

export class AiService {
  static async generateActions(data: GenerateActionsParam) {
    const { country, game } = data;

    const possibleActions = AiHelper.generateActionTypes({
      country,
      gameStageCount: game.stageCount,
    });

    for (const actionType of possibleActions) {
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

    // Changing focus*

    // Improving provinces*

    // Buying army*

    // Buying resources*

    // Declaring war

    // Improving relations*

    // Requesting ally*

    // Accepting alliance

    // Accepting peace request

    // if (country.actions.length) {
    //   console.log(`${country.name} actions (${country.actions.length}):`);
    //   console.log(country.actions);
    //   console.log('');
    // }
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
    let maxProvincesImprovementPerStg: number =
      +process.env.MAX_PROVINCES_IMPROVEMENT_PER_STG;
    const provinces = [...country.provinces];
    const mapRefs: { mapRef: string; isCapital: boolean }[] = [];

    for (let i = 0; i < maxProvincesImprovementPerStg; i++) {
      if (!provinces.length) {
        continue;
      }

      if (MathHelper.chanceOf(60)) {
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

    let availableMoneyToSpend = country.economy.balance;

    if (country.actions.length) {
      const shopActions = country.actions.filter(
        (action) => action.type === ActionType.SHOP
      );

      for (const shopAction of shopActions) {
        const response = await ShopService.getOrderPrice({
          items: shopAction.data.order.items,
          countryId: country.id,
          country,
        });

        if (response.error) {
          continue;
        }

        availableMoneyToSpend -= response.data.totalPrice;
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
    const inDemandItems: ItemType[] = [];
    let availableItems: ItemType[] = [
      ItemType.AIRCRAFTS,
      ItemType.DIVISIONS,
      ItemType.TANKS,
      ItemType.WARSHIPS,
    ];

    const max = {
      AIRCRAFTS: 50,
      DIVISIONS: 50,
      TANKS: 50,
      WARSHIPS: 50,
    };

    const armyTypes = Object.keys(country.army);

    for (const armyType of armyTypes) {
      if (country.army[armyType] < 5) {
        inDemandItems.push(ItemType[armyType.toUpperCase()]);
      }
    }

    if (inDemandItems.length) {
      availableItems = [...inDemandItems];
    }

    const passiveTypes = [
      CountryPassiveType.AI_INCREASE_BUY_DIVISIONS_CHANCE,
      CountryPassiveType.AI_INCREASE_BUY_TANKS_CHANCE,
      CountryPassiveType.AI_INCREASE_BUY_AIRCRAFTS_CHANCE,
      CountryPassiveType.AI_INCREASE_BUY_WARSHIPS_CHANCE,
    ];

    const passives = country.passives.filter((passive) =>
      passiveTypes.includes(passive.type)
    );
    const itemTypesByPassive: ItemType[] = [];

    for (const passive of passives) {
      if (!passive.data || !passive.data.itemType) {
        throw new Error(
          'Invalid passive itemType. Not property itemType found in passive data'
        );
      }

      if (passive.valueType === CountryPassiveValueType.PERCENT) {
        console.log(
          'Warning: PERCENT passive valueTypes are not accepted to this passiveType, the percentage will be converted to STATIC',
          { country: country.getCountrySimplifiedData(), passive }
        );
      }

      itemTypesByPassive.push(
        ...new Array(passive.value).fill(passive.data.itemType.toUpperCase())
      );
    }

    let hasEnoughMoney: boolean = true;
    let availabeMoneyToSpend = country.economy.balance;

    if (country.actions.length) {
      let improveProvincesActions = country.actions.filter(
        (action) => action.type === ActionType.IMPROVE_PROVINCES
      );

      for (const improveProvincesAction of improveProvincesActions) {
        const response = await ShopService.getProvincesImprovementPrice({
          countryId: country.id,
          provincesToImprove: [
            ...improveProvincesAction.data.provincesToImprove,
          ],
          country,
        });

        if (!response.error) {
          availabeMoneyToSpend -= response.data.totalPrice;
        }
      }
    }

    if (availabeMoneyToSpend < 1) {
      hasEnoughMoney = false;
    }

    const order: Order = {
      items: [],
    };

    while (hasEnoughMoney && availableItems.length) {
      let randomItemType = MathHelper.getRandomItem(availableItems);
      let item: OrderItem = order.items.find(
        (item) => item.itemType === randomItemType
      );

      if (!item) {
        item = {
          itemType: randomItemType,
          qty: 0,
        };

        order.items.push(item);
      }

      item.qty++;

      if (item.qty >= max[randomItemType]) {
        let index = availableItems.indexOf(randomItemType);
        availableItems.splice(index, 1);
      }

      const response = await ShopService.getOrderPrice({
        items: order.items,
        country,
      });

      if (response.error) {
        hasEnoughMoney = false;
      }

      if (response.data.totalPrice > country.economy.balance) {
        hasEnoughMoney = false;
      }
    }

    for (const item of order.items) {
      country.actions.push({
        type: ActionType.SHOP,
        data: { order: { items: [item] } },
      });
    }
  }

  static async requestAlly(data: RequestAllyParam) {
    const { country, game } = data;
    const possibleTargets: {
      country: CountrySimplified;
      opinionValue: number;
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

    // Getting the first 10 countries with best opinion
    const availableCountries = game.countries.filter(
      (c) => c.id !== country.id && !country.hasFriendlyRelations(c.id, false)
    );
    let max = availableCountries.length < 10 ? availableCountries.length : 10;

    for (let i = 0; i < max; i++) {
      const target = availableCountries.find(
        (country) => country.id === opinionRanking[i].id
      );

      if (!target) {
        return;
      }

      let maxAiAlliesAllowed: number = +process.env.MAX_AI_ALLIES_ALLOWED;

      if (target.allies.length >= maxAiAlliesAllowed) {
        return;
      }

      possibleTargets.push({
        country: target.getCountrySimplifiedData(),
        opinionValue: opinionRanking[i].opinionValue,
      });
    }

    const randomTarget = MathHelper.getRandomItem(possibleTargets);
    const chance = randomTarget.opinionValue / 20;

    if (!MathHelper.chanceOf(chance)) {
      return;
    }

    country.actions.push({
      type: ActionType.REQUEST_ALLY,
      data: {
        targetId: randomTarget.country.id,
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

    const possibleTargets: string[] = [];
    const opinionRanking = response.data.opinions
      .filter(
        (c) => !country.hasFriendlyRelations(c.id) && !country.isAtWarWith(c.id)
      )
      .reverse();

    let max = opinionRanking.length < 10 ? opinionRanking.length : 10;

    for (let i = 0; i < max; i++) {
      possibleTargets.push(opinionRanking[i].id);
    }

    const targetId: string = MathHelper.getRandomItem(possibleTargets);
    const target = game.countries.find((target) => target.id === targetId);

    if (!target) {
      return;
    }

    response = await CountryService.getWarSimulation({
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

    if (MathHelper.getDiffPercentage(attackersTotalMP, victimsTotalMP) < 40) {
      return;
    }

    country.actions.push({
      type: ActionType.DECLARE_WAR,
      data: {
        targetId,
        callToWar: [
          // country.allies.map((ally) => ally.name)
        ],
      },
    });
  }
}

type GenerateActionsParam = {
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
