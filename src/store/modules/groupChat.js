import services from '../../services/circle'

async function getGroupData ({commit, state}, circleId) {
  let data = await services.getGroupData(circleId)
  commit('addGroupData', data)
}
function addGroupData (state, data) {
  state.groupInfo = data
}
export default {
  state () {
    return {
      groupInfo: {}
    }
  },
  actions: {
    getGroupData
  },
  mutations: {
    addGroupData
  }
}
