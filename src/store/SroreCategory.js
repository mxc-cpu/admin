import { defineStore } from 'pinia';

export const CategoryListStore = defineStore
    ('CategoryList', {
        state: () => ({
            CategoryListData: {},
        })
    }
    )