import axios from '../api/apiConfig';


export const DelCategory=async(id)=>{
   
    return await axios.get('/Category/DelCategory/'+id)
}
export const UserPageQuery=async(pageInfo)=>{
   
    return await axios.post('/Category/UserPageQuery',pageInfo)
}
export const UploadCover=async(Info)=>{
   
    return await axios.postForm('/Category/UploadCover/',Info)
}
export const AddCateGory=async(Info)=>{
   
    return await axios.post('/Category/AddCateGory',Info)
}
export const UpdateInfo=async(id,Info)=>{
   
    return await axios.post('/Category/UpdateInfo/'+id,Info)
}