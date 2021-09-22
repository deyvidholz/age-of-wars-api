export class GeneralHelper {
  static getStringAsScreamingSnakeCase(str: string): string {
    return str.toUpperCase().replace(/\s/g, '_').replace(/'/g, '');
  }

  static isNumeric(value: any) {
    return typeof value === 'number' && !isNaN(value);
  }
}
