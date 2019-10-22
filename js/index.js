/**
 * 1、css动画应考虑兼容问题：img旋转
 * 至少需要兼容IE8以上
 * 五大浏览器：
 * IE、chrome、Firefox、Safari、opera
 * 
 */

/**
 * 2、改变导航栏头部颜色
 */
$('.theme_color_checkbox li').on('click', function () {
  $(this).addClass('icondagou').siblings().removeClass('icondagou');
  var inputIndex = $(this).index();//获取到选中颜色的下标
  $('.header_wrap .nav').attr('class', 'nav color_label_' + (inputIndex + 1));
  $('.center_left .good_title').attr('class', 'good_title color_label_' + (inputIndex + 1));
  // localStorage.setItem('themeColor', inputIndex);
  setCookie('themeColorCookie', inputIndex, 7);//设置7天之后过期

})
// var ThemeColorIndex = localStorage.getItem('themeColor');
var ThemeColorIndex = getCookie('themeColorCookie');
if (ThemeColorIndex) {
  let nav = ThemeColorIndex + 1;
  $('.theme_color_checkbox li').eq(ThemeColorIndex).addClass('icondagou').siblings().removeClass('icondagou');
  $('.header_wrap .nav').attr('class', 'nav color_label_' + (ThemeColorIndex * 1 + 1));
  $('.center_left .good_title').attr('class', 'good_title color_label_' + (ThemeColorIndex * 1 + 1));
}
/**
 * 
 * @param {*} name //cookie的名称
 * @param {*} value //cookie的值
 * @param {*} day //cookie的过期时间
 */
function setCookie(name, value, day) {
  if (day !== 0) {
    var expires = day * 24 * 60 * 60 * 1000;//转化为秒
    var date = new Date(+new Date() + expires);
    console.log(expires)
    document.cookie = name + '=' + value + ';expires=' + date.toUTCString();
  } else {
    document.cookie = name + "=" + escape(value);
  }
}
/**
 * 
 * @param {*} name //cookie的名称
 */
function getCookie(name) {
  var arr;
  var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  /**
   * ^:匹配输入字符串的开始位置
   * (^| );//匹配cookie开头或者空格（cookie键值对之间用分号空格隔开）===>cookie键值对的开始
   * name：cookie的名字
   * ([^;]*)：匹配cookie中除了分号（；）以外的值
   * (;|$)：匹配cookie中分号或者匹配cookie的结尾位置
   * 
   */
  if (arr = document.cookie.match(reg)) {
    // console.log('wujia:', arr)
    return unescape(arr[2]);//unescape :是对escape的解码
  } else {
    return null;
  }
}
/**
 * 
 * @param {*} name //删除cookie的值
 */
var delCookie = function (name) {
  setCookie(name, '', -1);
}

/**
 * cookie设置基本语法：
 * cookieName=cookieValue ===> cookieName(cookie名字)，cookieValue(cookie值)
 * expires=Sun, 13 Oct 2019 02:09:08 GMT ===> 设置cookie过期日期，若未定义，cookie会在会话结束时候过期，日期格式为new Date().toUTCString()
 * path=/demoDir ===> 设置文件的路径，没有定义默认为当前文档位置的路径
 * domain=127.0.0.1 ===> 设置指定域名，若未定义，默认问当前文档位置的路径或域名的部分
 * max-age=604800000 ===> 设置文档被查看后cookie过期时间，单位为秒
 * secure=true ===> cookie只会被https传输，即加密的https链接传输
 */
// document.cookie = "cookieName=cookieValue;expires=Sun, 13 Oct 2019 02:09:08 GMT;path=/demoDir;domain=127.0.0.1;max-age=604800000;secure=true";

/**
 * 3、jQuery 文字向上轮播
 */
var scrollLength = $('.new_active_scroll_ul li').length;
var imgIndex = 0;
//循环多少张图
function imgAuto() {
  if (imgIndex < scrollLength - 1) {
    imgIndex++;
  } else {
    imgIndex = 0;
  }
}
timeFun();
var timer;
function timeFun() {
  var i = 0;
  timer = setInterval(function () {
    var item = $('.new_active_scroll_ul').children('li')[0];
    var itemLiHeight = $('.new_active_scroll_ul li').height();
    $(item).animate({ 'top': (-(itemLiHeight) * imgIndex) + 'px', }, function () {
      // 获取第一个元素
      /**
       * prop()方法：设置或返回被选元素的属性和值
       * <div class="outerHTML"><p class="innerHTML">innerTEXT</p></div>
       * outerHTML：父级的里面
       * innerHTML:自己的里面
       * innerTEXT：自己的内容
       * append():增加到最下面
       */
      var fChild = $(item).prop('outerHTML');
      $('.new_active_scroll_ul').append(fChild);
      // 将第一个节点删除
      $(item).remove();
    });
    // $('.new_active_scroll_ul').animate({ top: 0 + "px" }, 0);
    imgAuto();
  }, 1000)
}

$('.new_active_scroll').mouseenter(function () {
  stop(true, true);//停止当前动画
  console.log('timer', timer)
  clearInterval(timer);//清除时间
})
$('.new_active_scroll').mouseenter(function () {
  timeFun();
})

/**
 * 4、导航栏hover
 */
$('.nav ul li').mouseenter(function () {
  $(this).find('a').addClass('appendHoverDiv').parent().siblings().find('a').removeClass('appendHoverDiv');
  $(this).find('.append_hover_item').show().parent().siblings().find('.append_hover_item').hide();
})
$('.nav ul li').mouseleave(function () {
  $(this).find('a').removeClass('appendHoverDiv');
  $(this).find('.append_hover_item').hide();
})


/**
 * 5、banner图轮播
 */
$('.banner_detail li').mouseenter(function () {
  $(this).addClass('active').siblings().removeClass('active');
  let imgIndex = $(this).index();
  console.log(imgIndex)
  animationFun(imgIndex);
});

// 点击轮播（动画）
function animationFun(imgIndex) {
  $('.banner_bj').animate({ 'left': (- 540 * imgIndex) });
  $('.banner_bj li').eq(imgIndex).addClass('active').siblings().removeClass('active');
}

/**
 * 6、最后一个需求
 */
$('.brand_button li').on('click', function () {
  $(this).addClass('active').siblings().removeClass('active');
  var brandIndex = $(this).index();
  console.log('brandIndex', brandIndex);
  $('.brand_swiper_item').animate({ 'left': (- 800 * brandIndex) });
})
for (let imgI = 1; imgI < 5; imgI++) {
  $('.brand_swiper li:nth-child(' + 4 * imgI + ')').css({ 'margin-right': '8px' })
}

console.log($('.brand_swiper li'))