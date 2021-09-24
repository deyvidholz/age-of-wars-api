export enum ActionType {
  CHANGE_FOCUS = 'CHANGE_FOCUS',
  DECLARE_WAR = 'DECLARE_WAR',
  REQUEST_ALLY = 'REQUEST_ALLY',
  ACCEPT_ALLY_REQUEST = 'ACCEPT_ALLY_REQUEST',
  REQUEST_PEACE = 'REQUEST_PEACE',
  ACCEPT_PEACE_REQUEST = 'ACCEPT_PEACE_REQUEST',
  SHOP = 'SHOP',
  IMPROVE_RELATIONS = 'IMPROVE_RELATIONS',
  SEND_INSULT = 'SEND_INSULT',
  CREATE_COALITION = 'CREATE_COALITION',
  JOIN_COALITION = 'JOIN_COALITION',
  IMPROVE_PROVINCES = 'IMPROVE_PROVINCES',
  NEXT_TURN = 'NEXT_TURN',
  JOIN_WAR = 'JOIN_WAR',
}

export type Action = {
  type: ActionType;
  playerId?: string;
  gameId: string;
  countryId?: string;
  targetId?: string;
  data: ActionData;
};

export type ActionData = any;
