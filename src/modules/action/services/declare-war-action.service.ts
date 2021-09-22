import { Country } from '../../country/country.entity';

type DeclareWarParam = {
  country: Country;
  target: Country;
  callToWar: string[];
  gameId: string;
  gameStageCount: number;
};

export async function declareWarAction(data: DeclareWarParam) {}
