import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './nav-bar.module.css';


const NavBar = ({ children }) => {

    return (
      <div className={cn(styles['nav-bar'])}>
          {children}
      </div>
    );
}

NavBar.propTypes = {
    children: PropTypes.element
}

export default NavBar;