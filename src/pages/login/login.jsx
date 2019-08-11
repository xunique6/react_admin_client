import React,{Component} from 'react'
import  {Redirect}  from 'react-router-dom'
import { Form, Icon, Input, Button,message } from 'antd';

import  {reqLogin}   from  '../../api'
import  memoryUtils from  '../../utils/memoryUtils'
import  storageUtils from  '../../utils/storageUtils'

import  './login.less'
import logo  from '../../assets/images/favicon.ico'
/*
* 登录的路由组件
* */
class Login extends Component{
    handleSubmit = (event) => {
        event.preventDefault()
        //const form = this.props.form
        //const values = form.getFieldsValue()
        //console.log(values)
        //对所有表单字段进行验证
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
               // console.log('发送ajax请求', values);
                const {username,password} = values
                /*reqLogin(username,password).then(response =>{
                    console.log("登录成功",response.data)
                }).catch(error =>{
                    console.log("登录失败",error)
                })*/
                const  response = await reqLogin(username,password)
                console.log("请求成功",response.data)
                const result = response.data.result
                    if (result === "success"){
                        message.success("login success")
                        const  user = response.data.data
                        memoryUtils.user =  user
                        storageUtils.saveUser(user)
                        this.props.history.replace("/")
                    }else{
                        message.error(response.data.message)
                    }
                }else {
                    console.log('校验失败')
                }
        });
    }
     validatePwd = (rule,value,callback) => {
        console.log('validatePwd',rule,value)
         if (!value){
             callback('密码必须输入')
         }else if(value.length<4){
             callback('密码长度不能小于4位')
         }else if (value.length>12){
             callback('密码长度不能大于12位')
         }else if (!/^[a-zA-Z0-9_]+$/.test(value)){
             callback('密码必须由数字字母或者下划线组成')
         }
        //不传参数表示验证成功，传参表示验证失败
        callback()
     }

    render() {
        //如果用户已经登录，直接跳转到管理界面
        if (memoryUtils.user && memoryUtils.user.username){
            console.log(memoryUtils.user)
            return <Redirect to="/" />
        }
        const form  =this.props.form
        const {getFieldDecorator} = form
        return(
            <div className='login'>
                <header className='login-header'>
                    <img src={logo} alt='logo'/>
                    <h1>React项目：后台管理系统</h1>
                </header>
                <section className='login-content'>
                    <h2>用户登录</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('username',{
                                rules: [
                                    { required: true, whiteSpace:true,message: '用户名必须输入！' },
                                    { min: 4, message: '用户名不能少于4位！' },
                                    { max: 12, message: '用户名不能超过12位！' },
                                    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文字母数字或者下划线！' }
                                    ],
                            })(<Input prefix={<Icon type="user" style={{ color:'rgba(0,0,0,.25)'}} />}
                                       placeholder="请输入用户名"/>)}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password',{
                                rules: [{validator:this.validatePwd}]
                            })(<Input prefix={<Icon type="lock" style={{ color:'rgba(0,0,0,.25)' }} />}
                                       type="password" placeholder="请输入密码"/>)}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}

const  WrapLogin = Form.create()(Login)
export default WrapLogin