import axios from "axios";
import models from './responseModel'
let pending = [];
let isPending = (url) => pending.includes(url);
let removePending = (url) => {
    let index = pending.findIndex((item) => item === url);
    pending.splice(index, 1);
};

axios.interceptors.request.use(
    (config) => {
        if (!config.headers.noIntercept && isPending(config.url)) {
            console.log(config.url);
            return Promise.reject({
                isSuccess: false,
                msg: "重复请求",
                code: 400,
            });
        }
        pending.push(config.url);
        return config;
    },
    (error) => {
        return Promise.reject({
            isSuccess: false,
            msg: "参数报错",
            code: 400,
        });
    }
);

axios.interceptors.response.use(
    (response) => {
        removePending(response.config.url);
        //登录态丢失
        if(response.data && response.data.code === 401){
            // jumpLogin();
        }
        let res = models.getModel(response.config.mode,response);
        return res
    },
    (error) => {
        pending = [];
        return Promise.reject({
            isSuccess: false,
            msg: "参数报错",
            code: 400,
        });
    }
);