import Constants from 'expo-constants';

const devUrl = Constants.expoConfig?.extra?.DEV_API_URL;
const prodUrl = Constants.expoConfig?.extra?.PROD_API_URL;

export const API_URL = __DEV__ ? devUrl : prodUrl;