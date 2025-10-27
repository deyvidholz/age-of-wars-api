import {
  ErrorResponse,
  ResponseHelper,
  SuccessResponse,
} from '../../helpers/response.helper';
import { Country } from '../country/country.entity';
import { Province } from '../country/country.typing';
import { Game } from '../game/game.entity';
import { gameRepository } from '../game/game.repository';
import { commands } from './commands.config';
import { AvailableGiveResources, ResourceOrder } from './console.typing';

export class ConsoleService {
  static async give(data: GiveParam): Promise<SuccessResponse | ErrorResponse> {
    let { game, target } = data;
    const { order, notify } = data;

    if (!order.items.length) {
      return;
    }

    if (typeof game === 'string') {
      game = await gameRepository().findOne(game as string, {
        relations: ['countries'],
      });
    }

    if (!game) {
      return ResponseHelper.error({
        message: 'Game not found',
        data: { game },
      });
    }

    if (typeof target === 'string') {
      target = game.countries.find(
        (country) =>
          country.id === target ||
          country.name.toLowerCase() === (target as string).toLowerCase()
      );
    }

    if (!target) {
      return ResponseHelper.error({
        message: 'Target not found',
        data: { target },
      });
    }

    let provinces: Province[] = [];
    const hasProvinces = order.items.some(
      (item) => item.type === AvailableGiveResources.PROVINCE
    );

    if (hasProvinces) {
      provinces.push(...game.getAllProvinces());

      if (!provinces.length) {
        return ResponseHelper.error({
          message: 'There are no provinces available for this game',
        });
      }
    }

    // Will be used only if "notify" is true
    let messageDescription: string = '<ul>';

    for (const item of order.items) {
      item.amount = +item.amount;
      item.price = +item.price;

      if (!item.amount && !item.provinceMapRef) {
        continue;
      }

      switch (item.type) {
        case AvailableGiveResources.MONEY:
          target.economy.balance += item.amount;
          messageDescription = `${messageDescription}<li>$${item.amount}</li>`;
          break;

        case AvailableGiveResources.OIL:
          target.resources.oil += item.amount;
          messageDescription = `${messageDescription}<li>${item.amount} oil</li>`;

          break;

        case AvailableGiveResources.PROVINCE:
          const isProvinceOwner = target.provinces.find(
            (province) => province.mapRef === item.provinceMapRef
          );

          if (isProvinceOwner) {
            break;
          }

          const province = provinces.find(
            (p) => p.mapRef === item.provinceMapRef
          );

          const currentOwner = game.countries.find(
            (country) => country.id === province.owner
          );

          // Removing province from currentOwner
          const currentOwnerProvinceIndex = currentOwner.provinces.findIndex(
            (province) => province.mapRef === item.provinceMapRef
          );

          if (currentOwnerProvinceIndex !== -1) {
            currentOwner.provinces.splice(currentOwnerProvinceIndex, 1);
          }

          // Giving province to target
          target.provinces.push(province);
          messageDescription = `${messageDescription}<li>Province "${province.name}" 
            with development of ${province.levels.production} Production/${province.levels.taxation}Taxation</li>`;
          break;
      }
    }

    messageDescription = `${messageDescription}</ul>`;

    if (notify) {
      const from = data.from ? data.from : 'CONSOLE';

      target.messages.push({
        title: `${from} gave you something!`,
        description: messageDescription,
        stage: game.stageCount + 2,
      });
    }

    await gameRepository().save(game);

    return ResponseHelper.success({
      message: 'Executed',
    });
  }

  static async executeCommand(
    data: ExecuteCommandParam
  ): Promise<SuccessResponse | ErrorResponse> {
    const splittedValue = data.command.trim().toLowerCase().split(' ');
    const input = splittedValue[0];
    const inputArgs = splittedValue.slice(1);
    const command = commands[input];

    if (!command) {
      return ResponseHelper.success({
        message: `Unknown command "${input}"`,
        data: { isError: true },
      });
    }

    const expectedArgsCount = command.args.filter((arg) => arg.required).length;

    if (inputArgs.length < expectedArgsCount) {
      return ResponseHelper.success({
        message: `Command "${input}" expects ${expectedArgsCount} args, received ${inputArgs.length}`,
        data: { isError: true, example: command.example },
      });
    }

    let args: { [key: string]: any } = {};

    // Checking validation and args
    for (const index in command.args) {
      const arg = command.args[index];

      if (!arg.validation) {
        continue;
      }

      let value = inputArgs[index];
      const isValid = arg.validation(value);

      if (!isValid) {
        return ResponseHelper.success({
          message: `Invalid value "${value}" for argument "${arg.name}"`,
          data: { isError: true, example: command.example },
        });
      }

      if (arg.handlers && arg.handlers.length) {
        for (const handler of arg.handlers) {
          value = handler(value);
        }
      }

      args[arg.name] = value;
    }

    const game = await gameRepository().findOne(data.gameId as string, {
      relations: ['countries'],
    });

    if (game.owner.id !== data.playerId) {
      return ResponseHelper.success({
        message: 'Access denied',
        data: {
          isError: true,
        },
      });
    }

    if (!game.options.allowCheats) {
      return ResponseHelper.success({
        message: 'Cheats are disabled',
        data: {
          isError: true,
        },
      });
    }

    if (['add', 'subtract'].includes(input)) {
      try {
        const response = await ConsoleService.give({
          game,
          target: args.countryName,
          order: {
            items: [{ type: args.resource.toUpperCase(), amount: args.qty }],
          },
        });

        return ResponseHelper.success({
          message: response.message || 'Executed',
          data: {
            isError: false,
          },
        });
      } catch (error) {
        return ResponseHelper.success({
          message: error.message || 'An error occurred',
          data: {
            isError: true,
            example: command.example,
          },
        });
      }
    }
  }
}

type GiveParam = {
  game: Game | string;
  target: Country | string;
  order: ResourceOrder;
  from?: string;
  notify?: boolean;
};

type ExecuteCommandParam = {
  gameId: string;
  playerId: string;
  command: string;
};
