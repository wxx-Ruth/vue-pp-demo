<template>
<div class="m-box swiper-no-swiping">
    <div class="m-box-items m-box-items-full">
        <section class="m-pp-related">
            <div class="c-related-title">
                相关圈子推荐
            </div>
                <div class="m-related-lists" v-scroll.scrollX>
                    <ul class="m-related-allstar" style="-webkit-transform: translate(0px, 0px) scale(1);transform: translate(0px, 0px) scale(1);">
                        <li  :data-wallId="item.wallId" v-for="item in relatedCircles">
                            <a href="javascript:;" class="m-related-link">
                                    <img :src="item.icon">
                                    <h2 class="c-related-star">{{item.name}}</h2>
                                    <i class="c-ppTopic-picicon ppTopic-orange" v-if="item.wallType==0"></i>
                                    <i class="c-ppTopic-picicon ppTopic-blue" v-else="item.wallType==2"></i>
                                </a>
                        </li>
                    </ul>
                </div>
        </section>
    </div>
</div>

</template>

<script>
export default {
  name: 'RelatedCircle',
  props: {
    relatedCircles: {
      type: Array,
      default: function () {
        return []
      }
    }
  }
}
</script>