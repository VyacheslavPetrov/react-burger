import { getProductsRequest, addOrdersRequest, getOrderRequest, getUserOrderRequest } from '../../utils/api';
import { TIngredient, TOrderInfo, TOrder, TIngredientWithProductId } from '../../types';
import {
    GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAILED,
    ADD_INGREDIENTS, DELETE_INGREDIENT,
    INCREASE_INGREDIENT, DECREASE_INGREDIENT, UPDATE_CONSTRUCTOR,
    CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAILED,
    GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILED,
    GET_USER_ORDER_REQUEST, GET_USER_ORDER_SUCCESS, GET_USER_ORDER_FAILED,
} from '../constants/ingredients';
import { AppDispatch, AppThunk } from '../../types';


/***/
export interface IGetProdictsRequestAction {
    readonly type: typeof GET_PRODUCTS_REQUEST;
}

export interface IGetProdictsSuccessAction {
    readonly type: typeof GET_PRODUCTS_SUCCESS;
    readonly items: Array<TIngredient>;
}

export interface IGetProdictsFailedAction {
    readonly type: typeof GET_PRODUCTS_FAILED;
}

/***/
export interface IAddIngredientsAction {
    readonly type: typeof ADD_INGREDIENTS;
    readonly item: TIngredientWithProductId
}

export interface IDeleteIngredientAction {
    readonly type: typeof DELETE_INGREDIENT;
    readonly id: string;
}

export interface IIncreaseIngredientAction {
    readonly type: typeof INCREASE_INGREDIENT;
    readonly key: string;
    readonly typeItem: string;
}

export interface IDecreaseIngredientAction {
    readonly type: typeof DECREASE_INGREDIENT;
    readonly key: string,
    readonly typeItem: string,
}

export interface IUpdateOrderAction {
    readonly type: typeof UPDATE_CONSTRUCTOR;
    readonly toIndex: number,
    readonly fromIndex: number,
}

/***/
export interface ICreateOrderRequestAction {
    readonly type: typeof CREATE_ORDER_REQUEST;
}

export interface ICreateOrderSuccessAction {
    readonly type: typeof CREATE_ORDER_SUCCESS;
    readonly order: TOrderInfo;
}

export interface ICreateOrderFailedAction {
    readonly type: typeof CREATE_ORDER_FAILED;
}

/***/
export interface IGetOrderOrderRequestAction {
    readonly type: typeof GET_ORDER_REQUEST;
}

export interface IGetOrderOrderSuccessAction {
    readonly type: typeof GET_ORDER_SUCCESS;
    readonly order: TOrder;
}

export interface IGetOrderOrderFailedAction {
    readonly type: typeof GET_ORDER_FAILED;
}

/***/
export interface IGetUserOrderOrderRequestAction {
    readonly type: typeof GET_USER_ORDER_REQUEST;
}

export interface IGetUserOrderOrderSuccessAction {
    readonly type: typeof GET_USER_ORDER_SUCCESS;
    readonly order: TOrder;
}

export interface IGetUserOrderOrderFailedAction {
    readonly type: typeof GET_USER_ORDER_FAILED;
}

export type TIngredientsActions =
    | IGetProdictsRequestAction
    | IGetProdictsSuccessAction
    | IGetProdictsFailedAction
    | IAddIngredientsAction
    | IDeleteIngredientAction
    | IIncreaseIngredientAction
    | IDecreaseIngredientAction
    | IUpdateOrderAction
    | ICreateOrderRequestAction
    | ICreateOrderSuccessAction
    | ICreateOrderFailedAction
    | IGetOrderOrderRequestAction
    | IGetOrderOrderSuccessAction
    | IGetOrderOrderFailedAction
    | IGetUserOrderOrderRequestAction
    | IGetUserOrderOrderSuccessAction
    | IGetUserOrderOrderFailedAction;


export const getIngredients: AppThunk = () => {
    return function (dispatch: AppDispatch) {
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

export const getOrder: AppThunk = (id: string) => {
    return function (dispatch: AppDispatch) {
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

export const getUserOrder: AppThunk = (id: string) => {
    return function (dispatch: AppDispatch) {
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

export const createOrder: AppThunk = (ingredientsId: Array<string>) => {
    return function (dispatch: AppDispatch) {
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
