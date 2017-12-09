$(document).ready(function () {
  $('#form').bootstrapValidator({
    // 图标 
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      username: { // name属性值
        validators: {
          notEmpty: { // 非空校验
            message: '用户名不能为空!'
          },
          stringLength: { // 长度校验
            min: 4,
            max: 30,
            message: '用户名长度4-30个字符！'
          },
          // regexp: { //正则校验
          //   regexp: /^[a-zA-Z0-9_]+$/,
          //   message: '用户名仅支数字，字母和下划线的组合'
          // },
          callback: {
            message: '用户名不存在'
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: '密码不能为空'
          },
          callback: {
            message: '密码错误'
          }
        }
      }
    }
  })
    // 这是当表单校验成功过后 执行的方法

    .on('success.form.bv', function (e) {
      // 阻止默认的submit类型的按钮自动提交
      e.preventDefault();
      var $form = $(e.target);
      var bv = $form.data('bootstrapValidator');
      $.ajax({
        type: 'post',
        url: '/employee/employeeLogin',
        data: $form.serialize(),
        sucess: function (data) {
          //检验用户名是否存在
          if (data.error == 1000) {
            // 更新状态
            bv.updateStatus("username", "INVALID", "callback");
          }
          //检验密码是否存在
          if (data.error == 1001) {
            // 更新状态
            bv.updateStatus("password", "INVALID", "callback");
          }
          if (data.sucess == true) {
            location.href = "./index.html";
          }
        }
      })
    });
});