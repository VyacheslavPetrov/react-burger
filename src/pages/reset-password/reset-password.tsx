import React, { useState, memo, SyntheticEvent } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { resetPassword } from '../../services/actions/auth';
import { useSelector, useDispatch } from '../../hooks';
import { Redirect } from 'react-router-dom';
import { resetPasswordRequest } from '../../utils/api';
import styles from './reset-password.module.css';

function ResetPassword() {
  const [state, setState] = useState({
    password: '',
    token: '',
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

  const submit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(resetPassword(state))
    resetPasswordRequest(state)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const isforgotPasswordSaccess = useSelector((store) => store.auth.isforgotPasswordSaccess);

  if (localStorage.getItem('refreshToken')) {
    return (
      <Redirect
        to={{
          pathname: '/'
        }}
      />
    );
  }

  if (!localStorage.getItem('refreshToken') && !isforgotPasswordSaccess) {
    return (
      <Redirect
        to={{
          pathname: '/forgot-password'
        }}
      />
    );
  }

  return (
    <div className={styles.container}>
      <form onSubmit={submit} className={cn(styles.form, 'mb-20')}>
        <h1 className={cn(styles.title, "text text_type_main-medium")}>Восстановление пароля</h1>
        <PasswordInput
          value={state.password}
          name={'password'}
          onChange={handleInputChange}
        />
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={handleInputChange}
          value={state.token}
          name={'token'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />
        <Button type="primary" size="medium">
          Сохранить
        </Button>

      </form>
      <div className={cn('mb-4')}>
        <span className={'text text_type_main-default text_color_inactive'}>Вспомнили пароль?</span>
        <Link to='/login' className={cn('text text_type_main-default', styles.link, 'pl-2')}>Войти</Link>
      </div>
    </div >
  );
}

export default memo(ResetPassword);