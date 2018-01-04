// import global from 'global'
let global = {
  navigator: {
    userAgent: '',
    platform: ''
  }
}
export function detect (ua, platform) {
  let os = {}
  let browser = {}
  let osProducer = {}

  let webkit = ua.match(/Web[kK]it[/]{0,1}([\d.]+)/)
  let android = ua.match(/(Android);?[\s/]+([\d.]+)?/)
  let osx = !!ua.match(/\(Macintosh; Intel /)
  let ipad = ua.match(/(iPad).*OS\s([\d_]+)/)
  let ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/)
  let iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/)
  let webos = ua.match(/(webOS|hpwOS)[\s/]([\d.]+)/)
  let win = /Win\d{2}|Windows/.test(platform)
  let wp = ua.match(/Windows Phone ([\d.]+)/)
  let touchpad = webos && ua.match(/TouchPad/)
  let kindle = ua.match(/Kindle\/([\d.]+)/)
  let silk = ua.match(/Silk\/([\d._]+)/)
  let blackberry = ua.match(/(BlackBerry).*Version\/([\d.]+)/)
  let bb10 = ua.match(/(BB10).*Version\/([\d.]+)/)
  let rimtabletos = ua.match(/(RIM\sTablet\sOS)\s([\d.]+)/)
  let playbook = ua.match(/PlayBook/)
  let chrome = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/)
  let firefox = ua.match(/Firefox\/([\d.]+)/)
  let firefoxos = ua.match(/\((?:Mobile|Tablet); rv:([\d.]+)\).*Firefox\/[\d.]+/)
  let ie = ua.match(/MSIE\s([\d.]+)/) || ua.match(/Trident\/[\d](?=[^?]+).*rv:([0-9.].)/)
  let webview = !chrome && ua.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/)
  let safari = webview || ua.match(/Version\/([\d.]+)([^S](Safari)|[^M]*(Mobile)[^S]*(Safari))/)
  let qq = ua.match(/(QQBrowser)\/([\d.]+)/)
  let baidubox = ua.match(/baiduboxapp\s*([\d.]+)/i)
  let baidubrowser = ua.match(/baidubrowser\s*([\d.]+)/i)
  let weixin = ua.match(/MicroMessenger\/([\d.]+)/i)

  let oppo = ua.match(/OPPO (\w+) /i)
  let vivo = ua.match(/vivo (\w+) /i)
  let sumsung = ua.match(/SM-(\w+) /i)
  let le = ua.match(/(?:Letv|Le) (\w+) Build/i)
  let mi = ua.match(/(?:MI) ([\w ]+) Build/i)
  let huawei = ua.match(/(?:HUAWEI ([\w-]+) Build)|(?:; (?:HW-)?([\w-]+) Build\/(?:HUAWEI|HONOR))/i)
  let redmi = ua.match(/(?:Redmi|HM) ([\w ]+) Build/i)
  let meizu = ua.match(/(((?:meizu\/|m|mx|PRO) ?(?:[0-9]+)) ?(?:\w*)) Build/i)
  let gionee = ua.match(/(Gionee[\s-_](\w*)|(?:GN\d+\w*)) Build/i)
  let miuivideo = ua.match(/miuivideo/i)

  if (oppo) {
    osProducer.oppo = true
    osProducer.version = oppo[1]
  }
  if (vivo) {
    osProducer.vivo = true
    osProducer.version = vivo[1]
  }
  if (sumsung) {
    osProducer.sumsung = true
    osProducer.version = sumsung[1]
  }
  if (le) {
    osProducer.le = true
    osProducer.version = le[1]
  }
  if (mi) {
    osProducer.mi = true
    osProducer.version = mi[1]
  }
  if (huawei) {
    osProducer.huawei = true
    osProducer.version = huawei[1]
  }
  if (redmi) {
    osProducer.redmi = true
    osProducer.version = redmi[1]
  }
  if (meizu) {
    osProducer.meizu = true
    osProducer.version = meizu[1]
  }
  if (gionee) {
    osProducer.gionee = true
    osProducer.version = gionee[1]
  }
  if (miuivideo) {
    osProducer.miuivideo = true
  }

  // Todo: clean this up with a better OS/browser seperation:
  // - discern (more) between multiple browsers on android
  // - decide if kindle fire in silk mode is android or not
  // - Firefox on Android doesn't specify the Android version
  // - possibly devide in os, device and browser hashes
  browser.webkit = !!webkit
  if (webkit) browser.version = webkit[1]

  if (android) {
    os.android = true
    os.version = android[2]
  }
  if (iphone && !ipod) {
    os.ios = os.iphone = true
    os.version = iphone[2].replace(/_/g, '.')
  }
  if (ipad) {
    os.ios = os.ipad = true
    os.version = ipad[2].replace(/_/g, '.')
  }
  if (ipod) {
    os.ios = os.ipod = true
    os.version = ipod[3] ? ipod[3].replace(/_/g, '.') : null
  }
  if (wp) {
    os.wp = true
    os.version = wp[1]
  }
  if (webos) {
    os.webos = true
    os.version = webos[2]
  }
  if (touchpad) {
    os.touchpad = true
  }
  if (blackberry) {
    os.blackberry = true
    os.version = blackberry[2]
  }
  if (bb10) {
    os.bb10 = true
    os.version = bb10[2]
  }
  if (rimtabletos) {
    os.rimtabletos = true
    os.version = rimtabletos[2]
  }
  if (playbook) {
    browser.playbook = true
  }
  if (kindle) {
    os.kindle = true
    os.version = kindle[1]
  }
  if (silk) {
    browser.silk = true
    browser.version = silk[1]
  }
  if (!silk && os.android && ua.match(/Kindle Fire/)) {
    browser.silk = true
  }
  if (chrome) {
    browser.chrome = true
    browser.version = chrome[1]
  }
  if (firefox) {
    browser.firefox = true
    browser.version = firefox[1]
  }
  if (firefoxos) {
    os.firefoxos = true
    os.version = firefoxos[1]
  }
  if (ie) {
    browser.ie = true
    browser.version = ie[1]
  }
  if (safari && (osx || os.ios || win)) {
    browser.safari = true
    if (!os.ios) browser.version = safari[1]
  }
  if (qq) {
    browser.qq = true
    browser.version = qq[2]
  }
  if (baidubox) {
    browser.baidubox = true
    browser.version = baidubox[1]
  }
  if (baidubrowser) {
    browser.baidubrowser = true
    browser.version = baidubrowser[1]
  }
  if (weixin) {
    browser.weixin = true
    browser.version = weixin[1]
  }
  if (webview) browser.webview = true

  os.tablet = !!(ipad || playbook || (android && !ua.match(/Mobile/)) ||
    (firefox && ua.match(/Tablet/)) || (ie && !ua.match(/Phone/) && ua.match(/Touch/)))
  os.phone = !!(!os.tablet && !os.ipod && (android || iphone || webos || blackberry || bb10 ||
    (chrome && ua.match(/Android/)) || (chrome && ua.match(/CriOS\/([\d.]+)/)) ||
    (firefox && ua.match(/Mobile/)) || (ie && ua.match(/Touch/))))
  return {os, browser, osProducer}
}

export const {os, browser, osProducer} = detect(global.navigator.userAgent, global.navigator.platform)
