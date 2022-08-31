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