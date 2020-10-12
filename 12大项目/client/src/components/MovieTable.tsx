import React from "react"
import { IMovieState } from "../redux/reducers/MovieReducer"

import { Table, Switch, Button, message, Popconfirm, Input } from 'antd';
import {
    SearchOutlined
} from '@ant-design/icons';
import { ColumnsType, TablePaginationConfig } from "antd/lib/table";
import { IMovie } from "../service/MovieService";
import defaultposterImg from "../assets/defaultposter.jpg"
import { SwitchName } from "../service/CommonTypes";
import { NavLink } from "react-router-dom";
import { PaginationConfig } from "antd/lib/pagination";

// interface IMovieTableProps extends IMovieState {
//     /**
//      * 完成加载之后的事件
//      */
//     onLoad: () => void
// }

// 这里用继承不好,因为需要有一个单独的事件的接口
export interface IMovieTableEvents {
    /**
     * 完成加载之后的事件
     */
    onLoad: () => void,
    onSwitchChange: (type: SwitchName, newState: boolean, id: number) => void,
    onDelete: (id: number) => Promise<void>,
    // 页码变化的时候传一个新的页码去请求数据
    onPageChange: (newPage: number) => void,
    onKeyChange: (key:string) => void,
    // 按照当前的条件去搜索就可以了
    onSearch: () => void
}


// 规定这个组件传入的props的内容,这里需要的数据刚好和仓库一致
// 还要在加上传进来的事件,这里使用交叉类型
export default class extends React.Component<IMovieState & IMovieTableEvents> {
    componentDidMount() {
        // 如果我的属性里面有这个事件的话我就要调用
        if (this.props.onLoad) {
            this.props.onLoad()
        }
    }

    private getFilterDropDown(p: Object) {
        return (
            <div style={{ padding: 8 }}>
                <Input
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                    // 这个value是state里面的key值
                    value={this.props.condition.key}
                    // 去改变搜索条件
                    onChange={e => this.props.onKeyChange(e.target.value)}
                    onPressEnter={this.props.onSearch}
                />
                <Button
                    type="primary"
                    icon={<SearchOutlined />}
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                    onClick={this.props.onSearch}
                >
                    搜索
                </Button>
                <Button
                    size="small"
                    style={{ width: 90 }}
                    onClick={() => {
                        // 重置是把仓库里面的东西设为空,然后再去搜索
                        this.props.onKeyChange("")
                        this.props.onSearch()
                    }}
                    >
                    重置
                </Button>
            </div>
        )
    }

    // 这个返回值是指着<Table>标签里面的columns得到的
    private getColumns(): ColumnsType<IMovie> {
        return [
            {
                title: "图片",
                dataIndex: "poster",
                render: poster => {
                    if (poster) {
                        return <img className="tablePoster" alt={""} src={poster} />
                    } else {
                        return <img className="tablePoster" alt={""} src={defaultposterImg} />
                    }
                }
            },
            {
                title: "名称",
                // 这个是IMovie里面的属性值
                // 我对这个dataIndex转到定义,把这个dataIndex的类型改成keyof + 泛型名称可以获得类型检查
                dataIndex: "name",
                // 加一个搜索
                // 一个函数返回一个dom结点
                filterDropdown: this.getFilterDropDown.bind(this),
                // 搜索的图标
                filterIcon: <SearchOutlined />
            },
            {
                title: "地区",
                dataIndex: "areas"
            },
            {
                title: "类型",
                dataIndex: "types"
            },
            {
                title: "时长",
                dataIndex: "timeLong",
                render(timeLong) {
                    return timeLong + "分钟"
                }
            },
            {
                title: "正在热映",
                dataIndex: "isHot",
                // 这里要用箭头函数让this指向这个组件对象
                // 要拿到这个record才能拿到这个id
                render: (isHot, record) => {
                    // 这里最好是用checked, 而不是defaultChecked, 保证这个开关始终和idHot保持一致,是一个受控组件
                    return <Switch checked={isHot} onChange={(newVal) => {
                        // 我设置props的这个函数类型是不可选,一定会传这个函数给我,不用判断
                        // 加感叹号去掉id为undefined的情况
                        this.props.onSwitchChange(SwitchName.isHot, newVal, record.id!)
                    }} />
                }
            },
            {
                title: "即将上映",
                dataIndex: "isComing",
                // 这里要用箭头函数让this指向这个组件对象
                // 要拿到这个record才能拿到这个id
                render: (isComing, record) => {
                    // 这里最好是用checked, 而不是defaultChecked, 保证这个开关始终和idHot保持一致,是一个受控组件
                    return <Switch checked={isComing} onChange={(newVal) => {
                        // 我设置props的这个函数类型是不可选,一定会传这个函数给我,不用判断
                        // 加感叹号去掉id为undefined的情况
                        this.props.onSwitchChange(SwitchName.isComing, newVal, record.id!)
                    }} />
                }
            },
            {
                title: "经典影片",
                dataIndex: "isClassic",
                // 这里要用箭头函数让this指向这个组件对象
                // 要拿到这个record才能拿到这个id
                render: (isClassic, record) => {
                    // 这里最好是用checked, 而不是defaultChecked, 保证这个开关始终和idHot保持一致,是一个受控组件
                    return <Switch checked={isClassic} onChange={(newVal) => {
                        // 我设置props的这个函数类型是不可选,一定会传这个函数给我,不用判断
                        // 加感叹号去掉id为undefined的情况
                        this.props.onSwitchChange(SwitchName.isClassic, newVal, record.id!)
                    }} />
                }
            },
            {
                title: "操作",
                dataIndex: "id",
                render: (id) => {
                    return (
                        <div>
                            <NavLink to={"/movie/edit/" + id}>
                                <Button type="primary" size="small">编辑</Button>
                            </NavLink>
                            {/* 给个确认框 */}
                            <Popconfirm
                                title="真的要删除吗?"
                                onConfirm={async () => {
                                    await this.props.onDelete(id);
                                    // 给个提示
                                    message.success('This is a success message');
                                }}
                                okText="确定"
                                cancelText="取消"
                            >
                                <Button danger size="small">删除</Button>
                            </Popconfirm>,
                        </div>
                    )
                }
            },

        ]
    }

    getPageConfig(): false | TablePaginationConfig | undefined {
        // 什么情况下不分页
        if (this.props.total === 0) {
            return false
        }
        return {
            current: this.props.condition.page,
            pageSize: this.props.condition.pageSize,
            total: this.props.total
        }
    }

    // 页码变化的时候直接调用传进来的函数
    handleChange(pagination: any) {
        this.props.onPageChange(pagination.current!)
    }

    render() {
        return (
            // 记得给他一个key值
            <Table
                rowKey="id"
                dataSource={this.props.data}
                columns={this.getColumns()}
                pagination={this.getPageConfig()}
                onChange={this.handleChange.bind(this)}
                // 用我设置的isloading的值来做这个loading
                loading={this.props.isLoading}
            >
            </Table>
        )
    }
}