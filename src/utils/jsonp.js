import qs from 'qs'

export default function jsonp (url, params = {}, opts = {}) {
  const callbackName = (opts.callbackName || '__jsonp') + Date.now()
  const timeout = opts.timeout || 15000
  const target = document.head
  let timer
  return new Promise((resolve, reject) => {
    let script = document.createElement('script')
    params.callback = callbackName
    url = `${url}${url.indexOf('?') > -1 ? '&' : '?'}${qs.stringify(params)}`
    script.src = url
    target.appendChild(script)
    script.addEventListener('error', errorHandle)
    if (timeout) {
      timer = setTimeout(function () {
        removeScript()
        reject(new Error('timeout'))
      }, timeout)
    }
    window[callbackName] = function (data) {
      resolve(data)
      if (!data) {
        reject(new Error('no data'))
      }
      removeScript()
    }
    function errorHandle () {
      removeScript()
      reject(new Error('error'))
    }

    function removeScript () {
      if (script) target.removeChild(script)
      script.removeEventListener('error', errorHandle)
      window[callbackName] = function () {}
      if (timer) clearTimeout(timer)
    }
  })
}
