$(function () {
    var layer = layui.layer;
    var index = null;
    var form = layui.form;
    //渲染信息列表
    getList();
    function getList() {
        $.ajax({
            type: "GET",
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg("获取列表失败")
                }
                //成功之后渲染数据到ui
                var htmlstr = template("tpl_add", res)
                $("tbody").html(htmlstr)
            }
        })
    }
    //点击添加类别弹出添加层
    var contHTML = $("#content").html()
    $("#add").on("click", function () {
        index = layer.open({
            type: 1,
            title: '添加类别',
            content: contHTML,
            area: ['500px', '250px']
        });
    })

    //添加类别监听提交事件
    $("body").on("submit", ".add_type", function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/article/addcates",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("添加失败")
                }
                layer.msg("添加成功");
                layer.close(index);
                getList()
            }
        })
    })
    var form_writing = $("#form-writing").html();
    //点击编辑弹出编辑层
    var index_1 = null;
    $("tbody").on("click", "#writing", function () {
        index_1 = layer.open({
            type: 1,
            title: '编辑类别',
            content: form_writing,
            area: ['500px', '250px']
        })
        var id = $(this).attr("data-id");
        $.ajax({
            type: 'GET',
            url: "/my/article/cates/" + id,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("获取分类失败")
                }
                form.val("writing", res.data);
            }
        })

    })
    //给编辑层监听提交事件
    $("body").on("submit", ".form-wr", function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/article/updatecate",
            data: form.val("writing"),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("更新类别失败")
                }
                layer.msg("更新类别成功");
                layer.close(index_1);
                getList()
            }
        })
    })
    //给删除事件添加点击事件，弹出询问层
    $("tbody").on("click", "#del", function () {
        var id = $(this).attr("data-id");
        layer.confirm('确定删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                type: "GET",
                url: "/my/article/deletecate/" + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg("删除失败")
                    }
                    layer.msg("删除成功")
                    getList()
                }
            })

            layer.close(index);
        });
    })
})