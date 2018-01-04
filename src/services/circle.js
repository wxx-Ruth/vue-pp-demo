import Axios from 'axios'
import jsonp from '@/utils/jsonp'
import * as user from './user'

Axios.defaults.withCredentials = true
export default {
  getCircleData,
  getStarPro,
  getGroupData,
  getMoreCicle
}
function getCircleData (circleId) {
  console.log(`http://pub.m.iqiyi.com/h5/bubble/circleInfo.json?circleId=${circleId}`)
  return Axios.get(`http://pub.m.iqiyi.com/h5/bubble/circleInfo.json?circleId=${circleId}`).then((data) => {
    const code = data.data.code
    if (code === 'A00000') {
      return data.data.data
    }
  })
}
function getStarPro (params) {
  return jsonp('//pub.m.iqiyi.com/h5/bubble/starVideos.json', params).then((data) => {
    const code = data.code
    if (code === 'A00000') {
      return data.data.starVideos
    }
  })
}

function getGroupData (id) {
  console.log(`//pub.m.iqiyi.com/h5/bubble/groupShare.json?id=${id}`)
  return Axios.get(`http://pub.m.iqiyi.com/h5/bubble/groupShare.json?id=${id}`).then((data) => {
    console.log('data===' + data.code)
    const code = data.code
    if (code === 'A00000') {
      return data.data
    }
  })
}

function getMoreCicle (params) {
  const opt = {
    agenttype: 119,
    authcookie: user.getAuthcookie(),
    device_id: user.getAnonymousUid()
  }
  return jsonp(`http://pub.m.iqiyi.com/h5/bubble/getFeeds.json`, Object.assign(opt, params)).then((data) => {
    const code = data.code
    if (code === 'A00000') {
      return data.data
    }
  })
}
