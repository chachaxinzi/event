$(function () {

    getBaseInfo()
})
var layer = layui.layer
//获取用户的基本信息
function getBaseInfo() {
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        success: function (res) {
            if (res.status !== 0) {
                return
            }
            //渲染头像和昵称
            console.log(res.data);
            render(res.data)
        }
        // complete: function (res) {
        //     console.log(res);
        //     if (res.responseJSON.status === 1 || res.responseJSON.message == "身份认证失败！") {
        //         location.href = "login.html"

        //     }
        // }
    })

}
function render(user) {
    var name = user.nickname || user.username
    //渲染昵称
    $(".weclome").html("欢迎&nbsp&nbsp" + name)
    //渲染头像
    if (user.user_pic) {
        $(".layui-nav-img").attr("src", user.user_pic).show()
        $(".text_avater").hide()
    } else {
        $(".text_avater").html(name[0].toUpperCase()).show()
        $(".layui-nav-img").hide()
    }
}
$("#close").on("click", function () {
    layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
        //确定退出后清除当前的本地存储
        localStorage.removeItem('token')
        //2.退回到登录页面
        location.href = 'login.html'
        layer.close(index);
    });
})

