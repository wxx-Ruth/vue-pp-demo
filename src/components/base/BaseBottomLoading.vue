<template>
    <!-- 底部信息 -->
    <section class="m-pagination">
        <p class="pagination">
            <template v-if="loadComplete">
                没有更多了
            </template>
            <template v-else-if="loading">
               <i class="page-loading"></i><span>正在加载中…</span>
            </template>
             <template v-else-if="error">
               糟糕加载失败，<span class="retry" @click="loadMore">戳我重试</span>
            </template>
        </p>
    </section>
    <!-- 底部信息 end-->

</template>
<script>
export default {
  name: 'BaseBottomLoading',
  props: {
    callback: {
      type: Function,
      default: null
    }
  },
  data () {
    return {
      loadComplete: false,
      loading: false,
      error: false
    }
  },
  mounted () {
    if (!this.callback) return
    this.scrollBottomFunc = this.onScroll()
  },
  destroyed () {
    this.scrollBottomFunc()
  },
  methods: {
    loadMore () {
      if (this.loading) return
      this.loading = true
      this.callback().catch(() => {
        this.error = true
      }).finally(() => {
        this.loading = false
      })
    },
    onScroll () {
      var scrollBottom = this.scrollBottom.bind(this, this.loadMore)
      window.addEventListener('scroll', scrollBottom)
      return function () {
        window.removeEventListener('scroll', scrollBottom)
      }
    },
    scrollBottom (callback) {
      clearTimeout(callback.timer)
      callback.timer = setTimeout(() => {
        let isBottom = window.scrollY + window.screen.height > document.documentElement.offsetHeight - 50
        if (isBottom) {
          callback()
        }
      }, 200)
    }
  }
}
</script>