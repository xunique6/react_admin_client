import  React,{Component} from  'react'
import  {Link,withRouter}  from  'react-router-dom'
import  {Menu,Icon} from 'antd'


import logo  from '../../assets/images/favicon.ico'
import  './index.less'
import menuList from '../../config/menuConfig'

const { SubMenu } = Menu;
//左侧导航
class  Index extends Component{
    //使用map + 递归
    getMenuNodes = (menuList) => {
        return menuList.map(item => {
            if (!item.children){
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            }else {
                return (
                    <SubMenu key={item.key} title={
                          <span>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                          </span>
                         }>
                        {this.getMenuNodes(item.children)}
                </SubMenu>)
            }
        })
    }
    //使用reduce + 递归
    getMenuNodes_reduce = (menuList) => {
        const path = this.props.location.pathname
        return menuList.reduce((pre,item) => {
            if (!item.children){
                pre.push(
                    (
                        <Menu.Item key={item.key}>
                            <Link to={item.key}>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </Link>
                        </Menu.Item>
                    )
                )
            }else {
                //查找一个与当前路径匹配的子Item
              const cItem = item.children.find(cItem => cItem.key === path)
              //如果存在，说明当前的item子列表需要展开
                if (cItem){
                    this.openKey = item.key
                }
                pre.push(
                    (
                        <SubMenu key={item.key} title={
                            <span>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                          </span>
                        }>
                            {this.getMenuNodes_reduce(item.children)}
                        </SubMenu>)
                    )
            }
            return pre
        },[])
    }
    //第一次render之前执行，只会执行一次
    componentWillMount() {
        this.menuNodes = this.getMenuNodes_reduce(menuList)
    }

    render() {
        //得到当前请求的路由路径
        const path = this.props.location.pathname
        //得到需要打开菜单的kay
        const openKey =this.openKey
      return (
          <div className="left-nav">
             <Link to="/" className="left-nav-header">
                 <img src={logo} alt="logo"/>
                 <h1>后台管理</h1>
             </Link>

              <Menu mode="inline" theme="dark" selectedKeys={[path]} defaultOpenKeys={[openKey]}>
                  {
                     // this.getMenuNodes(menuList)
                     // this.getMenuNodes_reduce(menuList)
                      this.menuNodes
                  }
              </Menu>
          </div>
      )
    }
}
/*
*  withRouter 是高阶组件，包装非路由组件，返回一个新组件，
*  新组件会向路由组件传递三个属性：history location match
* */
export default withRouter(Index)
