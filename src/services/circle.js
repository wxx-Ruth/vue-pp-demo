import Axios from 'axios'
import jsonp from '@/utils/jsonp'

Axios.defaults.withCredentials = true
export default {
  getCircleData,
  getStarPro
}
function getCircleData (circleId) {
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
