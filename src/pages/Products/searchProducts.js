import { create } from 'zustand';

export const useSearchStore = create((set) => ({
    searchTerm: "",
    products: [],
    filtered: [],

    loadProducts: (productsArray) =>
        set({
            products: productsArray,
            filtered: productsArray,
        }),

    setSearch: (term) =>
        set((state) => {
            if (!term.trim()) {
                return { searchTerm: term, filtered: state.products };
            }
            const filtered = state.products.filter((p) =>
                p.title.toLowerCase().includes(term.toLowerCase())
            );
            return { searchTerm: term, filtered };
        }),
}));