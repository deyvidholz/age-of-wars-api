// Environment configuration
const isDevelopment = process.env.NODE_ENV === 'development';

// API Configuration
const API_URL = isDevelopment
  ? 'http://localhost:3001'
  : 'https://aow.valkeon.com/api';

const SOCKET_URL = isDevelopment
  ? 'ws://localhost:3001'
  : 'wss://aow.valkeon.com/api';

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
