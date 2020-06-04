import client from 'lib/apiClient/api';
import { ENDPOINTS } from 'domain/configuration';
import { Horse } from './types';

export const fetchHorses = client.get<Horse[]>(ENDPOINTS.horses);
export const fetchHorse = client.get<Horse, string>(ENDPOINTS.horses, {
  transformEndpoint: (payload, endpoint) => `${endpoint}/${payload}`,
});
