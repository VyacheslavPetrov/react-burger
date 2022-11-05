import React, { FC } from 'react';
import { TProps } from './types';
import cn from 'classnames';
import styles from './modal-overlay.module.css';

const ModalOverlay: FC<TProps> = ({ children, close }) => {
  return (
    <div className={cn(styles.overlay)} onClick={close}>
      {children}
    </div>
  )
}

export default ModalOverlay;