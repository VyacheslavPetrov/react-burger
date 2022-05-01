import {Config} from '../constants/constants';

export const getProducts = () => {
    return fetch(`${Config.baseUrl}/ingredients`, {
        method: 'GET',
        headers: Config.headers,
    })
        .then((res) => requestHandler(res))
}

export const createOrders = (ingredients) => {
    return fetch(`${Config.baseUrl}/orders`, {
        method: 'POST',
        headers: Config.headers,
        body: JSON.stringify(
            {ingredients}
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

export const filterArray = (arr) => {
    return arr.reduce((acc, curr) =>
        ({
            ...acc, [curr.type]: [...acc[curr.type] || [], curr]
        }), {})
}

export const getCost = (bun, arrOtherIngredients) => {
    return bun.price * 2 + arrOtherIngredients.reduce((acc, curr) => acc += curr.price, 0)
}