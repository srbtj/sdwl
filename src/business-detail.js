import './sass/business-detail.scss';
import $ from 'jquery';
import './img/yq.png';
import {getQueryString, notNull} from './utils/urlFilter'
import {getCompany} from './fetch/company';
import './img/qdwl01.png';
import './img/gsln02.png';
import './img/bzxwu03.png';
import './img/gcwl04.png';
import './img/wlgjmy05.png';
import './img/wljtrz06.png';
import './img/jtwltz07.png';
// 详情页
$(function () {
   /** 计算右边距离 */
   // 导航栏操作
   function initCalc () {
     let navC = $('.child-list').offset().left;
     let disWid = $(window).width() - navC;
     $('.child-list').css({width: disWid});
   }
   $(window).on('resize', function () {
    initCalc();
  });
   initCalc();

   // 导航栏操作
   (function ($) {
    $('nav').addClass('active');
    let currentIndex = -1;
    $('.header-nav .nav-a').on('mouseover', function () {
      let offsetLeft  = $(this).offset().left;
      let docWidth = $(document).width();
      let lastWidth = docWidth - offsetLeft;
      $(this).siblings('.child-list') && $(this).siblings('.child-list').css({width: lastWidth});
      $(this).addClass('active').parent('.nav-item').siblings().find('.nav-a').removeClass('active');    
    }).on('mouseout', function () {
      let self = $(this);
      self.siblings().on('mouseover', function (e) {
        e.preventDefault();
        e.stopPropagation();
        self.addClass('active').siblings().removeClass('active');
      }).on('mouseout', function () {
        self.removeClass('active');
      });
      self.removeClass('active');
    });
  })($);
  
  let maps = {
    1: '综合物流产业园',
    2: '标准运输',
    3: '商贸流通',
    4: '平行车产业链',
    5: '港口经营'
  };
  let types = {
    1: '物流+产业 汇聚优势资源',
    2: '前沿探索 引领行业标准',
    3: '大宗商品一体化 赋能供应链',
    4: '行业领先的汽车供应链平台 港口经营',
    5: '临海扬帆 港通天下'
  }
  let companys = {
    1: '山东高速青岛物流发展有限公司',
    2: '山东高速鲁南物流发展有限公司',
    3: '山东高速标准箱物流有限公司',
    4: '山东高速国储物流有限公司',
    5: '山东高速物流国际贸易有限公司',
    6: '山东高速物流集团日照分公司',
    // 7: '山东高速西海岸港口有限公司',
    8: '山东高速交通物流投资有限公司',
    9: '山东高速青岛西海岸港口有限公司'
  }
  // 地址栏参数 tab: 选择领域 id: 公司id
  // let tab = getQueryString('tab');
  let id = getQueryString('id');
  let tab = 0;
  if (notNull(id)) {
    // let secondTxt = maps[tab];
    // $('.second-crumb').text(secondTxt);
    // 1. 根据id获取公司信息
    let datas = getCompany();
    let curCompany = null;
    datas.map(item => {
      if (item.id === (id)) curCompany = item;
    });
    // 1. 获取公司类型
    tab = curCompany.companyType;
    let subTitle = types[curCompany.companyType]; // 子标题
    let title = maps[curCompany.companyType];
    $('.second-crumb').text(title);
    // console.log(title);
    let companyName = companys[curCompany.id]; // 公司名
    let img = curCompany.url; // 图片
    let person = curCompany.person.map((person, i)=> {
      let temp = i > 0 ? `<div class="phone-info phone-second">` : `<div class="phone-info">`;
      temp += `
          <div class="phone-common">${person.name}</div>
          <div class="phone-common">${person.phone}</div>
        </div>
      `;
      return temp;
    }).join('')

    if (curCompany) {
      let result = `
        <div class="business-item">
          <div class="cel-common">
              <div class="business-title">
                <span class="h3-title h3-normal">${subTitle}</span>
                <span class="h2-title">${companyName}</span>
              </div>
              <img class="business-img" src="./img/${img}.png">
              <div class="business-phone">
                <div class="phone-desc">业务洽谈</div>
                ${person}
              </div>
          </div>
        </div>
          
      <div class="business-item">
        <div class="cel-common cel-common-txt">
            <span class="txt-info">${curCompany.desc}</span>
        </div>
      </div>
    `;

     $('.business .main-wrap').empty().append(result);
    }
    

    // console.log(result);
    
  }

  $('.second-crumb').click(function () {
    window.location.href=`business.html?tab=${tab-1}`;
  });
  $('.first-crumb').click(function () {
    window.location.href=`business.html`;
  });
  // 公司详情页
});