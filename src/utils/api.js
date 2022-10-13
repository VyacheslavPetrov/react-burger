import { Config } from '../constants/constants';
import { getCookie, setCookie } from './utils';

export const getProductsRequest = () => {
  return fetch(`${Config.baseUrl}/ingredients`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: Config.headers,
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  }).then((res) => requestHandler(res));
};

export const getUserRequest = () => {
  return fetchWithRefreshToken(`${Config.baseUrl}/auth/user`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      ...Config.headers,
      Authorization: 'Bearer ' + getCookie('token'),
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  })
};

export const addOrdersRequest = (ingredients) => {
  return fetch(`${Config.baseUrl}/orders`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      ...Config.baseUrl.headers,
      Authorization: 'Bearer ' + getCookie('token'),
    },
    body: JSON.stringify(
      { ingredients }
    ),
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  })
    .then((res) => requestHandler(res))
}

const requestHandler = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status)
}

export const signUpRequest = ({ email, password, name }) => {
  return fetch(`${Config.baseUrl}/auth/register`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: Config.headers,
    body: JSON.stringify(
      { email, password, name }
    ),
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  })
    .then((res) => requestHandler(res))
}

export const signInRequest = ({ login, password }) => {
  return fetch(`${Config.baseUrl}/auth/login`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: Config.headers,
    body: JSON.stringify(
      { email: login, password }
    ),
  })
    .then((res) => requestHandler(res))
}

export const forgotPasswordRequest = (email) => {
  return fetch(`${Config.baseUrl}/password-reset`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: Config.headers,
    body: JSON.stringify(
      { email: email }
    ),
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  })
    .then((res) => requestHandler(res))
}

export const resetPasswordRequest = ({ password, token }) => {
  return fetch(`${Config.baseUrl}/password-reset/reset`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: Config.headers,
    body: JSON.stringify({ password, token }),
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  }).then((res) => requestHandler(res));
};

export const signOutRequest = () => {
  return fetch(`${Config.baseUrl}/auth/logout`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: Config.headers,
    body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  }).then((res) => requestHandler(res));
};

export const updateUserRequest = (data) => {
  return fetchWithRefreshToken(`${Config.baseUrl}/auth/user`, {
    method: 'PATCH',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      ...Config.headers,
      Authorization: 'Bearer ' + getCookie('token'),
    },
    body: JSON.stringify(data),
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  })
};

export const refreshTokenRequest = () => {
  return fetch(`${Config.baseUrl}/auth/token`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: Config.headers,
    body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
  }).then((res) => requestHandler(res));
};

const fetchWithRefreshToken = (url, options) => {
  return fetch(url, options).then((res) => requestHandler(res))
    .catch((res) => {
      return res.json()
        .then(err => {
          if (err.message === 'jwt expired') {
            return refreshTokenRequest()
              .then(res => {
                localStorage.setItem('refreshToken', res.refreshToken)
                const authToken = res.accessToken.split('Bearer ')[1];
                setCookie('token', authToken);
                options.headers.Authorization = res.accessToken
                return fetch(url, options).then((res) => requestHandler(res))
              })
          } else {
            return Promise.reject(err)
          }
        })
    })
}
