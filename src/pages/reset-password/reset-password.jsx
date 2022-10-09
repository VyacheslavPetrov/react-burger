import React, { useState, memo, useCallback } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { resetPassword } from '../../services/actions/auth';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { resetPasswordRequest } from '../../utils/api';
import styles from './reset-password.module.css';

function ResetPassword() {
  const [state, setState] = useState({
    password: '',
    token: '',
  })
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setState({
      ...state,
      [name]: value
    });
  }
  const inputRef = React.useRef(null)
  const onIconClick = useCallback(() => {
    setTimeout(() => inputRef.current.focus(), 0)
    alert('Icon Click Callback')
  }, [])

  const submit = e => {
    e.preventDefault();
    dispatch(resetPassword(state));

    resetPassword(state).then((res) => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  };

  const isforgotPasswordSaccess = useSelector(store => store.auth.isforgotPasswordSaccess);

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
          ref={inputRef}
          onIconClick={onIconClick}
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