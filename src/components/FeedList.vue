<template>
    <div class="m-box m-box-mid m-pp-bgGray" data-id="feedList" data-from="circlePage">
        <single-feed  v-for="(item, index) in feeds" v-if="index < 3" :key="index" :item="item"></single-feed>
        <related-circle :relatedCircles="relatedCircles"/>
        <single-feed  v-for="(item, index) in feeds" v-if="index >= 3" :key="index" :item="item"></single-feed>
    </div>
</template>
<script>
import SingleFeed from 'components/SingleFeed'
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
    SingleFeed,
    RelatedCircle
  }
}
</script>
