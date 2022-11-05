import React, { useState, memo, SyntheticEvent } from 'react';
import { Redirect } from 'react-router-dom';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import {
  Input,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { login } from '../../services/actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import styles from './login.module.css';

function Login() {
  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const userName = useSelector((store: any) => store.auth.name)

  const dispatch = useDispatch();

  const handleInputChange = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    const name = target.name;
    setState({
      ...state,
      [name]: value,
    });
  };

  const submit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(login(state));
  };

  const hasToken = localStorage.getItem('refreshToken')

  if (userName || hasToken) {
    return (
        <Redirect
            to={{
              pathname: '/'
            }}
        />
    );
  }

  return (
      <div className={styles.container}>
        <form onSubmit={submit} className={cn(styles.form, 'mb-20')}>
          <h1 className={cn(styles.title, 'text text_type_main-medium')}>Вход</h1>
          <Input
              type={'text'}
              placeholder={'E-mail'}
              onChange={handleInputChange}
              value={state.email}
              name={'email'}
              error={false}
              errorText={'Ошибка'}
              size={'default'}
          />
          <PasswordInput
              value={state.password}
              name={'password'}
              onChange={handleInputChange}
          />
          <Button type='primary' size='medium'>
            Войти
          </Button>
        </form>
        <div className={cn('mb-4')}>
        <span className={'text text_type_main-default text_color_inactive'}>
          Вы - новый пользователь?
        </span>
          <Link
              to='/register'
              className={cn('text text_type_main-default', styles.link, 'pl-2')}
          >
            Зарегистрироваться
          </Link>
        </div>
        <div>
        <span className={'text text_type_main-default text_color_inactive'}>
          Забыли пароль?
        </span>
          <Link
              to='/forgot-password'
              className={cn('text text_type_main-default', styles.link, 'pl-2')}
          >
            Восстановить пароль
          </Link>
        </div>
      </div>
  );
}

export default memo(Login);
