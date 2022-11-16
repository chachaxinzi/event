$(function () {
    var form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        notSame: function (value) {
            if (value === $("#pwd [name=oldPwd]").val()) {
                return "新旧密码不能相同"
            }
        },
        same: function (value) {
            if (value !== $("#pwd [name=newPwd]").val()) {
                return "两次密码输入不一致"
            }
        }

    })
    $("#pwd").on("submit", function (e) {
        e.preventDefault();
        // if ($('[name=oldPwd]').val() === $('[name=newPwd]').val()) {
        //     return layui.layer.msg("新旧密码不能相同", { icon: 5 })
        // }

        // if ($('[name=newPwd]').val() !== $('[name=renewPwd]').val()) {
        //     return layui.layer.msg("两次密码输入不一致", { icon: 5 })
        // }
        $.ajax({
            type: 'POST',
            url: "/my/updatepwd",
            data: form.val('resetpwd'),
            success: function (res) {
                if (res.status !== 0) {
                    layui.layer.msg("重置密码失败")
                }
                layui.layer.msg("重置密码成功")
                $("#pwd")[0].reset()
            }
        })
    })
})