import queryString from 'query-string';
import { omitBy, startsWith, isUndefined } from 'lodash';

import config from '../config';

export default function handledFetch(path, options) {
  return fetch(path, options)
    .then((res) => {
      if (res.status >= 400) {
        const err = new Error('Bad response from server');
        err.status = res.status;
        const contentType = res.headers.get('content-type');

        if (startsWith(contentType, 'application/json')) {
          return res.json()
            .then((content) => {
              err.content = content;
              throw err;
            });
        }

        return res.text()
          .then((content) => {
            err.content = content;
            throw err;
          });
      }
      return res;
    });
}

export function apiFetch(path, options = {}) {
  let qs = '';
  const isFormData = options.body instanceof FormData;
  if (typeof options.body === 'object' && !isFormData) {
    options.body = JSON.stringify(options.body);
  }

  if (options.query) {
    const query = omitBy(options.query, isUndefined);
    qs = `?${queryString.stringify(query)}`;
  }
  options = Object.assign({ credentials: 'include' }, options);
  if (!isFormData) {
    options.headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    }
  }
  return handledFetch(`${config.API_URL}${path}${qs}`, options)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
      return true;
    });
}
