import { TIngredient } from '../../types'

export type TCountsIngredients = {
    [name: string]: number;
}

export type TIngredientWithProductId = TIngredient & { productId: string }



export type TProps = {
    onDropHandler: (item: TIngredient)
        => void;
}