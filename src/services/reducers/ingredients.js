import { v4 as uuidv4 } from 'uuid';
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
} from '../actions/ingredients';


const initialState = {
  isLoading: false,
  loaded: false,
  hasError: false,
  allIngredients: [],
  burgerIngredients: {
    bun: null,
    otherIngredients: [],
    counts: {}
  },
  currentOrder: null,
  orderRequest: false,
  orderFailed: false,
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_REQUEST: {
      return {
        ...state,
        isLoading: true,
        hasError: false,
      }
    }
    case GET_PRODUCTS_SUCCESS: {
      return {
        ...state,
        hasError: false,
        allIngredientsArr: action.itemsArr,
        allIngredients: action.items,
        loaded: true,
        isLoading: false
      }
    }
    case GET_PRODUCTS_FAILED: {
      return {
        ...initialState,
        isLoading: false,
        hasError: true
      }
    }
    case CREATE_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
        orderFailed: false,
      }
    }
    case CREATE_ORDER_SUCCESS: {
      return { ...state,
        orderFailed: false,
        currentOrder: action.order,
        orderRequest: false,
        burgerIngredients: {
          bun: null,
          otherIngredients: [],
          counts: {},
        },
      }
    }
    case CREATE_ORDER_FAILED: {
      return { ...initialState,
        orderFailed: true,
        orderRequest: false
      }
    }
    case ADD_INGREDIENTS: {
      const { type } = action.item
      if (type === 'bun') {
        return {
          ...state,
          burgerIngredients: {
            ...state.burgerIngredients,
            bun: action.item
          }
        }
      }
      return {
        ...state,
        burgerIngredients: {
          ...state.burgerIngredients,
          otherIngredients: [...state.burgerIngredients.otherIngredients, action.item]
        }
      }
    }
    case DELETE_INGREDIENT: {
      return {
        ...state,
        burgerIngredients: {
          ...state.burgerIngredients,
          otherIngredients: [...state.burgerIngredients.otherIngredients].filter(el => el.productId !== action.id)
        }
      }
    }
    case INCREASE_INGREDIENT: {
      const { typeItem } = action
      if (typeItem !== 'bun') {
        return {
          ...state,
          burgerIngredients: {
            ...state.burgerIngredients,
            counts: {
              ...state.burgerIngredients.counts,
              [action.key]: (state.burgerIngredients.counts[action.key] || 0) + 1
            }
          }
        }
      } else return state;
    }
    case DECREASE_INGREDIENT: {
      const { typeItem } = action
      if (typeItem !== 'bun') {
        return {
          ...state,
          burgerIngredients: {
            ...state.burgerIngredients,
            counts: {
              ...state.burgerIngredients.counts,
              [action.key]: state.burgerIngredients.counts[action.key] - 1
            }
          }
        }
      } else return state;
    }
    case UPDATE_CONSTRUCTOR: {
      const otherIngredients = [...state.burgerIngredients.otherIngredients];
      otherIngredients.splice(action.toIndex, 0, otherIngredients.splice(action.fromIndex, 1)[0]);
      return {
        ...state,
        burgerIngredients: {
          ...state.burgerIngredients,
          otherIngredients: otherIngredients
        }
      }
    }
    default: {
      return state;
    }
  }
};


