class Models {
    constructor() {

    }
    defaultModel = {
        msg: '',
        code: 0,
        data: {},
        isSuccess: false,
        origin: {},
    }

    modelList = {
        appModel: Object.assign({}, this.defaultModel),
    }

     /**
     *  检查接口响应
     * @param {*} response 
     * code说明 : 
     *  0：成功，1&2：系统异常，3：业务异常
     */
    checkResponse(response){
        if(!response){
            return false;
        }
        if(response.code===10000){
            return true;
        }
        return false;
    }

    /***
     * 获取接口默认输出
     *  response：接口响应数据 
     *  defaultData:返回数据若为空，给的默认值
     */
    getDefaultResponse(response){
        response = response || {};
        let ret = HttpResponse.getResponse();
        ret.code = response.code || ""; //返回状态码
        ret.data = response.data || {}; //数据
        ret.isSuccess = this.checkResponse(response);
        ret.message = response.msg || "";   //描述
        ret.orignalData = response;
        return ret;
    }

    getModel(type,response) {
        let model = {
            ...this.defaultModel
        }
        if (!type) {
            model = this.getDefaultResponse(response)
            return model
        }
        model = {
            ...this.modelList[type]
        }
        return model
    }
}

export default new Models()