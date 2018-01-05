<template>
    <div :class="classObj[0]">
    <p class="m-pp-txt max-line3">
        <span v-html="picFeed.description"></span>
    </p>
    <ul :class="classObj[1]" data-node="detail">
        <li class="m-pic" v-for="(picInfo, index) in picFeed.picList">
            <div class="piclist-img">
                <a href="javascript:;" :data-index="index" class="c-pic-link" :style="{backgroundImage:`url(${picInfo.listPage})`}">
                        <div class="c-pp-rb">
                            <i class="c-pp-picicon blue" v-if="picInfo.isGif">GIF</i>
                            <i class="c-pp-picicon blue" v-else="picInfo.isRealLongPic">长图</i>
                        </div>
                </a>
            </div>
        </li>
    </ul>
</div>

</template>
<script>
    export default {
      name: 'FeedPic',
      props: {
        picFeed: {
          type: Object
        }
      },
      computed: {
        classObj () {
          const len = this.picFeed.picList.length
          let classTag = {
            'm-pp-threelist': false,
            'm-pp-longlist': false,
            'm-pp-widelist': false,
            'm-pp-biglist': false
          }
          let classInner = {
            'm-long-piclist': false,
            'm-big-piclist': false,
            'm-wide-piclist': false,
            'm-equal-piclist': false,
            'm-three-piclist': false
          }
          if (len === 1) {
            let firstItem = this.picFeed.picList[0]
            if (firstItem.isLongPic) {
              classTag['m-pp-longlist'] = true
              classInner['m-long-piclist'] = true
            } else if (firstItem.isBigPic) {
              classTag['m-pp-biglist'] = true
              classInner['m-big-piclist'] = true
            } else {
              classTag['m-pp-widelist'] = true
              classInner['m-wide-piclist'] = true
            }
          } else if (len === 4) {
            classTag['m-pp-threelist'] = true
            classInner['m-equal-piclist'] = true
          } else {
            classTag['m-pp-threelist'] = true
            classInner['m-three-piclist'] = true
          }
          return [classTag, classInner]
        }
    
      }
    }
</script>