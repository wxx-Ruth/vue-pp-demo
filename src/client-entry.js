import Vue from 'vue'
import 'es6-promise/auto'
import { createApp } from './app'
import BScroll from 'better-scroll'
let scrolls = {}
Vue.directive('scroll', {
  inserted (el, binding) {
    const betterScroll = new BScroll(el, Object.assign({
      eventPassthrough: true
    }, binding.modifiers))
    const scrollId = Date.now()
    el.dataset.scrollId = scrollId
    scrolls[scrollId] = betterScroll
  },
  componentUpdated (el, binding) {
    const betterScroll = scrolls[el.dataset.scrollId]
    if (betterScroll) betterScroll.refresh()
  }
})

/* Vue.mixin({
    beforeRouteUpdate (to, from, next) {
        const { asyncData } = this.$options
        if (asyncData) {
            asyncData({
                store: this.$store,
                route: to
            }).then(next).catch(next)
        } else {
            next()
        }
    }
}) */

const { app, router, store } = createApp()

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
    /* router.beforeResolve((to, from, next) => {
        const matched = router.getMatchedComponents(to)
        const prevMatched = router.getMatchedComponents(from)
        let diffed = false
        const activated = matched.filter((c, i) => {
            return diffed || (diffed = (prevMatched[i] !== c))
        })
        if (!activated.length) {
            return next()
        }
        bar.start()
        Promise.all(activated.map(c => {
            if (c.asyncData) {
                return c.asyncData({ store, route: to })
            }
        })).then(() => {
            bar.finish()
            next()
        }).catch(next)
    }) */
  app.$mount('#app')
})

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
}
