import fs from 'fs';
import path from 'path';
import { focuses, focusesConfig } from '../data/templates/focuses.template';
import {
  personalities,
  personalitiesConfig,
} from '../data/templates/personalities.template';

export class TemplateHelper {
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

    const filePath = path.join(__dirname, '..', 'data', 'json');

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
    const filePath = path.join(__dirname, '..', 'data', 'json', fileName);
    const buffer = fs.readFileSync(filePath, 'utf-8');

    return JSON.parse(buffer);
  }
}
