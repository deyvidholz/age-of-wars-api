/**
 * Serialization Helper - Safely serializes objects for Socket.IO
 * This prevents "Maximum call stack size exceeded" errors caused by circular references
 */
export class SerializationHelper {
  /**
   * Safely serializes an object by converting to JSON and back
   * Uses a circular reference handler to avoid errors
   */
  static toPlainObject<T>(data: T): T {
    try {
      // Use a replacer function to handle circular references
      const seen = new WeakSet();

      const replacer = (key: string, value: any) => {
        // Remove temporary AI properties that contain circular refs
        if (key === '_strategicAnalysis' || key === '_budget') {
          return undefined;
        }

        if (typeof value === 'object' && value !== null) {
          if (seen.has(value)) {
            // Circular reference found, discard key
            return undefined;
          }
          seen.add(value);
        }

        return value;
      };

      const jsonString = JSON.stringify(data, replacer);
      return JSON.parse(jsonString);
    } catch (error) {
      console.error('Serialization error:', error);
      throw new Error(
        `Failed to serialize object: ${error.message}`
      );
    }
  }

  /**
   * Safely serializes game data specifically
   * Handles edge cases with game objects
   */
  static serializeGameData(gameData: any): any {
    return this.toPlainObject(gameData);
  }

  /**
   * Clean up temporary AI properties from countries before serialization
   * This prevents circular references from strategic analysis
   */
  static cleanupAIProperties(game: any): void {
    if (game && game.countries) {
      for (const country of game.countries) {
        delete country._strategicAnalysis;
        delete country._budget;
      }
    }
  }
}
