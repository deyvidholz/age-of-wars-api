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

## 🐳 Using Docker (Recommended)

The easiest way to run the entire application with all services:

### Quick Start
```bash
# 1. Copy the example env file
cp .env.example .env

# 2. Edit .env and set NODE_ENV to either 'development' or 'production'
# NODE_ENV=development  # For development with hot reload
# NODE_ENV=production   # For optimized production build

# 3. Start the application
./start.sh up -d

# View logs
./start.sh logs -f

# Stop the application
./start.sh down
```

### Development vs Production

**Development Mode** (`NODE_ENV=development`):
- Hot reload enabled for both API and webapp
- Source code is mounted as volumes for instant updates
- Runs with nodemon and Vue dev server
- Not optimized for performance

**Production Mode** (`NODE_ENV=production`):
- Optimized builds (TypeScript compiled, Vue minified)
- No volume mounts - code is built into the container
- Better performance and smaller bundle sizes
- Production-ready

**Simply change NODE_ENV in `.env` and restart!**

**Access the application:**
- Webapp: http://localhost:8081
- API: http://localhost:3001
- PostgreSQL: localhost:5432

**Note:** The `start.sh` script automatically detects NODE_ENV from `.env` and configures Docker Compose accordingly. All environment variables are centralized in the root `.env` file.

### Configuring API URLs

The webapp's API and Socket.io URLs are configured via environment files in `webapp/`:
- **webapp/.env.development** - Used when NODE_ENV=development
- **webapp/.env.production** - Used when NODE_ENV=production

These files are loaded automatically by Vue CLI during the build process. By default, both point to `localhost:3001` for local testing. For production deployment, edit `webapp/.env.production`:

```bash
VUE_APP_API_URL=https://your-production-domain.com/api
VUE_APP_SOCKET_URL=wss://your-production-domain.com/api
```

## 📦 Manual Setup (Without Docker)

### API Setup
1. Navigate to `api/` directory and use `npm install` to install dependencies
2. Configure `.env` file in the root directory with your database connection information
3. Start PostgreSQL (see database setup section below)
4. Use `npm run dev` to start the API server (development mode)

### Webapp Setup
1. Navigate to `webapp/` directory and use `npm install` to install dependencies
2. Configure API URLs in `webapp/.env.development` or `webapp/.env.production`:
   ```bash
   VUE_APP_API_URL=http://localhost:3001
   VUE_APP_SOCKET_URL=ws://localhost:3001
   ```
3. Use `npm run dev` to start the webapp (development mode)
4. For production build: `npm run build`

The webapp uses Vue CLI's environment system to configure URLs at build time based on NODE_ENV.

# ➕ Installation / Requirements

## Using Docker (Recommended)
- Docker (latest version)
- Docker Compose (latest version)

## Manual Installation
- Docker (for PostgreSQL database only)
- Node (tested with Node v14.17)
- NPM (tested with v6.14+)

### API Installation
Navigate to `api/` directory and run `npm install` to install dependencies.

### Webapp Installation
Navigate to `webapp/` directory and run `npm install` to install dependencies.

# 🔨 Setting up PostgreSQL database

## Using Docker Compose
The database is automatically set up when you run `docker-compose up` at the root level.

If you want to run only the database:
```bash
docker-compose up postgres
```

You can access the database using `pgAdmin` by accessing the app url and the port configured in `.env` file (default: 5434).

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
