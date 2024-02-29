import axios from 'axios';
import { getToken,isTokenFromLocalStorageVaild,logOut } from '../auth/login';
import {UserLoginStore} from '../store/StoreLogin'


axios.defaults.baseURL="http://localhost:6600/api"



axios.defaults.headers['X-Requested-with']="XMLHttpRequest"
axios.defaults.headers.post["Content-Type"] = "application/json";
//拦截器
//请求拦截
axios.interceptors.request.use(options=>{
//为请求添加授权token
const jwtToken=getToken()
const UserLogin=UserLoginStore()


if(jwtToken){
  // if (isTokenFromLocalStorageVaild()){
  options.headers.Authorization= `Bearer ${jwtToken}`;
// }
  // }
  // else{
  //   alert("登录过期,请重新登入")
  //   UserLogin.logOut()
   }

return options
}

)
//响应拦截
axios.interceptors.response.use(res=>{

return res
},error=>{
alert(error.response.data.message)
return error
})
export default axios;