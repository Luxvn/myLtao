$(function () {
    var url = new URLSearchParams(location.search);
    var id = url.get('id');
    // 调用getProductDetail渲染页面
    getProductDetail(id);

    // 点击尺寸span获取size
    $('.mui-content').on('click', '.product-size span', function () {
        $('.mui-content .product-size span').removeClass('active');
        $(this).addClass('active');

    });

    // 点击加入购物车 把商品加入到购物车中
    $('.add-cart').on('click', function () {
        // 1.商品id
        var productId = id;
        //2.尺码size
        var size = $('.mui-content .product-size span.active').html();
        // 3.获取数量num
        var num = mui('.mui-numbox').numbox().getValue();
        // console.log( id, size, num);
        if(!productId){
            mui.toast('商品不存在！');
            return false;
        }
        if(!size){
            mui.toast('请选择合适的尺码！');
            return false;
        }
        if(!num){
            mui.toast('至少选择一样商品！');
            return false; 
        }
        // 添加到购物车
        addCart(productId, size, num);
    })

});


// 初始页面渲染
var getProductDetail = function (id) {

    $.ajax({
        type: 'get',
        url: '/product/queryProductDetail',
        data: { id: id },
        success: function (data) {
            // console.log(data);
            // 产品模板
            var productDetail = template('product-template', data);
            $('.mui-content').html(productDetail);
            // 轮播图js
            var gallery = mui('.mui-slider');
            gallery.slider({
                interval: 2000//自动轮播周期，若为0则不自动播放，默认为0；
            });
            // 数字输入框初始化
            mui('.mui-numbox').numbox();

            // 尺寸模板
            var size = data.size;//40-50
            var sizeArr = size.split('-');
            var start = sizeArr[0];
            var end = sizeArr[1];
            var sizeData = {
                start: start,
                end: end
            };
            // console.log(sizeData);
            var sizeDetail = template('size-template', sizeData);
            $('.product-size').append(sizeDetail);
        }

    })
}
// 添加购物车(三个参数)
var addCart = function (productId, size, num) {
    $.ajax({
        type: 'post',
        url: '/cart/addCart',
        data: {
            productId: productId,
            size: size,
            num: num
        },
        dataType: 'json',
        success: function (data) {
            // console.log(data);{error: 400, message: "未登录！"}
            if(data.error==400){
                //跳转到登录页面 在location.href后面把url作为参数传入
                location.href="../user/login.html?returnUrl="+location.href;
            }
            // 已经登录
            if(data.success==true){
                location.href="../cart.html";
            }
        }
    })
};
