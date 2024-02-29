import axios from './apiConfig';
export const DoUpvote=async(UpvoteInfo)=>{
   
    return await axios.post('/Upvote/AddUpovte/',UpvoteInfo)
}

export const YetUpvote=async(UpvoteInfo)=>{
    return await axios.post('/Upvote/YetUpovte/',UpvoteInfo)
}