import { getProductsRequest, addOrdersRequest, getOrderRequest, getUserOrderRequest } from '../../utils/api';
export const GET_PRODUCTS_REQUEST = 'GET_PRODUCTS_REQUEST';
export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';
export const GET_PRODUCTS_FAILED = 'GET_PRODUCTS_FAILED';

export const INCREASE_INGREDIENT = 'INCREASE_INGREDIENT';
export const DECREASE_INGREDIENT = 'DECREASE_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const UPDATE_CONSTRUCTOR = 'UPDATE_CONSTRUCTOR';

export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILED = 'CREATE_ORDER_FAILED';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

export const GET_USER_ORDER_REQUEST = 'GET_USER_ORDER_REQUEST';
export const GET_USER_ORDER_SUCCESS = 'GET_USER_ORDER_SUCCESS';
export const GET_USER_ORDER_FAILED = 'GET_USER_ORDER_FAILED';



export const getIngredients = () => {
  return function (dispatch) {
    dispatch({
      type: GET_PRODUCTS_REQUEST,
    });
    getProductsRequest()
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_PRODUCTS_SUCCESS,
            items: res.data,
          });
        } else {
          dispatch({
            type: GET_PRODUCTS_FAILED,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: GET_PRODUCTS_FAILED,
        });
      });
  };
};

export const getOrder = (id) => {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    getOrderRequest(id)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_ORDER_SUCCESS,
            order: res.orders[0],
          });
        } else {
          dispatch({
            type: GET_ORDER_FAILED,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: GET_ORDER_FAILED,
        });
      });
  };
};

export const getUserOrder = (id) => {
  return function (dispatch) {
    dispatch({
      type: GET_USER_ORDER_REQUEST,
    });
    getUserOrderRequest(id)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_USER_ORDER_SUCCESS,
            order: res.orders[0],
          });
        } else {
          dispatch({
            type: GET_USER_ORDER_FAILED,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: GET_ORDER_FAILED,
        });
      });
  };
};

export const createOrder = (ingredientsId) => {
  return function (dispatch) {
    dispatch({
      type: CREATE_ORDER_REQUEST,
    });
    addOrdersRequest(ingredientsId)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: CREATE_ORDER_SUCCESS,
            order: res,
          });
        } else {
          dispatch({
            type: CREATE_ORDER_FAILED,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: CREATE_ORDER_FAILED,
        });
      });
  };
};
