
$(function () {
    //1.页面加载后展示 展示历史记录
    getHistoryList();
    // 2.点击搜索按钮，把历史记录存入localStorage 跳转到搜索结果
    // 2.1获取按钮 并添加点击事件
    $('.search-box').on('click', 'span', function () {
        // 2.2通过调用setHistory 把输入框中的内容添加到历史记录
        var val = $('.search-box input').val();
        setHistory(val);
        // 2.3跳转
        // 把用户的搜索词给传输到下一页html中
        location.href = './searchList.html?key=' + val;
        // 搜索框置空
        $('.search-box input').val('');
        // 把参数带到html的？后面
        // 把参数存储到localStorage中--隐身模式不存储数据 怕用户和开发者无意识的把localStorage清空
    
    })

    // 3.点击历史记录列表，把文字当成搜索词
       $('.history-list').on('click','span',function(){
        location.href = './searchList.html?key='+$(this).html();
       })
    // 4.点击清空历史记录 清空历史记录
    $('#clear-all').on('click',function(){
        localStorage.removeItem('aHistory');
        getHistoryList();
    });
    // 5.点击删除按钮 删除某一条记录
    $('.history-list').on('click','i',function(){
        var val=$(this).siblings('span').html();
        delHistory(val);
        getHistoryList();
    })
});


    // 获取历史记录(数组)
var getHistory = function () {
    // localStorage存储的是字符串
    // 有历史记录的话获取历史记录，没有的话返回空数组
    return JSON.parse(localStorage.getItem('aHistory') || '[]');
}
// 测试
// getHistory('aHistory');
// 添加历史记录
var setHistory = function (value) {
    // 获取历史记录，判断是否已经含有value
    var aArr = getHistory();
    //遍历数组
    $.each(aArr, function (i, item) {
        if (value == item) {
            // 切割数组
            aArr.splice(i, 1);
        }
    });
    // 添加value
    aArr.push(value);
    // 添加json到历史记录
    localStorage.setItem('aHistory', JSON.stringify(aArr));
}
// 测试
// setHistory('kaka');
// setHistory('kaka1');
// setHistory('kaka1');

// 删除历史记录
var delHistory = function (value) {
    // 获取历史记录，判断是否已经含有value
    var aArr = getHistory();
    //遍历数组
    $.each(aArr, function (i, item) {
        if (value == item) {
            // 切割数组
            aArr.splice(i, 1);
        }
    });
    // 添加json到历史记录
    localStorage.setItem('aHistory', JSON.stringify(aArr));
}
// 测试
// delHistory('kaka');
// delHistory('kaka1');

// 历史记录列表
var getHistoryList = function () {
    // 1.没有历史记录告诉用户 “没有历史搜索记录”
    // 2.如果有历史记录 使用列表展示(模板)
    var data = { list: getHistory() };
    // console.log(data);
    // 使用template方法 展示历史记录列表
    var historyList = template('history-template', data);
    // 测试
    // console.log(historyList);
    $(".history-list").html(historyList);
}