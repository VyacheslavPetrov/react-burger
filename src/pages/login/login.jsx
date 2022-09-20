import React, { useState, useRef, memo, useCallback } from 'react';
import cn from 'classnames';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { signIn } from '../../utils/api';
import { login } from '../../services/actions/auth';
import styles from './login.module.css';

function Login() {
  const [state, setState] = useState({
    login: '',
    password: ''
  })
  const userName = useSelector(store => store.auth.name)
  const dispatch = useDispatch();
  const inputRef = useRef(null)

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setState({
      ...state,
      [name]: value
    });
  }

  const onIconClick = useCallback(() => {
    setTimeout(() => inputRef.current.focus(), 0)
    alert('Icon Click Callback')
  }, [])

  const submit = e => {
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
        <h1 className={cn(styles.title, "text text_type_main-medium")}>Вход</h1>
        <Input
          type={'text'}
          placeholder={'E-mail'}
          onChange={handleInputChange}
          value={state.login}
          name={'login'}
          error={false}
          ref={inputRef}
          errorText={'Ошибка'}
          size={'default'}
          onIconClick={onIconClick}
        />
        <PasswordInput
          value={state.password}
          name={'password'}
          onChange={handleInputChange}
        />
        <Button type="primary" size="medium">
          Войти
        </Button>

      </form>
      <div className={cn('mb-4')}>
        <span className={'text text_type_main-default text_color_inactive'}>Вы - новый пользователь?</span>
        <Link to='/register' className={cn('text text_type_main-default', styles.link, 'pl-2')}>Зарегистрироваться</Link>
      </div>
      <div>
        <span className={'text text_type_main-default text_color_inactive'}>Забыли пароль?</span>
        <Link to='/forgot-password' className={cn('text text_type_main-default', styles.link, 'pl-2')}>Восстановить пароль</Link>
      </div>
    </div >
  );
}

export default memo(Login);