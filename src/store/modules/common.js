import types from '../types/common'
export default {
    state: {
        userInfo: {},
    },
    actions: {
        setUserInfo({commit,dispatch},userInfo) {
            commit(types.SET_USE_INFO,userInfo);
        }
    },
    mutations: {
        [types.SET_USE_INFO]: (state,userInfo) =>{
            state.userInfo = userInfo;
        }
    },
    getters: {
        userInfo: (state) => {
            return state.userInfo;
        }
    }
}