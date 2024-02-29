import axios from '../api/apiConfig';
export const  GetRoleRoutePath=async(id)=>{
    return await axios.get('/RoleRoute/GetRoleRoutePath/'+id)
}
