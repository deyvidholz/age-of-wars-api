import { geopoliticalRelationships2025 } from '../data/geopolitical-relationships-2025';
import { CountryV1 } from '../data/v1/countries.data';

/**
 * Geopolitical Update Helper
 *
 * Updates country relationships based on real-world geopolitical data (2025)
 */
export class GeopoliticalUpdateHelper {
  /**
   * Apply geopolitical relationships to countries
   * This updates allies, enemies, and opinions based on current world affairs
   */
  static applyGeopoliticalRelationships(countries: CountryV1[]): CountryV1[] {
    // Create a map for quick country lookup
    const countryMap = new Map<string, CountryV1>();
    for (const country of countries) {
      countryMap.set(country.name, country);
    }

    // Apply relationships
    for (const relationship of geopoliticalRelationships2025) {
      const country = countryMap.get(relationship.country);

      if (!country) {
        console.warn(`Country not found in game data: ${relationship.country}`);
        continue;
      }

      // Update allies
      country.allies = relationship.allies
        .map((allyName) => {
          const ally = countryMap.get(allyName);
          if (ally) {
            return { img: ally.img, name: ally.name };
          }
          return null;
        })
        .filter((ally) => ally !== null);

      // Update enemies
      country.enemies = relationship.enemies
        .map((enemyName) => {
          const enemy = countryMap.get(enemyName);
          if (enemy) {
            return { img: enemy.img, name: enemy.name };
          }
          return null;
        })
        .filter((enemy) => enemy !== null);

      // Update opinions
      country.opinions = relationship.opinions
        .map((opinionData) => {
          const target = countryMap.get(opinionData.name);
          if (target) {
            return {
              name: opinionData.name,
              opinion: opinionData.opinion,
            };
          }
          return null;
        })
        .filter((opinion) => opinion !== null);
    }

    console.log(`✅ Updated geopolitical relationships for ${geopoliticalRelationships2025.length} countries`);

    return countries;
  }

  /**
   * Log statistics about applied relationships
   */
  static logRelationshipStats(countries: CountryV1[]): void {
    let totalAlliances = 0;
    let totalEnemies = 0;
    let totalOpinions = 0;

    for (const country of countries) {
      totalAlliances += country.allies?.length || 0;
      totalEnemies += country.enemies?.length || 0;
      totalOpinions += country.opinions?.length || 0;
    }

    console.log('\n📊 Geopolitical Relationship Statistics:');
    console.log(`   Total alliances: ${totalAlliances}`);
    console.log(`   Total enemy relationships: ${totalEnemies}`);
    console.log(`   Total opinion entries: ${totalOpinions}`);
    console.log(`   Countries with data: ${countries.filter(c => c.opinions?.length > 0).length}\n`);
  }
}
