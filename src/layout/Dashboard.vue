<template v-if="showCard">
  <n-layout has-sider>
    <n-layout-sider bordered collapse-mode="width" style="width: 230px">
      <div
        class="hero is-primary"
        style="height: 85px; border: 1px solid #1be7b4; padding: 10px"
      >
        <h1 style="text-align: center; font-size: 40px">博客园后台</h1>
      </div>
      <n-menu  :options="menuOptions" />{{ store.Role }}
      <!-- <n-menu v-if="store.Role==2" :options="menuOptions2" /> -->
      <!-- <n-menu v-if="store.Role==3" :options="menuOptions3" /> -->
    </n-layout-sider>
    <n-layout embedded>
      <n-layout-header bordered><MyNavBar></MyNavBar></n-layout-header>
      <n-layout
        style="
          padding: auto;
          height: 633px;
          background-color: rgb(227, 237, 246);
        "
      >
        <n-dialog-provider>
          <n-message-provider>
            <n-loading-bar-provider>
              <router-view></router-view>
            </n-loading-bar-provider>
          </n-message-provider>
        </n-dialog-provider>
      </n-layout>
      <n-layout-footer style="padding: 24px" bordered>
        <MyFooter></MyFooter
      ></n-layout-footer>
    </n-layout>
  </n-layout>
</template>

<script setup>

import { ref, h } from "vue";
import { useRouter,  RouterLink } from "vue-router";
import { loginState } from "../store/StoreLogin";
import { GetRoleRoutePath } from "../api/RouterRoleApi";
import MyNavBar from "../components/MyNavBar.vue";
import MyFooter from "../components/MyFooter.vue";


const store = loginState();

const router = useRouter();

let menuOptions = ref([]);

async function routeInite() {

  console.log("role", store.Role);
  const result = (await GetRoleRoutePath(store.Role)).data.data;
  console.log("路由表：", result);
  result.forEach((e) => {
    // console.log("路由：", e.name);
    // router.addRoute("Admin", {
    //   path: e.path,
    //   name: e.name,
    //   component: () => import(`../views${e.component}`),
    // });
//添加菜单
    Array(menuOptions.value)[0].push({
      label: () =>
        h(
          RouterLink,
          {
            to: {
              name: e.name,
              params: {
                lang: "Zh",
              },
            },
          },
          { default: () => e.menuName }
        ),
      key: e.name,
    });
  });
  //所有人都有的菜单,插入到第一个
  Array(menuOptions.value)[0].splice(0,0,{
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "AdminInfo",
            params: {
              lang: "Zh",
            },
          },
        },
        { default: () => "个人中心" }
      ),
    key: "AdminInfo",
  });

  
  console.log("菜单", menuOptions.value);
}
routeInite();



//   {
//     label: () =>
//       h(
//         RouterLink,
//         {
//           to: {
//             name: "AdminInfo",
//             params: {
//               lang: "Zh",
//             },
//           },
//         },
//         { default: () => "个人中心" }
//       ),
//     key: "adminuser",
//   },

//         {
//       label: () =>
//           h(
//               RouterLink,
//               {
//                 to: {
//                   name: "UserManage",
//                   params: {
//                     lang: "Zh",
//                   },
//                 },
//               },
//               { default:"博客园用户管理" }
//             ),
//           key: "UserManage",
//         },
//         {
//       label: () =>
//           h(
//               RouterLink,
//               {
//                 to: {
//                   name: "ArticleManage",
//                   params: {
//                     lang: "Zh",
//                   },
//                 },
//               },
//               { default:"博客园博文管理" }
//             ),
//           key: "ArticleManage",
//         },
//         {
//       label: () =>
//           h(
//               RouterLink,
//               {
//                 to: {
//                   name: "ArticleCheckManage",
//                   params: {
//                     lang: "Zh",
//                   },
//                 },
//               },
//               { default:"精品博文申请审查" }
//             ),
//           key: "ArticleCheckManage",
//         },
//         {
//       label: () =>
//           h(
//               RouterLink,
//               {
//                 to: {
//                   name: "CategoryManage",
//                   params: {
//                     lang: "Zh",
//                   },
//                 },
//               },
//               { default:"博客园分区管理" }
//             ),
//           key: "CategoryManage",
//         },
//         {
//       label: () =>
//           h(
//               RouterLink,
//               {
//                 to: {
//                   name: "HeadLineManage",
//                   params: {
//                     lang: "Zh",
//                   },
//                 },
//               },
//               { default:"博客园头条管理" }
//             ),
//           key: "HeadLineManage",
//         },
//         {
//       label: () =>
//           h(
//               RouterLink,
//               {
//                 to: {
//                   name: "ImageCheckManage",
//                   params: {
//                     lang: "Zh",
//                   },
//                 },
//               },
//               { default:"博客园资源审查" }
//             ),
//           key: "ImageCheckManage",
//         },
//         {
//       label: () =>
//           h(
//               RouterLink,
//               {
//                 to: {
//                   name: "SensitiveWordsManage",
//                   params: {
//                     lang: "Zh",
//                   },
//                 },
//               },
//               { default:"博客园敏感字管理" }
//             ),
//           key: "SensitiveWordsManage",
//         },

// ]);
// let menuOptions3 = ref([
//   {
//     label: () =>
//       h(
//         RouterLink,
//         {
//           to: {
//             name: "AdminInfo",
//             params: {
//               lang: "Zh",
//             },
//           },
//         },
//         { default: () => "个人中心" }
//       ),
//     key: "adminuser",
//   },

//         {
//       label: () =>
//           h(
//               RouterLink,
//               {
//                 to: {
//                   name: "ArticleCheckManage",
//                   params: {
//                     lang: "Zh",
//                   },
//                 },
//               },
//               { default:"精品博文申请审查" }
//             ),
//           key: "ArticleCheckManage",
//         },

//         {
//       label: () =>
//           h(
//               RouterLink,
//               {
//                 to: {
//                   name: "ImageCheckManage",
//                   params: {
//                     lang: "Zh",
//                   },
//                 },
//               },
//               { default:"博客园资源审查" }
//             ),
//           key: "ImageCheckManage",
//         },
//         {
//       label: () =>
//           h(
//               RouterLink,
//               {
//                 to: {
//                   name: "SensitiveWordsManage",
//                   params: {
//                     lang: "Zh",
//                   },
//                 },
//               },
//               { default:"博客园敏感字管理" }
//             ),
//           key: "SensitiveWordsManage",
//         },

// ]);



// //路由守卫
// router.beforeEach((to, from, next) => {
//   console.log("beforeRouteEnter", to, from);
//   console.log("ss", Array(to.meta.role)[0], store.Role);
//   if (to.name == "/" || to.name == "Login" || to.name == "Admin") {
//     next();
//   } else {
//     if (Array(to.meta.role)[0].indexOf(store.Role) > -1) {
//       //权限控制的具体规则

//       next();
//     } else {
//       alert("暂无权限查看");
//       return next("403");
//     }
//   }
// });
</script>

<style lang="scss">
@import "bulma/sass/elements/_all.sass";
@import "bulma/sass/utilities/_all.sass";
@import "bulma/sass/components/_all.sass";
@import "bulma/sass/layout/_all.sass";
@import "bulma/sass/grid/_all.sass";
@import "bulma/sass/base/_all.sass";
@import "bulma/sass/helpers/_all.sass";
</style>
