/**
 * Geopolitical Relationships Data (2025)
 *
 * This file contains realistic geopolitical relationships based on current world affairs.
 * Opinions range from -300 (hostile) to +300 (strong allies)
 *
 * Key Factors Considered:
 * - Military alliances (NATO, CSTO, etc.)
 * - Ongoing conflicts (Russia-Ukraine, Israel-Palestine, etc.)
 * - Trade relationships
 * - Historical rivalries
 * - Current sanctions and diplomatic tensions
 */

export interface GeopoliticalRelationship {
  country: string;
  allies: string[];
  enemies: string[];
  opinions: { name: string; opinion: number }[];
}

/**
 * Geopolitical relationships by country
 * Updated: January 2025
 */
export const geopoliticalRelationships2025: GeopoliticalRelationship[] = [
  // ========== NORTH AMERICA ==========
  {
    country: 'United States',
    allies: ['United Kingdom', 'Canada', 'Japan', 'South Korea', 'Australia', 'Israel', 'France', 'Germany'],
    enemies: ['North Korea', 'Iran'],
    opinions: [
      // NATO Allies - Strong
      { name: 'United Kingdom', opinion: 200 },
      { name: 'Canada', opinion: 200 },
      { name: 'France', opinion: 180 },
      { name: 'Germany', opinion: 180 },
      { name: 'Italy', opinion: 170 },
      { name: 'Spain', opinion: 160 },
      { name: 'Poland', opinion: 180 },
      { name: 'Netherlands', opinion: 170 },
      { name: 'Belgium', opinion: 160 },
      { name: 'Luxembourg', opinion: 150 },
      { name: 'Portugal', opinion: 160 },
      { name: 'Denmark', opinion: 170 },
      { name: 'Norway', opinion: 170 },
      { name: 'Sweden', opinion: 160 },
      { name: 'Finland', opinion: 160 },
      { name: 'Czech Republic', opinion: 165 },
      { name: 'Romania', opinion: 165 },
      { name: 'Bulgaria', opinion: 155 },
      { name: 'Greece', opinion: 155 },
      { name: 'Turkey', opinion: 120 }, // Strained but allies

      // Pacific Allies
      { name: 'Japan', opinion: 200 },
      { name: 'South Korea', opinion: 190 },
      { name: 'Australia', opinion: 190 },
      { name: 'New Zealand', opinion: 170 },
      { name: 'Philippines', opinion: 150 },
      { name: 'Taiwan', opinion: 170 },
      { name: 'Singapore', opinion: 150 },
      { name: 'Thailand', opinion: 140 },

      // Middle East & Strategic
      { name: 'Israel', opinion: 185 },
      { name: 'Saudi Arabia', opinion: 130 },
      { name: 'United Arab Emirates', opinion: 140 },
      { name: 'Qatar', opinion: 130 },
      { name: 'Kuwait', opinion: 140 },
      { name: 'Jordan', opinion: 130 },

      // Americas
      { name: 'Mexico', opinion: 140 },
      { name: 'Brazil', opinion: 120 },
      { name: 'Colombia', opinion: 150 },
      { name: 'Chile', opinion: 140 },
      { name: 'Argentina', opinion: 110 },

      // Adversaries
      { name: 'Russia', opinion: -200 },
      { name: 'China', opinion: -160 },
      { name: 'Iran', opinion: -250 },
      { name: 'North Korea', opinion: -280 },
      { name: 'Syria', opinion: -180 },
      { name: 'Venezuela', opinion: -140 },
      { name: 'Cuba', opinion: -120 },
      { name: 'Nicaragua', opinion: -80 },
      { name: 'Belarus', opinion: -150 },

      // Neutral/Complicated
      { name: 'India', opinion: 150 },
      { name: 'Vietnam', opinion: 120 },
      { name: 'Pakistan', opinion: 40 }, // Complicated relationship
      { name: 'Egypt', opinion: 100 },
      { name: 'Ukraine', opinion: 200 }, // Strong support post-2022
    ]
  },

  {
    country: 'Canada',
    allies: ['United States', 'United Kingdom', 'France', 'Germany'],
    enemies: [],
    opinions: [
      { name: 'United States', opinion: 200 },
      { name: 'United Kingdom', opinion: 190 },
      { name: 'France', opinion: 180 },
      { name: 'Australia', opinion: 170 },
      { name: 'New Zealand', opinion: 160 },
      { name: 'Germany', opinion: 170 },
      { name: 'Netherlands', opinion: 160 },
      { name: 'Ukraine', opinion: 180 },
      { name: 'Russia', opinion: -180 },
      { name: 'China', opinion: -120 },
      { name: 'Iran', opinion: -140 },
      { name: 'North Korea', opinion: -200 },
    ]
  },

  {
    country: 'Mexico',
    allies: [],
    enemies: [],
    opinions: [
      { name: 'United States', opinion: 140 },
      { name: 'Canada', opinion: 130 },
      { name: 'Spain', opinion: 150 },
      { name: 'Guatemala', opinion: 80 },
      { name: 'Belize', opinion: 90 },
      { name: 'Brazil', opinion: 110 },
      { name: 'Argentina', opinion: 100 },
      { name: 'Venezuela', opinion: -40 },
    ]
  },

  // ========== EUROPE ==========
  {
    country: 'United Kingdom',
    allies: ['United States', 'France', 'Germany', 'Canada', 'Australia'],
    enemies: [],
    opinions: [
      { name: 'United States', opinion: 200 },
      { name: 'Canada', opinion: 190 },
      { name: 'Australia', opinion: 185 },
      { name: 'New Zealand', opinion: 180 },
      { name: 'France', opinion: 170 },
      { name: 'Germany', opinion: 175 },
      { name: 'Netherlands', opinion: 170 },
      { name: 'Ireland', opinion: 140 },
      { name: 'Poland', opinion: 165 },
      { name: 'Ukraine', opinion: 190 },
      { name: 'Japan', opinion: 160 },
      { name: 'South Korea', opinion: 155 },
      { name: 'Russia', opinion: -210 },
      { name: 'China', opinion: -140 },
      { name: 'Iran', opinion: -180 },
      { name: 'North Korea', opinion: -220 },
    ]
  },

  {
    country: 'France',
    allies: ['Germany', 'United Kingdom', 'United States', 'Italy', 'Spain'],
    enemies: [],
    opinions: [
      { name: 'Germany', opinion: 200 },
      { name: 'United Kingdom', opinion: 170 },
      { name: 'United States', opinion: 180 },
      { name: 'Italy', opinion: 180 },
      { name: 'Spain', opinion: 175 },
      { name: 'Belgium', opinion: 180 },
      { name: 'Luxembourg', opinion: 185 },
      { name: 'Netherlands', opinion: 175 },
      { name: 'Switzerland', opinion: 160 },
      { name: 'Poland', opinion: 165 },
      { name: 'Ukraine', opinion: 185 },
      { name: 'Canada', opinion: 180 },
      { name: 'Russia', opinion: -190 },
      { name: 'China', opinion: -100 },
      { name: 'Algeria', opinion: 60 },
      { name: 'Mali', opinion: -40 }, // Recent tensions
    ]
  },

  {
    country: 'Germany',
    allies: ['France', 'Poland', 'Netherlands', 'Denmark', 'Austria', 'United States'],
    enemies: [],
    opinions: [
      { name: 'France', opinion: 200 },
      { name: 'Netherlands', opinion: 185 },
      { name: 'Poland', opinion: 175 },
      { name: 'Denmark', opinion: 180 },
      { name: 'Austria', opinion: 180 },
      { name: 'Belgium', opinion: 180 },
      { name: 'Luxembourg', opinion: 175 },
      { name: 'Czech Republic', opinion: 175 },
      { name: 'Italy', opinion: 170 },
      { name: 'United Kingdom', opinion: 175 },
      { name: 'United States', opinion: 180 },
      { name: 'Switzerland', opinion: 170 },
      { name: 'Sweden', opinion: 165 },
      { name: 'Ukraine', opinion: 180 },
      { name: 'Russia', opinion: -180 },
      { name: 'China', opinion: -80 },
    ]
  },

  {
    country: 'Russia',
    allies: ['Belarus', 'China'],
    enemies: ['Ukraine'],
    opinions: [
      // Allies & Partners
      { name: 'Belarus', opinion: 200 },
      { name: 'China', opinion: 170 },
      { name: 'Iran', opinion: 120 },
      { name: 'Syria', opinion: 150 },
      { name: 'North Korea', opinion: 100 },
      { name: 'Venezuela', opinion: 90 },
      { name: 'Cuba', opinion: 80 },
      { name: 'Nicaragua', opinion: 70 },
      { name: 'India', opinion: 100 }, // Historically friendly but strained
      { name: 'Kazakhstan', opinion: 110 },
      { name: 'Tajikistan', opinion: 100 },
      { name: 'Kyrgyzstan', opinion: 95 },
      { name: 'Armenia', opinion: 120 },

      // Adversaries - NATO
      { name: 'Ukraine', opinion: -300 }, // War
      { name: 'United States', opinion: -200 },
      { name: 'United Kingdom', opinion: -210 },
      { name: 'Poland', opinion: -220 },
      { name: 'Estonia', opinion: -200 },
      { name: 'Latvia', opinion: -200 },
      { name: 'Lithuania', opinion: -200 },
      { name: 'France', opinion: -190 },
      { name: 'Germany', opinion: -180 },
      { name: 'Canada', opinion: -180 },
      { name: 'Sweden', opinion: -170 },
      { name: 'Finland', opinion: -180 },
      { name: 'Norway', opinion: -170 },
      { name: 'Denmark', opinion: -160 },
      { name: 'Czech Republic', opinion: -180 },
      { name: 'Romania', opinion: -180 },
      { name: 'Bulgaria', opinion: -160 },

      // Asia-Pacific
      { name: 'Japan', opinion: -140 },
      { name: 'South Korea', opinion: -130 },
      { name: 'Australia', opinion: -150 },

      // Neutral/Complicated
      { name: 'Turkey', opinion: 40 }, // Complicated
      { name: 'Georgia', opinion: -120 },
      { name: 'Azerbaijan', opinion: 60 },
    ]
  },

  {
    country: 'Ukraine',
    allies: ['Poland', 'Lithuania', 'Latvia', 'Estonia', 'United Kingdom'],
    enemies: ['Russia', 'Belarus'],
    opinions: [
      { name: 'Poland', opinion: 200 },
      { name: 'Lithuania', opinion: 195 },
      { name: 'Latvia', opinion: 195 },
      { name: 'Estonia', opinion: 195 },
      { name: 'United Kingdom', opinion: 200 },
      { name: 'United States', opinion: 200 },
      { name: 'Canada', opinion: 190 },
      { name: 'Germany', opinion: 180 },
      { name: 'France', opinion: 185 },
      { name: 'Czech Republic', opinion: 185 },
      { name: 'Romania', opinion: 180 },
      { name: 'Slovakia', opinion: 170 },
      { name: 'Sweden', opinion: 185 },
      { name: 'Finland', opinion: 180 },
      { name: 'Norway', opinion: 185 },
      { name: 'Denmark', opinion: 180 },
      { name: 'Russia', opinion: -300 },
      { name: 'Belarus', opinion: -280 },
    ]
  },

  {
    country: 'Poland',
    allies: ['United States', 'United Kingdom', 'Germany', 'France', 'Ukraine', 'Lithuania'],
    enemies: [],
    opinions: [
      { name: 'United States', opinion: 200 },
      { name: 'United Kingdom', opinion: 190 },
      { name: 'Ukraine', opinion: 200 },
      { name: 'Lithuania', opinion: 190 },
      { name: 'Latvia', opinion: 185 },
      { name: 'Estonia', opinion: 185 },
      { name: 'Germany', opinion: 175 },
      { name: 'France', opinion: 170 },
      { name: 'Czech Republic', opinion: 185 },
      { name: 'Slovakia', opinion: 175 },
      { name: 'Romania', opinion: 175 },
      { name: 'Sweden', opinion: 170 },
      { name: 'Finland', opinion: 165 },
      { name: 'Norway', opinion: 165 },
      { name: 'Russia', opinion: -230 },
      { name: 'Belarus', opinion: -200 },
    ]
  },

  {
    country: 'Spain',
    allies: ['France', 'Portugal', 'Italy', 'Germany'],
    enemies: [],
    opinions: [
      { name: 'Portugal', opinion: 180 },
      { name: 'France', opinion: 175 },
      { name: 'Italy', opinion: 170 },
      { name: 'Germany', opinion: 165 },
      { name: 'United Kingdom', opinion: 150 },
      { name: 'United States', opinion: 160 },
      { name: 'Morocco', opinion: 80 },
      { name: 'Mexico', opinion: 160 },
      { name: 'Argentina', opinion: 150 },
      { name: 'Chile', opinion: 145 },
      { name: 'Colombia', opinion: 140 },
      { name: 'Russia', opinion: -140 },
      { name: 'Ukraine', opinion: 170 },
    ]
  },

  {
    country: 'Italy',
    allies: ['France', 'Germany', 'Spain'],
    enemies: [],
    opinions: [
      { name: 'France', opinion: 180 },
      { name: 'Germany', opinion: 170 },
      { name: 'Spain', opinion: 170 },
      { name: 'Greece', opinion: 140 },
      { name: 'United States', opinion: 170 },
      { name: 'United Kingdom', opinion: 160 },
      { name: 'Switzerland', opinion: 160 },
      { name: 'Austria', opinion: 165 },
      { name: 'Slovenia', opinion: 150 },
      { name: 'Croatia', opinion: 145 },
      { name: 'Ukraine', opinion: 165 },
      { name: 'Russia', opinion: -130 },
    ]
  },

  {
    country: 'Turkey',
    allies: [],
    enemies: [],
    opinions: [
      { name: 'United States', opinion: 80 }, // NATO ally but strained
      { name: 'Germany', opinion: 60 },
      { name: 'United Kingdom', opinion: 70 },
      { name: 'Azerbaijan', opinion: 180 },
      { name: 'Qatar', opinion: 150 },
      { name: 'Russia', opinion: 40 }, // Complicated
      { name: 'Greece', opinion: -120 },
      { name: 'Cyprus', opinion: -140 },
      { name: 'Armenia', opinion: -150 },
      { name: 'Syria', opinion: -160 },
      { name: 'Egypt', opinion: -80 },
      { name: 'Saudi Arabia', opinion: -60 },
    ]
  },

  // ========== ASIA ==========
  {
    country: 'China',
    allies: ['Pakistan', 'Russia', 'North Korea'],
    enemies: [],
    opinions: [
      { name: 'Russia', opinion: 170 },
      { name: 'Pakistan', opinion: 180 },
      { name: 'North Korea', opinion: 120 },
      { name: 'Iran', opinion: 110 },
      { name: 'Cambodia', opinion: 130 },
      { name: 'Laos', opinion: 125 },
      { name: 'Myanmar', opinion: 100 },
      { name: 'Belarus', opinion: 90 },
      { name: 'Venezuela', opinion: 80 },

      // Adversaries
      { name: 'United States', opinion: -180 },
      { name: 'Japan', opinion: -140 },
      { name: 'Taiwan', opinion: -300 },
      { name: 'India', opinion: -160 },
      { name: 'Australia', opinion: -120 },
      { name: 'United Kingdom', opinion: -140 },
      { name: 'South Korea', opinion: -100 },
      { name: 'Philippines', opinion: -130 },
      { name: 'Vietnam', opinion: -110 },

      // Neutral/Trade
      { name: 'Germany', opinion: 40 },
      { name: 'France', opinion: 30 },
      { name: 'Brazil', opinion: 80 },
      { name: 'South Africa', opinion: 90 },
      { name: 'Indonesia', opinion: 60 },
      { name: 'Malaysia', opinion: 70 },
      { name: 'Thailand', opinion: 80 },
      { name: 'Singapore', opinion: 60 },
    ]
  },

  {
    country: 'Japan',
    allies: ['United States', 'Australia', 'South Korea', 'India'],
    enemies: [],
    opinions: [
      { name: 'United States', opinion: 200 },
      { name: 'Australia', opinion: 180 },
      { name: 'South Korea', opinion: 150 }, // Improving but historical tensions
      { name: 'India', opinion: 170 },
      { name: 'United Kingdom', opinion: 165 },
      { name: 'France', opinion: 155 },
      { name: 'Germany', opinion: 160 },
      { name: 'Taiwan', opinion: 140 },
      { name: 'Philippines', opinion: 150 },
      { name: 'Vietnam', opinion: 140 },
      { name: 'Singapore', opinion: 145 },
      { name: 'Thailand', opinion: 140 },
      { name: 'Indonesia', opinion: 130 },

      { name: 'China', opinion: -140 },
      { name: 'Russia', opinion: -140 },
      { name: 'North Korea', opinion: -250 },
    ]
  },

  {
    country: 'South Korea',
    allies: ['United States', 'Japan'],
    enemies: ['North Korea'],
    opinions: [
      { name: 'United States', opinion: 200 },
      { name: 'Japan', opinion: 150 },
      { name: 'Australia', opinion: 165 },
      { name: 'United Kingdom', opinion: 160 },
      { name: 'India', opinion: 140 },
      { name: 'Vietnam', opinion: 135 },
      { name: 'Philippines', opinion: 140 },
      { name: 'Singapore', opinion: 140 },
      { name: 'Thailand', opinion: 135 },

      { name: 'North Korea', opinion: -300 },
      { name: 'China', opinion: -100 },
      { name: 'Russia', opinion: -130 },
    ]
  },

  {
    country: 'North Korea',
    allies: ['China'],
    enemies: ['South Korea', 'United States', 'Japan'],
    opinions: [
      { name: 'China', opinion: 150 },
      { name: 'Russia', opinion: 100 },
      { name: 'Iran', opinion: 80 },
      { name: 'Syria', opinion: 70 },

      { name: 'South Korea', opinion: -300 },
      { name: 'United States', opinion: -280 },
      { name: 'Japan', opinion: -250 },
      { name: 'United Kingdom', opinion: -200 },
      { name: 'Australia', opinion: -180 },
      { name: 'France', opinion: -170 },
      { name: 'Germany', opinion: -170 },
    ]
  },

  {
    country: 'India',
    allies: ['United States', 'Japan', 'France', 'United Kingdom'],
    enemies: [],
    opinions: [
      { name: 'United States', opinion: 170 },
      { name: 'Japan', opinion: 170 },
      { name: 'France', opinion: 175 },
      { name: 'United Kingdom', opinion: 165 },
      { name: 'Australia', opinion: 165 },
      { name: 'Israel', opinion: 160 },
      { name: 'United Arab Emirates', opinion: 150 },
      { name: 'Saudi Arabia', opinion: 140 },
      { name: 'Russia', opinion: 80 }, // Historical ties but strained
      { name: 'Vietnam', opinion: 140 },
      { name: 'Indonesia', opinion: 120 },
      { name: 'Singapore', opinion: 135 },
      { name: 'Bangladesh', opinion: 80 },
      { name: 'Nepal', opinion: 100 },
      { name: 'Bhutan', opinion: 180 },
      { name: 'Sri Lanka', opinion: 90 },

      { name: 'Pakistan', opinion: -250 },
      { name: 'China', opinion: -160 },
    ]
  },

  {
    country: 'Pakistan',
    allies: ['China'],
    enemies: ['India'],
    opinions: [
      { name: 'China', opinion: 200 },
      { name: 'Saudi Arabia', opinion: 160 },
      { name: 'United Arab Emirates', opinion: 150 },
      { name: 'Turkey', opinion: 155 },
      { name: 'Iran', opinion: 80 },
      { name: 'United States', opinion: 40 },
      { name: 'United Kingdom', opinion: 60 },

      { name: 'India', opinion: -250 },
      { name: 'Afghanistan', opinion: -80 },
    ]
  },

  {
    country: 'Taiwan',
    allies: ['United States', 'Japan'],
    enemies: [],
    opinions: [
      { name: 'United States', opinion: 190 },
      { name: 'Japan', opinion: 175 },
      { name: 'South Korea', opinion: 150 },
      { name: 'Australia', opinion: 160 },
      { name: 'United Kingdom', opinion: 155 },
      { name: 'Philippines', opinion: 140 },

      { name: 'China', opinion: -300 },
    ]
  },

  {
    country: 'Australia',
    allies: ['United States', 'United Kingdom', 'New Zealand', 'Japan'],
    enemies: [],
    opinions: [
      { name: 'United States', opinion: 200 },
      { name: 'United Kingdom', opinion: 195 },
      { name: 'New Zealand', opinion: 200 },
      { name: 'Canada', opinion: 185 },
      { name: 'Japan', opinion: 180 },
      { name: 'South Korea', opinion: 170 },
      { name: 'India', opinion: 165 },
      { name: 'Singapore', opinion: 160 },
      { name: 'Indonesia', opinion: 140 },
      { name: 'Philippines', opinion: 150 },
      { name: 'France', opinion: 170 },
      { name: 'Germany', opinion: 165 },

      { name: 'China', opinion: -140 },
      { name: 'Russia', opinion: -160 },
      { name: 'North Korea', opinion: -200 },
    ]
  },

  {
    country: 'Indonesia',
    allies: [],
    enemies: [],
    opinions: [
      { name: 'Malaysia', opinion: 140 },
      { name: 'Singapore', opinion: 120 },
      { name: 'Thailand', opinion: 130 },
      { name: 'Philippines', opinion: 125 },
      { name: 'Australia', opinion: 130 },
      { name: 'Japan', opinion: 130 },
      { name: 'South Korea', opinion: 125 },
      { name: 'United States', opinion: 110 },
      { name: 'China', opinion: 80 },
      { name: 'India', opinion: 120 },
    ]
  },

  {
    country: 'Vietnam',
    allies: [],
    enemies: [],
    opinions: [
      { name: 'United States', opinion: 130 }, // Improved significantly
      { name: 'Japan', opinion: 145 },
      { name: 'South Korea', opinion: 140 },
      { name: 'India', opinion: 145 },
      { name: 'Singapore', opinion: 135 },
      { name: 'Thailand', opinion: 125 },
      { name: 'Philippines', opinion: 120 },
      { name: 'Australia', opinion: 125 },
      { name: 'Russia', opinion: 90 },
      { name: 'China', opinion: -120 }, // South China Sea disputes
    ]
  },

  {
    country: 'Thailand',
    allies: [],
    enemies: [],
    opinions: [
      { name: 'United States', opinion: 140 },
      { name: 'Japan', opinion: 145 },
      { name: 'South Korea', opinion: 135 },
      { name: 'Singapore', opinion: 140 },
      { name: 'Malaysia', opinion: 135 },
      { name: 'Indonesia', opinion: 130 },
      { name: 'Vietnam', opinion: 125 },
      { name: 'China', opinion: 90 },
      { name: 'India', opinion: 125 },
      { name: 'Australia', opinion: 130 },
    ]
  },

  {
    country: 'Singapore',
    allies: [],
    enemies: [],
    opinions: [
      { name: 'United States', opinion: 165 },
      { name: 'United Kingdom', opinion: 155 },
      { name: 'Japan', opinion: 150 },
      { name: 'South Korea', opinion: 145 },
      { name: 'Australia', opinion: 160 },
      { name: 'India', opinion: 145 },
      { name: 'Malaysia', opinion: 120 },
      { name: 'Indonesia', opinion: 120 },
      { name: 'Thailand', opinion: 140 },
      { name: 'Vietnam', opinion: 135 },
      { name: 'China', opinion: 80 },
    ]
  },

  {
    country: 'Philippines',
    allies: ['United States'],
    enemies: [],
    opinions: [
      { name: 'United States', opinion: 170 },
      { name: 'Japan', opinion: 155 },
      { name: 'South Korea', opinion: 145 },
      { name: 'Australia', opinion: 150 },
      { name: 'Singapore', opinion: 135 },
      { name: 'Thailand', opinion: 130 },
      { name: 'Indonesia', opinion: 125 },
      { name: 'Vietnam', opinion: 125 },
      { name: 'China', opinion: -140 }, // South China Sea
    ]
  },

  // ========== MIDDLE EAST ==========
  {
    country: 'Iran',
    allies: ['Syria', 'Russia'],
    enemies: ['Israel', 'Saudi Arabia'],
    opinions: [
      { name: 'Russia', opinion: 140 },
      { name: 'China', opinion: 120 },
      { name: 'Syria', opinion: 180 },
      { name: 'Venezuela', opinion: 90 },
      { name: 'North Korea', opinion: 70 },
      { name: 'Iraq', opinion: 100 },
      { name: 'Lebanon', opinion: 110 },

      { name: 'United States', opinion: -260 },
      { name: 'Israel', opinion: -300 },
      { name: 'Saudi Arabia', opinion: -220 },
      { name: 'United Arab Emirates', opinion: -180 },
      { name: 'Bahrain', opinion: -160 },
      { name: 'United Kingdom', opinion: -190 },
      { name: 'France', opinion: -170 },
      { name: 'Germany', opinion: -150 },
    ]
  },

  {
    country: 'Israel',
    allies: ['United States'],
    enemies: ['Iran'],
    opinions: [
      { name: 'United States', opinion: 200 },
      { name: 'United Kingdom', opinion: 165 },
      { name: 'Germany', opinion: 170 },
      { name: 'France', opinion: 140 },
      { name: 'India', opinion: 160 },
      { name: 'United Arab Emirates', opinion: 140 }, // Abraham Accords
      { name: 'Bahrain', opinion: 130 },
      { name: 'Egypt', opinion: 80 }, // Peace treaty but cool
      { name: 'Jordan', opinion: 90 },
      { name: 'Greece', opinion: 150 },
      { name: 'Cyprus', opinion: 145 },

      { name: 'Iran', opinion: -300 },
      { name: 'Syria', opinion: -280 },
      { name: 'Lebanon', opinion: -200 },
      { name: 'Yemen', opinion: -160 },
    ]
  },

  {
    country: 'Saudi Arabia',
    allies: ['United Arab Emirates', 'United States'],
    enemies: ['Iran'],
    opinions: [
      { name: 'United States', opinion: 150 },
      { name: 'United Arab Emirates', opinion: 190 },
      { name: 'Bahrain', opinion: 180 },
      { name: 'Kuwait', opinion: 175 },
      { name: 'Qatar', opinion: 80 }, // Reconciled but tensions
      { name: 'Oman', opinion: 150 },
      { name: 'Egypt', opinion: 160 },
      { name: 'Jordan', opinion: 155 },
      { name: 'Pakistan', opinion: 160 },
      { name: 'United Kingdom', opinion: 145 },
      { name: 'France', opinion: 140 },

      { name: 'Iran', opinion: -240 },
      { name: 'Yemen', opinion: -150 },
      { name: 'Qatar', opinion: -80 },
      { name: 'Turkey', opinion: -60 },
    ]
  },

  {
    country: 'United Arab Emirates',
    allies: ['Saudi Arabia', 'United States'],
    enemies: [],
    opinions: [
      { name: 'Saudi Arabia', opinion: 190 },
      { name: 'United States', opinion: 160 },
      { name: 'Bahrain', opinion: 175 },
      { name: 'Kuwait', opinion: 170 },
      { name: 'Oman', opinion: 165 },
      { name: 'Egypt', opinion: 155 },
      { name: 'Jordan', opinion: 150 },
      { name: 'United Kingdom', opinion: 155 },
      { name: 'France', opinion: 150 },
      { name: 'India', opinion: 160 },
      { name: 'Israel', opinion: 140 },

      { name: 'Iran', opinion: -200 },
      { name: 'Turkey', opinion: -70 },
      { name: 'Qatar', opinion: 70 },
    ]
  },

  {
    country: 'Turkey',
    allies: ['Azerbaijan', 'Qatar'],
    enemies: [],
    opinions: [
      { name: 'Azerbaijan', opinion: 200 },
      { name: 'Qatar', opinion: 170 },
      { name: 'Pakistan', opinion: 160 },
      { name: 'United States', opinion: 80 },
      { name: 'Russia', opinion: 40 },

      { name: 'Greece', opinion: -130 },
      { name: 'Cyprus', opinion: -150 },
      { name: 'Armenia', opinion: -160 },
      { name: 'Syria', opinion: -170 },
      { name: 'Egypt', opinion: -90 },
      { name: 'Saudi Arabia', opinion: -70 },
      { name: 'United Arab Emirates', opinion: -80 },
    ]
  },

  // ========== SOUTH AMERICA ==========
  {
    country: 'Brazil',
    allies: ['Argentina'],
    enemies: [],
    opinions: [
      { name: 'Argentina', opinion: 160 },
      { name: 'Uruguay', opinion: 150 },
      { name: 'Paraguay', opinion: 140 },
      { name: 'Chile', opinion: 135 },
      { name: 'Colombia', opinion: 130 },
      { name: 'Peru', opinion: 125 },
      { name: 'United States', opinion: 110 },
      { name: 'Portugal', opinion: 170 },
      { name: 'China', opinion: 100 },
      { name: 'Russia', opinion: 70 },
      { name: 'Venezuela', opinion: -40 },
    ]
  },

  {
    country: 'Argentina',
    allies: ['Brazil', 'Chile'],
    enemies: [],
    opinions: [
      { name: 'Brazil', opinion: 160 },
      { name: 'Chile', opinion: 150 },
      { name: 'Uruguay', opinion: 165 },
      { name: 'Paraguay', opinion: 140 },
      { name: 'Spain', opinion: 155 },
      { name: 'Italy', opinion: 145 },
      { name: 'United States', opinion: 100 },
      { name: 'United Kingdom', opinion: -60 }, // Falklands
      { name: 'China', opinion: 90 },
    ]
  },

  {
    country: 'Venezuela',
    allies: ['Cuba', 'Nicaragua'],
    enemies: [],
    opinions: [
      { name: 'Cuba', opinion: 180 },
      { name: 'Nicaragua', opinion: 160 },
      { name: 'Russia', opinion: 140 },
      { name: 'China', opinion: 120 },
      { name: 'Iran', opinion: 100 },
      { name: 'Belarus', opinion: 90 },

      { name: 'United States', opinion: -200 },
      { name: 'Colombia', opinion: -140 },
      { name: 'Brazil', opinion: -60 },
      { name: 'United Kingdom', opinion: -130 },
      { name: 'Canada', opinion: -110 },
    ]
  },

  {
    country: 'Colombia',
    allies: ['United States'],
    enemies: [],
    opinions: [
      { name: 'United States', opinion: 170 },
      { name: 'Brazil', opinion: 130 },
      { name: 'Peru', opinion: 135 },
      { name: 'Ecuador', opinion: 120 },
      { name: 'Chile', opinion: 125 },
      { name: 'Mexico', opinion: 120 },
      { name: 'Spain', opinion: 150 },

      { name: 'Venezuela', opinion: -150 },
      { name: 'Nicaragua', opinion: -80 },
    ]
  },

  {
    country: 'Chile',
    allies: ['Argentina'],
    enemies: [],
    opinions: [
      { name: 'Argentina', opinion: 150 },
      { name: 'Brazil', opinion: 135 },
      { name: 'Peru', opinion: 110 },
      { name: 'Uruguay', opinion: 145 },
      { name: 'United States', opinion: 140 },
      { name: 'Spain', opinion: 145 },
      { name: 'United Kingdom', opinion: 135 },
      { name: 'Germany', opinion: 130 },
    ]
  },

  // ========== AFRICA ==========
  {
    country: 'South Africa',
    allies: [],
    enemies: [],
    opinions: [
      { name: 'Botswana', opinion: 145 },
      { name: 'Namibia', opinion: 140 },
      { name: 'Zimbabwe', opinion: 100 },
      { name: 'Mozambique', opinion: 130 },
      { name: 'United Kingdom', opinion: 110 },
      { name: 'United States', opinion: 115 },
      { name: 'China', opinion: 95 },
      { name: 'Russia', opinion: 80 },
      { name: 'India', opinion: 125 },
      { name: 'Brazil', opinion: 120 },
    ]
  },

  {
    country: 'Egypt',
    allies: [],
    enemies: [],
    opinions: [
      { name: 'Saudi Arabia', opinion: 160 },
      { name: 'United Arab Emirates', opinion: 155 },
      { name: 'Jordan', opinion: 150 },
      { name: 'United States', opinion: 120 },
      { name: 'France', opinion: 110 },
      { name: 'United Kingdom', opinion: 105 },
      { name: 'Russia', opinion: 90 },
      { name: 'Israel', opinion: 60 },
      { name: 'Ethiopia', opinion: -100 }, // Nile dam dispute
      { name: 'Turkey', opinion: -90 },
      { name: 'Qatar', opinion: -70 },
      { name: 'Iran', opinion: -80 },
    ]
  },

  {
    country: 'Ethiopia',
    allies: [],
    enemies: ['Eritrea'],
    opinions: [
      { name: 'Kenya', opinion: 140 },
      { name: 'Djibouti', opinion: 130 },
      { name: 'United States', opinion: 110 },
      { name: 'China', opinion: 120 },

      { name: 'Egypt', opinion: -110 },
      { name: 'Eritrea', opinion: -180 },
      { name: 'Somalia', opinion: -60 },
    ]
  },

  {
    country: 'Nigeria',
    allies: [],
    enemies: [],
    opinions: [
      { name: 'Ghana', opinion: 135 },
      { name: 'Benin', opinion: 125 },
      { name: 'Cameroon', opinion: 110 },
      { name: 'United Kingdom', opinion: 120 },
      { name: 'United States', opinion: 130 },
      { name: 'France', opinion: 90 },
      { name: 'China', opinion: 100 },
    ]
  },

  {
    country: 'Kenya',
    allies: [],
    enemies: [],
    opinions: [
      { name: 'United Kingdom', opinion: 140 },
      { name: 'United States', opinion: 150 },
      { name: 'Ethiopia', opinion: 140 },
      { name: 'Uganda', opinion: 135 },
      { name: 'Tanzania', opinion: 130 },
      { name: 'Rwanda', opinion: 125 },
      { name: 'China', opinion: 95 },
      { name: 'Somalia', opinion: -80 },
    ]
  },
];
