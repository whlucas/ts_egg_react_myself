import React from "react";
import { Form, Input, Button, Checkbox, InputNumber, Switch, message } from 'antd';
import ImageUploader from "./ImageUploader";
import TextArea from "antd/lib/input/TextArea";
import { IMovie } from "../service/MovieService";
import { withRouter, RouteComponentProps } from "react-router";

// 为了实现页面跳转,用withRouter来搞个高阶组件
// 我需要这个组件申明我的组件里面有这个高阶组件里面的属性,那就要继承一个他给你的那个接口RouteComponentProps
interface IFormProp extends RouteComponentProps {
    // 我这个组件不光要为添加电影考虑,还要为修改电影考虑
    // 需要点修改电影的时候给他传数据
    // 如果传了就显示值,不改就不显示值
    movie?: IMovie
    onSubmit: (movie: IMovie) => Promise<string>
}

// 这个设置整个表单的布局
const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 16 },
};
// 这个设置局部Form.item的布局
const tailLayout = {
    wrapperCol: { offset: 2, span: 16 },
};

// 本来应该是从数据库里面拿,但这里就写死了
const areaGroups: {label:string, value: string}[] = [
    { label: '中国大陆', value: 'China' },
    { label: '美国', value: 'America' },
    { label: '英国', value: 'England' },
];

const allTypes: { label: string, value: string }[] = [
    { label: '喜剧', value: 'comedy' },
    { label: '灾难', value: 'disaster' },
    { label: '动作', value: 'action' },
];


// 这里写一个名字再导出也是一样的
class MovieForm extends React.Component<IFormProp> {

    // 这里不用改变仓库的值了,就不用connect了
    state = {
        img: "11"
    }
    formRef:any = React.createRef();

    // 注意这里不能用componentDidMount,因为父组件的state会变化
    componentWillReceiveProps(nextProps: any) {
        if (nextProps.movie) {
            // 把传进来的属性挂在到form上,这里用ref
            console.log(nextProps.movie.name)
            this.formRef.current.setFieldsValue({
                ...nextProps.movie,
                areas: nextProps.movie.areas.split('/'),
                types: nextProps.movie.types.split('/')
            });
        }
    }

    // 验证通过调用这个
    onFinish = async (values: any) => {
        for(const key in values){
            if(key === 'areas'){
                values[key] = values[key].join('/')
            }
            else if (key === 'types') {
                values[key] = values[key].join('/')
            }
        }
        // 我规定返回的是错误的消息
        const result = await this.props.onSubmit(values as IMovie)
        if(result) {
            message.error(result)
        }else {
            // 成功之后干嘛
            // 延迟一秒
            message.success("添加成功", 1, () => {
                // 跳转页面
                // 跳转需要高阶组件withRouter的支持
                this.props.history.push("/movie")
            })

        }
    };

    onFinishFailed: (errorInfo: any) => void = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    render() {
        return (
            <Form
                ref={this.formRef}
                {...layout}
                name="basic"
                // 在这里设置所有的默认值
                initialValues={{
                    isHot: false,
                    isClassic: false,
                    isComing: false
                }}
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
            >
                {}
                <Form.Item
                    label="电影名称"  // 显示出来的东西
                    name="name"   // key
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="封面图"
                    name="poster"
                    // rules={[{ required: true, message: 'Please upload your poster!' }]}
                >
                    {/* 这里传入的是自定义组件 */}
                    {/* 提供受控属性 value 或其它与 valuePropName 的值同名的属性。*/}
                    {/* 提供 onChange 事件或 trigger 的值同名的事件。 */}
                    {/* valuePropName这个值自己在Form.Item这个里面设置,默认value,trigger同理 */}
                    {/* 组件中也配合使用这个名称 */}
                    <ImageUploader
                        value={this.state.img}
                        // 给他一个函数改变这里的state
                        onChange={newurl => {
                            this.setState({
                                img: newurl
                            })
                        }}
                    />
                </Form.Item>

                <Form.Item
                    label="地区"  // 显示出来的东西
                    name="areas"   // key
                    rules={[{ required: true, message: 'Please check your areas!' }]}
                >
                    <Checkbox.Group options={areaGroups} defaultValue={['China']} />
                </Form.Item>

                <Form.Item
                    label="类型"  // 显示出来的东西
                    name="types"   // key
                    rules={[{ required: true, message: 'Please check your types!' }]}
                >
                    <Checkbox.Group options={allTypes} defaultValue={['comedy']} />
                </Form.Item>

                <Form.Item
                    label="时长"  // 显示出来的东西
                    name="timeLong"   // key
                    rules={[{ required: true, message: 'Please input your timeLong!' }]}
                >
                    <InputNumber min={0} step={10} />
                </Form.Item>

                <Form.Item
                    label="正在热映"  // 显示出来的东西
                    name="isHot"   // key
                    valuePropName="checked" // 注意这里checked要加这个属性
                >
                    <Switch />
                </Form.Item>

                <Form.Item
                    label="即将上映"  // 显示出来的东西
                    name="isComing"   // key
                    valuePropName="checked"
                >
                    <Switch />
                </Form.Item>

                <Form.Item
                    label="经典影片"  // 显示出来的东西
                    name="isClassic"   // key
                    valuePropName="checked"
                >
                    <Switch />
                </Form.Item>

                <Form.Item
                    label="描述"  // 显示出来的东西
                    name="description"   // key
                >
                    <TextArea rows={4} />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}

// 为了实现页面跳转,要用到路由里面的history,用withRouter来搞个高阶组件
// 我需要这个组件申明我的组件里面有这个高阶组件里面的属性,那就要继承一个他给你的那个接口RouteComponentProps

export default withRouter(MovieForm)