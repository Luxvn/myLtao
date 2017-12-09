$(document).ready(function(){

    getUserList();
});

var getUserList=function(page,pageSize){
    $.ajax({
        type:'get',
        url:'/user/queryUser',
        data:{
            page:page||1,
            pageSize:pageSize||5
        },
        success:function(data){
            // console.log(data);
            var userList=template('user-template',data);
            $('tbody').html(userList);
        }
    })
}