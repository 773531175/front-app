let target = {
    development: 'http://localhost:8080',
    qa: 'http://www.qa.baidu.com',
    stage: 'http://www.t.baidu.com',
    product: 'http://www.baidu.com'
}
module.exports = [
    {
        api: '/livechatrobot',  
        target: target
    } 
]