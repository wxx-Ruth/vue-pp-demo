import BScroll from 'better-scroll'

let scrolls = {}
export default {
  inserted (el, binding) {
    const betterScroll = new BScroll(el, {})
    const scrollId = Date.now()
    el.dataset.scrollId = scrollId
    scrolls[scrollId] = betterScroll
  },
  componentUpdated (el, binding) {
    const betterScroll = scrolls[el.dataset.scrollId]
    if (betterScroll) betterScroll.refresh()
  }
}
