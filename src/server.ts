import { App } from './app';
import fs from 'fs';
import path from 'path';

const envPath = path.join(__dirname, '..', '.env');
const envExamplePath = path.join(__dirname, '..', '.env.example');

if (!fs.existsSync(envPath)) {
  fs.copyFileSync(envExamplePath, envPath);
}

const app = new App();

app.start();
