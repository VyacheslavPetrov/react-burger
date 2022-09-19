import React, { useState, memo } from 'react';
import cn from 'classnames';
import styles from './forms-profile.module.css';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';

function FormsProfile() {
  const [state, setState] = useState({
    // Соответствует name полю ввода
    name: '',
    email: '',
    password: '',
  })

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setState({
      ...state,
      [name]: value
    });
  }
  const nameInputRef = React.useRef(null)
  const emailInputRef = React.useRef(null)
  const passwordInputRef = React.useRef(null)
  const onIconClick = (e) => {
    setTimeout(() => state.currentRef?.current.focus(), 0)
    alert('Icon Click Callback')
  }

  return (
    <div className={cn(styles.forms)}>
      <Input
        type={'text'}
        placeholder={'Имя'}
        onChange={handleInputChange}
        icon={'EditIcon'}
        value={state.name}
        name={'name'}
        error={false}
        ref={nameInputRef}
        onIconClick={onIconClick}
        errorText={'Ошибка'}
        size={'default'}
      />
      <Input
        type={'text'}
        placeholder={'Логин'}
        onChange={handleInputChange}
        icon={'EditIcon'}
        value={state.email}
        name={'email'}
        error={false}
        ref={emailInputRef}
        onIconClick={onIconClick}
        errorText={'Ошибка'}
        size={'default'}
      />
      <Input
        type={'text'}
        placeholder={'Пароль'}
        onChange={handleInputChange}
        icon={'EditIcon'}
        value={state.password}
        name={'password'}
        error={false}
        ref={passwordInputRef}
        onIconClick={e => onIconClick(e)}
        errorText={'Ошибка'}
        size={'default'}
      />
    </div>
  );
}

export default memo(FormsProfile);