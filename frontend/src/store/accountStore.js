import create from "zustand"
import { devtools, persist } from "zustand/middleware"
import { produce } from "immer"

export default accountStore = create(persist(devtools(
    (set) => ({
        account : {},

        addAccount : (user) => set(produce((state) => {
            state.account.email = user.email
        })),
    })
), {name:"account"}))