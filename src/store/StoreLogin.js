import { defineStore } from "pinia";
import { loginUser, logOut } from "../auth/login.js";

import { GetAdmin, Logout } from "../api/getAdminApi.js";
import { router, resetRouter } from "../routes/router.js";
import { GetRoleRoutePath } from "../api/RouterRoleApi";
import * as jwtToken from "jose";

export const UserLoginStore = defineStore("StoreLogin", {
  state: () => ({
    exp: Date.now(),
    token: null,
  }),

  actions: {
    async UsrerLogin(token1) {
      this.token = await token1;
      localStorage.setItem("tokenAnt", this.token);

      //登记信息
      const token = localStorage.getItem("tokenAnt");

      this.InLogin = true;

      const decoded = jwtToken.decodeJwt(token);
      //保存用户id
      this.userId = Number(decoded.id);

      await GetAdmin(this.userId).then(async (res) => {
        if (res.data.success == true) {
          loginState().name1 = await res.data.data.name;
          loginState().avatarUrl = await res.data.data.avatarUrl;
          loginState().Role = await res.data.data.role;
          loginState().account = await res.data.data.account;
          await console.log("role", this.Role);
          await router.replace("/Admin");
        } else {
          console.log("失败");
        }
      });
    },
    logOut() {
      Logout(loginState().userId).then((res) => {
        if (res.data.success == true) {
          //移除token
          logOut();

          //用户信息改变，调用该方法进行重置
          loginState().changeState();
          // //重置路由表
          resetRouter();
        }
      });
    },

    async UserLigonAuthorization(login) {
      const { data } = await loginUser(login);
      //记入登入状态检查是否关闭了浏览器
      sessionStorage.setItem("isClose", false);
      await this.UsrerLogin(data.token);
    },
  },
});
export const loginState = defineStore("loginState", {
  state: () => ({
    InLogin: false,
    name1: "",
    avatarUrl: "",
    userId: 0,
    Role: 0,
    account: "",
    menu: [],
  }),
  actions: {
    async changeState() {
      if (sessionStorage.getItem("isClose") == null) {
        this.name1 = "";
        this.userId = 0;
        this.InLogin = false;
        this.avatarUrl = "";
        this.account = "";
        this.Role = 0;
        console.log("改变role",loginState().Role)
        logOut();
        console.log("退出登入");
      } else if (localStorage.getItem("tokenAnt")) {
        const token = localStorage.getItem("tokenAnt");

        this.InLogin = true;

        const decoded = jwtToken.decodeJwt(token);
        // //保存用户id
        this.userId = Number(decoded.id);

        await GetAdmin(this.userId).then(async (res) => {
          if (res.data.success == true) {
            this.name1 = await res.data.data.name;
            this.avatarUrl = await res.data.data.avatarUrl;
            this.Role = await res.data.data.role;
       
            this.account = await res.data.data.account;
            console.log("name", this.name1);

            //路由表添加
            const result = (await GetRoleRoutePath(this.Role)).data.data;

            result.forEach((e) => {
              console.log("路由：", e.name);
              router.addRoute("Admin", {
                path: e.path,
                name: e.name,
                component: () => import(`../views${e.component}`),
              });
            });
          } else {
            console.log("失败");
          }
        });
      } else {
        this.name1 = "";
        this.userId = 0;
        this.InLogin = false;
        this.avatarUrl = "";
        this.account = "";
        this.Role = 0;
        this.menu = [];
        //取消标记
        sessionStorage.removeItem("isClose");
        console.log("退出登入");
      }
    },
  },
});
