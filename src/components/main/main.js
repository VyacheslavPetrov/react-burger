import React, {useEffect, useState} from "react"
import cn from "classnames"
import BurgerIngredients from "../burger-ingredients/burger-ingredients"
import BurgerConstructor from "../burger-constructor/burger-constructor"
import Modal from "../modal/modal"
import styles from "./main.module.css"
import {filterArray, getProducts} from "../../utils/utils"
import {IngredientsContext} from "../../utils/ingredientsContext"
import {ModalContext} from "../../utils/modalContext"


const Main = () => {
    const [state, setState] = useState({
        isLoading: false,
        hasError: false,
        loaded: false,
        allIngredients: {},
        burgerIngredients: {
            bun: null,
            otherIngredients: []
        }
    });
    const [modal, setModal] = useState({
        visible: false,
        content: null
    });

    useEffect(() => {
        getIngredients()
    }, [])

    const getIngredients = () => {
        setState({...state, hasError: false, isLoading: true});
        getProducts()
            .then((data) => {
                const ingredientsObj = filterArray(data.data);
                setState({...state, allIngredients: ingredientsObj, isLoading: false, loaded: true})
            })
            .catch((err) => {
                setState({...state, hasError: true, isLoading: false});
            })
    }

    const {visible, content} = modal;

    return (
        <main className={cn(styles.main, "p-10")}>
            <ModalContext.Provider value={{modal, setModal}}>
                <IngredientsContext.Provider value={{state, setState}}>
                    {state.isLoading && "Загрузка..."}
                    {state.hasError && "Произошла ошибка"}
                    {!state.isLoading &&
                    !state.hasError &&
                    !!state.loaded &&
                    <div className={styles.columns}>
                        <BurgerIngredients/>
                        {state.burgerIngredients.bun && <BurgerConstructor />}
                    </div>}
                    {visible && <Modal>{content}</Modal>}
                </IngredientsContext.Provider>
            </ModalContext.Provider>
        </main>
    );
}

export default Main;
