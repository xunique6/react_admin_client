/*
* 入口js
*
* */
import React from 'react'
import ReactDOM from 'react-dom'


import  App  from  './app'
import   memoryUtils    from './utils/memoryUtils'
import   storageUtils from './utils/storageUtils'


//读取local中保存的user,保存到内存中
const user = storageUtils.getUser()
memoryUtils.user = user

//将App组件渲染到index.html的div标签上
ReactDOM.render(<App />,document.getElementById('root'))
