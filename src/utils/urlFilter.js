import $ from 'jquery';
import { tap } from './tap';
export function getQueryString () {
  var reg = new RegExp("(^|&)?"+ name +"=([^&]*)(&|$)");
  let url = decodeURI(window.location.search)
  var r = url.substr(1).match(reg);
  if (r!=null) return unescape(r[2]); return null;
}

// 非空判断
export function notNull (value) {
  return (value !== undefined && value !== null);
}

let maps = {
  1: 'JAN',
  2: 'FEB',
  3: 'MAR',
  4: 'APR',
  5: 'MAY',
  6: 'JUN',
  7: 'JUL',
  8: 'AUG',
  9: 'SEP',
  10: 'OCT',
  11: 'NOV',
  12: 'DEC'
}
export function getDateInfo (value) {
  let pubtime = value.split('-');
  let month = pubtime[1];
  let monthEN = maps[parseInt(month)];
  return {
    year: pubtime[0],
    month: monthEN,
    day: pubtime[2]
  };
}

// 移动端设置HTML 字体大小 (750尺寸)
function setHtmlFontSize () {
  let oHtml = document.querySelector('html');
  let rect = oHtml.getBoundingClientRect();
  let width = rect.width;
  oHtml.style.fontSize = width / 15 + 'px';
}

// 屏幕大小改变时， 修改html字体大小
export function changeScreen () {
  let docEl = document.documentElement;
  let resizeEv = 'orientationchange' in window ? 'orientationchange' : 'resize';
  let recalc = function () {
    let clientWidth = docEl.clientWidth;
    if (clientWidth > 750) return;
    if (clientWidth === undefined) return;
    docEl.style.fontSize = 50 * (clientWidth / 750) + 'px';
  };
  if (document.addEventListener === undefined) return;
  window.addEventListener(resizeEv, recalc, false);
  document.addEventListener(resizeEv, recalc, false);
  setHtmlFontSize()
}

// 移动侧边栏事件
export function mobileSlider () {
  tap('.nav-show-icon', function () {
    $('.header-mobile-nav').css({left: 0});
  })
  tap('.mobile-nav-close', function () {
    $('.header-mobile-nav').css({left: '-100%'})
  })
  tap('.icon-sousuo', function () {
    $('.header-mobile-nav').css({left: 0});
    var val = $('.mobile-search-input').get(0).value
    if (!val) return false
    window.location.href =`search.html?title=${val}`
  })
}

// 操作导航栏
export function operateNav () {
  $('nav').addClass('active');
  let defaultIndex = -1;
  $('.nav-item').each(function () {
    if ($(this).find('.nav-a').hasClass('active')) {
      defaultIndex = $(this).index()
    }
  })
  $('.header-nav .nav-a').on('mouseover', function () {
    // 获取初始active位置
    let offsetLeft  = $(this).offset().left;
    let docWidth = $(document).width();
    let lastWidth = docWidth - offsetLeft;
    $(this).addClass('active').parent('.nav-item').siblings().find('.nav-a').removeClass('active')
    $(this).siblings('.child-list') && $(this).siblings('.child-list').css({width: lastWidth});
  }).on('mouseout', function () {
    $('.child-list').on('mouseover', function (e) {
      e.preventDefault();
      e.stopPropagation();
      $(this).addClass('active')
    }).on('mouseout', function () {
      $(this).removeClass('active')
    })
    $('.child-list').removeClass('active')
    $('.header-nav .nav-a').removeClass('active')
    // 默认导航添加样式
    $('.nav-item').eq(defaultIndex).find('.nav-a').addClass('active')
  });

  // 搜索
  $('.header-search .search-web').on('mouseover', function () {
    $('.search-input').addClass('active')
  }).on('mouseout', function () {
    $('.search-input').on('mouseover', function (e) {
      e.preventDefault();
      e.stopPropagation();
      $(this).addClass('active')
    }).on('mouseout', function () {
      $(this).removeClass('active')
    }).keypress(function (e) {
      if (e.which == 13) {
        let val = $('.search-input-ctrl').get(0).value.trim()
        if (!val) return false
        window.location.href=`search.html?title=${val}`
      }
    })
    $('.search-input').removeClass('active')
  })
}

export function loadingAnimate () {
  $('body').loading({
    loadingWidth:120,
    title:'',
    name:'test',
    discription:'',
    direction:'column',
    type:'origin',
    // originBg:'#71EA71',
    originDivWidth:40,
    originDivHeight:40,
    originWidth:6,
    originHeight:6,
    smallLoading:false,
    loadingMaskBg:'#fff'
  })
}

export function removeLoading(loadingName){
	var loadingName = loadingName || '';
	$('body,html').css({
		overflow:'auto',
	});

	if(loadingName == ''){
		$(".cpt-loading-mask").remove();
	}else{
		var name = loadingName || 'loadingName';
		$(".cpt-loading-mask[data-name="+name+"]").remove();		
	}
}

export function noData () {
  let oDiv = $('<div class="no-data">')
  let txt = oDiv.text('到底了...');
  $('body').append(oDiv);
  oDiv.animate({top: 40}, 1000)
  setTimeout(function () {
    $('.no-data').remove();
  }, 2000)
}

// 渲染ajax字体
export function renderFont (name) {
  let partName = name || "ajaxFont";
  $youziku.submit(partName);
}
