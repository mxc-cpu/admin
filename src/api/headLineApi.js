import axios from './apiConfig';
export const UploadHeadlineCover=async(info)=>{
    return await axios.postForm('/Headline/UploadHeadlineCover/',info)
}
export const UpdateHeadline=async(id,info)=>{
   
    return await axios.post('/Headline/UpdateHeadline/'+id,info)
}
export const DelHeadline=async(id)=>{
   
    return await axios.get('/Headline/DelHeadline/'+id)
}
export const AddHeadline=async(info)=>{
   
    return await axios.post('/Headline/AddHeadline/',info)
}
export const GetHeadlineList=async()=>{
   
    return await axios.get('/Headline/GetHeadlineList/')
}

export const UserPageQuery=async(info)=>{
   
    return await axios.post('/Headline/UserPageQuery/',info)
}