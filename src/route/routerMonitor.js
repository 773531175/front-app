export default (router) => {
    router.beforeEach((to, from, next) => {
        next();
    })
    router.afterEach(to => {

    })
}