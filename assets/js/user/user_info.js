$(function() {
    var form = layui.form
    var layer = layui.layer

    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在1-6之间'
            }

        }
    })

    initUserInfo()

    // 重置表单数据
    $('#btnReset').click(function(e) {
        // 阻止表单的默认重置行为
        e.preventDefault()
        initUserInfo()
    })

    // 监听表单的提交事件
    $('.layui-form').submit(function(e) {
        // 阻止表单的默认提交行为
        e.preventDefault()
        var data = $(this).serialize()
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: data,
            success: function(res) {
                if (res.status !== 0) {
                    layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！')
                    // initUserInfo()
                    // 调用父页面的方法，重新渲染用户头像和信息
                window.parent.getUserInfo()

            }

        })
    })

    // 初始化用户的基本信息
    function initUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                console.log(res);
                // 调用form.val()快速为表单赋值
                form.val('formUserInfo', res.data)
            }
        })
    }

})