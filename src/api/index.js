// axios 发送网络请求获取数据
// 数据接口： http://rap2api.taobao.org/app/mock/269060/api/v1
// 话题接口： http://rap2api.taobao.org/app/mock/269060/api/v1/email

import axios from "axios"
import {message} from "antd"

const isDev = process.env.NODE_ENV === 'development';


// 1. 配置基准地址
const service = axios.create(
    {
        baseURL: "http://rap2api.taobao.org/app/mock/269060/api/v1"

    }
)

// 2. 可以使用的对象的API进行网络请求的拦截
//    - 拦截请求 传递参数 token
//    - 拦截响应 做统一的处理
service.interceptors.request.use((config) => {
    // config 代表发送给服务的信息，后期自己需要天厨数据，自己配置即可
    console.log("请求时的操作",config);
    return config
})

service.interceptors.response.use((response) => {
    console.log("返回时的操作",response);
    if (response.status === 200) {
        return response.data
    } else {
        // 统一处理错误
        message.error('获取数据失败，请开启后端or数据库');
    }
    return

})


const getTopics = (name) => {
    return service.get(name)
}

export {
    getTopics
}