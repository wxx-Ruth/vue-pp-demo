import BScroll from '@/directives/scroll'
export default {
  install (Vue) {
    Vue.directive('scroll', BScroll)
  }
}
