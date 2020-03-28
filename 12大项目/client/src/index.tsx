import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// 导入antd的样式
import "antd/dist/antd.css"
// import { store } from './redux/store'
// import MovieAction from './redux/actions/MovieAction';
// import { MovieService } from './service/MovieService';



ReactDOM.render(<App />, document.getElementById('root'));


















// 测试代码

// 写一个store的监听器,做测试
// 用了redux-logger日志中间键就不用这个了
// store.subscribe(() => {
//     console.log(store.getState());
// })

// store.dispatch(MovieAction.setConditionAction({
//     page: 2
// }))

// 我希望我的这个dispatch里面的东西给我返回的是一个action
// 但是我这个异步的thunk返回的是一个函数,他会被thunk中间键所处理
// 其中一个做法直接在dispatch的参数后面 as any
// 第二个做法是去到store里面在应用这个thunk的时候去修改这个dispatch的参数设置
// store.dispatch(MovieAction.fetchMovies({
//     page: 2,
//     pageSize: 2,
//     key: ""
// }))

// store.dispatch(MovieAction.deleteMovies(5))


// MovieService.add({
//     name: "waf",
//     type: "fda",
//     areas: "sdf",
//     timeLong: 12,
//     isHot: true,
//     isComing: true,
//     isClassic: true,
//     description: "sdf",
//     poster: "sdf"
// }).then(data => {
//     console.log(data.data)
// })

// MovieService.edit(7, {
//     name: "waf",
//     type: "fda",
//     areas: "sdf",
//     timeLong: 12111,
//     isHot: true,
//     isComing: true,
//     isClassic: true,
//     description: "sdf",
//     poster: "sdf"
// }).then(data => {
//     console.log(data.data)
// })

// MovieService.findAllMovie().then(data => {
//     console.log(data.data)
// })

// MovieService.findByKey({
//     page: 2,
//     pageSize: 2,
//     key: ""
// }).then(data => {
//     console.log(data)
// })
