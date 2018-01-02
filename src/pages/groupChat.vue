<template>
      <div  data-download-pos="bubble_top_banner">
            <div class="m-shareEmpty" v-if="groupInfo.code=='E00018' || groupInfo.code=='E00019'">
                <div class="emptyCon">
                    <img class="emptyPic" src="http://www.qiyipic.com/common/fix/paopao/shareEmpty.png" alt="">
                    <p class="emptyTxt">该群已解散，可以去爱奇艺泡泡<br>发现更多爱豆群哦</p>
                    <a class="c-link" href="javascript:;" glue-type="goPaoPaoIndex">打开爱奇艺泡泡</a>
                </div>
            </div>
            <div class="m-group-box" v-else>
                <div class="m-group-top">
                    <div class="m-group-pic" :style="{backgroundImage: `url(${groupInfo.icon})`}"></div>
                    <div class="m-group-name">{{groupInfo.name}}</div>
                </div>
                <div class="m-group-midIntro">
                    <div class="m-intro-title"><i class="m-intro-icon"></i>群简介</div>
                    <div class="m-intro-info"> {{groupInfo.description}}</div>
                </div>
                <div class="m-group-Bmember">
                    <div class="m-member-title">
                        <i class="m-member-icon"></i>群成员
                        <a href="javascript:;" class="m-member-more">{{groupInfo.memberCount}}人</a>
                    </div>
                    <ul class="m-member-lists">
                        <li class="m-member-item" v-for="(member, index) in groupInfo.members" v-if="index < 4">
                            <a href="javascript:;" class="m-item-box">
                                <div class="m-item-pic" style="background-image: url($!{member.icon})"></div>
                                <img src="http://www.qiyipic.com/common/fix/groupShare/qunzhu.png" alt="" class="m-item-icon" v-if="member.position==0">
                                <img src="http://www.qiyipic.com/common/fix/groupShare/guanliyuan.png" alt="" class="m-item-icon" v-else-if="member.position==1">
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="m-group-joinBox">
                <div class="m-join-btn" glue-node="groupChatApply">申请加入</div>
            </div>
        </div>
</template>
<script>
export default {
  name: 'groupChat',
  asyncData ({ store, route }) {
    const id = route.query.id
    return store.dispatch('getGroupData', id)
  },
  computed: {
    groupInfo () {
      return this.$store.state.groupInfo
    }
  }
}
</script>