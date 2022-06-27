import create from "zustand"
import { devtools, persist } from "zustand/middleware"
import { produce } from "immer"

const useAccountStore = create(persist(devtools(
    (set) => ({
        account : {},

        addAccount : (user) => set(produce((state) => {
            state.account = user
        })),

        removeAccount : () => set(produce((state) => {
            state.account = {}
        }))
    })
), {name:"account"}))

export default useAccountStore