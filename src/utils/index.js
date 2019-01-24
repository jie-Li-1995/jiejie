import moment from 'moment'
import qs from 'qs'

export const date = {
  isMorning: function (d) {
    const mm = moment(d)
    let isMorningDate = false
    if (mm.hour() < 12) isMorningDate = true
    return isMorningDate
  },
  isNight: function (d) {
    const mm = moment(d)
    let isNightDate = false
    if (mm.hour() > 18) isNightDate = true
    return isNightDate
  },
  getFormatTime: function (d, format) {
    const mm = moment(d)
    return mm.format(format)
  },
  getTodayDate: function () {
    const mm = moment()
    return mm.format('YYYY-MM-DD')
  },
  getYearMouthDay: function (a) {
    const mm = moment.utc(a)
    return mm.format('YYYY-MM-DD')
  },
  getHour: function (a) {
    const mm = moment.utc(a)
    return mm.format('HH:mm')
  }
}

export const token = {
  set: function (t) {
    window.sessionStorage.setItem('token', t)
  },
  get: function () {
    return window.sessionStorage.getItem('token')
  },
  clear: function () {
    window.sessionStorage.removeItem('token')
  }
}

export const checkMethodsState = {
  set: function (t) {
    window.sessionStorage.setItem('checkMethodsState', t)
  },
  get: function () {
    return window.sessionStorage.getItem('checkMethodsState')
  },
  clear: function () {
    window.sessionStorage.removeItem('checkMethodsState')
  }
}

export const permission = {
  set: function (t) {
    window.sessionStorage.setItem('permission', t)
  },
  get: function () {
    return window.sessionStorage.getItem('permission')
  },
  clear: function () {
    window.sessionStorage.removeItem('permission')
  }
}

export const userInfo = {
  set: function (u) {
    window.sessionStorage.setItem('user', qs.stringify(u))
  },
  get: function () {
    return qs.parse(window.sessionStorage.getItem('user'))
  },
  clear: function () {
    window.sessionStorage.removeItem('user')
  }
}

export const roles = {
  check: function (role) {
    let disabled = true
    const roles = userInfo.get().RolesSign + ','
    let rList = role.split('|')
    for (let i = 0; i < rList.length; i++) {
      if (roles.indexOf(rList[i] + ',') >= 0) {
        disabled = false
        break
      }
    }
    return disabled
  }
}

export const checkString = {
  CheckLength: function (str) {
    var len = 0
    if (str !== '' && str !== null && str !== undefined) {
      for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i)
        // 单字节加1
        if ((c >= 0x0001 && c <= 0x007e) || (c >= 0xff60 && c <= 0xff9f)) {
          len++
        } else {
          len += 1
        }
      }
    } else {
      return 0
    }
    return len
  }
}
