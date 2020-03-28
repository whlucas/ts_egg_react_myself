// 这里描述一下服务器的返回结果

export interface IResponseError {
    err: string
    data: null
}

export interface IResponseData<T> {
    err: ""
    data: T
}

export interface IResponsePageData<T> {
    err: ""
    count: number
    data: T[]
}

export interface ISerachCondition {
    page?: number
    pageSize?: number
    key?: string
}

export enum SwitchName{
    isHot = "isHot",
    isComing = "isComing",
    isClassic = "isClassic"
}