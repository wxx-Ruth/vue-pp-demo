import services from '../../services/circle'

async function getCircleData ({commit, state}, circleId) {
  let data = await services.getCircleData(circleId)
  commit('addCircleData', data)
  commit('addFeedList', data.feeds)
}
async function getStarPros ({commit, state}, params) {
  let products = await services.getStarPro(params)
  commit('addStarPro', products)
}
async function getMoreCircle ({commit, state}, params) {
  let data = await services.getMoreCicle(params)
  commit('addFeedList', data.feeds)
}
function addCircleData (state, data) {
  state.circle = data.circle
  state.relatedCircles = data.relatedCircles
}
function addFeedList (state, data) {
  state.feedList = state.feedList.concat(data)
}
function addStarPro (state, starPro) {
  state.starPros = starPro
}

export default {
  state () {
    return {
      circle: {},
      relatedCircles: [],
      feedList: []
    }
  },
  actions: {
    getCircleData,
    getStarPros,
    getMoreCircle
  },
  mutations: {
    addCircleData,
    addFeedList,
    addStarPro
  }
}
