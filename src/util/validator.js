export function checkName(rule,value,callback){//这个变量名不能够随便定义 必须是check加上data中定义的属性
    if (value===''){
        callback(new Error('必填字段,不可为空'));
    }else{
        callback();
    }
}

export function validatePhone(rule, value,callback) {//电话号码验证
    const reg =/^[1][3-9][0-9]{9}$/;
    if(value===''||value===undefined||value===null){
        callback();
    }else {
        if ((!reg.test(value)) && value != '') {
            callback(new Error('请输入正确的电话号码'));
        } else {
            callback();
        }
    }
}

export function validateEMail(rule, value,callback) {//邮箱验证
    const reg =/^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/;
    if(value===''||value===undefined||value==null){
        callback();
    }else{
        if (!reg.test(value)){
            callback(new Error('请输入正确的邮箱'));
        } else {
            callback();
        }
    }
}

export function isPassword(rule, value, callback) {//密码组成验证
    const reg =/^[_a-zA-Z0-9]+$/;
    if(value==''||value==undefined||value==null){
        callback();
    } else {
        if (!reg.test(value)){
            callback(new Error('仅由英文字母，数字以及下划线组成'));
        } else {
            callback();
        }
    }
}

export const validateName = (rule, value, callback) => {//账号限制验证
    if (!value) {
        return callback(new Error('请输入账号'))
    }
    if (!/^(?![0-9]*$)(?![a-zA-Z]*$)[a-zA-Z0-9]{5,15}$/.test(value)) {
        callback(new Error('账号必须为5-15位字母和数字组合'))
    } else {
        callback()
    }
}