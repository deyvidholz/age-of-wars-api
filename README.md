<h1 align="center"> 
	🗺️ Age of Wars 🗺️
</h1>

<h1 align="center">
  <img alt="In game" src="https://raw.githubusercontent.com/deyvidholz/age-of-wars-frontend/main/screenshots/declaring-war.png?raw=true" />
</h1>

# 📝 Quick Start

- Use `docker-compose up` to set up the database.
- Go to `.env` file and change the database connection information.
- Use `yarn` to install dependencies.
- Use `yarn serve` to start the project (development mode).

# 📜 Description

Age of Wars is a single/multiplayer strategy game that uses `Node`, `Vue` and `Socket.io`.
You start by choosing a country and then you can conquer all the world or make your country
the richest/strongest.

There are currently 149 countries available to play with.

# ➕ Installation / Requirements

These tecnologies listed below are required to run the project properly:

- Docker
- Node (tested with Node v14.17)
- Yarn

In order to install the dependencies, use `yarn`.

# 🔨 Setting up PostgreSQL database

Start docker then use `docker-compose up` to set up the database.
You can access the database using `pgAdmin` by accessing the app url and the port configured in `.env` file.

# 🚀 Running the app (development mode)

After install the dependencies and set up the database, you can run the app by running `yarn serve`

# 🖼️ Game Images

<h2 align="center"> 
	Left Sidebar (Player Actions)
</h2>

<h1 align="center">
  <img alt="Player Actions" src="https://github.com/deyvidholz/age-of-wars-frontend/blob/main/screenshots/left-sidebar.png?raw=true" />
</h1>

<h2 align="center"> 
	Right Sidebar (Target Info)
</h2>

<h1 align="center">
  <img alt="Target Information" src="https://github.com/deyvidholz/age-of-wars-frontend/blob/main/screenshots/right-sidebar.png?raw=true" />
</h1>

<h2 align="center"> 
	Province Info
</h2>

<h1 align="center">
  <img alt="Province Information Card" src="https://github.com/deyvidholz/age-of-wars-frontend/blob/main/screenshots/province-info.png?raw=true" />
</h1>

<h2 align="center"> 
	Rankings
</h2>

<h1 align="center">
  <img alt="Economy Ranking" src="https://github.com/deyvidholz/age-of-wars-frontend/blob/main/screenshots/economy-ranking.png?raw=true" />
</h1>

<h1 align="center">
  <img alt="Military Ranking" src="https://github.com/deyvidholz/age-of-wars-frontend/blob/main/screenshots/military-ranking.png?raw=true" />
</h1>

<h2 align="center"> 
	Focus
</h2>

<h1 align="center">
  <img alt="Focus Card" src="https://github.com/deyvidholz/age-of-wars-frontend/blob/main/screenshots/focus.png?raw=true" />
</h1>

<h2 align="center"> 
	Declare War
</h2>

<h1 align="center">
  <img alt="Relations Card - Declare War" src="https://github.com/deyvidholz/age-of-wars-frontend/blob/main/screenshots/declaring-war.png?raw=true" />
</h1>

<h2 align="center"> 
	Send Ally Request
</h2>

<h1 align="center">
  <img alt="Send Ally Request" src="https://github.com/deyvidholz/age-of-wars-frontend/blob/main/screenshots/sending-ally-request.png?raw=true" />
</h1>

<h2 align="center"> 
	Provinces conquered
</h2>

<h1 align="center">
  <img alt="Provinces Conquered" src="https://github.com/deyvidholz/age-of-wars-frontend/blob/main/screenshots/provinces-conquered.jpeg?raw=true" />
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

- [ ] Improve code quality, reduce duplicated code
- [ ] Add factories and usage for oil
- [ ] Add Missions
- [ ] Add Pathways (AI)
- [ ] Add Game Event Log
- [ ] Add Cheats (Console)
- [ ] Add Send Resources action
- [ ] Add Sound Effects
