<template>
  <n-flex vertical>
    <n-card title="用户管理"></n-card>
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
              :single-line="false"
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
</template>
<script setup>
import { ref, reactive, onMounted, h } from "vue";
import { NButton, NCheckbox, useMessage, NAvatar } from "naive-ui";
import { UserPageQuery, UnBan, IsBan } from "../api/getUserInfoApi";
const message = useMessage();
const userInfo = reactive({
  name: "",
  id: "",
});
const type = ref("");
const tate = ref(false);
const filter = ref("");
const order = ref(true);
const Id = {
  title: "id",
  key: "id",
  className: "text",
  fixed: "left",
  width: 80,
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
const Ban = {
  title: "封禁状态",
  key: "ban",
  fixed: "right",
  className: "text",
  width: 90,
  filter: true,
  filterMultiple: false,
  filterOptionValue: null,
  filterOptions: [
    {
      label: "封禁",
      value: "true",
    },
    {
      label: "正常",
      value: "false",
    },
  ],
  render(row) {
    return h(
      NCheckbox,
      {
        size: "small",
        checked: row.ban,
      },
      {
        default: () => {
          if (row.ban) return "封禁";
          else return "正常";
        },
      }
    );
  },
};
const BanReactive = reactive(Ban);
const Sex = {
  title: "性别",
  key: "sex",
  className: "text",
  width: 90,
};
const AddTime = {
  title: "注册时间",
  key: "addTime",
  className: "text",
  sorter: true,
  sortOrder: false,
};
const LastLoginTime = {
  title: "最后上线时间",
  key: "lastLoginTime",
  className: "text",
  sorter: true,
  sortOrder: false,
};
const LoginTimes = {
  title: "登录次数",
  key: "loginTimes",
  className: "text",
  sorter: true,
  sortOrder: false,
};
const LastOfflineTime = {
  title: "最后一次离线时间",
  key: "lastOfflineTime",
  className: "text",
  sorter: true,
  sortOrder: false,
};
const EditTime = {
  title: "修改信息时间",
  key: "editTime",
  className: "text",
  sorter: true,
  sortOrder: false,
};
const columns = [
  Id,
  {
    title: "IP",
    key: "ip",
    className: "text",
  },
  Sex,
  {
    title: "名字",
    key: "name",
    className: "text",
  },
  {
    title: "头像",
    key: "avatarUrl",
    width: 85,
    render(row) {
      return h(NAvatar, {
        round: true,
        size: 60,
        src: row.avatarUrl,
      });
    },
  },
  {
    title: "邮箱",
    key: "email",
    width: 160,
  },
  State,
  AddTime,
  EditTime,
  LoginTimes,
  LastLoginTime,
  LastOfflineTime,
  Ban,
  {
    title: "操作",
    key: "id",

    fixed: "right",
    width: 120,
    render(row) {
      return h(
        NButton,
        {
          tertiary: row.ban,

          type: "error",
          size: "small",
          onClick: () => ban(row.id, row.ban),
        },
        {
          default: () => {
            if (row.ban) return "解禁";
            else return "封禁";
          },
        }
      );
    },
  },
];
const dataRef = ref([]);
const loadingRef = ref(true);
const columnsRef = ref(columns);
const IdReactive = reactive(Id);
const AddTimeReactive = reactive(AddTime);
const LastLoginTimeReactive = reactive(LastLoginTime);
const LoginTimesReactive = reactive(LoginTimes);
const EditTimeReactive = reactive(EditTime);
const LastOfflineTimeReactive = reactive(LastOfflineTime);
// const StateReactive = reactive(State);
const paginationReactive = reactive({
  pageIndex: 1,
  pageCount: 1,
  pageSize: 10,
});
const ban = (id, type) => {
  if (type) {
    UnBan(id).then((res) => {
      if (res.data.success == true) {
        message.success("解禁成功");
        loadingData(paginationReactive.pageIndex);
      }
    });
  } else {
    IsBan(id).then((res) => {
      if (res.data.success == true) {
        message.error("封禁成功");
        loadingData(paginationReactive.pageIndex);
      }
    });
  }
};
const handleFiltersChange = (filters) => {
  if (filters.ban != null) {
    if (!loadingRef.value) {
      loadingRef.value = true;
      tate.value = filters.ban == "false" ? false : true;

      filter.value = "ban";

      loadingData(paginationReactive.pageIndex);
      BanReactive.filterOptionValue = filters.ban;
    }
  } else {
    if (!loadingRef.value) {
      loadingRef.value = true;
      tate.value = false;

      filter.value = "";

      loadingData(paginationReactive.pageIndex);
      BanReactive.filterOptionValue = filters.ban;
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
      LastLoginTimeReactive.sortOrder = false;
      EditTimeReactive.sortOrder = false;
      LoginTimesReactive.sortOrder = false;
      LastOfflineTimeReactive.sortOrder = false;
    }
  }
  if (!sorter || sorter.columnKey === "lastLoginTime") {
    if (!loadingRef.value) {
      loadingRef.value = true;
      order.value = sorter.order == "descend" ? false : true;
      type.value = sorter.columnKey;
      loadingData(paginationReactive.pageIndex);
      LastLoginTimeReactive.sortOrder = !sorter ? false : sorter.order;
      IdReactive.sortOrder = false;
      AddTimeReactive.sortOrder = false;
      EditTimeReactive.sortOrder = false;
      LoginTimesReactive.sortOrder = false;
      LastOfflineTimeReactive.sortOrder = false;
    }
  }
  if (!sorter || sorter.columnKey === "editTime") {
    if (!loadingRef.value) {
      loadingRef.value = true;
      order.value = sorter.order == "descend" ? false : true;
      type.value = sorter.columnKey;
      loadingData(paginationReactive.pageIndex);
      EditTimeReactive.sortOrder = !sorter ? false : sorter.order;
      IdReactive.sortOrder = false;
      AddTimeReactive.sortOrder = false;
      LastLoginTimeReactive.sortOrder = false;
      LoginTimesReactive.sortOrder = false;
      LastOfflineTimeReactive.sortOrder = false;
    }
  }
  if (!sorter || sorter.columnKey === "loginTimes") {
    if (!loadingRef.value) {
      loadingRef.value = true;
      order.value = sorter.order == "descend" ? false : true;
      type.value = sorter.columnKey;
      loadingData(paginationReactive.pageIndex);
      LoginTimesReactive.sortOrder = !sorter ? false : sorter.order;
      IdReactive.sortOrder = false;
      AddTimeReactive.sortOrder = false;
      LastLoginTimeReactive.sortOrder = false;
      EditTimeReactive.sortOrder = false;
      LastOfflineTimeReactive.sortOrder = false;
    }
  }
  if (!sorter || sorter.columnKey === "lastOfflineTime") {
    if (!loadingRef.value) {
      loadingRef.value = true;
      order.value = sorter.order == "descend" ? false : true;
      type.value = sorter.columnKey;
      loadingData(paginationReactive.pageIndex);
      LastOfflineTimeReactive.sortOrder = !sorter ? false : sorter.order;
      IdReactive.sortOrder = false;
      AddTimeReactive.sortOrder = false;
      LastLoginTimeReactive.sortOrder = false;
      EditTimeReactive.sortOrder = false;
      LoginTimesReactive.sortOrder = false;
    }
  }
};
const loadingData = (currentPage) => {
  console.log("开始");

  loadingRef.value = true;
  const info = {
    pageSize: paginationReactive.pageSize,
    pageIndex: currentPage,
    Search: userInfo.name,
    filter: filter.value,
    filterArr: [],
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

onMounted(() => {
  loadingData(1);
});
// import { loginState } from "../store/StoreLogin";
// import { useRouter } from "vue-router";
// const store=loginState()
// const router=useRouter()


</script>

<style lang="scss" scoped>
:deep(.text) {
  text-align: center;
}
</style>
