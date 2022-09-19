import { Config } from '../constants/constants';

export const getProducts = () => {
  return fetch(`${Config.baseUrl}/ingredients`, {
    method: 'GET',
    headers: Config.headers,
  })
    .then((res) => requestHandler(res))
}

export const addOrders = (ingredients) => {
  return fetch(`${Config.baseUrl}/orders`, {
    method: 'POST',
    headers: Config.headers,
    body: JSON.stringify(
      { ingredients }
    ),
  })
    .then((res) => requestHandler(res))
}

const requestHandler = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status)
}

export const signUp = ({ email, password, name }) => {
  return fetch(`${Config.baseUrl}/auth/register`, {
    method: 'POST',
    headers: Config.headers,
    body: JSON.stringify(
      { email, password, name }
    ),
  })
    .then((res) => requestHandler(res))
}

export const signIn = ({ login, password }) => {
  return fetch(`${Config.baseUrl}/auth`, {
    method: 'POST',
    headers: Config.headers,
    body: JSON.stringify(
      { login, password }
    ),
  })
    .then((res) => requestHandler(res))
}

export const forgotPassword = (value) => {
  return fetch(`${Config.baseUrl}/password-reset`, {
    method: 'POST',
    headers: Config.headers,
    body: JSON.stringify(
      { email: value }
    ),
  })
    .then((res) => requestHandler(res))
}

export const resetPassword = ({ password, token }) => {
  return fetch(`${Config.baseUrl}/password-reset/reset`, {
    method: 'POST',
    headers: Config.headers,
    body: JSON.stringify(
      { password, token }
    ),
  })
    .then((res) => requestHandler(res))
}