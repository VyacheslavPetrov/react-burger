export const filterArray = (arr) => {
    return arr.reduce((acc, curr) =>
      ({
          ...acc, [curr.type]: [...acc[curr.type] || [], curr]
      }), {})
}

export const calculationCost = (bun, arrOtherIngredients) => {
    const bunPrice = bun ? bun.price : 0
    return bunPrice * 2 + arrOtherIngredients.reduce((acc, curr) => acc += curr.price, 0)
}