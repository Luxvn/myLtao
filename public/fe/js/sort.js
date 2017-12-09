// 一级菜单区域滚动
var myScroll = new IScroll('#list-left');

//一级分类联动渲染
var getFirstCategory=function(){
    $.ajax({
        type:'get',
        url: '/category/queryTopCategory',
        data:{},
        success:function(data){
            // console.log(data);
            var firstData=template('first-template',data);
            $('.list-left ul').html(firstData);
            // 功能:当页面加载进来 就要去加载一级分类“运动馆”下的二级分类内容
            // 1.获取一级分类的id == data.rows[0].id
            var firstId=data.rows[0].id;
            // 2.把一级分类的id 传参给getSecondCategory
            getSecondCategory(firstId);
        }
    })
};
getFirstCategory();

//二级分类联动渲染
var getSecondCategory=function(id){
    $.ajax({
        type:'get',
        url: '/category/querySecondCategory',
        data:{
            id:id
        },
        success:function(data){
            // console.log(data);
            var secondData=template('second-template',data);
            $('.list-right').html(secondData);
    
        }
    })
};

// 点击一级分类 动态渲染二级分类
// 1.获取元素注册事件（事件委托）
$('.list-left ul').on('click','a',function(){
    // 2.切换类名
    $('.list-left ul').find('a').removeClass('active');
    $(this).addClass('active');
    // 3.获取一级分类id(自定义属性)
    var firstId=$(this).attr('data-id');
    // 4.调用getSecondCatagory方法
    getSecondCategory(firstId);
})
