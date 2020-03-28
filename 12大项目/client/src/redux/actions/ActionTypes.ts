// 定义一个公共的IAction类型
// T是type的泛型,第二个是payload的泛型,type必须要是字符串
export interface IAction<T extends string , P>{
    type: T,
    payload: P
}