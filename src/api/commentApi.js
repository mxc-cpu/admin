import axios from '../api/apiConfig';
export const  QueryCommentList= async(id)=>{
    return await axios.get('/Comment/QueryCommentList/'+id)
}
export const  DelComment= async(id)=>{
    return await axios.get('/Comment/DelComment/'+id)
}
export const  AddComment= async(info)=>{
    return await axios.post('/Comment/AddComment',info)
}
export const UpdateUpvoteSum=async(info)=>{
    return await axios.post('/Comment/UpdateUpvoteSum',info)
}