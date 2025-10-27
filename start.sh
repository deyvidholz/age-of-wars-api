#!/bin/bash

# Load NODE_ENV from .env file
if [ -f .env ]; then
  export $(grep "^NODE_ENV=" .env | xargs)
else
  echo "Error: .env file not found"
  exit 1
fi

# Default to development if NODE_ENV is not set
NODE_ENV=${NODE_ENV:-development}

echo "Starting Age of Wars in ${NODE_ENV} mode..."

if [ "$NODE_ENV" = "production" ]; then
  echo "Running in PRODUCTION mode (optimized build, no hot reload)"
  # Only use base docker-compose.yml for production (skips override)
  docker-compose -f docker-compose.yml "$@"
else
  echo "Running in DEVELOPMENT mode (with hot reload)"
  # Uses docker-compose.yml + docker-compose.override.yml automatically
  docker-compose "$@"
fi
