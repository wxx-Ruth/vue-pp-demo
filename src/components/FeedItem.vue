<template>
<!--用户信息-->
<div 
    class="m-box m-box-mid"
    :data-wallId="item.wallId"
    :data-wallName="item.wallName"
    data-share-t="505201_12"
    data-show-t="505201_4"
    :data-feedId="item.feedId"
    :data-wallType="item.wallType"
    :data-sourceType="item.sourceType"
    :data-thumbnail="item.thumbnail"
    :data-wallIcon="item.wallIcon"
    :data-feedTitle="item.feedTitle"
    >
    <div class="m-box-items" data-attr="detail">
        <div class="m-pp-user">
            <a href="javascript:;" class="c-user-img" :style="{backgroundImage:`url(${item.icon})`}">
               
            </a>
            <div class="m-feed-name" data-attr="detail">
                <a href="javascript:;" class="c-user-name">{{item.name}}</a>
                <div class="c-user-infoBox">
                    <span class="c-user-time">{{item.pubStr}}</span>
                    <span class="c-user-time">{{item.uvCount}}阅读量</span>
                </div>
            </div>
            <a href="javascript:;" class="m-pp-more" :data-wallId="item.wallId" :data-feedId="item.feedId" :data-uid="item.uid"  data-node="reportBtn"><i class="c-glyphicon c-pp-more"></i></a>
                <div class="userFoot-all">
                    <template v-for="foot in item.footPrint">
                        <i class="userFoot-star" v-if="foot==1"></i>
                        <i class="userFoot-author" v-if="foot==2"></i>
                    </template>
                </div>
        </div>
    </div>
    <!--文字描述-->
    <div class="m-box-items">
            <div class="m-pp-txt_tit max-line2">
                {{item.feedTitle}}
            </div>
        <pic-feed :pic-feed="item" v-if="item.sourceType === 1 || item.sourceType === 9"></pic-feed>
        <video-feed :video-feed="item" v-else="item.sourceType === 8"></video-feed>
        <!--相关操作-->
        <div class="m-box-items m-box-items-full">
            <div class="m-pp-new-icons" data-attr="detail">
                <a href="javascript:;" class="m-icon-link" data-node="share">
                    <i class="c-pp-newIcon c-pp-newshare"></i>
                    <span class="c-icons-desc">分享</span>
                </a>
                <a href="javascript:;" class="m-icon-link" data-node="comment">
                    <i class="c-pp-newIcon c-pp-newcomment"></i>
                    <span class="c-icons-desc" data-attr="commentText" v-if="item.commentCount==0">评论</span>
                    <i class="c-icons-num" data-attr="commentCount" v-else>{{item.commentCount}}</i>
                </a>
                <a href="javascript:;" class="m-icon-link" :class="{ilike: item.isAgree}" :data-wallId="item.wallId" data-block="505201_5_1" :data-wallName="item.wallName" :data-wallType="item.wallType" :data-owner="item.uid" :data-sourceType="item.sourceType" :data-feedId="item.feedId"
                @click="doLike(item.isAgree, item.wallId, item.feedId, item.sourceType)">
                    <i class="c-pp-newIcon c-pp-newlike"></i>
                    <span class="c-icons-desc" data-node="agreeText" v-if="item.agreeCount==0">点赞</span>
                    <i class="c-icons-num" data-node="agreeCount" v-else>{{item.agreeCount}}</i>
                </a>
            </div>
        </div>
    </div>
</div>

</template>

<script>
    import PicFeed from 'components/FeedPic'
    import VideoFeed from 'components/FeedVideo'
    import {isLogin} from '@/services/user'
    import services from '../services/circle'
    export default {
      name: 'FeedItem',
      props: {
        item: {
          type: Object
        }
      },
      components: {
        PicFeed,
        VideoFeed
      },
      methods: {
        doLike (isAgree, wallId, feedId, sourceType) {
          this.params = {
            wallId: wallId,
            feedId: feedId,
            sourceType: sourceType
          }
          if (isLogin()) {
            window.location.href = 'http://m.iqiyi.com/user.html'
          } else {
            if (isAgree) {
              this.params.agree = 0
              this.ilike = false
            } else {
              services.getAgree(this.params)
            }
          }
        }
      }
    }
</script>