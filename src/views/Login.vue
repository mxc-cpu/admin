<template>
        <n-card class="box login-panel " >
            <h1 class=" title container login-tiele-center">后台登录</h1>
            <n-divider />
            <n-form :rules="rules" :model="user">
               <n-form-item path="account" label="账号">
                  <n-input v-model:value="user.account" placeholder="请输入账号"/>
               </n-form-item>
               <n-form-item path="password" label="密码">
                  <n-input  type="password" show-password-on="mousedown" v-model:value="user.password" placeholder="请输入密码"/>
               </n-form-item>
               <n-form-item v-show="hidden" part="ip" >
                <n-input :input-props="{ type: 'hidden' }" v-model:value="user.ip" />
             </n-form-item>
            </n-form>
          <template #footer>
            <n-divider />
            <n-button class="container" color="#8a2be2" block="false" size="large" @click="login" style="width: 100px;" >登 录</n-button>
          </template>
        </n-card>
  
</template>

<script setup>

import{reactive ,onMounted,ref}from 'vue'
import { Base64 } from 'js-base64';

import { UserLoginStore } from '../store/StoreLogin';
import { useRouter } from 'vue-router';
const router=useRouter();
let rules={
  account:[
        {required:true,message:"请输入账号",trigger:"blur"},
        
         ],
   password:[
            {required:true,message:"请输入密码",trigger:"blur"},
            {min:3,max:18,message:"密码长度在3-18个字符",trigger:"blur"},
   ],  
};
 
 const user= reactive(
    {
        account:"",
        password:"",
        ip:sessionStorage.getItem('ip')
    },
    
 )


  const LoginStore=UserLoginStore() 
  // const Base64 = Base64();
  //引入64编码

 const login= async ()=>{
 
  await  LoginStore.UserLigonAuthorization(user);
 }




 
</script>

<style lang="scss" scoped>

@import "bulma/sass/utilities/_all.sass";
@import "bulma/sass/elements/box.sass";
@import "bulma/sass/elements/container.sass";
@import "bulma/sass/elements/title.sass";
.login-panel{
    width: 500px;
margin: 0 auto;
margin-top: 130px;

}
.login-tiele-center{

    text-align: center;
    letter-spacing: 20px;
}
</style>