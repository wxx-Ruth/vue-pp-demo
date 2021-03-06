import Vue from 'vue'
import Router from 'vue-router'
import Circle from 'pages/CircleList'
import GroupChat from 'pages/GroupChat'

Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/circleInfo/:circleId',
        name: 'circleInfo',
        component: Circle
      },
      {
        path: '/groupShare.html',
        name: 'groupchat',
        component: GroupChat
      }
    ]
  })
}
