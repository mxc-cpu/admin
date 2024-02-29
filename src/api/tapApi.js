import axios from './apiConfig';
export const AddTap=async(info)=>{
   
    return await axios.post('/Tap/AddTap/',info)
}
export const DelTap=async(id)=>{
   
    return await axios.get('/Tap/DelTap/'+id)
}
export const GetTap=async(Id)=>{
    return await axios.get('/Tap/FindAll/'+Id)
}