import { createStore, applyMiddleware } from "redux"
import { rootReducer, IRootState } from "./reducers/Rootreducer";
// npm install -D redux-logger @types/redux-logger
// 这个插件就是为了给你把store里面的操作作为日志给你打印出来
import logger from "redux-logger"
// 应用redux-thunk
import thunk, { ThunkMiddleware } from "redux-thunk"

// 创建这个store的时候使用这个中间键
export const store = createStore(
    rootReducer,
    // thunk要写在前面,给这个thunk规定一个类型ThunkMiddleware,泛型第一个参数是state的类型,第二个参数是action的类型,后面还有,就写第一个就行了
    // 这里必须要规定thunk的类型,要不然在调用异步函数的时候类型检查会报错
    applyMiddleware(thunk as ThunkMiddleware<IRootState>, logger)
);