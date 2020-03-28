// 这里讲一下组件属性的默认值问题

import React from "react"

interface MyProps {
    a: string
    b: string
}

class Test extends React.Component<MyProps> {
    // 给这个组件的props设置默认值,如果没传,就使用默认值
    // static defaultProps: MyProps = {
    //     a: "123",
    //     b: "456"
    // }

    // 如果我只想设置a是默认值,用类型验算,从MyProps里面选一个a
    // 当然这么写使用这个组件的时候就要赋值b了
    static defaultProps: Pick<MyProps, "a"> = {
        a: "123",
    }

}

// tslint:disable-next-line: max-classes-per-file
class User extends React.Component {
    render() {
        return (
            // 我这里使用这个组件需要给他传props
            // 但是如果我不传,我的Test组件可以有默认值
            // 这里就不用报错了
            <Test b = "12"/>
        )
    }
}


export default User