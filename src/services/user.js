import Cookie from 'js-cookie'
import { os, browser, sessionStorage, uuid } from '@/utils'
import md5 from 'blueimp-md5'
import axios from 'axios'

const ptid = os.android ? '02022001010000000000' : '02032001010000000000'
const DFP_HOST = 'https://cook.iqiyi.com'
let isSetAnonymousUid = false

export async function getUserInfo (options) {
  const authcookie = getAuthcookie()
  let { dfp } = await getFingerPrint()
  let data = Object.assign({
    agenttype: (browser.iPhone) ? 12 : 13,
    antiCsrf: md5(authcookie),
    qyid: getAnonymousUid(),
    fields: 'qiyi_tennis_vip,userinfo,qiyi_vip_info,pps_vip_info',
    ptid,
    dfp
  }, options)

  // SDK设备指纹值
  const res = await axios.post('https://passport.iqiyi.com/apis/user/info.action', data, {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  return res.data.data
}

export async function getUserInfoServer (options) {
  const authcookie = options.authcookie || ''

  let data = Object.assign({
    agenttype: 13,
    authcookie: authcookie,
    source: 'ugc_space',
    timestamp: Date.now(),
    ptid: '02022001010000000000',
    fields: 'qiyi_tennis_vip,userinfo,qiyi_vip_info,pps_vip_info'
  }, options)
  data = Object.assign({
    sign: getSign(data, 'ugcglop6JDce7BdPLQ2foALaxspc')
  }, data)
  const res = await axios.get('http://passport.qiyi.domain/apis/user/info.action', {
    params: data
  })
  return res.data.data
}

function getSign (params, secretKey, devide) {
  devide = devide || '|'
  var sortedKeys = Object.keys(params).sort() // 所有key按升序排列
  var sign = sortedKeys.reduce((sign, key) => (sign += key + '=' + params[key] + devide), '')
  sign = sign + secretKey // 将返回值做md5编码
  return md5(unescape(encodeURIComponent(sign)))
}

async function getFingerPrint () {
  const name = 'getFingerPrint'
  const dfp = await getCache(name, () => getDfpParam(name))
  return { dfp }
}

async function getCache (name, callback) {
  getCache.cache = getCache.cache || {}
  let promise = getCache.cache[name]
  if (promise) return promise
  let value = sessionStorage.getItem(name)
  if (value) return value
  value = await (getCache.cache[name] = callback())
  sessionStorage.setItem(name, value)
  return value
}

// 获取dfp值
async function getDfpParam (name) {
  const dfp = await new Promise((resolve, reject) => {
    try {
      window.dfp[name](DFP_HOST, resolve, resolve)
    } catch (e) {
      resolve()
    }
  })
  return dfp || ''
}

export function getUid () {
  return getP00002().uid
}

function getP00002 () {
  const p00002 = Cookie.get('P00002')
  /* eslint-disable no-new-func */
  return p00002 ? JSON.parse(p00002) : {
    uid: ''
  }
}

export function getAnonymousUid () {
  var uid = Cookie.get('QC006')
  if (uid) return uid
  uid = uuid()
  isSetAnonymousUid = true
  Cookie.set('QC006', uid, {
    expires: 365 * 24 * 60 * 60 * 1000,
    path: '/',
    domain: 'iqiyi.com'
  })
  return uid
}

export function isNewUser () {
  var uid = Cookie.get('QC006')
  return uid ? isSetAnonymousUid : true
}

export function isLogin () {
  const p00002 = Cookie.get('P00002')
  const p00003 = Cookie.get('P00003')
  return (p00002 && p00002 !== 'deleted') && (p00003 && p00003 !== 'deleted')
}

export function getAuthcookie () {
  return Cookie.get('P00001') || ''
}
