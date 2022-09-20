import React from 'react';
import styles from './preloader.module.css';
import cn from 'classnames';

const Preloader = () => {
  return (<div className={cn(styles["mk-spinner-wrap"])}>
    <div className={styles["mk-spinner-bubbles"]}></div>
  </div>)
}

export default Preloader;