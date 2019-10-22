
$(function () {
  /**
 * 衣服颜色切换
 */
  $('.three_good_img li').on('click', function () {
    var clothesIndex = $(this).index();
    var imgSrc = $(this).find('img').attr('src');
    var i = imgSrc.split(".")[1];
    var newSrc = '.' + i + '_small.jpg';
    var newSrcBig = '.' + i + '_big.jpg'
    $('.good_show_big img').attr('src', newSrc);
    console.log('newSrcBig:', $('.jqzoom'))
    $('.jqzoom').attr('href', newSrcBig);
  });

  /**
   * 颜色切换
   */
  var altColor = '蓝白';
  $('.color_change li').on('click', function () {
    altColor = $(this).find('img').attr('alt');
    $('.type .color').text(altColor);
  });
  /**
   * select选中的值
   */
  var checkValue = 1;
  $('.type select').change(function () {
    checkValue = $("select option:selected").val();
    $('.type_sum_price').text(checkValue * 200)
  });

  /**
 * tabs切换
 */
  $('.goods_tabs_title li').on('click', function () {
    $(this).addClass('active').siblings().removeClass('active');
    var tabsIndex = $(this).index();
    $('.goods_tabs_box li').eq(tabsIndex).addClass('active').siblings().removeClass('active');
  })

  /**
   * 选中尺寸
   */
  var size_text = '未选择';
  $('.size_change li').on('click', function () {
    $(this).addClass('active').siblings().removeClass('active');
    size_text = $(this).text();
    $('.type .size').text(size_text);
  })


  /**
   * 评星
   */
  $('.start li').bind('mouseenter', function () {
    $(this).prevAll().addClass('active');
    $(this).addClass('active');
    $(this).nextAll().removeClass('active');


  })
  $('.start li:nth-child(1)').mouseleave(function () {
    $(this).removeClass('avtive');
    // var arr = $(this).index();
    // console.log($(this))
    // $(this).prevAll().addClass('active');
    // $(this).nextAll().removeClass('active');
    // $(this).removeClass('active');
    // $('.start li').removeClass('active');
    // for (var i = 0; i < arr; i++) {
    //   console.log('i', i, arr)
    //   $('.start li').eq(i).addClass('active');
    //   $('.start li').eq(arr + 1).removeClass('active');
    //   // arr[i].addClass('active');
    // }

  })

  $('.start li').on('click', function () {

    alert('您给此商品的评分是：' + ($(this).index() + 1) + '分');
    $(this).addClass('active');
    $(this).prevAll().addClass('active');
  })

  /**
   * 购物车
   * checkValue:选中的件数
   * altColor:选中衣服的颜色
   * size_text：
   */
  $('.buy_car img').on('click', function () {
    $('.modal').show();
    $('.modal_wrap_content').text('感谢您的购买。您购买的产品是：免烫高支棉条纹衬衣；尺寸是：' + size_text + '；颜色是：' + altColor + '；数量是：' + checkValue + '；总价是：' + checkValue * 200 + '元。')
  });
  $('.close_btn').on('click', function () {
    $('.modal').hide();
  })

})