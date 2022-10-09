import React from 'react';
import styles from './icon.module.css';

import bun01 from '../../images/bun-01.png';


function Icon() {
  return (
    <div className={styles.icon}>
      <img src={bun01} alt='Вкусная булка' />
    </div>
  );
}

export default Icon;
