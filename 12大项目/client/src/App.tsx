import React from "react"
import Layout from "./pages/Layout"
import { Route, BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "./redux/store"

const App: React.FC = () => {
	return (
		// 这里给所有的组件提供一个数据,这个数据就是我创建的仓库store
		// 这样我就可以用connect函数做数据和组件的链接
		<Provider store={ store }>
			{/* 不管我调哪一个地址都是先给我来一个layout页面 */}
			<BrowserRouter>
				<Route path="/" component={Layout}></Route>
			</BrowserRouter>
		</Provider>
	)
}

export default App;


// action 平面对象数据变化的方式
// reducer 数据变化的内容,需要action来触发
// store 存储数据的内容
