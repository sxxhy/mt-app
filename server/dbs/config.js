module.exports = {
  dbs: 'mongodb://127.0.0.1:27017/student',
  redis: {
    get host () {
      return '127.0.0.1'
    },
    get port () {
      return 6379
    }
  },
  smtp: {
    get host () {
      return 'smtp.qq.com'
    },
    get user () {
      return '1016522769@qq.com'
    },
    get pass () {
      return 'dgbyzctwnnhybchd'
    },
    get code () { // 此处一定返回是个函数否则每次返回的都是一样的
      return () => {
        return Math.random().toString(16).slice(2,6).toUpperCase()
      }
    },
    get expire () { // 此处一定返回是个函数否则每次返回的都是一样的
      return () => {
        return new Date().getTime()+60*60*1000
      }
    }
  }
}
