import axios from '../api/apiConfig';
export const GetFile=async()=>{
   
    return await axios.get('/File/GetFile/')
}
export const DelFile=async(path)=>{
   
    return await axios.get('/File/DelFile/'+path)
}
export const DelPast=async()=>{
   
    return await axios.get('/File/DelPast/')
}
export const GetSensitiveWords=async()=>{
   
    return await axios.get('/File/GetSensitiveWords/')
}
export const UpdateSensitiveWords=async(info)=>{
   
    return await axios.post('/File/UpdateSensitiveWords/'+info)
}
export const GetNLog=async()=>{
   
    return await axios.get('/File/GetNLog')
}