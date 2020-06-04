import axios from 'axios';

import createClient from './createClient';

const client = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  timeout: Number(process.env.REACT_APP_API_CLIENT_TIMEOUT || 1000),
});

/**
 * Sets token to client's Authorisation header
 *
 * @param {string} token - api bearer token
 */
export function setToken(token: string) {
  client.defaults.headers = {
    Authorisation: `Bearer ${token}`,
  };
}

export default createClient(client);
