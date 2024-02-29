<template>
  <div class="box">
    <n-card>
      <template #header class="container">
        <n-avatar
          style="display: block; height: 100px; width: 100px"
          class="container"
          round
          lazy
          :src="props.avatar"
          fallback-src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
        />
        <div class="has-text-centered is-three-fifths">
          <div>
            <!--用户名-->
            <p class="title is-3">&lt {{ props.userName }} &gt</p>
          </div>
        </div>
      </template>
      <template #default>
        <nav style="display: flexbox" class="level is-mobile">
          <div class="level-item has-text-centered is-three-fifths">
            <div>
              <p class="heading">获赞</p>
              <p class="title is-5">{{ props.upvoteSum }}</p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">文章</p>
              <p class="title is-5">{{ props.ArticleSum }}</p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">粉丝</p>
              <p class="title is-5">{{ props.fans }}</p>
            </div>
          </div>
        </nav>
      </template>
      <template #action>
        <div class="columns">
          <RouterLink class="column" :to="props.userArticleLink">
            <p
              class="title is-5 has-text-link has-text-centered"
              style="text-align: right"
            >
              我的文章
            </p>
          </RouterLink>
          <RouterLink class="column" :to="`/DynamicsUser/${props.userId}`">
            <p
              class="title is-5 has-text-link has-text-centered"
              style="text-align: right"
            >
              个人中心
            </p>
          </RouterLink>
        </div>
        <n-divider> </n-divider>

        <n-button
          v-if="userName != store.name1"
          @click="focus"
          block="true"
          color="#07ceaf"
          class="title is-5 has-text-link"
        >
          {{ focusState }}
        </n-button>

        <RouterLink to="/Editor" v-else>
          <n-button
            block="true"
            color="#07ceaf"
            class="title is-5 has-text-link"
          >
            博客管理
          </n-button>
        </RouterLink>
      </template>
    </n-card>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { DoubleLeftOutlined } from "@ant-design/icons-vue";
import { onBeforeUpdate, onMounted, reactive, ref } from "vue";
import { loginState } from "../store/StoreLogin";
import { router } from "../routes/router";
import { Addfouces, Delfouces ,QueryFocusUser} from "../api/DynamicsApi";
const focusState = ref("+关注");
const store = loginState();
const props = defineProps({
  avatar: {
    type: String,
    default: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
    required: true,
  },
  userId: {
    type: Number,
    default: 0,
    required: true,
  },
  userName: {
    type: String,
    default: "xxx",
    required: true,
  },

  upvoteSum: {
    type: Number,
    default: 20,
    required: true,
  },
  ArticleSum: {
    type: Number,
    default: 10,
    required: true,
  },
  fans: {
    type: Number,
    default: 200,
    required: true,
  },
  userArticleLink: {
    type: String,
    default: "/",
  },
});

const InitFocus=async()=>{
  if (store.InLogin) {
  const info = {
      focusID: props.userId,
      fansID: store.userId,
    };
    QueryFocusUser(info).then(res=>{
      if(res.data.success){
        if(!res.data.data){
          focusState.value="取消关注"
        }else{
          focusState.value="+关注"
        }
      }
    })
  }
}


const focus = () => {
  if (store.InLogin) {
    const info = {
      focusID: props.userId,
      fansID: store.userId,
    };
    console.log("dddfdsd", info);
    if (focusState.value !== "取消关注") {
      Addfouces(info)
        .then((res) => {
          if (res.data.success == true) {
            focusState.value = "取消关注";
          } else {
            consol.log("关注失败");
          }
        })
        .catch((error) => console.error(error));
    } else {
      Delfouces(info)
        .then((res) => {
          if (res.data.success == true) {
            focusState.value = "+关注";
          } else {
            consol.log("取消关注失败");
          }
        })
        .catch((error) => console.error(error));
    }
  } else {
    router.push("/login");
  }
};

onBeforeUpdate( () => {
  InitFocus();
});


</script>

<style lang="scss" scoped>
@import "bulma/sass/elements/_all.sass";
@import "bulma/sass/utilities/_all.sass";
@import "bulma/sass/components/_all.sass";
@import "bulma/sass/layout/_all.sass";
@import "bulma/sass/grid/_all.sass";
@import "bulma/sass/base/_all.sass";
@import "bulma/sass/helpers/_all.sass";
</style>
