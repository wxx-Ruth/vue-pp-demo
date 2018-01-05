<template>
    <div class="m-box m-box-mid m-pp-bgGray" data-id="feedList" data-from="circlePage">
        <feed-item  v-for="(item, index) in feeds" v-if="index < 3" :key="index" :item="item"></feed-item>
        <related-circle :related-circles="relatedCircles"/>
        <feed-item  v-for="(item, index) in feeds" v-if="index >= 3" :key="index" :item="item"></feed-item>
    </div>
</template>
<script>
import FeedItem from 'components/FeedItem'
import RelatedCircle from 'components/RelatedCircle'
export default {
  name: 'feed-list',
  props: {
    feeds: {
      type: Array,
      default: []
    },
    relatedCircles: {
      type: Array,
      default: []
    }
  },
  components: {
    FeedItem,
    RelatedCircle
  }
}
</script>
