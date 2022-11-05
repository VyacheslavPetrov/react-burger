import React from 'react';
const styles = require('./icon.module.css');

const bun01 = require('../../images/bun-01.png');


function Icon() {
  return (
    <div className={styles.icon}>
      <img src={bun01} alt='Вкусная булка' />
    </div>
  );
}

export default Icon;
