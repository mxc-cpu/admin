import axios from '../api/apiConfig';
export const  AddMessage=async(info)=>{
    return await axios.post('/Message/AddMessage',info)
}
