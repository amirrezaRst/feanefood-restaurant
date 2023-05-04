import { createContext } from "react"

const FoodContext = createContext({
    allFood: [],
    setAllFood: () => { },
    totalPrice: null,
    setTotalPrice: () => { },
})
export default FoodContext;