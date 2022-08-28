import React, {useContext, useEffect} from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import cn from "classnames"
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components"
import ModalOverlay from "../modal-overlay/modal-overlay"
import {ModalContext} from "../../utils/modalContext"

import styles from "./modal.module.css"

function Modal({children}) {
    const {setModal} = useContext(ModalContext)

    const closeEsc = (evn) => {
        if (evn.key === "Escape")
            close();
    }

    const close = () => {
        setModal({
            isShow: false,
            content: null,
        })
    }

    useEffect(() => {
        window.addEventListener("keydown", closeEsc)
        return () => {
            window.removeEventListener('keydown', closeEsc)
        }
    })

    return ReactDOM.createPortal((
            <>
                <div className={cn(styles.open_modal, "pr-10", "pl-10", "pt-15", "pb-15")}>
				<span className={cn(styles.close_modal)} onClick={close}>
					<CloseIcon type="primary" />
				</span>
                    <div>
                        {children}
                    </div>
                </div>
                <ModalOverlay close={close} />
            </>
        ),
        document.querySelector("#modal")
    )
}

Modal.propTypes = {
    children: PropTypes.element
}

export default Modal;