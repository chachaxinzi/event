$(function () {
    $.ajaxPrefilter(function (option) {
        option.url = "http://api-breakingnews-web.itheima.net" + option.url
        //为有权限的接口设置请求头
        if (option.url.indexOf("/my/") !== -1) {
            option.headers = {
                Authorization: localStorage.getItem("token") || ""
            }
        }
        //发起ajax请求时，立即验证是否通过了身份验证，没有的话返回登录页面
        option.complete = function (res) {
            if (res.responseJSON.status === 1 || res.responseJSON.message == "身份认证失败！") {
                localStorage.removeItem('token')
                location.href = "login.html"

            }
        }

    })
})