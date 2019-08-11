/*
* 能发送异步ajax请求的函数模块
* 封装axios
* 函数的返回值是promise对象
* 优化：统一处理请求处理异常
* */
import  axios  from  'axios'

import {message} from 'antd'

export  default function ajax(url,data={},type='GET') {

    return  new Promise((resolve,reject) => {

        let promise
        //1.执行异步ajax请求
        if (type ==='GET') {
            promise = axios.get(url,{
                params:{data}
            })
        }else {
            promise = axios.post(url,data)
        }
        promise.then(response =>{
            //2.如果成功resolve
            resolve(response)
        }).catch(error => {
            //3.如果失败不能调用reject,提示异常信息
            message.error("请求出错:",error.message)
        })



    })

   /* if (type ==='GET') {
        return axios.get(url,{
            params:{data}
        })
    }else {
        return  axios.post(url,data)
    }*/
}