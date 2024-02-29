import axios from './apiConfig';
export const UpdateAnn=async (info)=>{
    return await axios.post('/Announcement/UpdateAnn/'+info)
}
export const GetAnn=async ()=>{
    return await axios.get('/Announcement/GetAnn/')
}