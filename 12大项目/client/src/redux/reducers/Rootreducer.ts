// 这个是reduce的根节点

import { combineReducers } from "redux"
import movie, { IMovieState } from "./MovieReducer"

// 导出一个整个网站的根state,为了redux异步获取数据的时候规定类型
export interface IRootState {
    movie: IMovieState
    // 这里之后可以加一些影院
    // 用户
}

// 这里只有一个reducer,将来可以有很多个
export const rootReducer = combineReducers({
    movie
})
