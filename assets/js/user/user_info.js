$(function () {
    var form = layui.form
    var layer = layui.layer
    //获取基本信息
    getBaseInfo()
    function getBaseInfo() {
        $.ajax({
            metod: 'GET',
            url: "/my/userinfo",
            success: function (res) {
                form.val('user', res.data);
            }
        })
    }
    //重置按钮的功能
    $("#reset").on("click", function (e) {
        e.preventDefault()
        getBaseInfo();
    })
    //提交修改功能的实现
    $("#user_info").on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            metod: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("提交修改失败！")
                }
               // window.parent.render(res.data)
            }
        })
    })

})