// 进度条

//当ajax开始的时候 进度条开始
$(document).ajaxStart(function () {
  console.log("开始");
  NProgress.start();
});
// 当ajax结束的时候，进度条结束
$(document).ajaxComplete(function () {
  console.log("结束");
  NProgress.done();
})

// 点击左按钮菜单显示和隐藏
$('[data-menu]').on('click', function () {
  $(".ad_aside").toggle();
  $(".ad_section").toggleClass("menu");
})

//点击右按钮 退出登录
$('[data-logout]').on('click', function () {
  // 模态框添加到html
  var html = '<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">' +
    '<div class="modal-dialog" role="document">' +
    '<div class="modal-content">' +
    '<div class="modal-header">' +
    '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
    '<h4 class="modal-title" id="myModalLabel">温馨提示</h4>' +
    '</div>' +
    '<div class="modal-body">' +
    '<p class="logoutP"> <span class="glyphicon glyphicon-info-sign"></span>您确定要退出后台系统吗 ？</p>' +
    '</div>' +
    '<div class="modal-footer">' +
    '<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>' +
    '<button type="button" class="btn btn-primary user-exit">确定</button>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>';
  $("body").append(html);
  // 显示模态框
  $("#myModal").modal("show");
  // 点击确定 用户退出并跳转到登录页面
  $("body").on("click",".user-exit",function(){
    $.ajax({
      type:'get',
      url:'/employee/employeeLogout',
      data:null,
      success:function(data){
        if(data.success==true){
          $("#myModal").modal("hide");
          location.href="./login.html";
        }
      }
    })
  })
})

// 二级菜单显示和隐藏
$(".menu a[href='javascript:;']").on("click",function(){
  $(this).next().slideToggle();
})