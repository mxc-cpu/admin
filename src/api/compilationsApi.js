import axios from '../api/apiConfig';
export const  PageQuery= (info)=>{
    return   axios.post('/Compilations/PageQuery',info)
}
export const AddCompilations=(info)=>{
    return  axios.post('/Compilations/AddCompilations',info)
}
export const UpdateCompilations=(info)=>{
    return  axios.post('/Compilations/UpdateCompilations',info)
}
export const AddArticleToCompilations=(info)=>{
    return  axios.post('Compilations/AddArticleToCompilations',info)
}
export const DelArticleToCompilations=(id)=>{
    return  axios.get('Compilations/DelArticleToCompilations/'+id)
}
export const DelCompilationsById=(id)=>{
    return  axios.get('/Compilations/DelCompilationsById/'+id)
}
export const QueryCompilationsArticleById=async(id)=>{
    return await axios.get('/Compilations/QueryCompilationsArticleById/'+id)
}
export const  QueryAllUserCompilationsById=async(id)=>{
    return await axios.get('/Compilations/QueryAllUserCompilationsById/'+id)
}
export const  PageQueryCompilationsArticleById=async(info)=>{
    return await axios.post('/Compilations/PageQueryCompilationsArticleById/',info)
}
