<template>
  <n-flex vertical>
    <n-card title="管理员管理">
      <template #header-extra>
        <n-button type="primary" @click="showAddAdmin = true">
          添加管理员</n-button
        >
      </template></n-card
    >
    <div style="margin: 10px">
      <n-card style="height: 540px">
        <n-flex vertical>
          <n-card style="height: 100px; background-color: aliceblue">
            <n-form
              ref="formRef"
              inline
              :label-width="80"
              :model="formValue"
              :rules="rules"
              :size="size"
            >
              <n-flex justify="space-between">
                <n-form-item label="姓名">
                  <n-input
                    v-model:value="userInfo.name"
                    placeholder="输入姓名"
                  />
                </n-form-item>

                <n-form-item label="id">
                  <n-input-number :min="1" v-model:value="userInfo.id" placeholder="用户id" />
                </n-form-item>

                <n-form-item>
                  <n-flex justify="space-between">
                    <n-button attr-type="button" type="error" @click="ReSearch">
                      重置
                    </n-button>
                    <n-button attr-type="button" type="primary" @click="Search">
                      搜索
                    </n-button>
                  </n-flex>
                </n-form-item>
              </n-flex>
            </n-form>
          </n-card>

          <n-card>
            <n-data-table
              remote
              ref="table"
              :bordered="false"
              :columns="columnsRef"
              :data="dataRef"
              :loading="loadingRef"
              :pagination="paginationReactive"
              :max-height="200"
              :scroll-x="1800"
              :row-key="rowKey"
              @update:sorter="handleSorterChange"
              @update:filters="handleFiltersChange"
              @update:page="handlePageChange"
            />
          </n-card>
        </n-flex>
      </n-card>
    </div>
  </n-flex>
  <!-- 添加用户的模型窗口 -->
  <n-modal
    :mask-closable="false"
    v-model:show="showAddAdmin"
    @after-leave="clearArticle"
    preset="dialog"
    title="Dialog"
    @negative-click="cancelCallback"
    style="width: 900px; height: 900px"
  >
    <template #header>
      <div>新增管理员</div>
    </template>
    <n-form
      ref="formRef"
      :model="AdminModel"
      :rules="rules"
      :size="size"
      label-placement="top"
    >
      <n-grid :cols="24" :x-gap="24">
        <n-form-item-gi :span="12" label="名称" path="Name">
          <n-input v-model:value="AdminModel.Name" placeholder="Input" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="账号" path="Account">
          <n-input v-model:value="AdminModel.Account" placeholder="Input" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="密码" path="Password">
          <n-input v-model:value="AdminModel.Password" placeholder="Input" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="角色">
          <n-select
            v-model:value="AdminModel.Role"
            placeholder="Select"
            :options="RoleOptions"
          />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="头像">
          <div>
            <CropperImage
              @uploadimg="getAvatarURL"
              :original="true"
              :height="`126px`"
              :width="`126px`"
            ></CropperImage>
          </div>
        </n-form-item-gi>
      </n-grid>
    </n-form>
    <template #action>
      <n-button @click="submitCallback">提交</n-button>
      <n-button @click="(showAddAdmin = false), Rest()">取消</n-button>
    </template>
  </n-modal>
  <!-- 修改用户的模型窗口 -->
  <n-modal
    :mask-closable="false"
    v-model:show="showAddAdmin1"
    @after-leave="clearArticle"
    preset="dialog"
    title="Dialog"
    @negative-click="cancelCallback"
    style="width: 900px; height: 900px"
  >
    <template #header>
      <div>修改管理员信息</div>
    </template>
    <n-form
      ref="formRef"
      :model="UpdateModel"
      :rules="rules"
      :size="size"
      label-placement="top"
    >
      <n-grid :cols="24" :x-gap="24">
        <n-form-item-gi :span="12" label="名称" path="Name">
          <n-input v-model:value="UpdateModel.Name" placeholder="Input" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="账号" path="Account">
          <n-input v-model:value="UpdateModel.Account" placeholder="Input" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="密码" path="Password">
          <n-input v-model:value="UpdateModel.Password" placeholder="Input" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="角色">
          <n-select
            v-model:value="UpdateModel.Role"
            placeholder="Select"
            :options="RoleOptions"
          />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="头像">
          <img class="image is-128x128" :src="UpdateModel.AvaterUrl" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="上传新头像">
          <div>
            <CropperImage
              @uploadimg="getAvatarURL"
              :original="true"
              :height="`126px`"
              :width="`126px`"
            ></CropperImage>
          </div>
        </n-form-item-gi>
      </n-grid>
    </n-form>
    <template #action>
      <n-button @click="submitUpdateCallback(adminId)">提交</n-button>
      <n-button @click="(showAddAdmin1 = false), Rest2()">取消</n-button>
    </template>
  </n-modal>
 
