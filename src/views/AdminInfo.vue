<template>
 
    <n-card title="个人信息">
 
      
      </n-card
    >
    
      <article class="message is-success my-0">
        <div class="message-body">
          <strong>名称:</strong>
          <div style="display: flex; justify-content: flex-end">
            <span> {{ name }} </span>
            <n-button @click="showUpdatename = true" style="margin-left: auto"
              >编辑</n-button
            >
          </div>
        </div>
      </article>
      <article class="message is-warning my-0">
        <div class="message-body">
          <strong>头像:</strong>
          <figure class="image is-128x128">
            <img :src="avatar" />
          </figure>
          <div style="display: flex; justify-content: flex-end">
            <n-button @click="showUpdateavater = true" style="margin-left: auto"
              >编辑</n-button
            >
          </div>
        </div>
      </article>
      <article class="message is-danger my-0">
        <div class="message-body"><strong>角色:</strong> {{ role }} </div>
      </article>
      <article class="message is-dark my-0">
        <div class="message-body"><strong>账号:</strong> {{ Account }}</div>
      </article>
      <article class="message is-link">
        <div class="message-body">
          <strong>密码:</strong>
          <div style="display: flex; justify-content: flex-end">
            <span> *********** </span>
            <n-button
              @click="showUpdatpassword = true"
              style="margin-left: auto"
              >编辑</n-button
            >
          </div>
        </div>
      </article>

 


  <n-modal
    :mask-closable="false"
    v-model:show="showUpdateavater"
    @after-leave="clearArticle"
    preset="dialog"
    title="Dialog"
   
  >
    <template #header>
      <div>修改头像</div>
    </template>
    <div>
      <div>
            <CropperImage
              @uploadimg="getAvatarURL"
              :original="true"
              :height="`126px`"
              :width="`126px`"
            ></CropperImage>
          </div>
    </div>

    <template #action>
      <n-button @click="submitCallback">提交</n-button>
      <n-button @click="(showUpdateavater = false)">取消</n-button>
    </template>


  </n-modal>
  <n-modal
    :mask-closable="false"
    v-model:show="showUpdatpassword"
    @after-leave="clearArticle"
    preset="dialog"
    title="Dialog"
  >
    <template #header>
      <div>更改密码</div>
    </template>
    <n-form ref="passRef" :rules="rules" :model="updatePad">
      <n-form-item path="oldPad" label="旧密码">
        <n-input
         
          show-password-on="mousedown"
          v-model:value="updatePad.oldPad"
          placeholder="请输入密码"
        />
      </n-form-item>
      <n-form-item path="newPad" label="新密码">
        <n-input
          type="password"
          show-password-on="mousedown"
          v-model:value="updatePad.newPad"
          placeholder="请输入密码"
        />
      </n-form-item>
      <n-form-item path="rePad" label="重复密码">
        <n-input
          type="password"
          show-password-on="mousedown"
          v-model:value="updatePad.rePad"
          placeholder="请再次输入密码"
        />
      </n-form-item>
    </n-form>
    <template #action>
      <div>
        <n-button :disabled="isAddcan" @click="handleValidateButtonClick"
          >提交</n-button
        >
      </div>
    </template> </n-modal
  ><n-modal
    :mask-closable="false"
    v-model:show="showUpdatename"
    @after-leave="clearArticle"
    preset="dialog"
    title="Dialog"
  >
    <template #header>
      <div>修改名字</div>
    </template>
    <n-form ref="passRef" :rules="rules" :model="namemodle">
      <n-form-item path="name" label="新名称">
        <n-input
          v-model:value="namemodle.name"
          type="text"
          placeholder="请输入名称"
        />
      </n-form-item>
    </n-form>
    <template #action>
      <div>
        <n-button :disabled="isAddcan" @click="updateName">提交</n-button>
      </div>
    </template>
  </n-modal>
</template>

<script setup>
import {  ref, reactive, onUpdated, onMounted } from "vue";
import {
  UpdateAvatar,
  UploadAvatar,
  UpdatePassWord,
  UpdateName
} from "../api/getAdminApi";


import { loginState } from "../store/StoreLogin";
import { useMessage, useDialog } from "naive-ui";
import CropperImage from "../components/CropperImage.vue";



const message = useMessage();
const dialog = useDialog();
const store = loginState();
const passRef = ref();

