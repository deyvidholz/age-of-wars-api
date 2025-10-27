import { PersonalityType } from '../../data/templates/personalities.template';
import { Country } from '../country/country.entity';
import { Game } from '../game/game.entity';

/**
 * AI Strategy Helper - Provides intelligent decision-making for AI countries
 * This helps AI make smarter decisions based on game state analysis
 */
export class AiStrategyHelper {
  /**
   * Analyzes the current strategic situation for an AI country
   */
  static analyzeStrategicSituation(country: Country, game: Game): StrategicAnalysis {
    const threats = this.assessThreats(country, game);
    const opportunities = this.assessOpportunities(country, game);
    const economicHealth = this.assessEconomicHealth(country);
    const militaryStrength = this.assessMilitaryStrength(country, game);
    const diplomaticPosition = this.assessDiplomaticPosition(country, game);

    return {
      threats,
      opportunities,
      economicHealth,
      militaryStrength,
      diplomaticPosition,
      recommendedStrategy: this.determineStrategy(
        threats,
        opportunities,
        economicHealth,
        militaryStrength,
        country
      ),
    };
  }

  /**
   * Assess threats to the country
   */
  private static assessThreats(country: Country, game: Game): ThreatAssessment {
    const activeWars = country.inWarWith.length;
    const hasCoalitionAgainst = game.coalitions.some(
      (c) => c.against.id === country.id && !c.isOver
    );

    // Check for hostile neighbors (high aggression, negative opinion)
    const hostileNeighbors = game.countries.filter((c) => {
      if (c.id === country.id) return false;
      const opinion = c.opinions[country.name];
      return opinion && opinion.value < -100 && c.aggressiveness.current > 150;
    });

    // Calculate total hostile military power
    let hostileMilitaryPower = 0;
    for (const hostile of hostileNeighbors) {
      hostileMilitaryPower += hostile.militaryPower?.total || 0;
    }

    const threatLevel = this.calculateThreatLevel(
      activeWars,
      hasCoalitionAgainst,
      hostileNeighbors.length,
      hostileMilitaryPower,
      country.militaryPower?.total || 0
    );

    return {
      level: threatLevel,
      activeWars,
      hasCoalitionAgainst,
      hostileNeighborsCount: hostileNeighbors.length,
      hostileMilitaryPower,
      isUnderThreat: threatLevel >= ThreatLevel.MEDIUM,
    };
  }

  /**
   * Calculate threat level based on multiple factors
   */
  private static calculateThreatLevel(
    activeWars: number,
    hasCoalition: boolean,
    hostileCount: number,
    hostileMP: number,
    ownMP: number
  ): ThreatLevel {
    if (hasCoalition || activeWars >= 2) return ThreatLevel.CRITICAL;
    if (activeWars === 1 || (hostileCount >= 3 && hostileMP > ownMP * 1.5))
      return ThreatLevel.HIGH;
    if (hostileCount >= 2 || hostileMP > ownMP) return ThreatLevel.MEDIUM;
    if (hostileCount >= 1) return ThreatLevel.LOW;
    return ThreatLevel.NONE;
  }

  /**
   * Assess expansion and diplomatic opportunities
   */
  private static assessOpportunities(country: Country, game: Game): OpportunityAssessment {
    // Find weak neighbors that can be conquered
    const weakTargets: Country[] = [];
    const potentialAllies: Country[] = [];

    for (const target of game.countries) {
      if (target.id === country.id) continue;
      if (country.hasFriendlyRelations(target.id)) continue;

      const targetMP = target.militaryPower?.total || 0;
      const ownMP = country.militaryPower?.total || 0;

      // Weak target if we have 2x their military power
      if (ownMP > targetMP * 2 && !target.inWarWith.length) {
        weakTargets.push(target);
      }

      // Potential ally if similar strength and positive opinion
      const opinion = country.getOpinionOf(target.name);
      if (
        opinion.value > 50 &&
        !country.allies.some((a) => a.id === target.id) &&
        country.allies.length < 3
      ) {
        potentialAllies.push(target);
      }
    }

    return {
      weakTargets: weakTargets.slice(0, 3), // Top 3 weak targets
      potentialAllies: potentialAllies.slice(0, 3),
      canExpand: weakTargets.length > 0 && country.inWarWith.length === 0,
    };
  }

