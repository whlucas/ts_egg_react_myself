import React from "react"
import { NavLink, Route } from "react-router-dom"
import Home from "./Home"
import MovieList from "./movie/MovieList"
import AddMovie from "./movie/AddMovie"
import EditMovie from "./movie/EditMovie"

import { Layout, Menu } from "antd"
const { Header, Sider, Content } = Layout;


// 写一个函数组件
// 利用它给我们提供的泛型
const _Layout: React.FC = () => {
    return (
        <div className="container">
            <Layout>
                <Header className="header" >
                    <NavLink to="/">猫眼电影管理系统</NavLink>
                </Header>
                <Layout>
                    <Sider>
                        <Menu
                            defaultSelectedKeys={['1']}
                            mode="inline"
                            theme="dark"
                        >
                            <Menu.Item key="1">
                                <NavLink to="/movie">电影列表</NavLink>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <NavLink to="/movie/add">添加电影</NavLink>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Content>
                        <div className="main">
                            <Route path="/" component={Home} exact={true}></Route>
                            <Route path="/movie" component={MovieList} exact={true}></Route>
                            <Route path="/movie/add" component={AddMovie}></Route>
                            {/* 这里如果你匹配到路由之后他就会给你这个匹配到的组件注入一些属性,比如id值 */}
                            <Route path="/movie/edit/:id" component={EditMovie}></Route>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </div>
    )
}

export default _Layout