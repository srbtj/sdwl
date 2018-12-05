// let prefix = 'http://10.192.34.31:9090'
// let prefix = '/api'
let prefix = 'http://39.108.5.62:9090'
// console.log(prefix);

export const URLS = {
  BASEURL: prefix,
  // 首页接口
  LOADEVENTS: prefix + '/sdhighway/events/getEvents',
  // LOADNEWSBYTYPE: prefix + '/sdhighway/news/getNewsByType',
  // 新闻模块接口
  GETALLNEWS: prefix + '/sdhighway/news/getAllNews',
  GETALLNEWSBYTYPE: prefix + '/sdhighway/news/getNewsByType',
  GETNEWSDETAILBYID: prefix + '/sdhighway/news/getNewsDetail',
  // 招标
  GETTENDERBYPAGE: prefix + '/sdhighway/tenders/getTenders',
  GETPROVINCEINFO: prefix + '/sdhighway/tenders/selectAllPro',
  GETCITYINFO: prefix + '/sdhighway/tenders/selectCityByPro',
  // 联系我们
  GETCONNECTUS: prefix + '/sdhighway/connectUs/getConnects',
  // 大事件
  GETBIGEVENTS: prefix + '/sdhighway/events/getEvents',
  GETALLEVENTS: prefix + '/sdhighway/events/getAllEvents',
  // 首页党建
  PARTYBUILDINDEX: prefix + '/sdhighway/party/partybuildindex',
  // 查询单条
  PARTYONEINFO: prefix + '/sdhighway/party/partybuild',
  PARTYBYTYPE: prefix + '/sdhighway/party/type',
  //
  GETCOMPANYNAME: prefix + '/sdhighway/business/companyname',
  GETALLBUSINESSCONTACTS: prefix + '/sdhighway/principal/companyprincipals'
}