</template>

<script setup>
import { defineComponent, ref, reactive, onMounted, h } from "vue";
import { NButton, NCheckbox, useMessage, NAvatar, NTag,useDialog } from "naive-ui";
import {
  UserPageQuery,
  UploadAvatar,
  AddAdmin,
  UpdateInfo,
  DelAdmin,
} from "../api/getAdminApi.js";
import CropperImage from "../components/CropperImage.vue";

const message = useMessage();
const dialog=useDialog();
const showAddAdmin = ref(false);
const showAddAdmin1 = ref(false);
const userInfo = reactive({
  name: "",
  id: "",
});
//角色，直接写死3个，超管，管理员，审核
const Role = ["超级管理员", "管理员", "审核员"];
//管颜色而已
const Roletype = ["success", "warning", "info"];
const type = ref("");
const tate = ref(false);
const filter = ref("");
const filterArr = ref([]);
const order = ref(true);
const AdminModel = reactive({
  Name: "",
  Password: "",
  Role: 1,
  Account: "",
  AvaterUrl: "",
});
const UpdateModel = reactive({
  Name: "",
  Password: "",
  Role: 1,
  Account: "",
  AvaterUrl: "",
});
const RoleOptions = Role.map((v) => ({
  label: v,
  value: Role.indexOf(v) + 1,
}));
const Id = {
  title: "id",
  key: "id",
  className: "text",
  fixed: "left",
  width: 100,
  sorter: true,
  sortOrder: false,
};

const State = {
  title: "登录状态",
  key: "status",

  className: "text",
  render(row) {
    return h(
      NCheckbox,
      {
        size: "small",
        checked: row.status,
      },
      {
        default: () => {
          if (row.status) return "在线";
          else return "离线";
        },
      }
    );
  },
};

const AddTime = {
  title: "添加时间",
  key: "addTime",
  className: "text",

  sorter: true,
  sortOrder: false,
};

const AdminRole = {
  title: "角色",
  key: "role",
  fixed: "left",
  width: 110,
  filter: true,
  filterOptionValues: [],
  filterOptions: [
    {
      label: "超级管理员",
      value: 1,
    },
    {
      label: "管理员",
      value: 2,
    },
    {
      label: "审核员",
      value: 3,
    },
  ],
  render(row) {
    return h(
      NTag,
      {
        size: "large",
        type: Roletype[row.role - 1],
      },
      {
        default: () => {
          return Role[row.role - 1];
        },
      }
    );
  },
};

const columns = [
  Id,
  AdminRole,
  {
    title: "名字",
    key: "name",
    className: "text",
  },
  {
    title: "头像",
    key: "avatarUrl",

    render(row) {
      return h(NAvatar, {
        size: 35,
        src: row.avatarUrl,
      });
    },
  },

  {
    title: "账号",
    key: "account",
  },
  {
    title: "密码",
    key: "password",
  },
  AddTime,

  State,
  {
    title: "操作",
    key: "ation",
    className: "text",
    fixed: "right",
    width: 100,

    render(row) {
      return h(
        NButton,
        {
          tertiary: row.ban,

          type: "warning",
          size: "small",
          onClick: () => toUpdate(row),
        },
        { default: "修改" }
      );
    },
  },
  {
    title: "",
    key: "action",
    className: "text-left",
    fixed: "right",
    width: 100,
    render(row) {
      return h(
        NButton,
        {
          tertiary: row.ban,
onClick: ()=>delAdmin(row),
          type: "error",
          size: "small",
        },
        { default: "删除" }
      );
    },
  },
];

