import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import circles from './modules/circle'

Vue.use(Vuex)

export function createStore () {
  const store = new Vuex.Store({
    state: {
    },
    actions,
    mutations,
    getters,
    modules: {
      circles
    }
  })
  return store
}
