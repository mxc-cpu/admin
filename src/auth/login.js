
import axios from '../api/apiConfig';

import {router} from '../routes/router.js';

import * as jwtToken from 'jose';

// 设置axios的默认请求头

export const loginUser=async(login)=>{
   
    return await axios.post('AdminLigonAuthorization/auth',login)
}

const key='tokenAnt'
//从游览器本地存储器获取用户token信息
export const getToken=()=>{
    
    return localStorage.getItem(key)
}
//清除用户信息(用户下线)
export const logOut= async ()=>{
   
    //移除token
   localStorage.removeItem(key)
    
    //跳转到登录
    router.replace('/Login')
    return true
}
//检查token有没有过期
export const isTokenFromLocalStorageVaild=()=>{
    const token =localStorage.getItem(key)
    if (!token)return false
    const decoded=jwtToken.decodeJwt(token)
    const dateNow=Date.now()
    //10位的时间戳，秒级别，而Dtae。Now是13位的，毫秒级别所以得换算一下
    const expiresAt =decoded.exp*1000
    return dateNow<=expiresAt
}