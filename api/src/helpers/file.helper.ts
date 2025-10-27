import fs from 'fs';
import path from 'path';

export class FileHelper {
  static readFile(filePath: string, convertToJSON?: boolean): string {
    const buffer = fs.readFileSync(filePath, 'utf-8');

    if (convertToJSON) {
      return JSON.parse(buffer);
    }

    return buffer;
  }

  static getPathJoined(pathString: string) {
    return path.join(...pathString.split('/'));
  }
}
