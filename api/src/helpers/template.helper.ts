import fs from 'fs';
import path from 'path';
import { focuses, focusesConfig } from '../data/templates/focuses.template';
import {
  personalities,
  personalitiesConfig,
} from '../data/templates/personalities.template';
import { countriesWorldAOWV1 } from '../data/v1/countries.data';
import { V1CountryHelper } from './v1-countries.helper';
import {
  TemplateCountryData,
  TemplateData,
  TemplateProvinceData,
} from '../modules/template/template.typing';

export class TemplateHelper {
  private static getProjectRoot(): string {
    // If running from dist/, go up two levels to project root; otherwise, go up two levels from src/helpers/
    const isRunningFromDist = __dirname.includes('/dist');
    return isRunningFromDist
      ? path.join(__dirname, '..', '..')
      : path.join(__dirname, '..', '..');
  }

  static saveTemplatesToJSON(): any[] {
    const data = [];
    const templates = [
      {
        config: focusesConfig,
        data: focuses,
      },
      {
        config: personalitiesConfig,
        data: personalities,
      },
    ];

    const projectRoot = this.getProjectRoot();
    const filePath = path.join(projectRoot, 'src', 'data', 'json');

    // Ensure directory exists
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath, { recursive: true });
    }

    for (const template of templates) {
      data[template.config.propertyName] = template.data;
      fs.writeFileSync(
        path.join(filePath, template.config.fileName),
        JSON.stringify(template.data, null, '\t')
      );
    }

    return data;
  }

  static readJSONTemplate(fileName: string): any {
    const projectRoot = this.getProjectRoot();
    const filePath = path.join(projectRoot, 'src', 'data', 'json', fileName);
    const buffer = fs.readFileSync(filePath, 'utf-8');

    return JSON.parse(buffer);
  }

  /**
   * Converts base game data to template format
   * This provides users with a starting point for creating templates
   */
  static getBaseGameDataAsTemplate(): TemplateData {
    const countriesPrepared =
      V1CountryHelper.getPreparedCountries(countriesWorldAOWV1);

    const templateCountries: TemplateCountryData[] = countriesPrepared.map(
      (country) => {
        // Convert provinces to template format
        const templateProvinces: TemplateProvinceData[] = country.provinces.map(
          (province) => ({
            mapRef: province.mapRef,
            levels: {
              production: province.levels.production,
              taxation: province.levels.taxation,
            },
            oilProduction: province.oilProduction,
          })
        );

        return {
          name: country.name,
          army: {
            divisions: country.army.divisions,
            tanks: country.army.tanks,
            aircrafts: country.army.aircrafts,
            warships: country.army.warships,
          },
          economy: {
            balance: country.economy.balance,
          },
          provinces: templateProvinces,
        };
      }
    );

    return {
      countries: templateCountries,
    };
  }
}
