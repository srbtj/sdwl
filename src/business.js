import $ from 'jquery';
import './sass/business.scss';
import './img/business-1.png';
import './img/business-2.png';
import './img/business-3.png';
import './img/business-4.png';
import './img/business-5.png';
import './img/business-6.png';
import './img/business-7.png';
import './img/business-8.png';
import './img/business-9.png';
import {getQueryString} from './utils/urlFilter'
import {changeScreen, mobileSlider, operateNav} from './utils/urlFilter';
import {tap} from './utils/tap'
(function ($) {
  
   /** 计算右边距离 */
  //  console.log($('.tab-right-bg').offset().left);
   // 导航栏操作
   function initCalc () {
     if (!$('.child-list').offset()) return;
     let navC = $('.child-list').offset().left;
     let disWid = $(window).width() - navC;
     $('.child-list').css({width: disWid});

     let left = $('.tab-right-bg').offset().left;
     $('.tab-right-bg').css({
       right: -left
     });
   }
   $(window).on('resize', function () {
    initCalc();
  });
   initCalc();

  let tab1 = $('.tab-1');
  let tab2 = $('.tab-2');
  let tab3 = $('.tab-3');
  let tab4 = $('.tab-4');
  let tab5 = $('.tab-5');
  let tab1_top = tab1.offset().top;
  let tab2_top = tab2.offset().top;
  let tab3_top = tab3.offset().top;
  let tab4_top = tab4.offset().top;
  let tab5_top = tab5.offset().top;
  let arr = [tab1_top, tab2_top, tab3_top, tab4_top, tab5_top];
  
  let cloneCache = null;
  if (!cloneCache) cloneCache = $('.business-tab').clone(true);
  $('body').append($(cloneCache)).addClass('clone-tab');
  $('.business-tab .tab-header').on('click', function () {
    let index = $(this).index();
    startMove(index, $(this));
  });

  $(window).scroll(function () {
    let scrollTop = $(document).scrollTop();
    let target = 355;
    if (scrollTop > target) {
      $('body > .business-tab').css({top: 0});
    } else {
      $('body > .business-tab').css({top: -200});
    }
    // 为滚动添加样式
    let index = 0;
    let dis = scrollTop + tab1_top;
    if (dis > tab5_top) {
      index = 4;
    } else if (dis > tab4_top) {
      index = 3;
    } else if (dis > tab3_top) {
      index = 2;
    } else if (dis > tab2_top) {
      index = 1;
    } else {
      index = 0;
    }
    $('.business-tab .tab-header').eq(index).addClass('active').siblings().removeClass('active');
    $('body > .business-tab .tab-header').eq(index).addClass('active').siblings().removeClass('active');
  });

  $('html , body').animate({scrollTop: 0},300);

  let logoArrs = [
    'icon-laosilaisi', 'icon-binli', 'icon-benchi',
    'icon-baoma', 'icon-aodi', 'icon-luhu', 'icon-dazhong'
  ];
  let logoLi = logoArrs.map(item => {
    return `
      <li class="logo-item">
        <i class="icon font_family ${item}"></i>
      </li>
    `;
  })
  $('.car-logo-list').append(logoLi.join(''));

  let startMove = function (index, target) {
    target.addClass('active').siblings().removeClass('active');
    $('body > .business-tab .tab-header').eq(index).addClass('active').siblings().removeClass('active');
    let trans_top = index > 0 ? arr[index] - 80 : 0;
    $('html , body').animate({scrollTop: trans_top}, 300);
    index > 0 ? $('body > .business-tab').css({top: 0}) : $('body > .business-tab').css({top: -200});
  }
  // 获取地址栏参数
  let currentTab = getQueryString('tab');
  if ((currentTab !== undefined && currentTab !== null)) {
    // console.log(currentTab);
    startMove(currentTab, $('.business-tab .tab-header'));
  }

  // 更多详情
  $('.block-btn, .desc-btn').on('click', function () {
    // let tab = $(this).attr('data-tab');
    let id = $(this).attr('data-id');
    if (+id === 7)  window.location.href = `business-car.html?id=${id}`;
    else window.location.href = `business-detail.html?id=${id}`;
  })
  // 车系详情
  $('.car-info .car-more').on('click', function () {
    // let tab = $(this).attr('data-tab');
    let id = $(this).attr('data-id');
    if (+id === 7)  window.location.href = `business-car.html?id=${id}`;
    else window.location.href = `business-car.html?id=${id}`;
  })

  // 播放视频
  $('.play-model').on('click', function () {
    $('#play').animate({top: 0}, 300);
  })
  $('#play .close-video').on('click', function () {
    $('#myVideo').get(0).pause();
    $('#play').animate({top: '-100%'}, 300);
  })

  tap('.show-detail .icon', function ({target}) {
    !target.hasClass('icon-top') ? target.addClass('icon-top') : target.removeClass('icon-top')
    let parent = target.parents('.block-info')
    let childTarget = parent.find('.block-img, .desc')
    childTarget.hasClass('mobile-toggle-show') ? childTarget.removeClass('mobile-toggle-show') :
    childTarget.addClass('mobile-toggle-show')
  })
  changeScreen();
  mobileSlider();
  operateNav();
})($);
