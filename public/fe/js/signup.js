$(function () {

    // 点击获取认证码
    $('.btn_getCode').on('click',function(){
        getCode();
    })

    // 点击注册
    $('.btn_register').on('click',function(){
        var formData=$('.form').serialize();
        userSignup(formData);
    })

})
// 注册
var userSignup = function (option) {
    $.ajax({
        type: 'post',
        url: '/user/register',
        data: option,
        beforeSend: function () {
            //用户名不能为空
            if ($('[name="username"]').val() == '') {
                mui.toast('用户名不能为空！');
                return false;
            }
            //手机号格式
            var reg = /^1[34578]\d{9}$/;
            if (!reg.test($('[name="mobile"]').val())) {
                mui.toast('手机号格式不正确！');
                return false;
            }
            //密码不能为空
            if ($('[name="password"]').val() == '') {
                mui.toast('密码不能为空！');
                return false;
            }
             //两次密码一致
             if ($('[name="password"]').val() != $('[name="rePass"]').val()) {
                mui.toast('两次密码输入不一致！');
                return false;
            }
             //认证码不能为空
             if ($('[name="vCode"]').val() == '') {
                mui.toast('点击按钮获取认证码！');
                return false;
            }

        },
        success: function (data) {
            // console.log(data);
            if(data.success==true){
                // 注册成功跳转到登录页面
                location.href='./login.html';
            }
        }
    });
};
//获取认证码
var getCode=function(){
    $.ajax({
        type:'get',
        url:'/user/vCode',
        data:null,
        success:function(data){
            console.log(data);
        }
    })
}