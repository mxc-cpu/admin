<template>
  <n-flex vertical>
    <n-card title="网站分区管理">
      <template #header-extra>
        <n-button type="primary" @click="showAddAdmin = true">
          添加分类</n-button
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
                <n-form-item label="分区名">
                  <n-input
                    v-model:value="userInfo.name"
                    placeholder="输入区名"
                  />
                </n-form-item>

                <n-form-item label="id">
                  <n-input-number
                    :min="1"
                    v-model:value="userInfo.id"
                    placeholder="分区id"
                  />
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
              :bordered="true"
            
              :single-line="false"
              :columns="columnsRef"
              :data="dataRef"
              :loading="loadingRef"
              :pagination="paginationReactive"
              :max-height="240"
              :scroll-x="1000"
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
      :model="CategoryModel"
      :rules="rules"
      :size="size"
      label-placement="top"
    >
      <n-grid :cols="24" :x-gap="24">
        <n-form-item-gi :span="12" label="名称" path="CategoryName">
          <n-input v-model:value="CategoryModel.CategoryName" placeholder="Input" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="描述" path="CategoryDescription">
          <n-input v-model:value="CategoryModel.CategoryDescription" placeholder="Input" />
        </n-form-item-gi>
  
        <n-form-item-gi :span="12" label="封面">
          <div>
            <CropperImage
              @uploadimg="getAvatarURL"
              :original="true"
              :height="`100px`"
              :width="`100px`"
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
      <div>修改分区信息</div>
    </template>
    <n-form
      ref="formRef"
      :model="UpdateModel"
      :rules="rules"
      :size="size"
      label-placement="top"
    >
    <n-grid :cols="24" :x-gap="24">
        <n-form-item-gi :span="12" label="名称" path="CategoryName">
          <n-input v-model:value="UpdateModel.CategoryName" placeholder="Input" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="描述" path="CategoryDescription">
          <n-input v-model:value="UpdateModel.CategoryDescription" placeholder="Input" />
        </n-form-item-gi>
  
        <n-form-item-gi :span="12" label="封面">
          <div>
            <CropperImage
              @uploadimg="getAvatarURL"
              :original="true"
              :height="`100px`"
              :width="`100px`"
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
import { NButton, NCheckbox, useMessage, NAvatar, NTag,useDialog,NImage } from "naive-ui";
import {
  UserPageQuery,
  DelCategory,
  AddCateGory,
  UploadCover,
  UpdateInfo,
} from "../api/categoryApi.js";
import CropperImage from "../components/CropperImage.vue";
const message = useMessage();
const dialog=useDialog();

const showAddAdmin = ref(false);
const showAddAdmin1 = ref(false);
const userInfo = reactive({
  name: "",
  id: "",
});
const type = ref("");
const tate = ref(false);
const filter = ref("");
const filterArr = ref([]);
const order = ref(true);
const CategoryModel = reactive({
  CategoryDescription: "",
  CategoryName: "",
  CategoryCover: "",
});
const UpdateModel = reactive({
  CategoryDescription: "",
  CategoryName: "",
  CategoryCover: "",
});

const Id = {
  title: "id",
  key: "id",
  className: "text",
  fixed: "left",
  width: 100,
  sorter: true,
  sortOrder: false,
};
const CategoryName = {
  title: "区名",
  key: "categoryName",
  width:160,
  className: "text",

};
const CategoryCover =  {
    title: "封面",
    key: "categoryCover",
width:80,
    render(row) {
      return h(NImage, {
        width : 100,
        src: row.categoryCover,
      });
    },
  };
const CategoryDescription= {
  title: "描述",
  width:300,
  key: "categoryDescription",
  className: "text",

};
const CategoryCount= {
  title: "文章数",
  key: "categoryCount",
  className: "text",
  width: 50,
};
const Update={
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
  };
  const Del={
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
onClick: ()=>delCategory(row),
          type: "error",
          size: "small",
        },
        { default: "删除" }
      );
    },
  };

const columns = [
  Id,
  CategoryName,
  CategoryCover,
  CategoryDescription,
  CategoryCount,
  Update,
  Del,
];

const dataRef = ref([]);
const loadingRef = ref(true);
const columnsRef = ref(columns);
const IdReactive = reactive(Id);
const paginationReactive = reactive({
  pageIndex: 1,
  pageCount: 1,
  pageSize: 10,
});

//初始化
function Rest() {
  (CategoryModel.CategoryCover = ""), (CategoryModel.CategoryDescription = "");
  (CategoryModel.CategoryName = "");
}
function Rest2() {
  (UpdateModel.Account = ""), (UpdateModel.AvaterUrl = "");
  (UpdateModel.Name = ""), (UpdateModel.Password = ""), (UpdateModel.Role = 1);
}
//删除
const delCategory=(row)=>{

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
            DelCategory(row.id).then(res=>{
            if(res.data.success==true){
              message.success(res.data.message+":"+res.data.data)
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



//用来接收是哪个分区的ID
let adminId=0;
const toUpdate = (row) => {
 
 if(row.id==1){message.warning("该区是未分类文章的归类区，请不要随意修改") }
  showAddAdmin1.value = true;
  UpdateModel.CategoryName = row.categoryName;
  UpdateModel.CategoryDescription = row.categoryDescription;
  UpdateModel.CategoryCover = row.categoryCover;
  temp.value=row.categoryCover;
  adminId=row.id
};
const submitCallback = () => {
  formRef.value?.validate((errors) => {
    if (!errors) {
      uploadadd(fileRef.value).then(() => {
        CategoryModel.CategoryCover = temp.value;
        AddCateGory(CategoryModel).then((res) => {
          if (res.data.success == true) {
            loadingData(paginationReactive.pageIndex);
            message.success("分区添加成功");
            Rest();
          } else {
            message.success("分区添加失败");
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
        UpdateModel.CategoryCover = temp.value;
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
//封面上传
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

      await UploadCover(formData)
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

//搜索
const Search = () => {
  if (!loadingRef.value) {
    loadingRef.value = true;

    loadingData(paginationReactive.pageIndex);
  }
};
//重置
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
//排序
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
};
//加载数据
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
  CategoryName: [
    { required: true, message: "请输入标题", trigger: "blur" },
    { min: 2, max: 15, message: "标题长度在2-15个字符", trigger: "blur" },
  ],
  CategoryDescription: [
    { required: true, message: "请输入描述", trigger: "blur" },
    { min: 6, max: 20, message: "描述长度在6-20个字符", trigger: "blur" },
  ],
 
};

onMounted(() => {
  loadingData(1);
});
// import { loginState } from "../store/StoreLogin";
// import { useRouter } from "vue-router";
// const store=loginState()
// const router=useRouter()
//路由守卫
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
