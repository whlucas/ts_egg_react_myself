// action的创建函数
import { IAction } from "./ActionTypes"
import { IMovie, MovieService } from "../../service/MovieService"
import { ISerachCondition, SwitchName } from "../../service/CommonTypes"

// npm install --save redux-thunk
import { ThunkAction } from "redux-thunk"
import { IRootState } from "../reducers/Rootreducer"

// 定义利用共有的IAction接口定义一个类型,传两个泛型进去
export type SaveMoviesAction = IAction<"movie_save", {
    movies: IMovie[],
    total: number
}>

// 这是保存一个电影的action
function saveMoviesAction(movies: IMovie[], total: number): SaveMoviesAction {
    return {
        // 操作类型
        type: "movie_save",
        // 我这个操作的附加的一些信息
        payload: {
            movies,
            total
        } ,
    }
}

export type SetLoadingAction = IAction<"movie_setLoading", boolean>
// 改变保存状态,要传过来一个boolean
function setLoadingAction(isLoading: boolean): SetLoadingAction {
    return {
        type: "movie_setLoading",
        payload: isLoading
    }
}

export type SetConditionAction = IAction<"movie_setCondition", ISerachCondition>
// 设置查询条件
// 这里设置条件可以不全部设置,所以属性可选
function setConditionAction(condition: ISerachCondition): SetConditionAction {
    return {
        type: "movie_setCondition",
        payload: condition
    }
}

// 删除一个电影的action,从状态里面删除,不是从数据库
export type DeleteAction = IAction<"movie_delete", number>

function deleteAction(id: number): DeleteAction {
    return {
        type: "movie_delete",
        payload: id
    }
}
export type MovieChangeSwitchAction = IAction<"movie_switchChange", {
    type: SwitchName,
    newVal: boolean,
    id: number
}>

function changeSwitchAction(type: SwitchName, newVal: boolean, id: number): MovieChangeSwitchAction {
    return {
        type: "movie_switchChange",
        payload: {
            type,
            newVal,
            id
        }
    }
}


// 利用redux-thunk异步请求
// 依据条件从服务获取电影数据
// 我这个函数的返回值用的是redux给我提供的类型ThunkAction
// 他要输入四个泛型 第一个是这个函数的返回结果, 第二个是state的类型,表示整个网站根state类型,第三个不需要直接any,最后一个是action的类型
function fetchMovies(condition: ISerachCondition):
ThunkAction<Promise<void>, IRootState, any, MovieActions> {
    return async (dispatch, getState) => {
        // 1. 设置加载状态
        // 这个是我自己写的action
        dispatch(setLoadingAction(true));
        // 2. 设置条件
        // 把条件更新到仓库
        dispatch(setConditionAction(condition));
        // 3. 获取电影对象
        // 发请求,由于传过来的条件可能不全,我需要合并仓库中的条件来请求数据
        //  拿到更新后的仓库里面的数据去请求
        const curCondition = getState().movie.condition;
        const res = await MovieService.findByKey(curCondition)
        // 4. 更改仓库的数据
        dispatch(saveMoviesAction(res.data, res.count))
        // 关闭加载状态
        dispatch(setLoadingAction(false));
    }
}

// 删除
function deleteMovies(id: number):
    ThunkAction<Promise<void>, IRootState, any, MovieActions> {
    return async (dispatch, getState) => {
        // 1. 设置加载状态
        // 这个是我自己写的action
        dispatch(setLoadingAction(true));
        // 2. 从数据库删除
        // 调我们写好的接口,把id传入
        await MovieService.delete(id)
        // 3. 本地仓库也删除
        dispatch(deleteAction(id))
        // 4. 关闭加载状态
        dispatch(setLoadingAction(false));
    }
}

function changeSwitch(type: SwitchName, newVal: boolean, id: number): ThunkAction<Promise<void>, IRootState, any, MovieActions> {
    return async (dispatch, getState) => {
        // 1. 设置加载状态
        dispatch(setLoadingAction(true));
        // 2. 修改数据库数据
        await MovieService.edit(id, {
            // 对应属性,对应值
            [type]: newVal
        })
        // 3. 本地仓库也删除
        dispatch(changeSwitchAction(type, newVal, id))
        // 4. 关闭加载状态
        dispatch(setLoadingAction(false));
    }
}


// 导出一个联合类型把这些类型汇总
// 联合之后他会自己动给你做类型推断
export type MovieActions = DeleteAction | SetConditionAction | SetLoadingAction | SaveMoviesAction | MovieChangeSwitchAction

export default {
    saveMoviesAction,
    setLoadingAction,
    setConditionAction,
    deleteAction,
    fetchMovies,
    deleteMovies,
    changeSwitchAction,
    changeSwitch
}