import UserBll from "./common/userBll";
import LoginBll from "./common/loginBll";

const userBll = new UserBll();
const loginBll = new LoginBll();

export {
    loginBll,
    userBll
}