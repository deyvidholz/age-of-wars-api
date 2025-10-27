<h1 align="center">
	🗺️ Age of Wars 🗺️
</h1>

<h1 align="center">
  <img alt="In game" src="https://raw.githubusercontent.com/deyvidholz/age-of-wars-api/main/screenshots/declaring-war.png" />
</h1>

# 📜 Description

Age of Wars is a single/multiplayer strategy game that uses `Node`, `Vue` and `Socket.io`.
You start by choosing a country and then you can conquer all the world or make your country
the richest/strongest.

There are currently 149 countries available to play with.

# 📝 Quick Start

## API Setup
1. Navigate to `api/` directory and use `npm install` to install dependencies
2. Use `docker-compose up` in the `api/` directory to set up the PostgreSQL database
3. Configure `api/.env` file with your database connection information
4. Use `npm run dev` to start the API server (development mode)

## Webapp Setup
1. Navigate to `webapp/` directory and use `npm install` to install dependencies
2. Use `npm run dev` to start the webapp (development mode)

The webapp automatically uses the correct API URL based on the environment:
- **Development**: `http://localhost:3001`
- **Production**: `https://aow.valkeon.com/api`

# ➕ Installation / Requirements

These technologies listed below are required to run the project properly:

- Docker (for PostgreSQL database)
- Node (tested with Node v14.17)
- NPM (tested with v6.14+)

## API Installation
Navigate to `api/` directory and run `npm install` to install dependencies.

## Webapp Installation
Navigate to `webapp/` directory and run `npm install` to install dependencies.

# 🔨 Setting up PostgreSQL database

Start docker then navigate to the `api/` directory and use `docker-compose up` to set up the database.
You can access the database using `pgAdmin` by accessing the app url and the port configured in `api/.env` file.

# 🚀 Running the app (development mode)

After installing the dependencies and setting up the database:

1. **Start the API server**: Navigate to `api/` directory and run `npm run dev`
2. **Start the webapp**: Navigate to `webapp/` directory and run `npm run dev`

# 🏗️ Building for production

## Build the API
Navigate to `api/` directory and run:
```bash
npm run build
npm start
```

The build command will use `.env.production` for production environment variables.

## Build the Webapp
Navigate to `webapp/` directory and run:
```bash
npm run build
```

The production build will automatically use the production API URL (`https://aow.valkeon.com/api`).

# 🖼️ Game Images

<h2 align="center">
	Left Sidebar (Player Actions)
</h2>

<h1 align="center">
  <img alt="Player Actions" src="https://raw.githubusercontent.com/deyvidholz/age-of-wars-api/main/screenshots/left-sidebar.png" />
</h1>

<h2 align="center">
	Right Sidebar (Target Info)
</h2>

<h1 align="center">
  <img alt="Target Information" src="https://raw.githubusercontent.com/deyvidholz/age-of-wars-api/main/screenshots/right-sidebar.png" />
</h1>

<h2 align="center">
	Province Info
</h2>

<h1 align="center">
  <img alt="Province Information Card" src="https://raw.githubusercontent.com/deyvidholz/age-of-wars-api/main/screenshots/province-info.png" />
</h1>

<h2 align="center">
	Rankings
</h2>

<h1 align="center">
  <img alt="Economy Ranking" src="https://raw.githubusercontent.com/deyvidholz/age-of-wars-api/main/screenshots/economy-ranking.png" />
</h1>

<h1 align="center">
  <img alt="Military Ranking" src="https://raw.githubusercontent.com/deyvidholz/age-of-wars-api/main/screenshots/military-ranking.png" />
</h1>

<h2 align="center">
	Focus
</h2>

<h1 align="center">
  <img alt="Focus Card" src="https://raw.githubusercontent.com/deyvidholz/age-of-wars-api/main/screenshots/focus.png" />
</h1>

<h2 align="center">
	Declare War
</h2>

<h1 align="center">
  <img alt="Relations Card - Declare War" src="https://raw.githubusercontent.com/deyvidholz/age-of-wars-api/main/screenshots/declaring-war.png" />
</h1>

<h2 align="center">
	Send Ally Request
</h2>

<h1 align="center">
  <img alt="Send Ally Request" src="https://raw.githubusercontent.com/deyvidholz/age-of-wars-api/main/screenshots/sending-ally-request.png" />
</h1>

<h2 align="center">
	Provinces conquered
</h2>

<h1 align="center">
  <img alt="Provinces Conquered" src="https://raw.githubusercontent.com/deyvidholz/age-of-wars-api/main/screenshots/provinces-conquered.jpeg" />
</h1>

# Glossary

| Term                | Meaning                                                                                                                                               |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Action              | Actions are made by players and bots (AI), an action can be `declare war`, `improve province`, etc                                                    |
| Aggressiveness      | Aggressiveness points show how much aggressive a country is. The more aggressive a country is, more chances of a coalition being created against them |
| Coalition           | A type of alliance created by countries against countries that are too much aggressive                                                                |
| Decisions           | Options for a country to accept or not alliances, demand provinces after win wars, etc                                                                |
| Focus               | Focus gives to your country new passives that can increase your economy incomings or MP                                                               |
| MP (Military Power) | Your country's power in wars. Couting with all your army                                                                                              |
| Passive             | Passives increase or decrease your economy incoming, power, etc                                                                                       |
| Personality         | Define if the countries controlled by AI will be a pacific or aggressive country, making less or more wars                                            |
| Province            | A territory controlled by a country that gives money and produces oil                                                                                 |

# ⚠️ Note

This project still under development, bugs can be faced while playing, however, you can play the game yet.

# To Do

- [ ] Create `.env` file for webapp
- [ ] Improve code quality, reduce duplicated code, add components
- [ ] Add factories and usage for oil
- [ ] Add Missions
- [ ] Add Pathways (AI)
- [ ] Add Game Event Log
