<template>
  <n-card title="网站服务器日志">
    <template #header-extra>
      <n-button @click="getLog()">刷新</n-button>
    </template>
  </n-card>
  <article class="message is-danger my-0">
    <div class="message-header">
      <strong>错误:</strong>
    </div>
    <div class="message-body">
      <div style="display: flex; justify-content: flex-end">
        <n-input
         
          type="textarea"
          :placeholder="logError.error"
        />
      </div>
    </div>
  </article>
  <article class="message is-warning my-0">
    <div class="message-header">
      <strong>警告:</strong>
    </div>
    <div class="message-body">
      <div style="display: flex; justify-content: flex-end">
        <n-input
          
          type="textarea"
          :placeholder="logError.warn"
        />
      </div>
    </div>
  </article>
  <article class="message is-info my-0">
    <div class="message-header">
      <strong>调试:</strong>
    </div>
    <div class="message-body">
      <div style="display: flex; justify-content: flex-end">
        <n-input
          
          type="textarea"
          :placeholder="logError.debug"
        />
      </div>
    </div>
  </article>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { GetNLog } from "../api/fileApi";
import { useLoadingBar } from "naive-ui";
const loadingBar = useLoadingBar();
const logError = ref("");
const show = ref(false);
const getLog = () => {
  loadingBar.start();
  GetNLog().then((res) => {
    if (res.data.success == true) {
      logError.value = res.data.data;
      loadingBar.finish();
    } else {
      logError.value = res.data.data + res.data.error;
      loadingBar.error();
    }
  });
};

getLog();
onMounted(() => {
  //     setInterval(() => {
  //         getLog();
  //   }, 10000);
});
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

<style lang="scss" scoped></style>
