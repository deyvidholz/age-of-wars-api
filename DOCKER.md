# Docker Setup Guide

## Overview

This project uses Docker Compose to orchestrate three services:
- **PostgreSQL**: Database
- **API**: Node.js/TypeScript backend
- **Webapp**: Vue.js frontend

## Quick Reference

### Starting the Application

```bash
# Start in detached mode
./start.sh up -d

# Start and view logs
./start.sh up

# Rebuild and start
./start.sh up --build
```

### Managing Containers

```bash
# Stop all services
./start.sh down

# View logs
./start.sh logs -f

# View specific service logs
./start.sh logs api -f

# Restart services
./start.sh restart

# Rebuild specific service
./start.sh build api
```

## Environment Modes

### Development Mode

Set in `.env`:
```
NODE_ENV=development
```

**Characteristics:**
- Source code mounted as volumes (hot reload)
- API runs with nodemon for auto-restart
- Webapp runs with Vue dev server
- Faster development cycle
- Larger container size

**What happens:**
- `docker-compose.yml` + `docker-compose.override.yml` are loaded
- Volume mounts enable live code changes without rebuilding
- Development commands are used

### Production Mode

Set in `.env`:
```
NODE_ENV=production
```

**Characteristics:**
- No source code volumes
- TypeScript compiled to JavaScript
- Vue app built and minified
- Optimized for performance
- Smaller bundle sizes

**What happens:**
- Only `docker-compose.yml` is loaded (override is skipped)
- Code is built into the container during image build
- Production commands are used

## File Structure

```
.
├── docker-compose.yml          # Base configuration (production defaults)
├── docker-compose.override.yml # Development overrides (auto-loaded in dev)
├── Dockerfile.api              # API container build instructions
├── Dockerfile.webapp           # Webapp container build instructions (multi-stage)
├── start.sh                    # Wrapper script for environment detection
└── .env                        # Environment variables (controls NODE_ENV)
```

## How It Works

### The `start.sh` Script

The script:
1. Reads `NODE_ENV` from `.env`
2. For **production**: runs `docker-compose -f docker-compose.yml` (skips override)
3. For **development**: runs `docker-compose` (auto-loads override)

### Docker Compose Files

**docker-compose.yml**
- Production-ready base configuration
- No volume mounts for source code
- Runs build and start commands
- Used in both dev and prod

**docker-compose.override.yml**
- Automatically loaded in development mode
- Adds volume mounts for hot reload
- Overrides commands to use dev servers
- Skipped in production mode

## Best Practices

### Switching Between Modes

```bash
# 1. Stop current containers
./start.sh down

# 2. Edit .env and change NODE_ENV
# NODE_ENV=development  or  NODE_ENV=production

# 3. Rebuild if switching to production or first time
./start.sh build

# 4. Start with new mode
./start.sh up -d
```

### When to Rebuild

Rebuild when:
- Switching from development to production
- Changing dependencies in package.json
- Modifying Dockerfile
- First time setup

```bash
./start.sh build
./start.sh up -d
```

### Cleaning Up

```bash
# Stop and remove containers
./start.sh down

# Remove volumes (WARNING: deletes database data)
./start.sh down -v

# Remove images
docker rmi age-of-wars-api age-of-wars-webapp

# Complete cleanup
./start.sh down -v
docker system prune -a
```

## Troubleshooting

### Containers won't start

```bash
# Check container status
docker ps -a

# View logs
./start.sh logs

# Rebuild from scratch
./start.sh down
./start.sh build --no-cache
./start.sh up
```

### Port already in use

Edit `.env` and change ports:
```
PORT=3001  # API port
POSTGRES_PORT=5432  # Database port
```

Webapp port is configured in `docker-compose.yml`:
```yaml
ports:
  - '8081:8080'  # host:container
```

### Hot reload not working in development

1. Ensure `NODE_ENV=development` in `.env`
2. Verify `docker-compose.override.yml` exists
3. Check volume mounts are present:
```bash
docker inspect aow-api | grep -A 10 Mounts
```

### API build fails in production

Check TypeScript compilation:
```bash
./start.sh logs api
```

Common fixes:
- Ensure `@types/node` version is compatible
- Check `tsconfig.json` configuration
- Verify all imports are correct

## Configuration

### Webapp API URLs

The webapp needs to know where to connect to the API. This is configured via environment files in the `webapp/` directory:

**webapp/.env.development**
```bash
VUE_APP_API_URL=http://localhost:3001
VUE_APP_SOCKET_URL=ws://localhost:3001
```

**webapp/.env.production**
```bash
VUE_APP_API_URL=http://localhost:3001
VUE_APP_SOCKET_URL=ws://localhost:3001
```

These files are loaded by Vue CLI during the build process and the values are baked into the JavaScript bundle.

**For local testing:** Both development and production use localhost URLs (default)

**For actual production deployment:** Edit `webapp/.env.production`:
```bash
VUE_APP_API_URL=https://your-domain.com/api
VUE_APP_SOCKET_URL=wss://your-domain.com/api
```

After changing these files, rebuild the webapp:
```bash
./start.sh build webapp
./start.sh up -d
```

## Advanced Usage

### Running specific services

```bash
# Start only database and API
./start.sh up -d postgres api

# Start only webapp (requires API to be running)
./start.sh up -d webapp
```

### Accessing containers

```bash
# Execute command in container
docker exec -it aow-api sh

# Access database
docker exec -it aow-postgres psql -U aow -d aow
```

### Environment variables

All environment variables are in `.env` at the project root:
- Database credentials
- API configuration
- Game settings
- NODE_ENV (controls dev/prod mode)

To override in docker-compose.yml:
```yaml
environment:
  - CUSTOM_VAR=value
```
