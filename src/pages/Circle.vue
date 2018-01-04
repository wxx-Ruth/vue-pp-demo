<template>
  <div>
      <common-header/>
      <circle-header :circle="circle"></circle-header>
    
    <div class="swiper-container">
      <!-- tab导航 -->
        <div class="m-pp-starTabBox">
            <!-- 追加类名 m-starTab-fix -->
            <ul class="m-pp-pgcTab m-pp-starTab">
                  <!--点击时追加selected-->
                  <li :class="{selected: currentIndex == 0}" @click="changeTab(0)">              
                      <a href="javascript:;">动态</a>
                  </li>
                  <li :class="{selected: currentIndex == 1}" @click="changeTab(1)">
                      <a href="javascript:;">作品</a>
                  </li>
                  <li class="moveBlock" :style="currentStyle"></li>
            </ul>
        </div>
    <!-- tab导航end -->
        <div class="swiper-wrapper">
            <div class="swiper-slide">
              <feed-list :feeds="feeds" v-if="feeds.length > 0" :relatedCircles="relatedCircles"></feed-list>
              <template v-else>
                  <div class="m-box-items m-box-items-full">
                      <section class="m-noInfo-tip">哎呀，数据飞往外太空，抢救ing…</section>
                  </div>
              </template>
            </div>
            <div class="swiper-slide">
                <pro-list :starId="circle.personalData.entityId"></pro-list>
            </div>
        </div>
    </div>
     <base-load-bottom
      :callback="getCircleData.bind(this)"
    ></base-load-bottom>
  </div>
</template>
<script>
import CommonHeader from 'components/common/Header'
import CircleHeader from 'components/CircleHeadBanner'
import FeedList from 'components/FeedList'
import ProList from 'components/ProList'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import BaseLoadBottom from 'components/base/BaseBottomLoading'

export default {
  name: 'circle',
  components: {
    CommonHeader,
    CircleHeader,
    FeedList,
    ProList,
    BaseLoadBottom
  },
  data () {
    return {
      currentIndex: 0,
      lastFeedId: 0,
      snsTime: 0,
      circleId: 0
    }
  },
  computed: {
    circle () {
      return this.$store.state.circles.circle
    },
    feeds () {
      let feedList = this.$store.state.circles.feedList
      let len = feedList.length
      this.lastFeedId = feedList[len - 1].feedId
      this.snsTime = feedList[len - 1].snsTime
      return feedList
    },
    relatedCircles () {
      return this.$store.state.circles.relatedCircles
    },
    currentStyle () {
      return this.getCurrentPosition(this.currentIndex)
    }
  },
  asyncData ({ store, route }) {
    this.circleId = route.params.circleId
    return store.dispatch('getCircleData', this.circleId)
  },
  mounted () {
    const that = this
    this.swiper = new Swiper('.swiper-container', {
      noSwiping: true,
      direction: 'horizontal',
      updateOnImagesReady: true,
      on: {
        slideChangeTransitionStart () {
          that.currentIndex = this.activeIndex
        }
      }
    })
  },
  methods: {
    changeTab (index) {
      this.currentIndex = index
      this.swiper.slideTo(index, 100)
    },
    getCurrentPosition (index) {
      const tabRate = 100 / (2 * 2)
      index = index * 2 + 1
      var currentTabRate = Math.ceil(tabRate * index)
      var left = (currentTabRate - 2) + '%'
      var right = (100 - currentTabRate - 2) + '%'
      return {
        left: left,
        right: right
      }
    },
    getCircleData () {
      return this.$store.dispatch('getMoreCircle', {
        feedId: this.lastFeedId,
        snsTime: this.snsTime,
        upOrDown: 1,
        circleId: this.$route.params.circleId
      })
    }
  }
}
</script>