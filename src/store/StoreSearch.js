import { defineStore } from 'pinia';

export const SearchListStore = defineStore
    ('SearchResult', {
        state: () => ({
            SearchResultData: {},
        })
    }
    )