  /**
   * Assess economic health
   */
  private static assessEconomicHealth(country: Country): EconomicHealth {
    const balance = country.economy.balance;
    const incoming = country.incoming.balance;
    const provinces = country.provinces.length;

    // Calculate average income per province
    const incomePerProvince = provinces > 0 ? incoming / provinces : 0;

    let status: 'excellent' | 'good' | 'struggling' | 'poor';
    if (balance > 50000 && incoming > 5000) status = 'excellent';
    else if (balance > 20000 && incoming > 2000) status = 'good';
    else if (balance > 5000 && incoming > 500) status = 'struggling';
    else status = 'poor';

    return {
      balance,
      incoming,
      status,
      incomePerProvince,
      canAffordArmy: balance > 10000,
      shouldFocusEconomy: status === 'poor' || status === 'struggling',
    };
  }

  /**
   * Assess military strength relative to others
   */
  private static assessMilitaryStrength(country: Country, game: Game): MilitaryStrength {
    const ownMP = country.militaryPower?.total || 0;

    // Calculate average military power of all countries
    let totalMP = 0;
    for (const c of game.countries) {
      totalMP += c.militaryPower?.total || 0;
    }
    const averageMP = game.countries.length > 0 ? totalMP / game.countries.length : 0;

    let status: 'dominant' | 'strong' | 'average' | 'weak';
    if (ownMP > averageMP * 2) status = 'dominant';
    else if (ownMP > averageMP * 1.3) status = 'strong';
    else if (ownMP > averageMP * 0.7) status = 'average';
    else status = 'weak';

    return {
      total: ownMP,
      status,
      relativeToAverage: averageMP > 0 ? ownMP / averageMP : 1,
      needsReinforcement: status === 'weak' || status === 'average',
    };
  }

  /**
   * Assess diplomatic position
   */
  private static assessDiplomaticPosition(country: Country, game: Game): DiplomaticPosition {
    const alliesCount = country.allies.length;
    const enemiesCount = country.enemies.length;
    const isIsolated = alliesCount === 0 && enemiesCount >= 2;

    // Count countries with positive opinion
    let friendlyCount = 0;
    for (const target of game.countries) {
      if (target.id === country.id) continue;
      const opinion = target.opinions[country.name];
      if (opinion && opinion.value > 50) friendlyCount++;
    }

    return {
      alliesCount,
      enemiesCount,
      friendlyCount,
      isIsolated,
      needsAllies: alliesCount < 2 && !isIsolated,
    };
  }

  /**
   * Determine recommended strategy based on analysis
   */
  private static determineStrategy(
    threats: ThreatAssessment,
    opportunities: OpportunityAssessment,
    economicHealth: EconomicHealth,
    militaryStrength: MilitaryStrength,
    country: Country
  ): RecommendedStrategy {
    // CRITICAL THREAT - Full defense mode
    if (threats.level === ThreatLevel.CRITICAL) {
      return {
        priority: 'SURVIVAL',
        focus: 'defensive',
        budgetAllocation: {
          military: 0.8,
          economy: 0.15,
          diplomacy: 0.05,
        },
        actions: ['build_army', 'seek_allies', 'defensive_focus'],
      };
    }

    // HIGH THREAT - Defensive priority
    if (threats.level === ThreatLevel.HIGH || threats.isUnderThreat) {
      return {
        priority: 'DEFENSE',
        focus: 'defensive',
        budgetAllocation: {
          military: 0.6,
          economy: 0.3,
          diplomacy: 0.1,
        },
        actions: ['build_army', 'improve_economy', 'seek_peace'],
      };
    }

    // WEAK MILITARY - Build up
    if (militaryStrength.needsReinforcement) {
      return {
        priority: 'MILITARY_BUILDUP',
        focus: 'balanced',
        budgetAllocation: {
          military: 0.5,
          economy: 0.4,
          diplomacy: 0.1,
        },
        actions: ['build_army', 'improve_economy', 'maintain_peace'],
      };
    }

    // POOR ECONOMY - Economic focus
    if (economicHealth.shouldFocusEconomy) {
      return {
        priority: 'ECONOMIC_GROWTH',
        focus: 'economic',
        budgetAllocation: {
          military: 0.2,
          economy: 0.7,
          diplomacy: 0.1,
        },
        actions: ['improve_economy', 'maintain_peace', 'trade'],
      };
    }

    // PACIFIC PERSONALITY - Peaceful expansion
    if (country.personality.type === PersonalityType.PACIFIC) {
      return {
        priority: 'PEACEFUL_GROWTH',
        focus: 'economic',
        budgetAllocation: {
          military: 0.3,
          economy: 0.5,
          diplomacy: 0.2,
        },
        actions: ['improve_economy', 'seek_allies', 'build_moderate_army'],
      };
    }

    // AGGRESSIVE + STRONG - Expansion mode
    if (
      militaryStrength.status === 'dominant' &&
      opportunities.canExpand &&
      country.aggressiveness.current < 300
    ) {
      return {
        priority: 'EXPANSION',
        focus: 'aggressive',
        budgetAllocation: {
          military: 0.5,
          economy: 0.4,
          diplomacy: 0.1,
        },
        actions: ['build_army', 'declare_war', 'expand_territory'],
      };
    }

    // DEFAULT - Balanced growth
    return {
      priority: 'BALANCED_GROWTH',
      focus: 'balanced',
      budgetAllocation: {
        military: 0.4,
        economy: 0.5,
        diplomacy: 0.1,
      },
      actions: ['improve_economy', 'build_army', 'maintain_alliances'],
    };
  }

