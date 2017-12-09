$(function () {
  //传入参数--url里的参数
  // URLSearchParams();内置对象，通过这个对象的方法可以获取到url中的参数
  // location.search---> ?key=nike
  var url = new URLSearchParams(location.search);
  // console.log(location);
  var proName = url.get('key');
  //当页面进入的时候，要请求数据
  getSearchResult(1, 10, proName);
  // 1.搜索框添加proName
  $('.search-box input').val(proName);

  var priceFlag = true;
  var numFlag = true;
  // 2.点击价格按钮，让该按钮编程红色 1 升序，2降序
  $('.lt-order [data-type="price"]').on('click', function () {
    $('.lt-order').find('a').removeClass('active');
    $(this).addClass('active');
    if (priceFlag) { 
           //降序
      getSearchResult(1, 10, proName, 2);
      $(this).find('span').removeClass('fa-angle-up');
      $(this).find('span').addClass('fa-angle-down');
        priceFlag = false;
     
    } else {
      //升序
      getSearchResult(1, 10, proName, 1);
      $(this).find('span').removeClass('fa-angle-down');
      $(this).find('span').addClass('fa-angle-up');
      priceFlag = true;
    }
  });
  // 3.点击销量按钮，让该按钮编程红色 1 升序，2降序
  $('.lt-order [data-type="num"]').on('click', function () {
    $('.lt-order').find('a').removeClass('active');
    $(this).addClass('active');
    if (numFlag) {
      //降序
      getSearchResult(1, 10, proName, null, 2);
      $(this).find('span').removeClass('fa-angle-up');
      $(this).find('span').addClass('fa-angle-down');
      numFlag = false;
    } else {
      //升序
      getSearchResult(1, 10, proName, null, 1);
      $(this).find('span').removeClass('fa-angle-down');
      $(this).find('span').addClass('fa-angle-up');
      numFlag = true;
    }
  });
  //4.点击立即购买，跳转到商品详情页
    $('.lt-search-result').on('click','button',function(){
      // 跳转
      location.href = './detail.html?id='+$(this).attr('data-id');
    })



})

var getSearchResult = function (pageNum, pageSize, proName, price, num, brandId) {


  // 发送ajax请求
  $.ajax({
    type: 'get',
    url: ' /product/queryProduct',
    data: {
      page: pageNum || 1,
      pageSize: pageSize || 4,
      proName: proName || '',
      brandId: brandId || '',
      price: price || '',
      num: num || ''
    },
    success: function (data) {
      // console.log(data.data[0]);
      // console.log(data.data[0].pic[0].picAddr);
      var searchResultList = template('result-template', data);
      // console.log(searchResultList);
      $('.lt-search-result').html(searchResultList);
    }
  })
}


