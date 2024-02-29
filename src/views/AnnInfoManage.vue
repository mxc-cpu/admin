<template>
 
    <n-card title="网站公告">
 
      
      </n-card
    >
    
      <article class="message is-success my-0">
        <div class="message-body">
          <strong>公告内容:</strong>
          <div style="display: flex; justify-content: flex-end">
            <span> {{ ModelInfo.content }} </span>:-
            <span> {{ ModelInfo.editTime }} </span>
            <n-button @click="showUpdatename = true" style="margin-left: auto"
              >编辑</n-button
            >
          </div>
        </div>
      </article>
     

      <n-modal
    :mask-closable="false"
    v-model:show="showUpdatename"
    @after-leave="clearArticle"
    preset="dialog"
    title="Dialog"
  >
    <template #header>
      <div>发布新公告</div>
    </template>
    <n-form ref="passRef" :rules="rules" :model="Model">
      <n-form-item path="" label="新内容">
        <n-input
          v-model:value="Model.content"
          type="text"
          placeholder="请输入内容"
        />
      </n-form-item>
    </n-form>
    <template #action>
      <div>
        <n-button :disabled="isAddcan" @click="updateConent">提交</n-button>
      </div>
    </template>
  </n-modal>
</template>

<script setup>
import {  ref, reactive, onUpdated, onMounted } from "vue";
import {
  GetAnn,
  UpdateAnn
} from "../api/AnnApi.js";


import { loginState } from "../store/StoreLogin";
import { useMessage, useDialog, timePickerDark } from "naive-ui";
import CropperImage from "../components/CropperImage.vue";



const message = useMessage();

const store = loginState();
const passRef = ref();

let showUpdatename = ref(false);





const Model=reactive(
 { content:""
 }
)

let ModelInfo = ref(
{
  content:'',
  editTime:''
}
);


let rules = {
  conent: [
    { required: true, message: "请输入内容", trigger: "blur" },
    { min: 5, max: 50, message: "内容长度在5-50个字符", trigger: "blur" },
    {
      validator: function checkSpecialKeyPath(rules, value, callback) {
        let specialKey =
          "[`~!#$^&*()=|{}';'<>?~！#￥……&*（）——|{}【】‘；”“'。，、？@·]‘'";
        for (let i = 0; i < str.length; i++) {
          if (specialKey.indexOf(str.substr(i, 1)) != -1) {
            callback(new Error("公告不能有特殊字符"));
          }
        }
        callback();
      },
    },
  ],
 
};




const updateConent = () => {

  
  UpdateAnn(Model.content).then((res) => {
    if (res.data.success == true) {
      message.success("更改成功");
     
      getInfo();
    } else {
      
      message.info("更改失败");
    }
  });
};
const  getInfo= async()=>{

ModelInfo .value  = await  GetAnn().then(res=>{
    if (res.data.success==true){
      return  res.data.data
      
    }
    
  })

 
}
onMounted(()=>{
  getInfo();
})

// import { useRouter } from "vue-router";

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
