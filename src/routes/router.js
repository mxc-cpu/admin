import { getToken } from "../auth/login";
import { createRouter, createWebHashHistory } from "vue-router";

let routes = [
  {  path: "/",
    name: "/",
  
    component: () => import("../layout/Dashboard.vue"),
    redirect: "/Login",
  meta:{
    role:[1,2,3]
  }
  },
  {  path: "/Login",
  name: "Login",
 
  
component: () => import("../views/Login.vue"),
meta:{
  role:[1,2,3]
}
},
  {
    path: "/Admin",
    name: "Admin",
    component: () => import("../layout/Dashboard.vue"),
    redirect: "/AdminInfo",
    meta:{
      role:[1,2,3],
      title:"首页"
    },
    children: [
     
      {
        path: "/AdminInfo",
        name: "AdminInfo",
        component: () => import("../views/AdminInfo.vue"),
        
      },
      
    ],
  },
  {     path: '/404',       
  component: () => import('../views/404.vue'),       
  hidden: true     ,

}, 
{     path: '/403',       
component: () => import('../views/403.vue'),       
hidden: true     ,

}, 
//这个*匹配必须放在最后，将改路由配置放到所有路由的配置信息的最后，否则会其他路由path匹配造成影响。     
{     path: '/:pathMatch(.*)',
  redirect: '/404', 
  hidden: true ,

}
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});




router.beforeEach((to,from,next )=>{
    if (getToken()){
      next();
    }
    else{
       if(to.name=="Login"){
        next()
       }else{
      return next("Login")
     
       
       }
    }
});


export function resetRouter() {
  const newRouter=createRouter({
    history: createWebHashHistory(),
    routes,
  });
  router.matcher=newRouter.matcher
  
}


export { router, routes };
