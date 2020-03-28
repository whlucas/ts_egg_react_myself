import React from "react"

export default class extends React.Component {
    // // 这里不用改变仓库的值了,就不用connect了
    // state = {
    //     img: ""
    // }
    render() {
        return (
            <h1>
                欢迎使用
            </h1>
            // <ImageUploader
            //     curImgUrl={this.state.img}
            //     // 给他一个函数改变这里的state
            //     onImgChange={newurl=> {
            //         this.setState({
            //             img: newurl
            //         })
            //     }}
            // ></ImageUploader>
        )
    }
}