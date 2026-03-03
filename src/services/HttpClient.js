import { API_URL } from '../constants';

class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async request(path, options = {}) {
    const response = await fetch(`${this.baseURL}${path}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    });
    const data = await response.json();
    if (!response.ok && response.status === 500) {
      throw new Error(data.message || 'Server error');
    }
    return data;
  }

  get(path, options = {}) {
    return this.request(path, {
      ...options,
      method: 'GET',
    });
  }

  post(path, body, options = {}) {
    return this.request(path, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    });
  }
}

export const httpClient = new HttpClient(API_URL);
