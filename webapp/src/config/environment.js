// Environment configuration
// These values come from .env.development or .env.production
// Vue CLI automatically loads VUE_APP_* variables and replaces them at build time
const API_URL = process.env.VUE_APP_API_URL || 'http://localhost:3001';
const SOCKET_URL = process.env.VUE_APP_SOCKET_URL || 'ws://localhost:3001';

const isDevelopment = process.env.NODE_ENV === 'development';

export default {
  // Base URLs
  apiUrl: API_URL,
  socketUrl: SOCKET_URL,

  // Static assets paths
  flagsPath: `${API_URL}/imgs/flags`,
  defaultFlag: `${API_URL}/imgs/flags/default.png`,
  provincesPath: `${API_URL}/imgs/provinces/`,
  defaultProvince: `${API_URL}/imgs/provinces/default.jpg`,

  // Environment
  isDevelopment,
  isProduction: !isDevelopment,
};
