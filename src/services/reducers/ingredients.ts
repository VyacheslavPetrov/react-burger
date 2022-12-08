import {
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILED,
  ADD_INGREDIENTS,
  DELETE_INGREDIENT,
  INCREASE_INGREDIENT,
  DECREASE_INGREDIENT,
  UPDATE_CONSTRUCTOR,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILED,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  GET_USER_ORDER_REQUEST,
  GET_USER_ORDER_SUCCESS,
  GET_USER_ORDER_FAILED,
} from '../constants/ingredients';
import { TIngredient, TBurgerIngredients, TIngredientWithProductId, TOrder, TOrderInfo } from '../../types'
import { TIngredientsActions } from '../actions/ingredients';

export type TIngredientsState = {
  isLoading: boolean;
  hasError: boolean;
  loaded: boolean;
  allIngredients: Array<TIngredient>;
  burgerIngredients: TBurgerIngredients;
  currentOrder: null | TOrder;
  createOrder: null | TOrderInfo;
  orderRequest: boolean;
  orderFailed: boolean
  orderLoaded: boolean
};

export const initialState: TIngredientsState = {
  isLoading: false,
  hasError: false,
  loaded: false,
  allIngredients: [],
  burgerIngredients: {
    bun: null,
    otherIngredients: [],
    counts: {},
  },
  currentOrder: null,
  createOrder: null,
  orderRequest: false,
  orderFailed: false,
  orderLoaded: false
};

export const ingredientsReducer = (state = initialState, action: TIngredientsActions): TIngredientsState => {
  switch (action.type) {
    case GET_PRODUCTS_REQUEST: {
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };
    }
    case GET_PRODUCTS_SUCCESS: {
      return {
        ...state,
        hasError: false,
        allIngredients: action.items,
        isLoading: false,
        loaded: true,
      };
    }
    case GET_PRODUCTS_FAILED: {
      return { ...state, hasError: true, isLoading: false };
    }
    case CREATE_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
        orderFailed: false,
      };
    }
    case CREATE_ORDER_SUCCESS: {
      return {
        ...state,
        orderFailed: false,
        createOrder: action.order,
        orderRequest: false,
        burgerIngredients: {
          bun: null,
          otherIngredients: [],
          counts: {},
        },
      };
    }
    case CREATE_ORDER_FAILED: {
      return { ...state, orderFailed: true, orderRequest: false };
    }

    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
        orderFailed: false,
        orderLoaded: false
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderFailed: false,
        currentOrder: action.order,
        orderRequest: false,
        orderLoaded: true
      };
    }
    case GET_ORDER_FAILED: {
      return { ...state, orderFailed: true, orderRequest: false };
    }

    case GET_USER_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
        orderFailed: false,
        orderLoaded: false
      };
    }
    case GET_USER_ORDER_SUCCESS: {
      const data = action.order ? action.order : null
      return {
        ...state,
        orderFailed: false,
        currentOrder: data,
        orderRequest: false,
        orderLoaded: true
      };
    }
    case GET_USER_ORDER_FAILED: {
      return { ...state, orderFailed: true, orderRequest: false };
    }

    case ADD_INGREDIENTS: {
      const { type } = action.item;
      if (type === 'bun') {
        return {
          ...state,
          burgerIngredients: {
            ...state.burgerIngredients,
            bun: action.item,
          },
        };
      }
      return {
        ...state,
        burgerIngredients: {
          ...state.burgerIngredients,
          otherIngredients: [
            ...state.burgerIngredients.otherIngredients,
            action.item,
          ],
        },
      };
    }
    case DELETE_INGREDIENT: {
      return {
        ...state,
        burgerIngredients: {
          ...state.burgerIngredients,
          otherIngredients: [
            ...state.burgerIngredients.otherIngredients,
          ].filter((el: TIngredientWithProductId) => el.productId !== action.id),
        },
      };
    }
    case INCREASE_INGREDIENT: {
      const { typeItem } = action;
      if (typeItem !== 'bun') {
        return {
          ...state,
          burgerIngredients: {
            ...state.burgerIngredients,
            counts: {
              ...state.burgerIngredients.counts,
              [action.key]:
              (state.burgerIngredients.counts[action.key] || 0) + 1,
            },
          },
        };
      } else return state;
    }
    case DECREASE_INGREDIENT: {
      const { typeItem } = action;
      if (typeItem !== 'bun') {
        return {
          ...state,
          burgerIngredients: {
            ...state.burgerIngredients,
            counts: {
              ...state.burgerIngredients.counts,
              [action.key]: state.burgerIngredients.counts[action.key] - 1,
            },
          },
        };
      } else return state;
    }
    case UPDATE_CONSTRUCTOR: {
      const otherIngredients = [...state.burgerIngredients.otherIngredients];
      otherIngredients.splice(
          action.toIndex,
          0,
          otherIngredients.splice(action.fromIndex, 1)[0]
      );
      return {
        ...state,
        burgerIngredients: {
          ...state.burgerIngredients,
          otherIngredients: otherIngredients,
        },
      };
    }
    default: {
      return state;
    }
  }
};
