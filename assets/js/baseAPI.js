// 每次调用$.ajax  $.get $.post会先调用ajaxPrefilter
// 在这个函数中,可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    // 在发起真正的ajax之前,统一拼接请求的根路径
    options.url = 'http://www.liulongbin.top:3007' + options.url;
    console.log(options.url);

})