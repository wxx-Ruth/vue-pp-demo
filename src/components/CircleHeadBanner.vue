<template>
<!-- 明星圈子 -->
<div class="m-pp-topTopic m-ppStar-file m-pp-starQuan" :data-memberCount="circle.memberCount"
         data-atoken="" :data-desc="circle.description" :data-icon="circle.icon" :data-name="circle.name"
         :data-hasActive="circle.activityImageUrl" :data-circleid="circle.wallId" :data-circletype="circle.wallType"
         :data-wallId="circle.wallId">
    <!-- 毛玻璃背景部分 -->
    <div class="c-pp-alpha" style="background-image:url(http://pic9.qiyipic.com/common/20160530/hls.png)"></div>
    <section class="m-pp-topicTit">
        <div class="topic-left">
            <img :src="circle.icon">
        </div>
        <div class="topic-right">
            <div class="c-topic-title">
                <span>{{circle.name}}</span>
            </div>
            <div class="topic-info">
                <span class="c-topic-info">粉丝：{{circle.memberCountStr}}</span>
                <span class="c-topic-info">内容：{{circle.feedCount}}</span>
            </div>
            <a href="javascript:;" class="c-add-topic" v-if="circle.collected == 0"><span class="add-topicIcon-wrap"><i class="c-glyphicon c-glyphicon-guideClose"></i></span>加入</a>
            <a href="javascript:;" class="c-exit-topic" v-else>已加入</a>
            </div>
    </section>
    <div class="m-starrecord">
        <i class="m-fivestar"></i>明星档案
    </div>
</div>
<!-- 头部end -->
</template>
<script>
export default {
  name: 'circle-header',
  props: ['circle']
}
</script>