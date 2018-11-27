import './sass/index.scss';
import $ from 'jquery';
import './vendors/flexslider';
import './img/b1.png';
import './img/news-img.png';
import './img/oybl.jpg';
import './img/news-default.png';
import './img/float_ad.png';
import './img/oybl-mobile.png';
import './vendors/loading'
// 移动端改变html字体大小
import {changeScreen, mobileSlider, operateNav, loadingAnimate, removeLoading, renderFont} from './utils/urlFilter';
import moment from 'moment';
import {tap} from './utils/tap'
import api from './fetch/api'
$(function () {
  // 加载新闻
  let loadNewsByType = function ({pageNo, pageSize, type, isPush}, cb) {
    loadingAnimate();
    api.GetAllNewsByTypeAndPage({pageNo, pageSize, type, isPush}).then(res => {
      removeLoading();
      if (res.list) cb && cb(res.list)
    })
  };
  // 加载集团新闻2条
  loadNewsByType({pageNo: 1, pageSize: 2, type: 1}, function (data) {
    let notices = data.map(item => {
      return `
        <li class="news-item" data-id="${item.id}">
            <a href="news-detail.html?id=${item.id}" style="color: #fff;">
              <span class="item-desc">${item.title}</span>
              <span class="item-link">
                <span class="link-info mobile-hide">详细</span><i class="icon font_family icon-gengduo"></i></span>
            </a>
          </li>
        `;
      }).join('');
    $('.news-list').empty().append(notices);
    renderFont('ajax1')
  });
  // 推送新闻
  loadNewsByType({pageNo: 1, pageSize: 1, type: 1, isPush: true}, function (data) {
    // console.log('推送新闻', data);
    let tops = data.map(item => {
      let img_info = item.url || './img/news-default.png'
      $('.news-img .push-img').attr({src: img_info})
      $('.news-img .img-link').attr({href: `news-detail.html?id=${item.id}`})
      return `
        <h2 class="news-title">
          <a href="news.html?id=${item.id}">${item.title}</a>
        </h2>
        <div class="news-info mobile-hide">
          <span class="news-info-span">
            ${item.newsAbstract}
          </span>
        </div>
      `;
    }).join('');
    $('.index-news-wrap .news-desc').empty().append(tops)
    renderFont('ajax2')
  });
  // 加载行业动态
  loadNewsByType({pageNo: 1, pageSize: 3, type: 2, isPush: false}, function (data) {
    let orgs = data.map(item => {
      let pubtime = moment(item.date).format('YYYY-MM-DD')
      return  `
      <li class="tab-body-item" data-id="${item.id}">
        <a class="link-color"  href="javascript:;">
          <span class="item-time">${pubtime}</span>
          <span class="item-desc">${item.title}</span>
        </a>
      </li>
      `;
    }).join('');
    $('.jtxw').empty().append(orgs);
    renderFont('ajax3')
  });
  // 业务
  tap('.business-wrap', '.business-item', function ({event, target}) {
    let index = target.index()
    if (index === 5) {
      $('#blPageMobile').removeClass('oyblHide').addClass('oyblShow')
    } else {
      window.location.href = `business.html?tab=${index}`
    } 
  })
  tap('#blPageMobile', '.bl-close', function () {
    $('#blPageMobile').removeClass('oyblShow')
  })
  // 大事件
  let bigEvents = function (cb) {
    api.GetBigEvents({pageNo: 1, pageSize: 100, simple: true}).then(res => {
      if (res.list) cb && cb(res.list)
    })
  }
  bigEvents(function (data) {
    let maps = {}
    for (let key in data) {
      let el = data[key]
      if (!maps[el.year]) maps[el.year] = []
      if (maps[el.year].length <= 4) maps[el.year].push(el.events)
    }

    var initData = function (datas) {
      let yearStr = ``;
      let eventStr = ``;
      for (let key in datas) {
        yearStr += `
          <li class="year-item"><span>${key}</span></li>
        `;
        let eventInfo = (datas[key] && datas[key].map(event => {
          return `
            <span class="span-item">${event}</span>
          `;
        }));

        let temp = eventInfo.join(' ');
        let eventResult = `
          <li class="data-item">
            <div class="data-item-desc">${temp}</div>
          </li>
        `;
        eventStr += eventResult;
      }

      $('.year-list').append(yearStr);
      $('.data-list').append(eventStr);
      renderFont('ajax4')
      $('.year-flexslider').flexslider({
        animation: "slide",
        controlNav: false,
        animationLoop: false,
        slideshow: false,
        itemWidth: 120,
        asNavFor: '.data-flexslider',
        minItems:2,
        directionNav: false
      });

      $('.data-flexslider').flexslider({
        animation: "slide",
        controlNav: false,
        animationLoop: true,
        slideshow: true,
        sync: ".year-flexslider",
        directionNav: false
      });
    }
    initData(maps)
  });
  // 计算欧亚班例宽度
  (function ($) {
    function initCalc () {
      let trainLeft = $('.logistic-train').offset().left;
      let docW = $(document).width();
      let dis = docW - trainLeft;
      $('.logistic-train').css({width: dis});
    }
    $(window).on('resize', function () {
      initCalc();
    });
    initCalc();
    tap('.logistic-train', function () {
      $('#blPage').show();
    })
    tap('#blPage .bl-close', function () {
      $('#blPage').hide();
    })
  })($);

  // 返回顶部
  let backToTop = function () {
    $(window).scroll(function(){
      var scroTop = $(window).scrollTop();
      if(scroTop>50){
        $('.back-top').fadeIn(500);
      }else{
        $('.back-top').fadeOut(500);
      }
    });    
    tap('.back-top', function () {
      $("html,body").animate({scrollTop:0},"fast");
    })
  }
  backToTop();

  // 搜索操作
  (function ($) {
    $('.header-search').on('mouseover', '.fa-icon', function () {
      $('.search-input').animate({height: 75}, .2);
    })
  })($);

  /** banner 动画 */
  (function ($) {
    $('.index-banner.flexslider').flexslider({
      directionNav: true,
      pauseOnAction: false,
      slideshowSpeed: 5000
    });
  })($);

  tap('.tab-body', 'li', function ({target}) {
    let id = target.attr('data-id');
    window.location.href=`news-detail.html?id=${id}`;
  });
  // 更多新闻
  tap('.tab-header-more', function () {
    window.location.href = 'news.html'
  })

  function floatAd () {
    var x = 0,y = 0
    var xin = true, yin = true
    var step = 1
    var delay = 10
    var obj=document.getElementById("floatAd")
    if (!obj) return;
    var userAgent=navigator.userAgent;
    function floatwww_qpsh_com() {
      var L=0, T=0;

      var R= document.body.clientWidth-obj.offsetWidth
      var B;
      //var B = document.body.clientHeight-obj.offsetHeight
      if(userAgent.indexOf("Chrome") > -1)
      {
        B= window.innerHeight+document.documentElement.scrollTop-obj.offsetHeight;
      }
      else
      {
        B=document.documentElement.clientHeight+document.documentElement.scrollTop-obj.offsetHeight;
      }
      T=document.documentElement.scrollTop;
      obj.style.left = x + document.body.scrollLeft+"px"
      obj.style.top = y + document.body.scrollTop+"px"
      x = x + step*(xin?1:-1)
      if (x < L) { xin = true; x = L}
      if (x > R){ xin = false; x = R}
      y = y + step*(yin?1:-1)
      if (y < T) { yin = true; y = T }
      if (y > B) { yin = false; y = B }
    }
    var itl= setInterval(function () {
      floatwww_qpsh_com()
    }, delay)
    obj.onmouseover=function(){clearInterval(itl)}
    obj.onmouseout=function(){itl=setInterval(function () {
      floatwww_qpsh_com()
    }, delay)}
    tap('#floatAd', '.ad-close', function ({event, target}) {
      event.preventDefault()
      event.stopPropagation()
      $('#floatAd').remove()
    })
    tap('#floatAd', function () {
      $(this).remove()
      $('#blPage').show()
    })
  }

  function scrollToTrget () {
    let tops =  $('.logistic-wrap').offset().top;
    $('html, body').stop();
    $('html, body').animate({scrollTop: tops - 60}, 1000);
  }
  scrollToTrget();
  floatAd();
  changeScreen();
  mobileSlider();
  operateNav();
});
