import axios from './apiConfig';
export const GetAdmin=async(id)=>{
   
    return await axios.get('/Admin/GetAdmin/'+id)
}
export const  UserPageQuery=async(info)=>{
    return await axios.post('/Admin/UserPageQuery/',info)
}
export const  UploadAvatar=async(info)=>{
    return await axios.postForm('/Admin/UploadAvatar/',info)
}

export const  AddAdmin=async(info)=>{
    return await axios.post('/Admin/AddAdmin/',info)
}
export const  UpdateInfo=async(id,info)=>{
    return await axios.post('/Admin/UpdateInfo/'+id,info)
}
export const  DelAdmin=async(id)=>{
    return await axios.get('/Admin/DelAdmin/'+id)
}
export const  Logout=(id)=>{
   
    return  axios.get('/Admin/Logout/'+id)
}
export const   UpdateAvatar=async(info)=>{
   
    return  await axios.post('/Admin/UpdateAvatar/',info)
}
export const   UpdatePassWord=async(info)=>{
   
    return  await axios.post('/Admin/UpdatePassWord/',info)
}
export const   UpdateName=async(info)=>{
   
    return  await axios.post('/Admin/UpdateName/',info)
}