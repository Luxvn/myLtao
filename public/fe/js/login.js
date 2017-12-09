$(function () {
    // 点击登录
    $('.signin').on('click', function () {
    //    data username=tom&password=123456
        // 方案一 input的name属性
        // var username=$('[name="username"]').val();
        // var password=$('[name="password"]').val();
        // var data="username="+username+"&password="+password;

        // 方案二--$("").serialize(); 序列化表单
        // 1.前提: 要求必须是form标签
        var formdata = $(".form").serialize();
        //  itcast 111111
        userLogin(formdata);
    });
});

var userLogin = function (data) {
    $.ajax({
        type: 'POST',
        url: '/user/login',
        data: data,
        success: function (data) {
            // console.log(data);
            if(data.error==403){
                mui.toast(data.message);
            }
            if(data.success==true){
                // 跳转到地址栏位置，或者默认到首页
                var urlRearch=new URLSearchParams(location.search);
                var url=urlRearch.get('returnUrl')||'../index.html';
                location.href=url;
            }
        }
    });
};