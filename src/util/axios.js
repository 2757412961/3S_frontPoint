import axios from 'axios';
import {MessageBox, Message} from 'element-ui';
import router from '../main'
// axios 配置
axios.defaults.timeout = 1800000;

axios.defaults.baseURL = 'http://localhost:13000/summer';
// axios.defaults.baseURL = 'http://10.79.231.81:13000/summer';
let AUTH_TOKEN = (function () {
    return localStorage.getItem("token");
})();
axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;

// http request 拦截器，通过这个，我们就可以把Cookie传到后台
axios.interceptors.request.use(
    config => {


        // config.headers = {
        //     'Content-Type': 'application/json' //x-www-form-urlencoded保持参数以key-value的形式传到后台，json是以json字符串的形式传到后台
        // };
        //config.responseType = 'json';//请求数据类型包括'arraybuffer','blob','document','json','text','stream'

        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

// http response 拦截器
axios.interceptors.response.use(
);
// //  响应拦截
axios.interceptors.response.use(res => {

    // if (res.data.code === 200 || res.data.code === 9001 || res.data.code === 201 || res.data.code === 1003 || res.data.code === 1001 || res.data.code === 9000) {
        return res;
    // }
    // return Promise.reject(res);
}, err => {
    if (err.response.status === 40000) {
        MessageBox.confirm('您的登陆已超时，是否重新登陆？', 'Confirm logout', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(action => {
            if (action === 'confirm') {     //确认的回调
                router.push({
                    name: 'login'
                });
            }
        }).catch(err => {
            if (err === 'cancel') {     //取消的回调
                sessionStorage.removeItem('user');
            }
        });
    }
    else {
        Message.error({message: '未知错误'});
    }
    return Promise.reject(err);
});


/**
 * fetch 请求方法
 * @param url
 * @param params
 * @returns {Promise}
 */
export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err)
            })
    })
}

/**
 * post 请求方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data = {}) {//params是添加到url中传参数，data是添加到请求体中传参数
    return new Promise((resolve, reject) => {
        axios.post(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
    })
}

//带配置参数的post方法
export function postAdvanced(url, data = {}, config) {
    return new Promise((resolve, reject) => {
        axios.post(url, data, config)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            });
    });
}

export function remove(url, data = {}) {//params是添加到url中传参数，data是添加到请求体中传参数
    return new Promise((resolve, reject) => {
        axios.delete(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
    })
}


/**
 * patch 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.patch(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
    })
}

/**
 * put 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function put(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.put(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
    })
}

export default axios;

