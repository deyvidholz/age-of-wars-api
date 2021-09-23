import { CountrySimplified } from '../country/country.typing';

export enum GameStage {
  CLOSED = 'CLOSED',
  IN_LOBBY = 'IN_LOBBY',
  PICKING_PHASE = 'PICKING_PHASE',
  RUNNING = 'RUNNING',
}

export type GameOptions = {
  allowCheats: boolean;
  maxPlayers: number;
  blacklistedCountries: string[];
};

export type Coalition = {
  owner: CountrySimplified;
  against: CountrySimplified;
  allies: CountrySimplified[];
};
