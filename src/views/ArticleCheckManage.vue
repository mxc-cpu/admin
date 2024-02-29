<template>
  <n-flex vertical>
    <n-card title="精品文章审查"> </n-card>
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
                  <n-input-number
                    :min="1"
                    v-model:value="userInfo.id"
                    placeholder="用户id"
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
              :max-height="200"
              :scroll-x="700"
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
  <a href=""></a>
</template>

<script setup>
import { defineComponent, ref, reactive, onMounted, h } from "vue";
import {
  NButton,
  NCheckbox,
  useMessage,
  NAvatar,
  NTag,
  useDialog,
} from "naive-ui";
import { SetBoutique, ArticleCheckPageQuery } from "../api/articleApi.js";
import { AddMessage } from "../api/messageApi";
import CropperImage from "../components/CropperImage.vue";
const message = useMessage();
const dialog = useDialog();
const showAddAdmin = ref(false);

const userInfo = reactive({
  name: "",
  id: "",
});

const type = ref("");
const tate = ref(false);
const filter = ref("");
const filterArr = ref([]);
const order = ref(true);

const Id = {
  title: "id",
  key: "id",
  className: "text",
  fixed: "left",
  width: 100,
  sorter: true,
  sortOrder: false,
};
const Title = {
  title: "标题",
  key: "Title",
  className: "text",
  render(row) {
    return h(
      "a",
      {
        href: `http://localhost:5173/#/Detail/${row.articleId}`,
        target: "_blank",
      },
      row.title
    );
  },
};

const userId = {
  title: "作者ID",
  key: "userId",
  className: "text",
};
const authorName = {
  title: "作者",
  key: "authorName",
  className: "text",
  render(row) {
    return h(
      "a",
      {
        href: `http://localhost:5173/#/ArticleListByuser/${row.userId}`,
        target: "_blank",
      },
      row.authorName
    );
  },
};

const articleId = {
  title: "文章ID",
  key: "articleId",
  className: "text",
};
const DateTime = {
  title: "申请日期",
  key: "dateTime",
  className: "text",
  sorter: true,
  sortOrder: false,
};
const pass = {
  title: "操作",
  key: "ation",
  className: "text",
  fixed: "right",
  width: 100,

  render(row) {
    return h(
      NButton,
      {
        type: "warning",
        size: "small",
        onClick: () => changeBoutique(row, true),
      },
      { default: "通过" }
    );
  },
};

const NoPass = {
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
        onClick: () => changeBoutique(row, false),
        type: "error",
        size: "small",
      },
      { default: "否决" }
    );
  },
};
const columns = [Id, Title, authorName, DateTime, pass, NoPass];

const dataRef = ref([]);
const loadingRef = ref(true);
const columnsRef = ref(columns);
const IdReactive = reactive(Id);
const AddTimeReactive = reactive(DateTime);

const paginationReactive = reactive({
  pageIndex: 1,
  pageCount: 1,
  pageSize: 10,
});

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
    }
  }
  if (!sorter || sorter.columnKey === "dateTime") {
    if (!loadingRef.value) {
      loadingRef.value = true;
      order.value = sorter.order == "descend" ? false : true;
      type.value = "releaseDate";
      loadingData(paginationReactive.pageIndex);
      AddTimeReactive.sortOrder = !sorter ? false : sorter.order;
      IdReactive.sortOrder = false;
    }
  }
};

//通知
const  inform= async(id,value)=>{
  const info ={
  UserId:id,
  fromUser:0,
  typeName:"通知",
  articleId:0,
  messageDescription:value

  }
await  AddMessage(info).then(res=>{
    if(res.data.success==true){
      message.info("发送如下信息："+res.data.data)
  } })
}

const changeBoutique = (row, value) => {
  SetBoutique(row.articleId, value).then(async(res) => {
    if (res.data.success == true) {
      message.info("审批完成，" + res.data.message + ":" + res.data.data);

      if(value){
      const s="亲爱的用户:"+row.authorName+ "你的文章《"+row.title+"》精品申请，已经通过"
         await inform(row.userId,s)}
            else{
              const s="亲爱的用户:"+row.authorName+ "你的文章《"+row.title+"》精品申请，被否决了，请继续努力"
          await     inform(row.userId,s)
            }
loadingData(paginationReactive.pageIndex)

    } else {
      message.error("审批出错，" + res.data.message + ":" + res.data.data);
    }
    loadingData(paginationReactive.currentPage);
  });
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
  ArticleCheckPageQuery(info).then((res) => {
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
