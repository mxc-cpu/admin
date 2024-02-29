<template>
  <n-flex vertical>
    <n-card title="文章管理">
      <!-- <template #header-extra>
        <n-button type="primary" @click="showAddAdmin = true">
          添加管理员</n-button
        >
      </template> -->
    </n-card>
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
                    placeholder="输入标题"
                  />
                </n-form-item>

                <n-form-item label="id">
                  <n-input-number
                    :min="1"
                    v-model:value="userInfo.id"
                    placeholder="文章id"
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
              :bordered="false"
              :columns="columnsRef"
              :data="dataRef"
              :loading="loadingRef"
              :pagination="paginationReactive"
              :max-height="240"
              :scroll-x="1600"
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
  <!-- 查看文章的模型窗口 -->
  <n-modal
    :mask-closable="false"
    v-model:show="showDetail"
    @after-leave="Rest"
    preset="dialog"
    title="Dialog"
    @negative-click="cancelCallback"
    style="width: 1000px"
  >
    <template #header>
      <div>文章内容查看</div>
    </template>
    <div class="content">
      <h1>{{ title }}</h1>
      <html v-html="ArticleDealit"></html>
    </div>

    <template #action>
      <n-button @click="showDetail = false">以阅</n-button>
    </template>
  </n-modal>

  <!-- 头条添加的模型窗口 -->
  <n-modal
    :mask-closable="false"
    v-model:show="showAddHeadLine"
    @after-leave="Rest2()"
    preset="dialog"
    title="Dialog"
    @negative-click="cancelCallback"
    style="width: 900px; "
  >
    <template #header>
      <div>设为头条</div>
    </template>
    <n-form
      ref="formRef"
      :model="headLineModel"
      :rules="rules"
      :size="size"
      label-placement="top"
    >
      <n-grid :cols="24" :x-gap="24">
        <n-form-item-gi :span="12" label="名称" path="Title">
          <n-input v-model:value="headLineModel.Title" placeholder="Input" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="链接">
           <a :href="headLineModel.DescriptionURL" target="_blank">{{headLineModel.DescriptionURL}}</a>  
        </n-form-item-gi>

        <n-form-item-gi :span="12" label="上传封面">
          <div>
            <CropperImage
              @uploadimg="getAvatarURL"
              :original="true"
              :height="`111px`"
              :width="`333px`"
              :fixedNumber="[3,1]"
            ></CropperImage>
          </div>
        </n-form-item-gi>
      </n-grid>
    </n-form>
    <template #action>
      <n-button @click="submitHeadLineCallback()">提交</n-button>
      <n-button @click="showAddHeadLine = false ">取消</n-button>
    </template>
  </n-modal>
</template>

<script setup>
import { defineComponent, ref, reactive, onMounted, h } from "vue";
import {
  NButton,
  NCheckbox,
  useMessage,
  NTag,
  useDialog,
  NImage,
} from "naive-ui";
import { UploadHeadlineCover, AddHeadline } from "../api/headLineApi";
import CropperImage from "../components/CropperImage.vue";
import { loginState } from "../store/StoreLogin";
import { AddMessage } from "../api/messageApi";
const store = loginState();
const message = useMessage();
const dialog = useDialog();
const showDetail = ref(false);
const showAddHeadLine = ref(false);
const userInfo = reactive({
  name: "",
  id: "",
});
import {
  UserPageQuery,
  DelArticle,
  UnPublished,
  SetBoutique,
  getArticleDetail,
  GetUserByArticleId,
} from "../api/articleApi";

const type = ref("");
const tate = ref(false);
const filter = ref("");
const filterArr = ref([]);
const order = ref(true);

