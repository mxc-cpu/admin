<template>
    <n-card title="网站敏感字">  
        <template #header-extra>
        <n-button type="primary" @click="SensitiveWords=''; show=true">
            添加敏感字</n-button
          >
        </template>
 </n-card>
 <article class="message is-success my-0"  >
    <div class="message-header">
        <strong>敏感字:</strong>
  </div>
        <div  class="message-body"  >
          
          <div style="display: flex; justify-content: flex-end">
            <n-input
      v-model:value="SensitiveWords"
      :disabled="!show"
      type="textarea"
     
      :placeholder="'不同的词用 | 分割：'+ SensitiveWords"
    />
          </div>
           <div style=" display: block; position:relative; height: 40px;">
            <n-button class="my-3"   style=" position: absolute;  right: 5px; " type="primary" v-show="show" @click="  Update()">
            提交</n-button>
        </div>
        </div>
     
    
      </article>
 
</template>

<script setup>

import { ref,onMounted } from "vue";
import {GetSensitiveWords,UpdateSensitiveWords} from "../api/fileApi"
import { useMessage } from "naive-ui";
const SensitiveWords=ref("")
const message=useMessage()
const show=ref(false)
const getSensitiveWords=()=>{
    GetSensitiveWords().then(res=>{
        if(res.data.success==true){
            SensitiveWords.value=res.data.data
        }else{
            SensitiveWords.value=res.data.data
        }
    })
}

const Update =()=>{
   
    if (SensitiveWords.value!=''){
    UpdateSensitiveWords(SensitiveWords.value).then(res=>{
        if (res.data.success==true){
            message.success(res.data.data+res.data.message)
            show.value=false;
            getSensitiveWords();
            
        }else{
            message.success(res.data.data+res.data.message)
            show.value=false;
            getSensitiveWords();
        }
    })
}else{
    show.value=false;
    getSensitiveWords();
}
}

onMounted(()=>{
    getSensitiveWords()
})
// import { loginState } from "../store/StoreLogin";
// import { useRouter } from "vue-router";
// const store=loginState()
// const router=useRouter()
// //路由守卫
// router.beforeEach((to,from,next)=>{
  
//   console.log('beforeRouteEnter',to,from);
//   console.log('ss',Array( to.meta.role)[0] ,store.Role);
//   if(to.name=="/"||to.name=="Login"||to.name=="Admin"){next()}

//  else{ if(Array( to.meta.role)[0].indexOf(store.Role) > -1 ){ 
//         //权限控制的具体规则
//         next()
//       }else{
        
//         alert('暂无权限查看')
//         return next("403")
//       }
//     }
// })

</script>

<style lang="scss" scoped>

</style>