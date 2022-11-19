import React, { memo } from 'react';
import cn from 'classnames';
import NavBar from '../nav-bar/nav-bar';
import styles from './app-header.module.css';

function AppHeader() {
    return (
        <header
            className={cn(
                'pl-10',
                'pr-10',
                'pt-4',
                'pb-4',
                'text',
                'text_type_main-default',
                styles.header
            )}
        >
            <NavBar />
        </header>
    );
}

export default memo(AppHeader);
