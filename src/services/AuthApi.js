import api from "@/lib/axios";


export default {
    signIn(data){
           return api.post('/auth/register',data)
    },
    verifyAccount(token){
        return api.get(`/auth/verify/${token}`)
    },
    login(data){
        return api.post('/auth/login',data)
    },
    auth(){
        return api.get('/auth/user')
    },
    admin(){
        return api.get('/auth/admin')

    },
    resetPassword(data){

        return api.post('auth/resetpassword',data)
    },
    verifyPasswordResetToken(token){
        return api.get(`auth/resetpassword/${token}`)
    },
    updatePassword(token,data){
        return api.post(`auth/resetpassword/${token}`,data)

    }

}