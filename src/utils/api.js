// src/utils/api.js

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

const getHeaders = () => {
  const headers = {};
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('mayoora_admin_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return headers;
};

// Generic fetch wrapper
const request = async (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint}`;
  
  // Set headers
  const headers = {
    ...getHeaders(),
    ...options.headers,
  };

  let body = options.body;

  // If the body is a plain object, stringify it and set Content-Type to JSON.
  // If it's FormData, let the browser set Content-Type automatically (needed for multipart boundaries).
  if (body && !(body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
    body = JSON.stringify(body);
  }

  const response = await fetch(url, {
    ...options,
    headers,
    body,
  });

  if (!response.ok) {
    let errMsg = `Request failed: ${response.status} ${response.statusText}`;
    try {
      const data = await response.json();
      errMsg = data.message || errMsg;
    } catch (e) {}
    throw new Error(errMsg);
  }

  return response.json();
};

export const api = {
  auth: {
    login: async (username, password) => {
      const res = await request('/auth/login', {
        method: 'POST',
        body: { username, password }
      });
      if (res.token) {
        localStorage.setItem('mayoora_admin_token', res.token);
      }
      return res;
    },
    verify: async () => {
      return request('/auth/verify', { method: 'GET' });
    },
    logout: () => {
      localStorage.removeItem('mayoora_admin_token');
    },
    checkAuth: () => {
      if (typeof window === 'undefined') return false;
      return !!localStorage.getItem('mayoora_admin_token');
    }
  },
  products: {
    getAll: () => request('/products'),
    create: (payload) => request('/products', {
      method: 'POST',
      body: payload
    }),
    update: (id, payload) => request(`/products/${id}`, {
      method: 'PUT',
      body: payload
    }),
    delete: (id) => request(`/products/${id}`, {
      method: 'DELETE'
    })
  },
  categories: {
    getAll: () => request('/categories'),
    create: (payload) => request('/categories', {
      method: 'POST',
      body: payload
    }),
    update: (slug, payload) => request(`/categories/${slug}`, {
      method: 'PUT',
      body: payload
    }),
    delete: (slug) => request(`/categories/${slug}`, {
      method: 'DELETE'
    })
  },
  offers: {
    getAll: () => request('/offers'),
    create: (payload) => request('/offers', {
      method: 'POST',
      body: payload
    }),
    update: (id, payload) => request(`/offers/${id}`, {
      method: 'PUT',
      body: payload
    }),
    delete: (id) => request(`/offers/${id}`, {
      method: 'DELETE'
    })
  },
  promoPopup: {
    get: () => request('/promo-popup'),
    update: (payload) => request('/promo-popup', {
      method: 'PUT',
      body: payload
    })
  },
  gallery: {
    getAll: () => request('/gallery'),
    create: (payload) => request('/gallery', {
      method: 'POST',
      body: payload
    }),
    delete: (id) => request(`/gallery/${id}`, {
      method: 'DELETE'
    })
  }
};
