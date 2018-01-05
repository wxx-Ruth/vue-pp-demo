import services from '../../services/circle'

async function getCircleData ({commit, state}, opts) {
  let data = await services.getCircleData(opts)
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

async function setAgreeInfo ({commit, state}, params) {
  let agreeInfo = await services.getAgree(params)
  commit('updateAgree', agreeInfo || {})
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
// 点赞修改状态
function updateAgree (state, { feedId, agree }) {
  state.feedList.map((item) => {
    if (item.feedId === feedId) {
      item.isAgree = !!agree
      return item
    }
  })
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
    getMoreCircle,
    setAgreeInfo
  },
  mutations: {
    addCircleData,
    addFeedList,
    addStarPro,
    updateAgree
  }
}
