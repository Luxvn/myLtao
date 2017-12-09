$(function(){
    getCartData();

    // 点击删除购物车
    $('.mui-table-view').on('click','.mui-btn-red',function(){
          // 删除购物车的id
    var cartId=$(this).attr('data-id');
    delCartData(cartId);
    }); 

    // 点击编辑购物车
    $('.mui-table-view').on('click','.mui-btn-blue',function(){
    //    需要参数cartId,size,num
        var cartId=$(this).attr('data-id');
        var size=$(this).attr('data-size');
        var num=$(this).attr('data-num');
        // 调用updateCartData 编辑购物车
        updateCartData(cartId,size,num);

    });
})

// 删除购物车
var delCartData=function(cartId){
    $.ajax({
        type:'get',
        url:'/cart/deleteCart',
        data:{
            id:cartId
        },
        success:function(data){
            // console.log(data);{success: true}
            if(data.success==true){
                getCartData();
            }
        }
    });
};
// 查询购物车
var getCartData=function(){
    $.ajax({
        type:'get',
        url:'/cart/queryCart',
        data:{},
        success:function(data){
            // console.log(data);
            var cartData=template('cart-template',{list:data});
            $('.mui-table-view').html(cartData);
        }
    });
};
// 编辑购物车
var updateCartData=function(cartId,size,num){
    $.ajax({
        type:'post',
        url:'/cart/updateCart',
        data:{
            id:cartId,
            size:size,
            num:num
        },
        success:function(data){
            console.log(data);
            if(data.success==true){
                location.href="./search/detail.html?id="+cartId;
            }
        }
    });
}