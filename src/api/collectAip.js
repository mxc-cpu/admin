import axios from '../api/apiConfig';
export const YetCollect=(info)=>{
    return  axios.post('/Collect/YetCollect/',info)
}
export const PageQuery=(info)=>{
    return  axios.post('/Collect/PageQuery/',info)
}
export const AddCollect=(info)=>{
    return  axios.post('/Collect/AddCollect/',info)
}
export const DelCollect=(info)=>{
    return  axios.post('/Collect/DelCollect/',info)
}
export const DelCollectById=(Id)=>{
    return  axios.get('/Collect/DelCollectById/'+Id)
}