let showUpdatename = ref(false);
let showUpdateavater = ref(false);
let showUpdatpassword = ref(false);

const updatePad = reactive({
  oldPad: "",
  newPad: "",
  rePad: "",
});



let Account = ref("");
let avatar = ref();
let name = ref("");
let role=ref("");
let namemodle = reactive({
  name: "",
});
let rules = {
  name: [
    { required: true, message: "请输入姓名", trigger: "blur" },
    { min: 3, max: 10, message: "姓名长度在3-10个字符", trigger: "blur" },
    {
      validator: function checkSpecialKeyPath(rules, value, callback) {
        let specialKey =
          "[`~!#$^&*()=|{}';'<>?~！#￥……&*（）——|{}【】‘；”“'。，、？@·]‘'";
        for (let i = 0; i < str.length; i++) {
          if (specialKey.indexOf(str.substr(i, 1)) != -1) {
            callback(new Error("姓名不能有特殊字符"));
          }
        }
        callback();
      },
    },
  ],
  oldPad: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 18, message: "密码长度在6-18个字符", trigger: "blur" },
  ],
  newPad: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 18, message: "密码长度在6-18个字符", trigger: "blur" },
  ],
  rePad: [
    {
      required: true,
      message: "请再次输入密码",
      trigger: ["input", "blur"],
    },

    {
      validator: function validatePasswordSame(rule, value, callback) {
        if (value !== updatePad.newPad) {
          console.log("11", value);
          console.log("00", updatePad.newPad);
          callback(new Error("两次输入密码不一致!"));
        } else {
          callback();
        }
      },

      trigger: "blur",
    },
  ],
};

const handleValidateButtonClick = (e) => {
  e.preventDefault();
  passRef.value?.validate((errors) => {
    if (!errors) {
      updatePassWord();
    } else {
      console.log(errors);
      message.error("验证失败");
    }
  });
};
//名字的更新验证
const handleValidateButtonClick2 = (e) => {
  e.preventDefault();
  passRef.value?.validate((errors) => {
    if (!errors) {
      updateName();
    } else {
      console.log(errors);
      message.error("验证失败");
    }
  });
};





 //角色，直接写死3个，超管，管理员，审核
   
const RoleConst=["超级管理员", "管理员", "审核员"];

const getInfo =  () => {


  Account.value = store.account;
  avatar.value = store.avatarUrl,
    name.value = store.name1,
  
    role.value = RoleConst[store.Role-1];

  
};
const fileRef = ref("");
//接收子组件处理后图片的值
const getAvatarURL = (file) => {
  fileRef.value = file;
  console.log("URL2",file)
  console.log("URL",fileRef.value)
};
const submitCallback=()=>{
  let formData = new FormData();
      //将file存入formData key为image，名字必须和后端接口参数名统一
      formData.append("image", fileRef.value);
    

  UploadAvatar(formData).then(res=>{if(res.data.success==true){
    const info ={
    AvaterUrl:res.data.data,
    Id:store.userId
  }
  store.avatarUrl = info.AvaterUrl;
    
  UpdateAvatar(info).then(res=>{if(res.data.success==true){

    message.success(res.data.data)
    getInfo();
  }else{
    message.error(res.data.data+res.data.message)
  }
})
    
  }else{
    message.error(res.data.data+res.data.message)
  }
})
 
}

const updatePassWord = () => {
  const info = {
    Id: store.userId,
    Password: updatePad.oldPad,
    NewPassword: updatePad.newPad,
  };
  UpdatePassWord(info).then((res) => {
    if (res.data.success == true) {
      message.success("更改成功");
    } else {
      message.info("更改失败" + res.data.data);
    }
  });
};
const updateName = async() => {
  name.value = namemodle.name;
  const info= {
    name:name.value,
    Id:store.userId
  }
 
 await UpdateName(info ).then((res) => {
    if (res.data.success == true) {
      message.success("更改成功");
      name.value = namemodle.name;
    
      store.name1 = name.value;
     
      getInfo();
  
    } else {
      name.value = store.name1;
      message.info("更改失败");
    }
  });

  
 
};
onUpdated(()=>{
  getInfo();
})
onMounted(()=>{
  getInfo();
})




</script>

<style lang="scss" scoped></style>
