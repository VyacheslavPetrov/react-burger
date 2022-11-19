import React from 'react';
import cn from 'classnames';
import styles from './preloader.module.css';


const Preloader = () => {
  return (<div className={cn(styles["mk-spinner-wrap"])}>
    <div className={styles["mk-spinner-bubbles"]}></div>
  </div>)
}

export default Preloader;