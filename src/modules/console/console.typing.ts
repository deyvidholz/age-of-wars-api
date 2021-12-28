export enum AvailableGiveResources {
  MONEY = 'MONEY',
  OIL = 'OIL',
  PROVINCE = 'PROVINCE',
}

export type ResourceOrder = {
  items: ResourceItem[];
};

export type ResourceItem = {
  type: AvailableGiveResources;
  provinceMapRef?: string;
  amount?: number;
  price?: number;
};

export type Command = {
  [key: string]: {
    args: CommandArg[];
    example?: string;
    executorMethod: string;
  };
};

export type CommandArg = {
  name: string;
  as: any;
  required?: boolean;
  validation?: CommandArgValidation;
  handlers?: CommandArgHandler[];
};

export type CommandArgValidation = (value?: string) => boolean;

export type CommandArgHandler = (value?: string) => any;
