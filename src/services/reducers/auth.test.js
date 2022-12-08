import { authReducer } from './auth'
import {
  REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILED,
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED,
  GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILED,
  UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILED,
  FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILED,
  RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILED,
  LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILED,
  REFRESH_TOKEN_REQUEST, REFRESH_TOKEN_SUCCESS, REFRESH_TOKEN_FAILED
} from '../constants/auth';

const {initialState} = require('./auth')

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(authReducer(undefined, {})).toEqual(initialState)
  })

  it('should handle REGISTER_REQUEST', () => {
    expect(
      authReducer(initialState, {
        type: REGISTER_REQUEST
      })
    ).toEqual(expect.objectContaining({
      name: '',
      email: '',
      password: '',

      registerRequest: true,
      registerFailed: false
    }))
  })

  it('should handle REGISTER_SUCCESS', () => {
    expect(
      authReducer(initialState, {
        type: REGISTER_SUCCESS,
        user: {
          name: 'Test',
          email: 'test@test.ts'
        },
      })
    ).toEqual(expect.objectContaining({
      name: 'Test',
      email: 'test@test.ts',
      password: '',

      registerRequest: false,
      registerFailed: false,
    }))
  })

  it('should handle REGISTER_FAILED', () => {
    expect(
      authReducer(initialState, {
        type: REGISTER_FAILED
      })
    ).toEqual(expect.objectContaining({
      name: '',
      email: '',
      password: '',

      registerRequest: false,
      registerFailed: true
    }))
  })

  it('should handle LOGIN_REQUEST', () => {
    expect(
      authReducer(initialState, {
        type: LOGIN_REQUEST
      })
    ).toEqual(expect.objectContaining({
      name: '',
      email: '',
      password: '',

      loginRequest: true,
      loginFailed: false
    }))
  })

  it('should handle LOGIN_SUCCESS', () => {
    expect(
      authReducer(initialState, {
        type: LOGIN_SUCCESS,
        user: {
          name: 'Test',
          email: 'test@test.ts'
        },
      })
    ).toEqual(expect.objectContaining({
      name: 'Test',
      email: 'test@test.ts',
      password: '',

      loginRequest: false,
      loginFailed: false
    }))
  })

  it('should handle LOGIN_FAILED', () => {
    expect(
      authReducer(initialState, {
        type: LOGIN_FAILED
      })
    ).toEqual(expect.objectContaining({
      name: '',
      email: '',
      password: '',

      loginRequest: false,
      loginFailed: true
    }))
  })

  it('should handle GET_USER_REQUEST', () => {
    expect(
      authReducer(initialState, {
        type: GET_USER_REQUEST
      })
    ).toEqual(expect.objectContaining({
      name: '',
      email: '',
      password: '',

      getUserRequest: true,
      getUserFailed: false
    }))
  })

  it('should handle GET_USER_SUCCESS', () => {
    expect(
      authReducer(initialState, {
        type: GET_USER_SUCCESS,
        user: {
          name: 'Test',
          email: 'test@test.ts'
        },
      })
    ).toEqual(expect.objectContaining({
      name: 'Test',
      email: 'test@test.ts',
      password: '',

      getUserRequest: false,
      getUserFailed: false,
    }))
  })

  it('should handle GET_USER_FAILED', () => {
    expect(
      authReducer(initialState, {
        type: GET_USER_FAILED
      })
    ).toEqual(expect.objectContaining({
      name: '',
      email: '',
      password: '',

      getUserRequest: false,
      getUserFailed: true,
    }))
  })

  it('should handle UPDATE_USER_REQUEST', () => {
    expect(
      authReducer(initialState, {
        type: UPDATE_USER_REQUEST
      })
    ).toEqual(expect.objectContaining({
      name: '',
      email: '',
      password: '',

      updateUserRequest: true,
      updateUserFailed: false
    }))
  })

  it('should handle UPDATE_USER_SUCCESS', () => {
    expect(
      authReducer(initialState, {
        type: UPDATE_USER_SUCCESS,
        user: {
          name: 'Test',
          email: 'test@test.ts'
        },
      })
    ).toEqual(expect.objectContaining({
      name: 'Test',
      email: 'test@test.ts',
      password: '',

      updateUserRequest: false,
      updateUserFailed: false,
    }))
  })

  it('should handle UPDATE_USER_FAILED', () => {
    expect(
      authReducer(initialState, {
        type: UPDATE_USER_FAILED
      })
    ).toEqual(expect.objectContaining({
      name: '',
      email: '',
      password: '',

      updateUserRequest: false,
      updateUserFailed: true
    }))
  })

  it('should handle FORGOT_PASSWORD_REQUEST', () => {
    expect(
      authReducer(initialState, {
        type: FORGOT_PASSWORD_REQUEST
      })
    ).toEqual(expect.objectContaining({
      forgotPasswordRequest: true,
      forgotPasswordFailed: false,

      isforgotPasswordRequest: false,
      isforgotPasswordSaccess: false,
    }))
  })

  it('should handle FORGOT_PASSWORD_SUCCESS', () => {
    expect(
      authReducer(initialState, {
        type: FORGOT_PASSWORD_SUCCESS,
      })
    ).toEqual(expect.objectContaining({
      forgotPasswordRequest: false,
      forgotPasswordFailed: false,

      isforgotPasswordRequest: true,
      isforgotPasswordSaccess: true,
    }))
  })

  it('should handle FORGOT_PASSWORD_FAILED', () => {
    expect(
      authReducer(initialState, {
        type: FORGOT_PASSWORD_FAILED
      })
    ).toEqual(expect.objectContaining({
      forgotPasswordRequest: false,
      forgotPasswordFailed: true,

      isforgotPasswordRequest: true,
      isforgotPasswordSaccess: false,
    }))
  })

  it('should handle RESET_PASSWORD_REQUEST', () => {
    expect(
      authReducer(initialState, {
        type: RESET_PASSWORD_REQUEST
      })
    ).toEqual(initialState)
  })

  it('should handle RESET_PASSWORD_SUCCESS', () => {
    expect(
      authReducer(initialState, {
        type: RESET_PASSWORD_SUCCESS,
      })
    ).toEqual(initialState)
  })

  it('should handle RESET_PASSWORD_FAILED', () => {
    expect(
      authReducer(initialState, {
        type: RESET_PASSWORD_FAILED
      })
    ).toEqual(initialState)
  })

  it('should handle LOGOUT_REQUEST', () => {
    expect(
      authReducer(initialState, {
        type: LOGOUT_REQUEST
      })
    ).toEqual(expect.objectContaining({
      name: '',
      email: '',
      password: '',

      logoutRequest: true,
      logoutFailed: false,
    }))
  })

  it('should handle LOGOUT_SUCCESS', () => {
    expect(
      authReducer(initialState, {
        type: LOGOUT_SUCCESS
      })
    ).toEqual(initialState)
  })

  it('should handle LOGOUT_FAILED', () => {
    expect(
      authReducer(initialState, {
        type: LOGOUT_FAILED
      })
    ).toEqual(expect.objectContaining({
      name: '',
      email: '',
      password: '',

      logoutRequest: false,
      logoutFailed: true,
    }))
  })

  it('should handle REFRESH_TOKEN_REQUEST', () => {
    expect(
      authReducer(initialState, {
        type: REFRESH_TOKEN_REQUEST
      })
    ).toEqual(initialState)
  })

  it('should handle REFRESH_TOKEN_SUCCESS', () => {
    expect(
      authReducer(initialState, {
        type: REFRESH_TOKEN_SUCCESS
      })
    ).toEqual(expect.objectContaining({
      isTokenUpdated: true,
      tokenUpdateDate: true,
    }))
  })

  it('should handle REFRESH_TOKEN_FAILED', () => {
    expect(
      authReducer(initialState, {
        type: REFRESH_TOKEN_FAILED
      })
    ).toEqual(expect.objectContaining({
      isTokenUpdated: true,
      tokenUpdateDate: false,
    }))
  })
})