const dataRef = ref([]);
const loadingRef = ref(true);
const columnsRef = ref(columns);
const IdReactive = reactive(Id);
const AddTimeReactive = reactive(AddTime);
const AdminRoleReactive = reactive(AdminRole);
const paginationReactive = reactive({
  pageIndex: 1,
  pageCount: 1,
  pageSize: 10,
});

//初始化
function Rest() {
  (AdminModel.Account = ""), (AdminModel.AvaterUrl = "");
  (AdminModel.Name = ""), (AdminModel.Password = ""), (AdminModel.Role = 1);
}
function Rest2() {
  (UpdateModel.Account = ""), (UpdateModel.AvaterUrl = "");
  (UpdateModel.Name = ""), (UpdateModel.Password = ""), (UpdateModel.Role = 1);
}
//删除
const delAdmin=(row)=>{
  if (row.status){
message.info("超管好！该用户在线，不能删除，请等他下线")
  }else{
  dialog.warning({
          title: "删除管理员",
          content: "你真的要删除？",
          positiveText: "认真的",
          negativeText: "开玩笑",
          maskClosable: false,
          onMaskClick: () => {
            message.success("请选择");
          },
          onPositiveClick: () => {
           DelAdmin(row.id).then(res=>{
            if(res.data.success==true){
              message.success(res.data.data)
              loadingData(paginationReactive.pageIndex)
            }else{
              message.error(res.data.message+ ':'+res.data.data)
            }
           })
          },
          onNegativeClick: () => {
            message.error('取消删除')
          }
        });
}
  
}


//修改传值
let adminId = 0;
const toUpdate = (row) => {
  if (row.status){
message.info("超管好！该用户在线，不能修改,如果你是修改自己的数据请到个人中心进行修改")
  }else{
  adminId = row.id;
  showAddAdmin1.value = true;
  UpdateModel.Name = row.name;
  UpdateModel.Account = row.account;
  UpdateModel.AvaterUrl = row.avatarUrl;
  UpdateModel.Password = row.password;
  UpdateModel.Role = row.role;
  temp.value=row.avatarUrl;
  console.log("dd", UpdateModel.Account);}
};
const submitCallback = () => {
  formRef.value?.validate((errors) => {
    if (!errors) {
      uploadadd(fileRef.value).then(() => {
        AdminModel.AvaterUrl = temp.value;
        AddAdmin(AdminModel).then((res) => {
          if (res.data.success == true) {
            loadingData(paginationReactive.pageIndex);
            message.success("用户添加成功");
            Rest();
          } else {
            message.success("用户添加失败");
          }
        });
      });
    } else {
      console.log(errors);
    }
  });
};
const submitUpdateCallback = (id) => {
  formRef.value?.validate((errors) => {
    if (!errors) {
      uploadadd(fileRef.value).then(() => {
        UpdateModel.AvaterUrl = temp.value;
        UpdateInfo(id, UpdateModel).then((res) => {
          if (res.data.success == true) {
            loadingData(paginationReactive.pageIndex);
            message.success(res.data.message + res.data.data);
            Rest();
          } else {
            message.success(res.data.message + res.data.data);
          }
        });
      });
    } else {
      console.log(errors);
    }
  });
};

const fileRef = ref();
//接收子组件处理后图片的值
const getAvatarURL = (file) => {
  fileRef.value = file;
};
//头像上传
const temp = ref();
const uploadadd = async (image) => {
  if (image == null) {
    message.warning("注意没有上传图片");
  } else {
    const file = image;
    if (beforeUpload(file)) {
      let formData = new FormData();
      //将file存入formData key为image，名字必须和后端接口参数名统一
      formData.append("image", file);
      console.log("66", formData.get("image"));

      await UploadAvatar(formData)
        .then(async (response) => {
          console.log("Upload successful:", response);
          if (response.data.success == true) {
            message.success("上传成功");
            //更新url ，这个url是成功传到服务器的图片的url
            temp.value = await response.data.data;
          } else {
            temp.value = "";
            message.error("请重新上传");
          }
        })
        .catch((error) => {
          temp.value = "";
          console.error("Upload failed:", error);
        });
    }
  }
};
//图片上传检查
function beforeUpload(data) {
  if (
    data.type == "image/png" ||
    data.type == "image/jpg" ||
    data.type == "image/jpeg" ||
    data.type == "image/bmp"
  ) {
    return true;
  } else {
    message.error("只能上传png格式的图片文件，请重新上传");
    return false;
  }
}

