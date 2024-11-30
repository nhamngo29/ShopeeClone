import { pathApi } from "src/constants/path"
import { User } from "src/types/user.type"
import { ResponseApi } from "src/types/utils.type"
import http from "src/utils/http"

interface BodyUpdateProfile extends Omit<User,"userId"|"role"|"userName">{
    password?:string
    newPassword?:string
}

const userApi={
    getProfile(){
        return http.get<ResponseApi<User>>(pathApi.profile)
    }, 
    updateProfile(body:BodyUpdateProfile){
        return http.put('api/User',body)
    },
    uploadAvatar(body:FormData){
        return http.post<ResponseApi<string>>(pathApi.uploadAvatar,body,{
            headers:{
                'Content-Type':'mutipart/form-data'
            }
        })
    }
}
export default userApi