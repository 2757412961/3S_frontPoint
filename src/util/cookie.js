/**
 * Cookie Processes
 */
//获取cookie、
export function getCookie(name) {
    let arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    return arr ? arr[2] : null;
}

//设置cookie,增加到vue实例方便全局调用
export function setCookie(c_name, value, expires) {
    let exdate = new Date();
    exdate.setTime(exdate.getTime() + expires);
    document.cookie = c_name + "=" + escape(value) + ((expires == null) ? "" : ";expires=" + exdate.toGMTString());
};

//删除cookie
export function delCookie(name) {
    setCookie(name, '', -1)
};

