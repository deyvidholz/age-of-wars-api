import { App } from './app';
import fs from 'fs';
import path from 'path';

// Determine the project root directory
// If running from dist/, go up one level; otherwise, go up one level from src/
const projectRoot = path.join(__dirname, '..');

// Determine which env file to use based on NODE_ENV
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env';
const envPath = path.join(projectRoot, envFile);
const envExamplePath = path.join(projectRoot, '.env.example');

// Create env file from example if it doesn't exist
if (!fs.existsSync(envPath)) {
  console.log(`${envFile} not found, creating from .env.example`);
  fs.copyFileSync(envExamplePath, envPath);
}

const app = new App();

app.start();
