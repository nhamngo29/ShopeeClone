import { pathApi } from "src/constants/path"
import { User } from "src/types/user.type"
import { ResponseApi } from "src/types/utils.type"
import http from "src/utils/http"
const userApi={
    
    getProfile(){
        return http.get<ResponseApi<User>>(pathApi.profile)
    }, 
    updateProfile(body: FormData) {
        return http.put<ResponseApi<User>>('api/User', body, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      },
    changePassword(body:{password:string,newPassword:string,confirmPassword:string}){
      return http.post<ResponseApi<User>>('api/User/change-password',body)
    }
}
export default userApi