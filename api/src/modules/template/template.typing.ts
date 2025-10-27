/**
 * Template Data Structure
 * Contains customizable game starting conditions
 *
 * Note: Templates use user-friendly property names (money, development)
 * which are converted to the internal format (balance, levels) when applied
 */
export type TemplateCountryData = {
  name: string;
  army?: {
    divisions?: number;
    tanks?: number;
    aircrafts?: number;
    warships?: number;
  };
  economy?: {
    balance?: number; // Changed from 'money' to match Country entity
  };
  provinces?: TemplateProvinceData[];
};

export type TemplateProvinceData = {
  mapRef: string; // Changed from 'id' to match Province type
  levels?: { // Changed from 'development' to match Province type
    production?: number;
    taxation?: number;
  };
  oilProduction?: number;
};

export type TemplateData = {
  countries: TemplateCountryData[];
};
