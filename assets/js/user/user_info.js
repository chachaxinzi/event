$(function () {
    var form = layui.form
    var layer = layui.layer
    //获取基本信息
    getInfo()
    function getInfo() {
        $.ajax({
            type: 'GET',
            url: "/my/userinfo",
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                form.val('user', res.data);

            }
        });
    }
    //重置按钮的功能
    $("#reset").on("click", function (e) {
        e.preventDefault();
        getInfo();
    });
    //提交修改功能的实现
    $(".layui-form").on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("提交修改失败！")
                }
                layer.msg("提交修改成功！")
                window.parent.getBaseInfo()
            }
        });
    });

});