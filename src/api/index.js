
import ajax from './ajax'


const  BASE = ""

/*登录*/
export const  reqLogin = (username,password) => ajax(BASE+"/login",{username,password},"POST")

/*添加用户*/
export const  reqAdd = (user) => ajax("/manage/user/add",user,"POST")



