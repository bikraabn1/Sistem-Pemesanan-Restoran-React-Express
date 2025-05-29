import { useState, useEffect, createContext } from "react";

export const MenuContext = createContext([])

const MenuProvider = ({children}) => {
    const [foods, setFoods] = useState([])
    const [drinks, setDrinks] = useState([])

    const fetchData = async() => {
        try{
            const response = await fetch('http://localhost:3000/menus')

            if(!response.ok){
                throw new Error("Failed to fetch food and drink data")
            }

            const data = await response.json()
            setFoods(data.food)
            setDrinks(data.drink)
        }catch(err){
            console.error("Failed to fetch data : ", err)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <MenuContext.Provider value={{foods, drinks}}>
            {children}
        </MenuContext.Provider>
    )
}

export default MenuProvider