const headLineModel = reactive({
  Title: "",
  DescriptionURL: "",
  CoverUrl: "",
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

const isPublished = {
  title: "发布状态",
  key: "isPublished",
  fixed: "left",
  filter: true,
  filterOptionValue: null,
  filterMultiple: false,
  filterOptions: [
    {
      label: "发布",
      value: 1,
    },
    {
      label: "未发布",
      value: 0,
    },
  ],
  className: "text",
  render(row) {
    return h(
      NCheckbox,
      {
        size: "small",
        checked: row.isPublished,
      },
      {
        default: () => {
          if (row.isPublished) return "发布";
          else return "未发布";
        },
      }
    );
  },
};

const releaseData = {
  title: "发布时间",
  key: "releaseDate",
  className: "text",

  sorter: true,
  sortOrder: false,
};
const checkSum = {
  title: "浏览量",
  key: "checkSum",
  className: "text",

  sorter: true,
  sortOrder: false,
};
const commentSum = {
  title: "评论数",
  key: "commentSum",
  className: "text",

  sorter: true,
  sortOrder: false,
};
const upvoteSum = {
  title: "点赞数",
  key: "upvoteSum",
  className: "text",

  sorter: true,
  sortOrder: false,
};
const flux = {
  title: "流量",
  key: "flux",
  className: "text",

  sorter: true,
  sortOrder: false,
};
const isBoutique = {
  title: "是否精品",
  key: "isBoutique",
  fixed: "right",
  width: 80,
  filter: true,
  filterMultiple: false,
  filterOptionValue: null,
  filterOptions: [
    {
      label: "精品",
      value: 1,
    },
    {
      label: "普通文章",
      value: 0,
    },
  ],
  render(row) {
    return h(
      NTag,
      {
        size: "large",
      },
      {
        default: () => {
          return row.isBoutique ? "精品" : "非精品";
        },
      }
    );
  },
};
const BoutiqueRef = ref(0);
const columns = [
  Id,
  isPublished,
  {
    title: "标题",
    key: "title",
    className: "text",
  },

  {
    title: "作者",
    key: "authorName",
    className: "text",
  },
  {
    title: "封面",
    key: "imageUrl",

    render(row) {
      return h(NImage, {
        size: 35,
        src: row.imageUrl,
      });
    },
  },

  {
    title: "分区",
    key: "categoryName",
  },
  releaseData,
  checkSum,
  commentSum,
  upvoteSum,
  flux,
  isBoutique,
  {
    title: "查看",
    key: "see",
    className: "text",
    fixed: "right",
    width: 60,
    render(row) {
      return h(
        NButton,
        {
          type: "warning",
          size: "small",
          onClick: () => getDetail(row),
        },
        { default: "查看" }
      );
    },
  },
  {
    title: "撤文",
    key: "ation",
    className: "text",
    fixed: "right",
    width: 60,

    render(row) {
      return h(
        NButton,
        {
          tertiary: row.ban,

          type: "warning",
          size: "small",
          onClick: () => closePublished(row),
        },
        { default: "撤下" }
      );
    },
  },
  {
    title: "删除",
    key: "del",
    className: "text",
    fixed: "right",
    width: 60,

    render(row) {
      return h(
        NButton,
        {
          tertiary: row.ban,

          type: "warning",
          size: "small",
          onClick: () => delArticle(row),
        },
        { default: "删除" }
      );
    },
  },
  {
    title: "精品设置",
    key: "bo",
    className: "text-left",
    fixed: "right",
    width: 60,
    render(row) {
      return h(
        NButton,
        {
          onClick: () => {
            (row.isBoutique = !row.isBoutique),
              console.log("dd", row.id),
              setBoutique(row.id, row.isBoutique);
          },

          type: "error",
          size: "small",
        },
        { default: row.isBoutique ? "取消" : "成精" }
      );
    },
  },
  {
    title: "头条",
    key: "action",
    className: "text-left",
    fixed: "right",
    width: 90,
    render(row) {
      return h(
        NButton,
        {
          tertiary: row.ban,

          type: "warning",
          size: "small",
         onClick: () => AddHeadLine(row),
        },
        { default: "引为头条" }
      );
    },
  },
];

const dataRef = ref([]);
const loadingRef = ref(true);
const columnsRef = ref(columns);
const IdReactive = reactive(Id);

let ArticleDealit = reactive("");
let title = reactive("");

const releaseDataReactive = reactive(releaseData);
const checkSumReactive = reactive(checkSum);
const commentSumReactive = reactive(commentSum);
const upvoteSumReactive = reactive(upvoteSum);
const fluxReactive = reactive(flux);
const isBoutiqueReactive = reactive(isBoutique);
const isPublishedReactive = reactive(isPublished);
const paginationReactive = reactive({
  pageIndex: 1,
  pageCount: 1,
  pageSize: 10,
});

//初始化
function Rest() {
  console.log("dddx");
  ArticleDealit = "";
  title = "";
}
function Rest2() {
  (headLineModel.DescriptionURL = ""), (headLineModel.CoverUrl = "");
  headLineModel.Title = "";
}
//删除
const delArticle = (row) => {
  if (store.Role == 1) {
    dialog.warning({
      title: "删除文章",
      content: "你真的要删除？",
      positiveText: "认真的",
      negativeText: "开玩笑",
      maskClosable: false,
      onMaskClick: () => {
        message.success("请选择");
      },
      onPositiveClick: () => {
        DelArticle(row.id).then((res) => {
          if (res.data.success == true) {
            message.success(res.data.data);
            const s="亲爱的用户:"+row.authorName+ "你的文章"+row.title+"已经被管理员删除！"
            inform(row.id,s)
            loadingData(paginationReactive.pageIndex);
          } else {
            message.error(res.data.message + ":" + res.data.data);
          }
        });
      },
      onNegativeClick: () => {
        message.error("取消删除");
      },
    });
  } else {
    message.error("你没有该权限，做好自己的工作！");
  }
};
//撤下文章
const closePublished = (row) => {
  if (store.Role == 1) {
    dialog.warning({
      title: "撤下文章",
      content: "你真的撤下吗？",
      positiveText: "认真的",
      negativeText: "开玩笑",
      maskClosable: false,
      onMaskClick: () => {
        message.success("请选择");
      },
      onPositiveClick: () => {
        UnPublished(row.id).then((res) => {
          if (res.data.success == true) {
            message.success(res.data.data);
            const s="亲爱的用户:"+row.authorName+ "你的文章"+row.title+"已经被管理员撤下，请检查后发布"
            inform(row.id,s)
            
            loadingData(paginationReactive.pageIndex);
          } else {
            message.error(res.data.message + ":" + res.data.data);
          }
        });
      },
      onNegativeClick: () => {
        message.error("取消");
      },
    });
  } else {
    message.error("你没有该权限，做好自己的工作！");
  }
};

//设置精品
const setBoutique = (id, value) => {
  console.log("d", value);
  SetBoutique(id, value).then((res) => {
    if (res.data.success == true) {
      message.success(res.data.data);
      if(value){
      const s="亲爱的用户:"+row.authorName+ "你的文章"+row.title+"已经被管理员设为精品"
            inform(row.id,s)}
            else{
              const s="亲爱的用户:"+row.authorName+ "你的文章"+row.title+"已经被管理员取消精品"
            inform(row.id,s)
            }
      loadingData(paginationReactive.pageIndex);
    } else {
      message.error(res.data.message + ":" + res.data.data);
    }
  });
};
//获取文章详情
const getDetail = (row) => {
  getArticleDetail(row.id).then((res) => {
    if (res.data.success == true) {
      ArticleDealit = res.data.data;
      title = row.title;
      showDetail.value = true;
    } else {
      message.error(res.data.message + ":" + res.data.data);
    }
  });
};

//头条传值
let adminId = 0;
const AddHeadLine = (row) => {
  adminId = row.id;
  showAddHeadLine.value = true;

  headLineModel.DescriptionURL = "http://localhost:5173/#/Detail/" + row.id;

  headLineModel.Title = row.table;
};
//添加头条
const submitHeadLineCallback = () => {
  formRef.value?.validate((errors) => {
    if (!errors) {
      uploadadd(fileRef.value).then(() => {
        headLineModel.CoverUrl = temp.value;
        AddHeadline(headLineModel).then((res) => {
          if (res.data.success == true) {
            message.success(res.data.message + res.data.data);
            Rest2();
            showAddHeadLine.value = false;
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
//头条封面上传
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
      await UploadHeadlineCover(formData)
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
//用来标记判断筛选值是不是为1
let out = 0;
//过滤
const handleFiltersChange = async (filters) => {
  if (filters.isBoutique != null && out == 0) {
    if (!loadingRef.value) {
      // loadingRef.value = true;

      console.log("d", filterArr.value);
      tate.value = filters.isBoutique == 1 ? true : false;

      filter.value = "boutique";
      await loadingData(paginationReactive.pageIndex);
      isBoutiqueReactive.filterOptionValue = filters.isBoutique;
      isPublishedReactive.filterOptionValue = null;

      out += 1;
    }
  } else if (filters.isPublished != null) {
    if (!loadingRef.value) {
      loadingRef.value = true;

      console.log("d", filterArr.value);
      tate.value = filters.isPublished == 1 ? true : false;
      filter.value = "Published";
      loadingData(paginationReactive.pageIndex);
      isPublishedReactive.filterOptionValue = filters.isPublished;
      isBoutiqueReactive.filterOptionValue = null;
      filters.isBoutique = null;
      out = 0;
    }
  } else {
    if (!loadingRef.value) {
      //loadingRef.value = true;
      tate.value = false;
      filter.value = "";
      loadingData(paginationReactive.pageIndex);

      isBoutiqueReactive.filterOptionValue = null;
      isPublishedReactive.filterOptionValue = null;
      out = 0;
    }
  }
};
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
  if (!sorter || sorter.columnKey === "id") {
    if (!loadingRef.value) {
      loadingRef.value = true;
      order.value = sorter.order == "descend" ? false : true;
      type.value = sorter.columnKey;
      loadingData(paginationReactive.pageIndex);
      IdReactive.sortOrder = !sorter ? false : sorter.order;
      releaseDataReactive.sortOrder = false;
      checkSumReactive.sortOrder = false;
      commentSumReactive.sortOrder = false;
      upvoteSumReactive.sortOrder = false;
      fluxReactive.sortOrder = false;
    }
  }
  if (!sorter || sorter.columnKey === "releaseDate") {
    if (!loadingRef.value) {
      loadingRef.value = true;
      order.value = sorter.order == "descend" ? false : true;
      type.value = sorter.columnKey;
      loadingData(paginationReactive.pageIndex);
      releaseDataReactive.sortOrder = !sorter ? false : sorter.order;
      IdReactive.sortOrder = false;
      checkSumReactive.sortOrder = false;
      commentSumReactive.sortOrder = false;
      upvoteSumReactive.sortOrder = false;
      fluxReactive.sortOrder = false;
    }
  }
  if (!sorter || sorter.columnKey === "upvoteSum") {
    if (!loadingRef.value) {
      loadingRef.value = true;
      order.value = sorter.order == "descend" ? false : true;
      type.value = sorter.columnKey;
      loadingData(paginationReactive.pageIndex);
      upvoteSumReactive.sortOrder = !sorter ? false : sorter.order;
      IdReactive.sortOrder = false;
      releaseDataReactive.sortOrder = false;
      checkSumReactive.sortOrder = false;
      commentSumReactive.sortOrder = false;

      fluxReactive.sortOrder = false;
    }
  }
  if (!sorter || sorter.columnKey === "checkSum") {
    if (!loadingRef.value) {
      loadingRef.value = true;
      order.value = sorter.order == "descend" ? false : true;
      type.value = sorter.columnKey;
      loadingData(paginationReactive.pageIndex);
      checkSumReactive.sortOrder = !sorter ? false : sorter.order;
      IdReactive.sortOrder = false;
      releaseDataReactive.sortOrder = false;

      commentSumReactive.sortOrder = false;
      upvoteSumReactive.sortOrder = false;
      fluxReactive.sortOrder = false;
    }
  }
  if (!sorter || sorter.columnKey === "commentSum") {
    if (!loadingRef.value) {
      loadingRef.value = true;
      order.value = sorter.order == "descend" ? false : true;
      type.value = sorter.columnKey;
      loadingData(paginationReactive.pageIndex);
      commentSumReactive.sortOrder = !sorter ? false : sorter.order;
      IdReactive.sortOrder = false;
      releaseDataReactive.sortOrder = false;
      checkSumReactive.sortOrder = false;

      upvoteSumReactive.sortOrder = false;
      fluxReactive.sortOrder = false;
    }
  }
  if (!sorter || sorter.columnKey === "flux") {
    if (!loadingRef.value) {
      loadingRef.value = true;
      order.value = sorter.order == "descend" ? false : true;
      type.value = sorter.columnKey;
      loadingData(paginationReactive.pageIndex);
      fluxReactive.sortOrder = !sorter ? false : sorter.order;
      IdReactive.sortOrder = false;
      releaseDataReactive.sortOrder = false;
      checkSumReactive.sortOrder = false;
      commentSumReactive.sortOrder = false;
      upvoteSumReactive.sortOrder = false;
    }
  }
};
//通知
const  inform= async(id,value)=>{
  const info ={
  UserId:0,
  fromUser:0,
  typeName:"通知",
  articleId:0,
  messageDescription:value

  }
  info.UserId= (await GetUserByArticleId(id)).data.data;
console.log("id",info.UserId)
  AddMessage(info).then(res=>{
    if(res.data.success==true){
message.info("发送如下信息："+res.data.data)
  } })
}


//数据加载
const loadingData = async (currentPage) => {
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
  await UserPageQuery(info).then((res) => {
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
  Title: [
    { required: true, message: "请输入标题", trigger: "blur" },
    { min: 5, max: 20, message: "标题长度在5-20个字符", trigger: "blur" },
  ],
};

onMounted(() => {
  loadingData(1);
});

// import { useRouter } from "vue-router";
//  const router=useRouter()
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
