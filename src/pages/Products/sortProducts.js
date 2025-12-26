import {create} from "zustand";

export const useSortProducts = create((set) => ({
    sortMethod : "",

    setSortMethod: (method) => set({ sortMethod : method }),
}))