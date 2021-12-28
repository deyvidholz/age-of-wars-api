import { Command } from './console.typing';

const validations = {
  countryName: (value: string) => !!value.match(/\w+/),
  provinceMapRef: (value: string) => !!value.match(/[\w-]+/),
  qty: (value: string) => !!value.match(/\d+/),
  resource: (value: string) => ['money', 'oil'].includes(value.toLowerCase()),
};

/**
 * Handlers will be executed after validation
 */
const handlers = {
  convertToNumber: (value: string) => +value,
  replaceUnderscores: (value: string) => value.replace(/_/g, ' '),
  convertToNegativeNumber: (value: string) => -Math.abs(+value),
};

export const commands: Command = {
  add: {
    executorMethod: 'give',
    example: 'add money united_states 10000',
    args: [
      {
        name: 'resource',
        as: { order: { items: [{ type: null }] } },
        required: true,
        validation: validations.resource,
      },
      {
        name: 'countryName',
        as: { target: null },
        required: true,
        validation: validations.countryName,
        handlers: [handlers.replaceUnderscores],
      },
      {
        name: 'qty',
        as: { target: null },
        required: true,
        validation: validations.qty,

        handlers: [handlers.convertToNumber],
      },
    ],
  },
  subtract: {
    executorMethod: 'give',
    example: 'subtract money united_states 10000',
    args: [
      {
        name: 'resource',
        as: 'order.items.type',
        required: true,
        validation: validations.resource,
      },
      {
        name: 'countryName',
        as: 'target',
        required: true,
        validation: validations.countryName,
        handlers: [handlers.replaceUnderscores],
      },
      {
        name: 'qty',
        as: { order: { items: [{ amount: null }] } },
        required: true,
        validation: validations.qty,
        handlers: [handlers.convertToNumber, handlers.convertToNegativeNumber],
      },
    ],
  },
  // TODO implement
  // 'set-owner': {
  //   example: 'set-owner br-sp japan',
  //   args: [
  //     {
  //       name: 'provinceMapRef',
  //       required: true,
  //       validation: validations.provinceMapRef,
  //     },
  //     {
  //       name: 'countryName',
  //       required: true,
  //       validation: validations.countryName,
  //       handler: handlers.replaceUnderscores,
  //     },
  //   ],
  // },
};
