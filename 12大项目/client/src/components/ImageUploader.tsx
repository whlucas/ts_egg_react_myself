import React from "react";
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { UploadFile } from "antd/lib/upload/interface";
import { IResponseData, IResponseError } from "../service/CommonTypes";

// 这是一个纯展示组件,改变东西的从外面传过来
// 利用属性控制展示区域的显示

// 为了符合antd的表单规则,这里值要用value,change要用onChange
interface IImageUploaderProps {
    value?: string,
    onChange: (imgUrl: string) => void
}

interface IImgState {
    showModal: boolean
}

export default class extends React.Component<IImageUploaderProps>{
    // 来一个状态控制展示
    state = {
        showModal: false
    }

    // 判断上传组件中显示的内容
    private getUploadContent() {
        // 如果属性里面有值的话就别显示了,没有就显示
        if(this.props.value) {
            return null
        }else {
            return (
                <div>
                    <PlusOutlined />
                    <div className="ant-upload-text">Upload</div>
                </div>
            )
        }
    }

    // 为了不写状态,我写一个函数来生成这个数组
    // 把这个UploadFile转到定义,把里面的size,和type设置成可选
    private getFileList(): UploadFile[] {
        if(this.props.value) {
            return [
                {
                    // id保证唯一就行
                    uid: this.props.value,
                    // 名字,如果读不到就显示这个name值
                    name: this.props.value,
                    // 链接地址,他显示的时候读的就是这个url
                    url: this.props.value
                }
            ]
        }
        return []
    }

    // 这里这个改变状态的有个bug就是只有你往fileList里面push东西的时候他状态才会变,所以我们没法监听到请求结束的时候所以我们要自己去重写请求
    // 这个就是我重写的请求

    private async handleRequest(p: any) {
        // 自己来写就是要创建一个form表单来传数据
        const formData = new FormData()
        // file就是文件
        formData.append(p.filename, p.file)
        // 用fetch api来发请求
        const request = new Request(p.action, {
            method: "post",
            body: formData
        })
        // 把返回结果用json解析一下
        const resp: IResponseData<string> | IResponseError = await fetch(request).then(res => res.json());
        // 我这里其实后端接口没有失败的情况
        if (resp.err) {
            message.error("上传失败!")
        }else {
            // 上传成功我要改变curImgUrl需要传进来一个函数
            this.props.onChange(resp.data![p.filename])
        }
    }

    render() {
        return (
            <div>
                <Upload
                    // 上哪发请求
                    action="/upload"
                    // 支持的文件
                    accept=".jpg,.png,.gif"
                    // 样式
                    listType="picture-card"
                    // 已经上传的图片设置,他的显示就受这个fileList里面的值的控制
                    fileList={this.getFileList()}
                    // 自己重写的发送请求的方法
                    // 调用函数的话就不用箭头函数了
                    customRequest={this.handleRequest.bind(this)}
                    // 点击删除
                    // 这个里面直接写的函数要用箭头函数
                    onRemove={() => {
                        this.props.onChange('')
                    }}
                    // 点击预览
                    onPreview={() => {
                        this.setState({
                            showModal: true
                        })
                    }}
                >
                    {this.getUploadContent()}
                </Upload>
                <Modal
                    visible={this.state.showModal}
                    footer={null}
                    onCancel={() => {
                        this.setState({
                            showModal: false
                        })
                    }}>
                    <img alt="example" style={{ width: '100%' }} src={this.props.value} />
                </Modal>
            </div>
        )
    }
}