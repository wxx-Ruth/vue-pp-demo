<template>
    <div>
         <template v-for="(list, index) in starVideos">
            <div class="m-box m-box-mid">
                <div class="m-box-items">
                    <section class="m-title">
                        <div class="m-worktitle"><i class="m-titleicon"></i>{{list.tagName}}</div>
                    </section>
                </div>
                <div class="m-box-items">
                    <section class="m-pic  m-pgc-lists" :class="{'m-pic-horizontal': list.channelId == 6, 'm-pic-vercital': list.channelId !== 6}">
                        <ul class="m-pic-list">
                            <li v-for="item in list.relatedVideos">
                                <div class="piclist-img">
                                    <a :title="item.mainTitle" :href="item.pageUrl" class="piclist-link" :style="{'background-image':`url(${item.imageUrl})`}">
                                     <div class="c-rt">
                                            <i class="c-picicon c-picicon-ffei" v-if="item.isPaid"></i>
                                            <i class="c-picicon c-picicon-yquan" v-else-if="item.isCoupon"></i>
                                            <i class="c-picicon c-picicon-vip" v-else-if="item.isVip"></i>
                                            <i class="c-picicon c-picicon-ffzbo" v-else-if="item.isPaidLive"></i>
                                            <i class="c-picicon c-picicon-zbo"  v-else-if="item.isLive"></i>
                                            <i class="c-picicon c-picicon-zzhi" v-else-if="item.isQiyiProduced"></i>
                                            <i class="c-picicon c-picicon-dbo" v-else-if="item.isExclusive"></i>
                                            <i class="c-picicon c-picicon-pke" v-else-if="item.isPaikeType && item.isPaikeType"></i>
                                            <i class="c-picicon c-picicon-zti" v-else-if="item.isTheme"></i>
                                    </div>
                                        <div class="c-lb" v-if="item.pubStr">
                                            <span class="c-date">{{item.pubStr}}</span>
                                        </div>
                                    <div class="c-rb" v-if="item.showContent">
                                            <span class="c-date c-date-score" v-if="(item.showContent.length == 3 || item.showContent.length == 4) && item.showContent.indexOf('.') > -1">
                                                <i class="score-item">{{item.showContent}}</i>
                                            </span>
                                            <span class="c-date" v-else>{{item.showContent}}</span>
                                    </div>
                                    </a>
                                </div>
                                <div class="piclist-title">
                                    <div class="c-title" v-if="item.mainTitle">
                                        <a :href="item.pageUrl" :title="item.mainTitle">{{item.mainTitle}}</a>
                                    </div>

                                    <div class="c-info" v-if="item.subtitle">
                                        <a :href="item.pageUrl" :title="item.mainTitle">{{item.subtitle}}</a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </section>
                </div>
                <div class="m-box-items m-box-items-full" v-if="(list.channelId!=6 && list.relatedVideos.length >= 3) || (list.channelId==6 && list.relatedVideos.length >= 2)">
                    <section class="m-linkMore">
                        <a href="javascript:;" class="m-link">查看更多 <i class="c-glyphicon c-glyphicon-more"></i> </a>
                    </section>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import services from '../services/circle'
export default {
  name: 'ProList',
  props: {
    starId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      starVideos: []
    }
  },
  mounted () {
    this.getStarPro()
  },
  methods: {
    async getStarPro () {
      const products = await services.getStarPro({
        starQipuId: this.starId
      })
      this.starVideos = products
    }
  }
}
</script>