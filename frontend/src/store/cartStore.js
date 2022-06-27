import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { produce } from "immer"

const useCartStore = create(persist(devtools(
    (set) => ({
        items : [],

        addCart : (item) => set(produce((state) => {
            const itemNew = {...item}
            const itemFind = state.items.find((item) => item.id === itemNew.id)

            itemNew.qty = 1

            if(itemFind){
                state.items = state.items.filter((item) => item.id !== itemNew.id)

                itemFind.qty ++

                state.items.push(itemFind)
            } else{
                state.items.push(itemNew)
            }
        })),

        removeItem : (itemId) => set(produce((state) => {
            state.items = state.items.find((item) => item.id !== itemId)
        })),

        changeQty : (itemId, qty) => set(produce((state) => {
            const itemChange = state.items.find((item) => item.id === itemId)

            itemChange.qty = qty

            if(itemChange.qty == 0){
                itemChange.qty = 1
            }

            state.items.push(itemChange)
        }))
    })
), {name:"cart"}))

export default useCartStore