import * as jwt from 'jsonwebtoken';
import { Player } from '../modules/player/player.entity';

export class GeneralHelper {
  static getStringAsScreamingSnakeCase(str: string): string {
    return str.toUpperCase().replace(/\s/g, '_').replace(/'/g, '');
  }

  static isNumeric(value: any) {
    return typeof value === 'number' && !isNaN(value);
  }

  static jwtDecode(token: string): Player {
    return jwt.decode(token) as Player;
  }
}
