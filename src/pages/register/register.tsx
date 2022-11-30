import React, { useState, memo, useCallback, SyntheticEvent } from 'react';
import cn from 'classnames';
import { Link, Redirect } from 'react-router-dom';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from '../../hooks';
import { register } from '../../services/actions/auth';
import styles from './register.module.css';

function Register() {
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
  })
  const dispatch = useDispatch();

  const handleInputChange = (event: SyntheticEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    const name = target.name;
    setState({
      ...state,
      [name]: value
    });
  }

  const onIconClick = useCallback(() => {
    alert('Icon Click Callback')
  }, [])

  const submit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(register(state));
  };

  const hasToken = localStorage.getItem('refreshToken')


  if (hasToken) {
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
        <h1 className={cn(styles.title, "text text_type_main-medium")}>Регистрация</h1>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={handleInputChange}
          value={state.name}
          name={'name'}
          error={false}
          onIconClick={onIconClick}
          errorText={'Ошибка'}
          size={'default'}
        />
        <Input
          type={'text'}
          placeholder={'E-mail'}
          onChange={handleInputChange}
          value={state.email}
          name={'email'}
          error={false}
          onIconClick={onIconClick}
          errorText={'Ошибка'}
          size={'default'}
        />
        <PasswordInput
          value={state.password}
          name={'password'}
          onChange={handleInputChange}
        />
        <Button type="primary" size="medium">
          Зарегистрироваться
        </Button>

      </form>
      <div className={cn('mb-4')}>
        <span className={'text text_type_main-default text_color_inactive'}>Уже зарегистрированы?</span>
        <Link to='/login' className={cn('text text_type_main-default', styles.link, 'pl-2')}>Войти</Link>
      </div>
    </div >
  );
}

export default memo(Register);