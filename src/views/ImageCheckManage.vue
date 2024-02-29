<template>
  <n-flex vertical>
    <n-card title="网站图片资源审查">
      <template #header-extra>
          <n-button type="primary" @click="delPast">
            删除多余资源</n-button
          >
        </template>  
    </n-card>
    <n-grid x-gap="12" :cols="3">
      <n-gi v-for="(item,index) in imageS" :key="index">
        <n-card :title="item.name">
    <template #cover>
      <n-spin  :show="(index===show)">
        <n-image 
         lazy
         :intersection-observer-options="{
        root: '#image-scroll-container'
      }"
      
    width="100"
    :src="item.url"
    fallback-src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
  />

      <template #description>
        等待那一刻
      </template>
    </n-spin>

    </template>
    <template #action>
     <n-button  strong secondary type="error" @click="delFile(item.name),show=index"> 剔除</n-button>
    </template>
  </n-card>
    
    
    
    </n-gi>
    </n-grid>
  </n-flex>
</template>
<script setup>
import {GetFile,DelFile,DelPast} from "../api/fileApi"
import { onMounted, ref } from "vue";
import { useMessage,useLoadingBar } from "naive-ui";
const loadingBar = useLoadingBar()
const message=useMessage()
let imageS=ref()
//加载
const show=ref(-2)
const getimageAll=()=>{
    GetFile().then(res=>{
        if (res.data.success==true){
            imageS.value= res.data.data
            show.value=false
        }
      
    })
}
const delPast=(()=>{
  loadingBar.start()
 
  DelPast().then(res=>{
    if(res.data.success==true){
      message.info(res.data.data+res.data.message)
      getimageAll();
      loadingBar.finish()
    }else{
      message.error(res.data.data+res.data.message)
      show.value=false
      loadingBar.error()
    }
  })
})
onMounted(()=>{
  getimageAll()
})

const delFile=(path)=>{
  show.value=true
  DelFile(path).then(res=>{
    if(res.data.success==true){
      message.info(res.data.data+res.data.message)
      getimageAll();
      
    }else{
      message.error(res.data.data+res.data.message)
      show.value=false
    }
  })
}
// import { loginState } from "../store/StoreLogin";
// import { useRouter } from "vue-router";
// const store=loginState()
// const router=useRouter()
//路由守卫
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

<style lang="scss" scoped></style>
