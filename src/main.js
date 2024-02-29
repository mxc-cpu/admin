import './style.css'
import{router} from './routes/router'
import App from './App.vue'
import{  createPinia} from 'pinia'
import { createApp } from 'vue'
import {
  // create naive ui
  create,
  // component
  NButton,NInputGroup,NCard,NInput,NForm,NFormItem,NCheckbox,NDivider,NGrid,NGridItem,NSpace,NCarousel,NBreadcrumb,
  NBreadcrumbItem,NP,NH1,NH2,NLayout,NLayoutHeader,NLayoutContent,NLayoutFooter,NIcon,NCalendar,NDropdown,NLayoutSider,NImage,NList,NListItem,NThing,
  NEllipsis,NPagination,NTabs,NTabPane,NAvatar, NUpload, NMessageProvider, NSelect, NRadio, NCheckboxGroup, NSwitch, NMenu,NDialogProvider, NTable,NModal,NDataTable,NDatePicker,NRadioGroup,
  NCollapse,NCollapseItem,NDrawer, NDrawerContent,NPopselect,NFlex,NFormItemGi,NInputNumber,NSpin,NLoadingBarProvider,NResult,NTag
} from 'naive-ui'
import VueCropper from 'vue-cropper'; 
import 'vue-cropper/dist/index.css';

import { GetRoleRoutePath } from "../src/api/RouterRoleApi";



const naive = create({
    components: [NButton,NInputGroup,NCard,NInput,NForm,NFormItem,NCheckbox,NDivider,NGrid,NGridItem,NSpace,NCarousel,
      NBreadcrumb,NBreadcrumbItem,NP,NH1,NH2,NLayout,NLayoutHeader,NLayoutContent,NLayoutFooter,NIcon,NCalendar,NDropdown,NLayoutSider,NImage,NList,NListItem,NThing,
      NEllipsis,NPagination,NTabs,NTabPane,NAvatar,NUpload,NMessageProvider,NSelect,NRadio,NCheckboxGroup,NSwitch,NMenu,NDialogProvider,NTable ,NModal,NDataTable,NDatePicker,NRadioGroup,
      NCollapse ,NCollapseItem,NDrawer,NDrawerContent,NPopselect,NFlex,NFormItemGi,NInputNumber,NSpin,NLoadingBarProvider,NResult,NTag]
  })
  const app = createApp(App);
  app.use(VueCropper);
  app.use(naive);
  app.use(createPinia());
  import {loginState} from"../src/store/StoreLogin";
  const  store= loginState()
  //加载用户信息
  await store.changeState();
 //路由表添加
 const addRoute= async()=>{
const result = (await GetRoleRoutePath(store.Role)).data.data;
 result.forEach((e) => {
   console.log("路由：", e.name);
   router.addRoute("Admin", {
     path: e.path,
     name: e.name,
     component: () => import(`../views${e.component}`),
   });
 });
}

addRoute();
 


  app.use(router);
  app.mount('#app');



