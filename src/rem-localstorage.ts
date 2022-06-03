// Based on Remy Sharp's https://gist.github.com/remy/350433
export default function Storage(type: 'local' | 'session'): Storage {
  function createCookie(name: string, value: string, days: number) {
    var date, expires

    if (days) {
      date = new Date()
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
      // @ts-expect-error toGMTString deprecated
      expires = '; expires=' + date.toGMTString()
    } else {
      expires = ''
    }
    document.cookie = name + '=' + value + expires + '; path=/'
  }

  function readCookie(name: string) {
    var nameEQ = name + '=',
      ca = document.cookie.split(';'),
      i,
      c

    for (i = 0; i < ca.length; i++) {
      c = ca[i]
      while (c.charAt(0) == ' ') {
        c = c.substring(1, c.length)
      }

      if (c.indexOf(nameEQ) == 0) {
        return c.substring(nameEQ.length, c.length)
      }
    }
    return null
  }

  function setData(data: any) {
    data = JSON.stringify(data)
    if (type == 'session') {
      window.name = data
    } else {
      createCookie('localStorage', data, 365)
    }
  }

  function clearData() {
    if (type == 'session') {
      window.name = ''
    } else {
      createCookie('localStorage', '', 365)
    }
  }

  function getData() {
    var data = type == 'session' ? window.name : readCookie('localStorage')
    return data ? JSON.parse(data) : {}
  }

  // initialise if there's already data
  var data = getData()

  return {
    length: 0,
    clear: function () {
      data = {}
      // @ts-expect-error
      this.length = 0
      clearData()
    },
    getItem: function (key: string): null | string {
      return data[key] === undefined ? null : data[key]
    },
    key: function (i: number) {
      // not perfect, but works
      var ctr = 0
      for (var k in data) {
        if (ctr == i) return k
        else ctr++
      }
      return null
    },
    removeItem: function (key: string) {
      delete data[key]
      // @ts-expect-error
      this.length--
      setData(data)
    },
    setItem: function (key: string, value: string) {
      data[key] = value + '' // forces the value to a string
      // @ts-expect-error
      this.length++
      setData(data)
    },
  }
}
