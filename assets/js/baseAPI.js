// 每次调用$.ajax  $.get $.post会先调用ajaxPrefilter
// 在这个函数中,可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    // 在发起真正的ajax之前,统一拼接请求的根路径
    options.url = 'http://www.liulongbin.top:3007' + options.url;
    console.log(options.url);

    // 统一为有权限的接口设置headers请求头
    // indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。 如果没有找到匹配的字符串则返回 - 1。
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 全局统一挂载complete回调函数
    options.complete = function(res) {
        // 在complete回调函数中,可以使用res.responseJSON拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 1.清空本地token
            localStorage.removeItem('token');

            // 2.重新跳转到登录页面
            location.href = '/login.html'

        }
    }



})