const axios = require('axios')

const instance = axios.create({
  baseURL: `http://${process.env.HOST||'localhost'}:${process.env.PORT||3000}`,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    "Authorization":"APPCODE 5008f5980cc345d0806c5876e884c599"
  }
})

module.exports = instance
