import { ingredientsReducer } from './ingredients';
import { data } from '../../utils/data';
import {
  GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAILED,
  CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAILED,
  ADD_INGREDIENTS, DELETE_INGREDIENT, UPDATE_CONSTRUCTOR,
  INCREASE_INGREDIENT, DECREASE_INGREDIENT,
  GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILED,
  GET_USER_ORDER_REQUEST, GET_USER_ORDER_SUCCESS, GET_USER_ORDER_FAILED,
} from '../constants/ingredients';

const initialState = {
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

describe('ingredients reducer', () => {
  it('should return the initial state', () => {
    expect(ingredientsReducer(undefined, {})).toEqual(initialState)
  })

  it('should handle GET_PRODUCTS_REQUEST', () => {
    expect(
      ingredientsReducer(initialState, {
        type: GET_PRODUCTS_REQUEST
      })
    ).toEqual(expect.objectContaining({
      allIngredients: [],
      isLoading: true,
      hasError: false,
      loaded: false,
    }))
  })

  it('should handle GET_PRODUCTS_SUCCESS', () => {
    expect(
      ingredientsReducer(initialState, {
        type: GET_PRODUCTS_SUCCESS,
        items: data
      })
    ).toEqual(expect.objectContaining({
      allIngredients: data,
      isLoading: false,
      hasError: false,
      loaded: true,
    }))
  })

  it('should handle GET_PRODUCTS_FAILED', () => {
    expect(
      ingredientsReducer(initialState, {
        type: GET_PRODUCTS_FAILED,
      })
    ).toEqual(expect.objectContaining({
      allIngredients: [],
      isLoading: false,
      hasError: true,
      loaded: false,
    }))
  })

  it('should handle CREATE_ORDER_REQUEST', () => {
    expect(
      ingredientsReducer(initialState, {
        type: CREATE_ORDER_REQUEST
      })
    ).toEqual(expect.objectContaining({
      currentOrder: null,
      orderRequest: true,
      orderFailed: false,
    }))
  })

  it('should handle CREATE_ORDER_SUCCESS', () => {
    expect(
      ingredientsReducer(initialState, {
        type: CREATE_ORDER_SUCCESS,
        currentOrder: {
          name: "Space флюоресцентный бургер",
          order: { number: 4345 },
          success: true,
          __proto__: Object
        }
      })
    ).toEqual(expect.objectContaining({
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
      createOrder: undefined,
      orderRequest: false,
      orderFailed: false,
      orderLoaded: false
    }))
  })

  it('should handle CREATE_ORDER_FAILED', () => {
    expect(
      ingredientsReducer(initialState, {
        type: CREATE_ORDER_FAILED
      })
    ).toEqual(expect.objectContaining({
      currentOrder: null,
      orderRequest: false,
      orderFailed: true,
    }))
  })

  it('should handle GET_ORDER_REQUEST', () => {
    expect(
      ingredientsReducer(initialState, {
        type: GET_ORDER_REQUEST
      })
    ).toEqual(expect.objectContaining({
      currentOrder: null,
      orderRequest: true,
      orderFailed: false,
      orderLoaded: false
    }))
  })

  it('should handle GET_ORDER_SUCCESS', () => {
    expect(
      ingredientsReducer(initialState, {
        type: GET_ORDER_SUCCESS,
        order: null
      })
    ).toEqual(expect.objectContaining({
      currentOrder: null,
      orderRequest: false,
      orderFailed: false,
      orderLoaded: true
    }))
    expect(
      ingredientsReducer(initialState, {
        type: GET_ORDER_SUCCESS,
        order: {
          _id: "60da447273a639001a192d24",
          owner: "60d72a588425d0001ba63f20",
          status: "done",
          number: 28,
          name: "Флюоресцентный антарианский space бургер",
          createdAt: "2021-06-28T21:51:46.040Z",
          updatedAt: "2021-06-30T11:09:54.054Z",
          __v: 0,
        }
      })
    ).toEqual(expect.objectContaining({
      currentOrder: {
        _id: "60da447273a639001a192d24",
        owner: "60d72a588425d0001ba63f20",
        status: "done",
        number: 28,
        name: "Флюоресцентный антарианский space бургер",
        createdAt: "2021-06-28T21:51:46.040Z",
        updatedAt: "2021-06-30T11:09:54.054Z",
        __v: 0,
      },
      orderRequest: false,
      orderFailed: false,
      orderLoaded: true
    }))
  })

  it('should handle GET_ORDER_FAILED', () => {
    expect(
      ingredientsReducer(initialState, {
        type: GET_ORDER_FAILED
      })
    ).toEqual(expect.objectContaining({
      currentOrder: null,
      orderRequest: false,
      orderFailed: true,
    }))
  })

  it('should handle GET_USER_ORDER_REQUEST', () => {
    expect(
      ingredientsReducer(initialState, {
        type: GET_USER_ORDER_REQUEST
      })
    ).toEqual(expect.objectContaining({
      currentOrder: null,
      orderRequest: true,
      orderFailed: false,
      orderLoaded: false
    }))
  })

  it('should handle GET_USER_ORDER_SUCCESS', () => {
    expect(
      ingredientsReducer(initialState, {
        type: GET_USER_ORDER_SUCCESS,
        order: null
      })
    ).toEqual(expect.objectContaining({
      currentOrder: null,
      orderRequest: false,
      orderFailed: false,
      orderLoaded: true
    }))
    expect(
      ingredientsReducer(initialState, {
        type: GET_USER_ORDER_SUCCESS,
        order: {
          _id: "60da447273a639001a192d24",
          owner: "60d72a588425d0001ba63f20",
          status: "done",
          number: 28,
          name: "Флюоресцентный антарианский space бургер",
          createdAt: "2021-06-28T21:51:46.040Z",
          updatedAt: "2021-06-30T11:09:54.054Z",
          __v: 0,
        }
      })
    ).toEqual(expect.objectContaining({
      currentOrder: {
        _id: "60da447273a639001a192d24",
        owner: "60d72a588425d0001ba63f20",
        status: "done",
        number: 28,
        name: "Флюоресцентный антарианский space бургер",
        createdAt: "2021-06-28T21:51:46.040Z",
        updatedAt: "2021-06-30T11:09:54.054Z",
        __v: 0,
      },
      orderRequest: false,
      orderFailed: false,
      orderLoaded: true
    }))
  })

  it('should handle GET_USER_ORDER_FAILED', () => {
    expect(
      ingredientsReducer(initialState, {
        type: GET_USER_ORDER_FAILED
      })
    ).toEqual(expect.objectContaining({
      currentOrder: null,
      orderRequest: false,
      orderFailed: true,
    }))
  })

  it('should handle ADD_INGREDIENTS', () => {

    const stateWithBun = {
      isLoading: false,
      hasError: false,
      loaded: false,
      allIngredients: {},
      burgerIngredients: {
        bun: {
          calories: 643,
          carbohydrates: 85,
          fat: 26,
          image: "https://code.s3.yandex.net/react/code/bun-01.png",
          image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
          image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
          name: "Флюоресцентная булка R2-D3",
          price: 988,
          proteins: 44,
          type: "bun",
          _id: "60cb6564fce49c00269d4018"
        },
        otherIngredients: [],
        counts: {},
      },
      currentOrder: null,
      orderRequest: false,
      orderFailed: false,
      orderLoaded: false
    }

    const stateWithOtherIngredients = {
      isLoading: false,
      hasError: false,
      loaded: false,
      allIngredients: [],
      burgerIngredients: {
        bun: {
          calories: 643,
          carbohydrates: 85,
          fat: 26,
          image: "https://code.s3.yandex.net/react/code/bun-01.png",
          image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
          image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
          name: "Флюоресцентная булка R2-D3",
          price: 988,
          proteins: 44,
          type: "bun",
          _id: "60cb6564fce49c00269d4018"
        },
        otherIngredients: [
          {
            calories: 643,
            carbohydrates: 85,
            fat: 26,
            image: "https://code.s3.yandex.net/react/code/meat-03.png",
            image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
            image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
            name: "Филе Люминесцентного тетраодонтимформа",
            price: 988,
            proteins: 44,
            type: "main",
            _id: "60cb6564fce49c00269d4019"
          },
          {
            calories: 420,
            carbohydrates: 33,
            fat: 244,
            image: "https://code.s3.yandex.net/react/code/meat-02.png",
            image_large: "https://code.s3.yandex.net/react/code/meat-02-large.png",
            image_mobile: "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
            name: "Мясо бессмертных моллюсков Protostomia",
            price: 1337,
            proteins: 433,
            type: "main",
            _id: "60cb6564fce49c00269d401a"
          },
          {
            calories: 99,
            carbohydrates: 42,
            fat: 24,
            image: "https://code.s3.yandex.net/react/code/sauce-03.png",
            image_large: "https://code.s3.yandex.net/react/code/sauce-03-large.png",
            image_mobile: "https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
            name: "Соус традиционный галактический",
            price: 15,
            proteins: 42,
            type: "sauce",
            _id: "60cb6564fce49c00269d401f"
          },
        ],
        counts: {},
      },
      currentOrder: null,
      orderRequest: false,
      orderFailed: false,
      orderLoaded: false
    }

    expect(
      ingredientsReducer(initialState, {
        type: ADD_INGREDIENTS,
        item: {
          calories: 643,
          carbohydrates: 85,
          fat: 26,
          image: "https://code.s3.yandex.net/react/code/bun-01.png",
          image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
          image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
          name: "Флюоресцентная булка R2-D3",
          price: 988,
          proteins: 44,
          type: "bun",
          _id: "60cb6564fce49c00269d4018"
        }
      })
    ).toEqual(expect.objectContaining({
      burgerIngredients: {
        bun: {
          calories: 643,
          carbohydrates: 85,
          fat: 26,
          image: "https://code.s3.yandex.net/react/code/bun-01.png",
          image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
          image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
          name: "Флюоресцентная булка R2-D3",
          price: 988,
          proteins: 44,
          type: "bun",
          _id: "60cb6564fce49c00269d4018"
        },
        otherIngredients: [],
        counts: {},
      },
    }))
    expect(
      ingredientsReducer(initialState, {
        type: ADD_INGREDIENTS,
        item: {
          calories: 14,
          carbohydrates: 11,
          fat: 22,
          image: "https://code.s3.yandex.net/react/code/sauce-04.png",
          image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
          image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
          name: "Соус фирменный Space Sauce",
          price: 80,
          proteins: 50,
          type: "sauce",
          _id: "60cb6564fce49c00269d401e",
          productId: '123456789'
        }
      })
    ).toEqual(expect.objectContaining({
      burgerIngredients: {
        bun: null,
        otherIngredients: [{
          calories: 14,
          carbohydrates: 11,
          fat: 22,
          image: "https://code.s3.yandex.net/react/code/sauce-04.png",
          image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
          image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
          name: "Соус фирменный Space Sauce",
          price: 80,
          proteins: 50,
          type: "sauce",
          _id: "60cb6564fce49c00269d401e",
          productId: '123456789'
        }],
        counts: {},
      },
    }))
    expect(
      ingredientsReducer(stateWithBun, {
        type: ADD_INGREDIENTS,
        item: {
          calories: 420,
          carbohydrates: 53,
          fat: 24,
          image: "https://code.s3.yandex.net/react/code/bun-02.png",
          image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
          image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
          name: "Краторная булка N-200i",
          price: 1255,
          proteins: 80,
          type: "bun",
          _id: "60cb6564fce49c00269d4017"
        }
      })
    ).toEqual(expect.objectContaining({
      burgerIngredients: {
        bun: {
          calories: 420,
          carbohydrates: 53,
          fat: 24,
          image: "https://code.s3.yandex.net/react/code/bun-02.png",
          image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
          image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
          name: "Краторная булка N-200i",
          price: 1255,
          proteins: 80,
          type: "bun",
          _id: "60cb6564fce49c00269d4017"
        },
        otherIngredients: [],
        counts: {},
      },
    }))
    expect(
      ingredientsReducer(stateWithOtherIngredients, {
        type: ADD_INGREDIENTS,
        item: {
          calories: 100,
          carbohydrates: 100,
          fat: 99,
          image: "https://code.s3.yandex.net/react/code/sauce-01.png",
          image_large: "https://code.s3.yandex.net/react/code/sauce-01-large.png",
          image_mobile: "https://code.s3.yandex.net/react/code/sauce-01-mobile.png",
          name: "Соус с шипами Антарианского плоскоходца",
          price: 88,
          proteins: 101,
          type: "sauce",
          _id: "60cb6564fce49c00269d4020"
        }
      }).burgerIngredients.otherIngredients.length
    ).toBe(4)
  })

  it('should handle DELETE_INGREDIENT', () => {

    const state = {
      isLoading: false,
      hasError: false,
      loaded: false,
      allIngredients: [],
      burgerIngredients: {
        bun: {
          calories: 643,
          carbohydrates: 85,
          fat: 26,
          image: "https://code.s3.yandex.net/react/code/bun-01.png",
          image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
          image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
          name: "Флюоресцентная булка R2-D3",
          price: 988,
          proteins: 44,
          type: "bun",
          _id: "60cb6564fce49c00269d4018"
        },
        otherIngredients: [
          {
            calories: 643,
            carbohydrates: 85,
            fat: 26,
            image: "https://code.s3.yandex.net/react/code/meat-03.png",
            image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
            image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
            name: "Филе Люминесцентного тетраодонтимформа",
            price: 988,
            proteins: 44,
            type: "main",
            _id: "60cb6564fce49c00269d4019",
            productId: 1
          },
          {
            calories: 420,
            carbohydrates: 33,
            fat: 244,
            image: "https://code.s3.yandex.net/react/code/meat-02.png",
            image_large: "https://code.s3.yandex.net/react/code/meat-02-large.png",
            image_mobile: "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
            name: "Мясо бессмертных моллюсков Protostomia",
            price: 1337,
            proteins: 433,
            type: "main",
            _id: "60cb6564fce49c00269d401a",
            productId: 2
          },
          {
            calories: 99,
            carbohydrates: 42,
            fat: 24,
            image: "https://code.s3.yandex.net/react/code/sauce-03.png",
            image_large: "https://code.s3.yandex.net/react/code/sauce-03-large.png",
            image_mobile: "https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
            name: "Соус традиционный галактический",
            price: 15,
            proteins: 42,
            type: "sauce",
            _id: "60cb6564fce49c00269d401f",
            productId: 3
          },
        ],
        counts: {},
      },
      currentOrder: null,
      orderRequest: false,
      orderFailed: false,
      orderLoaded: false
    }

    expect(
      ingredientsReducer(state, {
        type: DELETE_INGREDIENT,
        id: 3
      })
    ).toEqual(expect.objectContaining({
      burgerIngredients: {
        bun: {
          calories: 643,
          carbohydrates: 85,
          fat: 26,
          image: "https://code.s3.yandex.net/react/code/bun-01.png",
          image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
          image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
          name: "Флюоресцентная булка R2-D3",
          price: 988,
          proteins: 44,
          type: "bun",
          _id: "60cb6564fce49c00269d4018"
        },
        otherIngredients: [
          {
            calories: 643,
            carbohydrates: 85,
            fat: 26,
            image: "https://code.s3.yandex.net/react/code/meat-03.png",
            image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
            image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
            name: "Филе Люминесцентного тетраодонтимформа",
            price: 988,
            proteins: 44,
            type: "main",
            _id: "60cb6564fce49c00269d4019",
            productId: 1
          },
          {
            calories: 420,
            carbohydrates: 33,
            fat: 244,
            image: "https://code.s3.yandex.net/react/code/meat-02.png",
            image_large: "https://code.s3.yandex.net/react/code/meat-02-large.png",
            image_mobile: "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
            name: "Мясо бессмертных моллюсков Protostomia",
            price: 1337,
            proteins: 433,
            type: "main",
            _id: "60cb6564fce49c00269d401a",
            productId: 2
          },
        ],
        counts: {},
      },
    }))
    expect(
      ingredientsReducer(state, {
        type: DELETE_INGREDIENT,
        id: 3
      }).burgerIngredients.otherIngredients.length
    ).toBe(2)
  })

  it('should handle UPDATE_CONSTRUCTOR', () => {
    const state = {
      allIngredients: [],
      burgerIngredients: {
        bun: {
          calories: 643,
          carbohydrates: 85,
          fat: 26,
          image: "https://code.s3.yandex.net/react/code/bun-01.png",
          image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
          image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
          name: "Флюоресцентная булка R2-D3",
          price: 988,
          productId: "7b9ae11f-cb8c-4229-a21b-7ac2e4d061a5",
          proteins: 44,
          type: "bun",
          _id: "60cb6564fce49c00269d4018"
        },
        otherIngredients: [
          {
            calories: 14,
            carbohydrates: 11,
            fat: 22,
            image: "https://code.s3.yandex.net/react/code/sauce-04.png",
            image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
            image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
            name: "Соус фирменный Space Sauce",
            price: 80,
            productId: "b3fdb2cc-da95-4093-94f9-a14420f7ea57",
            proteins: 50,
            type: "sauce",
            _id: "60cb6564fce49c00269d401e"
          },
          {
            calories: 30,
            carbohydrates: 40,
            fat: 20,
            image: "https://code.s3.yandex.net/react/code/sauce-02.png",
            image_large: "https://code.s3.yandex.net/react/code/sauce-02-large.png",
            image_mobile: "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
            name: "Соус Spicy-X",
            price: 90,
            productId: "cba024bb-2195-4982-93ba-5e873341f463",
            proteins: 30,
            type: "sauce",
            _id: "60cb6564fce49c00269d401d"
          }
        ],
        counts: {}
      },
      currentOrder: null,
      hasError: false,
      isLoading: false,
      loaded: true,
      orderFailed: false,
      orderRequest: false,
      orderLoaded: false
    }
    expect(
      ingredientsReducer(state, {
        type: UPDATE_CONSTRUCTOR,
        toIndex: 0,
        fromIndex: 1,
      })
    ).toEqual({
      allIngredients: [],
      burgerIngredients: {
        bun: {
          calories: 643,
          carbohydrates: 85,
          fat: 26,
          image: "https://code.s3.yandex.net/react/code/bun-01.png",
          image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
          image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
          name: "Флюоресцентная булка R2-D3",
          price: 988,
          productId: "7b9ae11f-cb8c-4229-a21b-7ac2e4d061a5",
          proteins: 44,
          type: "bun",
          _id: "60cb6564fce49c00269d4018"
        },
        otherIngredients: [
          {
            calories: 30,
            carbohydrates: 40,
            fat: 20,
            image: "https://code.s3.yandex.net/react/code/sauce-02.png",
            image_large: "https://code.s3.yandex.net/react/code/sauce-02-large.png",
            image_mobile: "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
            name: "Соус Spicy-X",
            price: 90,
            productId: "cba024bb-2195-4982-93ba-5e873341f463",
            proteins: 30,
            type: "sauce",
            _id: "60cb6564fce49c00269d401d"
          },
          {
            calories: 14,
            carbohydrates: 11,
            fat: 22,
            image: "https://code.s3.yandex.net/react/code/sauce-04.png",
            image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
            image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
            name: "Соус фирменный Space Sauce",
            price: 80,
            productId: "b3fdb2cc-da95-4093-94f9-a14420f7ea57",
            proteins: 50,
            type: "sauce",
            _id: "60cb6564fce49c00269d401e"
          },
        ],
        counts: {}
      },
      currentOrder: null,
      hasError: false,
      isLoading: false,
      loaded: true,
      orderFailed: false,
      orderRequest: false,
      orderLoaded: false
    })
  })

  it('should handle INCREASE_INGREDIENT', () => {
    const state = {
      allIngredients: [],
      burgerIngredients: {
        bun: null,
        otherIngredients: [],
        counts: {
          "60cb6564fce49c00269d401e": 3,
          "60cb6564fce49c00269d401d": 3,
          "60cb6564fce49c00269d4020": 2,
          "60cb6564fce49c00269d401f": 1,
          "60cb6564fce49c00269d4022": 1,
          "60cb6564fce49c00269d4021": 4,
        },
      },
    };

    expect(
      ingredientsReducer(state, {
        type: INCREASE_INGREDIENT,
        key: "60cb6564fce49c00269d401c",
        typeItem: "main",
      })
    ).toEqual({
      allIngredients: [],
      burgerIngredients: {
        bun: null,
        otherIngredients: [],
        counts: {
          "60cb6564fce49c00269d401e": 3,
          "60cb6564fce49c00269d401d": 3,
          "60cb6564fce49c00269d4020": 2,
          "60cb6564fce49c00269d401f": 1,
          "60cb6564fce49c00269d4022": 1,
          "60cb6564fce49c00269d4021": 4,
          "60cb6564fce49c00269d401c": 1
        },
      },
    })
    expect(
      ingredientsReducer(state, {
        type: INCREASE_INGREDIENT,
        key: "60cb6564fce49c00269d401c",
        typeItem: "bun",
      })
    ).toEqual(state)
    expect(
      ingredientsReducer(state, {
        type: INCREASE_INGREDIENT,
        key: "60cb6564fce49c00269d401e",
        typeItem: "main",
      }).burgerIngredients.counts["60cb6564fce49c00269d401e"]
    ).toBe(4)
  })

  it('should handle DECREASE_INGREDIENT', () => {
    const state = {
      allIngredients: {},
      burgerIngredients: {
        bun: null,
        otherIngredients: [],
        counts: {
          "60cb6564fce49c00269d401e": 3,
          "60cb6564fce49c00269d401d": 3,
          "60cb6564fce49c00269d4020": 2,
          "60cb6564fce49c00269d401f": 1,
          "60cb6564fce49c00269d4022": 1,
          "60cb6564fce49c00269d4021": 4,
        },
      },
    };

    expect(
      ingredientsReducer(state, {
        type: DECREASE_INGREDIENT,
        key: "60cb6564fce49c00269d401e",
        typeItem: "bun",
      })
    ).toEqual(state)
    expect(
      ingredientsReducer(state, {
        type: DECREASE_INGREDIENT,
        key: "60cb6564fce49c00269d401e",
        typeItem: "sauce",
      }).burgerIngredients.counts["60cb6564fce49c00269d401e"]
    ).toBe(2)
  })
})