  /**
   * Calculate smart budget allocation
   */
  static calculateBudgetAllocation(
    country: Country,
    strategy: RecommendedStrategy
  ): BudgetAllocation {
    const totalBudget = country.economy.balance;

    // Reserve emergency fund (10% of balance, minimum 5000)
    const emergencyFund = Math.max(totalBudget * 0.1, 5000);
    const availableBudget = Math.max(0, totalBudget - emergencyFund);

    return {
      military: Math.floor(availableBudget * strategy.budgetAllocation.military),
      economy: Math.floor(availableBudget * strategy.budgetAllocation.economy),
      diplomacy: Math.floor(availableBudget * strategy.budgetAllocation.diplomacy),
      reserve: emergencyFund,
    };
  }
}

// Type definitions

export enum ThreatLevel {
  NONE = 0,
  LOW = 1,
  MEDIUM = 2,
  HIGH = 3,
  CRITICAL = 4,
}

export interface ThreatAssessment {
  level: ThreatLevel;
  activeWars: number;
  hasCoalitionAgainst: boolean;
  hostileNeighborsCount: number;
  hostileMilitaryPower: number;
  isUnderThreat: boolean;
}

export interface OpportunityAssessment {
  weakTargets: Country[];
  potentialAllies: Country[];
  canExpand: boolean;
}

export interface EconomicHealth {
  balance: number;
  incoming: number;
  status: 'excellent' | 'good' | 'struggling' | 'poor';
  incomePerProvince: number;
  canAffordArmy: boolean;
  shouldFocusEconomy: boolean;
}

export interface MilitaryStrength {
  total: number;
  status: 'dominant' | 'strong' | 'average' | 'weak';
  relativeToAverage: number;
  needsReinforcement: boolean;
}

export interface DiplomaticPosition {
  alliesCount: number;
  enemiesCount: number;
  friendlyCount: number;
  isIsolated: boolean;
  needsAllies: boolean;
}

export interface RecommendedStrategy {
  priority: string;
  focus: 'aggressive' | 'defensive' | 'economic' | 'balanced';
  budgetAllocation: {
    military: number; // Percentage (0-1)
    economy: number;
    diplomacy: number;
  };
  actions: string[];
}

export interface StrategicAnalysis {
  threats: ThreatAssessment;
  opportunities: OpportunityAssessment;
  economicHealth: EconomicHealth;
  militaryStrength: MilitaryStrength;
  diplomaticPosition: DiplomaticPosition;
  recommendedStrategy: RecommendedStrategy;
}

export interface BudgetAllocation {
  military: number; // Absolute amount
  economy: number;
  diplomacy: number;
  reserve: number;
}
