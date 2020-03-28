import React from "react"
import { RouteComponentProps } from "react-router"
import { MovieService, IMovie } from "../../service/MovieService"
import MovieForm from "../../components/MovieFrom"

interface IParams {
    id: string
}

interface EditPageState {
    // 因为初始值是undefined,所以做成可选的
    movie?: IMovie
}

// 如果有自己的属性要加入RouteComponentProps这个里面
// 直接用继承
// interface MyProps extends RouteComponentProps<IParams>{
//     aa: string
// }

// 利用它给你提供的类型来约束这个类组件
// RouteComponentProps这个就是路由匹配到了这个组件给注入的props的类型定义,里面有history,还有路由匹配的信息
// 我还要给RouteComponentProps这个里面去传递我props.match.params里面都是什么东西,要不然他不知道
export default class extends React.Component<RouteComponentProps<IParams>, EditPageState> {
    // 注意这里也要约束一下
    id: number = parseInt(this.props.match.params.id, 10)

    state: EditPageState = {
        movie: undefined
    }

    async componentDidMount() {
        const result = await MovieService.findById(this.id)
        if (result.data){
            this.setState({
                movie: result.data
            })
        }
    }

    render() {
        return (
            // 还是使用form组件
            <MovieForm
                movie={this.state.movie}
                onSubmit={async movie => {
                const resp = await MovieService.edit(this.id, movie)
                if (resp.data) {
                    return ""
                } else {
                    return resp.err
                }
            }}></MovieForm>
        )
    }
}