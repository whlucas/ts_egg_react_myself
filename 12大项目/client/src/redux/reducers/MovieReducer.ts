// 表述电影列表的状态类型

import { IMovie } from "../../service/MovieService";
import { ISerachCondition } from "../../service/CommonTypes";
import { MovieActions, SaveMoviesAction, SetConditionAction, SetLoadingAction, DeleteAction, MovieChangeSwitchAction } from "../actions/MovieAction";
import { Reducer } from "react";

// 利用之前的接口定义一个新的接口
// 把之前的可选的查询条件都变成必填的
export type IMovieCondition = Required<ISerachCondition>

// 状态里面的信息一定要是全的,所以属性要设为必填
// 因为需要去全部显示出来
/**
 * 电影状态
 */
export interface IMovieState{
    /**
     * 电影的数组
     */
    data: IMovie[]
    /**
     * 查询条件
     */
    condition: IMovieCondition
    /**
     * 总记录数
     */
    total: number
    /**
     * 是否正在加载数据
     */
    isLoading: boolean

    /**
     * 总页数
     */
    totalPage: number
}

// 定义一个默认的状态
const defaultState: IMovieState = {
    data: [],
    condition: {
        page: 1,
        pageSize: 6,
        key: "",
    },
    total: 0,
    isLoading: false,
    totalPage: 0
}

// function saveMovie(state: IMovieState, action: SaveMoviesAction): IMovieState{

// }

// 定义一个saveMovie的处理函数,他可以直接用redux提供的类型Reducer来定义
const saveMovie: Reducer<IMovieState, SaveMoviesAction> = (state, action) => {
    // 不能直接改变原来的值
    // 第一种写法
    // return Object.assign({}, state, {
    //     data: action.payload.movies,
    //     total: action.payload.total
    // })
    // 第二种写法
    return {
        ...state,
        // 如果有就覆盖掉前面的条件
        data: action.payload.movies,
        total: action.payload.total,
        // 改变总页数,总数/pageSize 在取整
        totalPage: Math.ceil(action.payload.total / state.condition.pageSize)
    }
}

// 设置电影条件
const setCondition: Reducer<IMovieState, SetConditionAction> = (state, action) => {
    const newState = {
        ...state,
        // 给条件重新赋值
        condition: {
            ...state.condition,
            ...action.payload
        }
    }
    // 我这里更改的是我新建的变量,不会造成原先state的变化
    // 本来可以直接返回上面的newState,但因为我要算totalPage,我需要pageSize,但有可能没传过来,有可能传过来,不好搞,所以需要写在外面直接拿newState里面的
    newState.totalPage = Math.ceil(newState.total/newState.condition.pageSize)
    return newState
}

// 设置电影条件
const deleteMovie: Reducer<IMovieState, DeleteAction> = (state, action) => {
    return {
        ...state,
        // 删除指定id的电影
        data: state.data.filter(m => m.id !== action.payload),
        total: state.total - 1,
        totalPage: Math.ceil((state.total - 1) / state.condition.pageSize)
    }
}

// 设置电影条件
const setLoading: Reducer<IMovieState, SetLoadingAction> = (state, action) => {
    return {
        ...state,
        isLoading: action.payload
    }
}

const changeSwitch:Reducer<IMovieState, MovieChangeSwitchAction> = (state, action) => {
    // 1.根据id找到电影对象
    const movie = state.data.find(d => d.id === action.payload.id)
    if(!movie){
        return state;
    }
    // 2.赋值我找到的对象
    const newMovie = { ...movie }
    newMovie[action.payload.type] = action.payload.newVal

    // 3.把这个对象放回去,并且位置不能变
    // 通过原数组来映射出来一个新的数组
    const newData = state.data.map(d => {
        // 如果匹配上了就返回新的数组,没匹配上就返回原数据
        if(d.id === action.payload.id) {
            return newMovie
        }
        return d
    })
    return {
        ...state,
        data: newData
    }
}

// 导出一个函数里面传人默认状态
export default function (state: IMovieState = defaultState, action: MovieActions){
    switch (action.type) {
        case "movie_delete":
            return deleteMovie(state, action)
        case "movie_save":
            return saveMovie(state, action)
        case "movie_setCondition":
            return setCondition(state, action)
        case "movie_setLoading":
            return setLoading(state, action)
        case "movie_switchChange":
            return changeSwitch(state, action)
        default:
            return state;
    }
}