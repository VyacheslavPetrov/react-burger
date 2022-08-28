import {Config} from '../constants/constants';
import PropTypes from "prop-types";


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

export const IngredientItems = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number
}