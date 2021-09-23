import axios from 'axios'

class BaseApi {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.host = '//' + location.host;
    }

    get(params) {
        this.setDefaultParams(params);
        return axios.get(params.url, {
            data: params.data,
            withCredentials: true,
            headers: params.headers,
        }).catch((e) =>{
            console.log('api error',e)
            return  this.errorResponse(e)
        })
    }

    post(params) {
        this.setDefaultParams(params);
        return axios.post(params.url,params.data, {
            withCredentials: true,
            headers: params.headers,
        }).catch((e) =>{
            console.log('api error',e)
            return this.errorResponse(e)
        })
    }
    put(params) {
        this.setDefaultParams(params);
        return axios.put(params.url, {
            data: params.data,
            withCredentials: true,
            headers: params.headers,
        }).catch((e) =>{
            console.log('api error',e)
            return  this.errorResponse(e)
        })
    }

    delete(params) {
        this.setDefaultParams(params);
        return axios.delete(params.url, params.data, {
            withCredentials: true,
            headers: params.headers,
        }).catch((e) =>{
            console.log('api error',e)
            return  this.errorResponse(e)
        })
    }

    jsonp(params) {
        return new Promise((resolve, reject) => {
            try {
                var cbFunc = '_tcjp' + new Date().getTime();
                window[cbFunc] = function (data) {
                    resolve(data);
                    document.body.removeChild(script);
                }
                this.setRequestParams(params);
                params.url += params.url.indexOf('?') == -1 ? '?' : '&';
                params.url += tcUtils.objectToQString(params.data);
                params.url += 'callback=' + cbFunc;
                // 创建script标签
                var script = document.createElement('script');
                script.src = params.url;
                script.type = 'text/javascript';
                document.body.appendChild(script);
            } catch (error) {
                reject(error);
            }
        })
    }
    setDefaultParams(params) {
        let headers = {
            'content-type': 'application/json;charset=UTF-8'
        }
        if (!params.url) {
            params.url = this.host + this.baseUrl
        } else {
            params.url = this.host + this.baseUrl + params.url;
        }
        if (!params.data) {
            params.data = {}
        }
        params.headers = {...params.headers,...headers}
    }

    errorResponse(e){
        return {
            code: e.response.status,
            isSuccess: false,
            msg: '网络错误',
            extends: e
        }
    }
}
export default BaseApi