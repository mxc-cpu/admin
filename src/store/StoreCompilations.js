import { defineStore } from 'pinia';
import { QueryAllUserCompilationsById } from "../api/CompilationsApi";

export const CompilationsListStore = defineStore
    ('CompilationsListStore', {
        state: () => ({
            CompilationsData: [],
           
            updateArticle:[]
        }), actions: {
            
             QueryCompilations(id) {
                 QueryAllUserCompilationsById(id).then((res) => {
                    if (res.data.success == true) {
                       this.CompilationsData =  res.data.data;
                       console.log("ddd",this.CompilationsData)

                    } else {
                      comsole.log("错误");
                    }
              
                  });

            }
        }
    }
    )