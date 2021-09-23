import BaseApi from "../base/base";

class AppApi extends BaseApi{
    constructor(){
        super(""); 
    }
    createRobGuest(param){
        return this.post({
            url:'/livechatrobot/api/robot/createRobGuest',
            data: param
        })
    }
}

export default AppApi