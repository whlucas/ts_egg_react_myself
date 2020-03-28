// 在package.json里面配置代理,让他去调后端的接口
// "proxy": "http://localhost:7001"

// 这里我定义接口


import axios from "axios"
import { IResponseData, IResponseError, IResponsePageData, ISerachCondition } from "./CommonTypes"

export interface IMovie {
    id?: number;
    name: string;
    types: string;
    areas: string;
    timeLong: number;
    isHot?: boolean;
    isComing?: boolean;
    isClassic?: boolean;
    description?: string;
    poster?: string;
}

export class MovieService {
    // 这里返回值一定是promise,promise里面加泛型来规定里面的内容,由于规定了服务器的返回结果,我这里定义了服务器返回的两种结果,直接用联合类型来约束
    public static async add(movie: IMovie): Promise<IResponseData<IMovie> | IResponseError> {
        const { data } = await axios.post("/addMovie", movie)
        return data
    }

    // 因为修改的时候一般就修改个别属性,所以我这里用类型验算把他们变成可选的
    public static async edit(id: number, movie: Partial<IMovie>): Promise<IResponseData<true> | IResponseError> {
        const reqData = {
            id,
            ...movie
        }
        const { data } = await axios.post("/editMovie", reqData)
        return data
    }

    public static async delete(id: number): Promise<IResponseData<true> | IResponseError> {
        const reqData = {
            id,
        }
        const { data } = await axios.post("/delMovie", reqData)
        return data
    }

    public static async findAllMovie(): Promise<IResponseData<true> | IResponseError> {
        const { data } = await axios.get("/findAllMovie")
        return data
    }

    // 这里有个问题是,写了IResponseError,之后如何区分他返回的是哪一种类型
    public static async findByKey(condition: ISerachCondition): Promise<IResponsePageData<IMovie>> {
        const { data } = await axios.post("/findByKey", condition)
        return data
    }

    public static async findById(id: number): Promise<IResponseData<IMovie> | IResponseError> {
        const { data } = await axios.get("/findById/" + id)
        return data
    }
}