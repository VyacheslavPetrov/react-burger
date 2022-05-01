import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import styles from "./header-item.module.css";


const HeaderItem = ({children}) => {

    return (
        <div className={cn(styles["header-item"])}>
            {children}
        </div>
    );
}

HeaderItem.propTypes = {
    children: PropTypes.element
}

export default HeaderItem;