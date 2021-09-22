import { Country } from '../country/country.entity';
import { Province } from '../country/country.typing';
import { Player } from '../player/player.entity';

export enum ActionType {
  CHANGE_FOCUS = 'CHANGE_FOCUS',
  DECLARE_WAR = 'DECLARE_WAR',
  REQUEST_ALLY = 'REQUEST_ALLY',
  ACCEPT_ALLY_REQUEST = 'ACCEPT_ALLY_REQUEST',
  REQUEST_PEACE = 'REQUEST_PEACE',
  ACCEPT_PEACE_REQUEST = 'ACCEPT_PEACE_REQUEST',
  BUY = 'BUY',
  IMPROVE_RELATIONS = 'IMPROVE_RELATIONS',
  SEND_INSULT = 'SEND_INSULT',
  CREATE_COALITION = 'CREATE_COALITION',
  IMPROVE_PROVINCE = 'IMPROVE_PROVINCE',
  NEXT_TURN = 'NEXT_TURN',
  JOIN_WAR = 'JOIN_WAR',
}

export type Action = {
  type: ActionType;
  player?: Player;
  gameId: string;
  country: Country;
  target: Country;
  data: ActionData;
};

export type ActionData = Province[]; // Add Shop Data
