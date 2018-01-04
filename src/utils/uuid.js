import md5 from 'blueimp-md5'

export function uuid () {
  return md5(window.navigator.userAgent + document.cookie + Math.random() + Date.now())
}
