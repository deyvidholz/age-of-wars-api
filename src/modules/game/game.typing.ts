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
