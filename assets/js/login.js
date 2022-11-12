$(function () {
    $(".link_reg").on("click", function () {
        $(".login_box").hide();
        $(".reg_box").show()
    })
    $(".link_login").on("click", function () {
        $(".login_box").show();
        $(".reg_box").hide();
    })
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ]
    })

    //注册页面的接口调用，监听注册页面的提交事件
    $("#reg_form").submit(function (e) {
        e.preventDefault();
        if ($(".pwd").val() !== $(".pwds").val()) {
            return layer.msg('两次密码输入不一致');
        }
        $.ajax({
            method: "POST",
            url: "/api/reguser",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功，请登录');
                $('.link_login').click();
            }
        })
    });
    //登录页面的接口调用，监听登录页面的提交事件
    $("#login_form").on("submit", function (e) {
        e.preventDefault();
        $.post("/api/login", $(this).serialize(), function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg("登录成功！")
            localStorage.setItem("token", res.token)
            //登录成功后页面跳转到首页
            location.href = "/index.html";
        })

    })



})
