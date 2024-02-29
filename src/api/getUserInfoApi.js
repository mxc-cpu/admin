
import axios from './apiConfig';
export const GetUserName=async(Id)=>{
   
    return await axios.get('/Users/GetUserName/'+Id)
}

export const GetUserAvatar=async(Id)=>{
    return await axios.get('/Users/GetUserAvatar/'+Id)
}
export const GetUserInfo=async(Id)=>{
    return await axios.get('/Users/GetUserInfo/'+Id)
}
export const GetUserEmail=async(Id)=>{
    return await axios.get('/Users/GetUserEmail/'+Id)
}
export const GetUserAddtime=async(Id)=>{
    return await axios.get('/Users/GetUserAddtime/'+Id)
}
export const UpdateInfo=async(userInfoUpdateRequest,Id)=>{
    return await axios.post('/Users/UpdateInfo/'+Id+'/',userInfoUpdateRequest)
}
export const UpdateName=async(name,Id)=>{
    return await axios.post('/Users/UpdateName/',{name:name,Id:Id})
}
export const UpdatePassWord=async(info)=>{
    return await axios.post('/Users/UpdatePassWord/',info)
}
export const UploadAvatar=async(info)=>{
    return await axios.postForm('/Users/UploadAvatar/',info)
}
export const UpdateAvatar=async(info)=>{
    return await axios.post('/Users/UpdateAvatar',info)
}
export const IsBan=async(Id)=>{
    return await axios.get('/Users/IsBan/'+Id)
}
export const UnBan=async(Id)=>{
    return await axios.get('/Users/UnBan/'+Id)
}
export const UserPageQuery=async(info)=>{
    return await axios.post('/Users/UserPageQuery/',info)
}
