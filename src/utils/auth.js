
var DataPersonal = window.sessionStorage.getItem('wechatuser')
var wechatuser = (DataPersonal && DataPersonal != 'undefined') ? DataPersonal : ''

// 测试站使用 http://keysight-crm.vip.ccwonline.com.cn 正式站 http://crm.insight-china.cn
var baseUrl = 'http://keysight-crm.vip.ccwonline.com.cn'

// 测试站使用 http://keysight.vip.ccwonline.com.cn 正式站 http://www.insight-china.cn
// var transUrl = 'http://keysight.vip.ccwonline.com.cn'

var TabName = ''// 正式站需要更改
var systemid = 17// 正式站需要更改
var ActivityAnalysisID = 613// 正式站需要更改 //活动分析ID 测试站目前是613，线上待定

// var siteTheNo = '17_EV_112415'//正式站需要更改
// var siteTheId = 1006//正式站需要更改
// var siteTheConferenceId = 838 //正式站需要更改
var activityId = ActivityAnalysisID

var commomSource = GetQueryString('Source') || ''
var tempShareIDid = GetQueryString('ShareID') || ''

if (wechatuser != '' && wechatuser != undefined) {
  try {
    wechatuser = JSON.parse(wechatuser)
    GetMyPopularity()
    // init_SynchronizeBrowseUser()
  } catch (err) {
    alert(err)
  }
} else {
  $.ajax({
    url: baseUrl + '/Members/GetUserInfo',
    type: 'GET',
    dataType: 'json',
    async: false,
    success: function (data) {
      if (data.Success) {
        wechatuser = data.Object
        sessionStorage.setItem('wechatuser', JSON.stringify(wechatuser))
        GetMyPopularity()
        // init_SynchronizeBrowseUser()
      } else if (data.Message == '用户Session失效。') {
        var myencodeUrl = encodeURIComponent(window.location.href)
        console.log(myencodeUrl)
        window.location.href = baseUrl + '/Members/WeChatLogin?urlreferer=' + myencodeUrl
      } else {
        alert(data.Message)
      }
    },
    error: function (jqXHR) {
      console.log(jqXHR)
      return false
    }
  })
}

function GetMyPopularity () {
  $.ajax({
    url: baseUrl + '/Event/GetMyPopularity',
    type: 'GET',
    // data: {
    // },
    dataType: 'json',
    async: false,
    success: function (data) {
      if (data.Success) {
        if (data.Object) {
          MyPopularityData = data.Object
        }
      } else if (data.Message == '用户Session失效。') {
        reAuth()
      } else {
        alert(data.Message)
      }
    },
    error: function (jqXHR) {
      console.log(jqXHR)
      // alert('ajax error')
      return false
    }
  })
}

function init_SynchronizeBrowseUser () {
  $.ajax({
    url: baseUrl + '/ActivityAnalysis/SynchronizeBrowseUser',
    type: 'post',
    data: {
      id: activityId,
      unionid: wechatuser.UnionID,
      source: commomSource
    },
    dataType: 'json',
    success: function (data) {
      if (data.Success) {
        // console.log('成功')
      } else if (data.Message == '用户Session失效。') {
        reAuth()
      } else {
        alert(data.Message)
      }
    },
    error: function (jqXHR) {
      console.log(jqXHR)
      // alert('ajax error')
      return false
    }
  })
}

function GetQueryString (name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return null
}

function reAuth () {
  sessionStorage.setItem('wechatuser', '')
  var myencodeUrl = encodeURIComponent(delQueStr(window.location.href, 'personal'))
  window.location.href = baseUrl + '/Members/WeChatLogin?urlreferer=' + myencodeUrl
}

// 删除参数值
function delQueStr (url, ref) {
  var str = ''
  if (url.indexOf('?') !== -1) {
    str = url.substr(url.indexOf('?') + 1)
  } else {
    return url
  }
  var arr = ''
  var returnurl = ''
  var setparam = ''
  if (str.indexOf('&') !== -1) {
    arr = str.split('&')
    for (let i in arr) {
      if (arr[i].split('=')[0] !== ref) {
        returnurl = returnurl + arr[i].split('=')[0] + '=' + arr[i].split('=')[1] + '&'
      }
    }
    return url.substr(0, url.indexOf('?')) + '?' + returnurl.substr(0, returnurl.length - 1)
  } else {
    arr = str.split('=')
    if (arr[0] === ref) {
      return url.substr(0, url.indexOf('?'))
    } else {
      return url
    }
  }
}
