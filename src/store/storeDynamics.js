import { defineStore } from 'pinia';

export const DynamicsListStore = defineStore
    ('DynamicsList', {
        state: () => ({
            BlogdynamicsListInfo :{},
           BlogdynamicsListInfoMyself :{},
              
        })
    }
    )