import axios from '../api/apiConfig';
export const  Addfouces=async(info)=>{
   
    return await axios.post('/Dynamics/FocusUser/',info)
}
export  const  Delfouces=async(info)=>{
    return await axios.post('/Dynamics/DelFocusUser/',info)
}
export const  QueryFocusUser=async(info)=>{
    return await axios.post('/Dynamics/QueryFocusUser/',info)
}
export const   FindFocusList= async (Id)=>{
    return await  axios.get('/Dynamics/FindFocusList/'+Id)
}
export const  FindFansList=async (Id)=>{
    return  await axios.get('/Dynamics/FindFansList/'+Id)
}
export const  PageFocus= async(info)=>{
    return await axios.post('/Dynamics/PageQueryFocusList/',info)
}
export const  PageFan=async(info)=>{
    return await axios.post('/Dynamics/PageQueryFanList/',info)
}
export const AddDynamics=async(info)=>{
    return await axios.post('/Dynamics/AddDynamics/',info)
}
export const DelDynamics=async(id)=>{
    return await axios.get('/Dynamics/DelDynamics/'+id)
}
export const pageQueryDynamicsByMyself=async(info)=>{
    return await axios.post('/Dynamics/pageQueryDynamicsByMyself/',info)
}
export const pageQueryDynamics=async(info)=>{
    return await axios.post('/Dynamics/pageQueryDynamics/',info)
}