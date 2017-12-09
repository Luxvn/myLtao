$(function(){    
    getUserInfo();
    // 点击退出登录
    $(".logout-btn").on('click',function(){
        userLogOut();
    })

});

// 查询个人信息
var getUserInfo=function(){
    $.ajax({
        type:'get',
        url:'/user/queryUserMessage',
        data:null,
        success:function(data){
            // console.log(data);
            if(data.error==400){ 
                // 未登录，跳转到登录页面{error: 400, message: "未登录！"}
                location.href="./user/login.html?returnUrl="+location.href;
            }else{
                var userInfo=template('user-template',data);
                $('.mui-media').html(userInfo);
            }           
        }
    });
};
// 退出登录
var userLogOut=function(){
    $.ajax({
        type:'get',
        url:'/user/logout',
        data:null,
        success:function(data){
            // console.log(data);
            if(data.success==true){
                location.href='./user/login.html';
            }
        }
    })
}