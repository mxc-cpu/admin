

import { info } from 'sass';
import axios from '../api/apiConfig';

export const DelArticle = async(id)=>{
    return await axios.get('/Article/DelArticle/'+id)
}
export const UserPageQuery=async (info)=>{
    return await axios.post('/Article/UserPageQuery/',info)
}
export const UnPublished=async (id)=>{
    return await axios.get('/Article/UnPublished/'+id)
}
export const SetBoutique=async (id,info)=>{
    return await axios.post('/Article/SetBoutique/'+id+"?isBoutique="+info)
}
export const getArticleDetail=async (id)=>{
    return await axios.get('/Article/GetArticleDetail/'+id)
}
export const ArticleCheckPageQuery=async (info)=>{
    return await axios.post('/Article/ArticleCheckPageQuery/',info)
}
export const GetUserByArticleId=async (ArticleId)=>{
    return await axios.get('/Article/GetUserByArticleId/'+ArticleId)
}