import React, { Dispatch } from "react"
import MovieTable, { IMovieTableEvents } from "../../components/MovieTable"
import { connect } from "react-redux"
import { IRootState } from "../../redux/reducers/Rootreducer"
import MovieAction from "../../redux/actions/MovieAction"
import { IMovieState } from "../../redux/reducers/MovieReducer"

// 映射属性
// 把state挂到props里面去,传入state的根节点
function mapStateToProps(state: IRootState):IMovieState {
    // 直接把根节点里面的movie返回
    return state.movie
}

// 改变仓库数据的事件都从这里传进去

// 映射事件
// 这个类型是react给我提供的
// 其中的泛型是action的泛型
// 但是我这个里面写的是antion是异步获取数据的,他的返回值不是Avtion创造函数的返回值,
// 所以避免出错,这里直接any
function mapDispatchToProps(dispatch: Dispatch<any>):IMovieTableEvents {
    return {
        onLoad() {
            // 这里使用仓库的条件,或者初始化一个默认值
            dispatch(MovieAction.fetchMovies({
                // 这里不传就用state里面值
                page: 1,
                key: ""
            }))
        },
        onSwitchChange(type, newState, id) {
            dispatch(MovieAction.changeSwitch(type, newState, id))
        },
        async onDelete(id) {
            await dispatch(MovieAction.deleteMovies(id))
        },
        onPageChange(newPage) {
            dispatch(MovieAction.fetchMovies({
                page: newPage
            }))
        },
        // 搜索条件变化的时候,去改变搜索条件
        onKeyChange(key){
            dispatch(MovieAction.setConditionAction({
                key
            }))
        },
        // 搜索函数,注意回到第一页
        onSearch() {
            dispatch(MovieAction.fetchMovies({
                page: 1
            }))
        }
    }
}

// 这个connect返回的是一个高阶组件
const HOC = connect(mapStateToProps, mapDispatchToProps)
// 我把这个MovieTable传入这个HOC的到的就是挂在好的新的组件
// 然后我下面用的是挂载好props之后生成的新的组件
const MovieContainer = HOC(MovieTable)

export default class extends React.Component {
    render() {
        return (
            <div>
                <MovieContainer />
            </div>
        )
    }
}
