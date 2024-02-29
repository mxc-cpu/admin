<template>
  <nav
    class="navbar is-spaced has-shadow"
    role="navigation"
    style="height: 85px;"
    aria-label="main navigation"
  >
    <div class="container">
      <div class="navbar-brand">
        <a class="navbar-item" href="http://localhost:5173/#/ArticleList" >
          <img 
            src="https://localhost:7112//blogIcon.png"
            width="112"
            height="28"
          />
          <!-- "https://bulma.io/images/bulma-logo.png" -->
  
        </a>
   
        
      </div >
      <!-- <div class="navbar-brand" style="padding-top:14px ;">
      <n-breadcrumb>
    <n-breadcrumb-item>
      <n-icon :component="MdCash" /> 首页</n-breadcrumb-item>
    <n-breadcrumb-item>
      <n-icon :component="MdCash" /> {{$route.meta.title}}</n-breadcrumb-item>
  </n-breadcrumb>
</div> -->
      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-end">
          <div class="has-text-right">
            <div class="buttons">
              <div class="media">
                  <div class="media-left">
                    <p>
                      <strong style=" text-align: center; font-size: 30px;"> {{ Name }}</strong>
                    </p>
                  </div>
                </div>
              <div class="content" >
                <n-dropdown :options="options" >
                  <n-avatar
                    round
                    object-fit="cover"
                    :size="50"
                    :src="avatarUrl"
                    fallback-src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
                  ></n-avatar>
                
                </n-dropdown>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { onMounted, ref, onBeforeUpdate,reactive ,watch} from "vue";
import { loginState, UserLoginStore } from "../store/StoreLogin";

import { RouterLink, useRoute, useRouter } from "vue-router";
import { CategoryListStore } from "../store/SroreCategory";
import { router } from "../routes/router";


const userLoginstore = UserLoginStore();
const userState = loginState();
const categoryStore = CategoryListStore();
const route=useRouter();
let avatarUrl = ref();
let Name = ref();
let state = ref();
let userId = ref();
watch(userState, (newValue, oldValue) => {
  state.value = userState.InLogin;
  Name.value = userState.name1;
  userId.value = userState.userId;
  avatarUrl.value = userState.avatarUrl;
    });



onBeforeUpdate(async () => {

  state.value = userState.InLogin;
  Name.value = userState.name1;
  userId.value = userState.userId;
  avatarUrl.value = userState.avatarUrl;
});
onMounted(async () => {
 
  state.value =  userState.InLogin;
  Name.value = userState.name1;
  userId.value = userState.userId;
  avatarUrl.value = userState.avatarUrl;
  console.log("namess",userState.name1)
});

const options = reactive([
  {
    label: '个人资料',
    key: 'profile',
  
    props: {
            onClick: () => {
              route.push("/AdminInfo")
            }
          }
  },
  {
    label: '退出登录',
    key: 'logout',
    props: {
            onClick: () => {
              userLoginstore.logOut()
            }
          }
  },
])



</script>

<style lang="scss"></style>
