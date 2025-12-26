import {create} from "zustand";


export const categoriesStore = create(set =>({
    category: "All",

    setCategory: cat=> set({category: cat})
}))