const handleFiltersChange = (filters) => {
  if (filters.role != null) {
    if (!loadingRef.value) {
      loadingRef.value = true;

      filterArr.value = filters.role;
      console.log("d", filterArr.value);

      loadingData(paginationReactive.pageIndex);
      AdminRoleReactive.filterOptionValues = filterArr.value;
    }
  } else {
    if (!loadingRef.value) {
      loadingRef.value = true;
      filterArr.value = [];

      loadingData(paginationReactive.pageIndex);
      AdminRoleReactive.filterOptionValues = filterArr.value;
    }
  }
};

const Search = () => {
  if (!loadingRef.value) {
    loadingRef.value = true;

    loadingData(paginationReactive.pageIndex);
  }
};
const ReSearch = () => {
  userInfo.id = null;
  userInfo.name = "";

  if (!loadingRef.value) {
    loadingRef.value = true;

    loadingData(paginationReactive.pageIndex);
  }
};

function rowKey(rowData) {
  return rowData.Id;
}

const handleSorterChange = (sorter) => {
  console.log("d", sorter);
  if (!sorter || sorter.columnKey === "id") {
    if (!loadingRef.value) {
      loadingRef.value = true;
      order.value = sorter.order == "descend" ? false : true;
      type.value = sorter.columnKey;
      loadingData(paginationReactive.pageIndex);
      IdReactive.sortOrder = !sorter ? false : sorter.order;
      AddTimeReactive.sortOrder = false;
      LastLoginTimeReactive.sortOrder = false;
      EditTimeReactive.sortOrder = false;
      LoginTimesReactive.sortOrder = false;
      LastOfflineTimeReactive.sortOrder = false;
    }
  }
  if (!sorter || sorter.columnKey === "addTime") {
    if (!loadingRef.value) {
      loadingRef.value = true;
      order.value = sorter.order == "descend" ? false : true;
      type.value = sorter.columnKey;
      loadingData(paginationReactive.pageIndex);
      AddTimeReactive.sortOrder = !sorter ? false : sorter.order;
      IdReactive.sortOrder = false;
    }
  }
};
const loadingData = (currentPage) => {


  loadingRef.value = true;
  const info = {
    pageSize: paginationReactive.pageSize,
    pageIndex: currentPage,
    Search: userInfo.name,
    filter: filter.value,
    filterArr: filterArr.value,
    Id: Number(userInfo.id),
    type: type.value,
    Order: order.value,
    State: tate.value,
  };
  UserPageQuery(info).then((res) => {
    dataRef.value = res.data.data.dataList;
    paginationReactive.pageIndex = 1;
    paginationReactive.pageCount =
      parseInt(res.data.data.recordCount / paginationReactive.pageSize) +
      (res.data.data.recordCount % paginationReactive.pageSize > 0 ? 1 : 0);

    loadingRef.value = false;
  });
};
const handlePageChange = (currentPage) => {
  if (!loadingRef.value) {
    loadingRef.value = true;

    loadingData(currentPage);
  }
};

const formRef = ref(null);
let rules = {
  Account: [
    { required: true, message: "请输入账号", trigger: "blur" },
    { min: 6, max: 20, message: "账号长度在6-20个字符", trigger: "blur" },
  ],
  Password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 18, message: "密码长度在6-18个字符", trigger: "blur" },
  ],
  Name: [
    { required: true, message: "请输入姓名", trigger: "blur" },
    { min: 3, max: 6, message: "姓名长度在3-6个字符", trigger: "blur" },
  ],
};

onMounted(() => {
  loadingData(1);
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

<style lang="scss" scoped>
:deep(.text) {
  text-align: center;
}
:deep(.text-right) {
  text-align: left;
}
</style>
