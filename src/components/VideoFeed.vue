<template>
<div :class="classObj[0]">
    <p class="m-pp-txt max-line3" data-node="detail">
        <span data-attr="descInfo">{{videofeed.description}}</span>
    </p>
    <ul :class="classObj[1]">
        <li class="m-video">
            <div class="videolist-img">
                <a href="javascript:;" class="c-video-link" :style="{backgroundImage:`url(${videofeed.thumbnail})`}" >
                    <div class="c-pp-rb">
                        <i class="c-pp-picicon">{{videofeed.duration}}</i>
                    </div>
                    <div class="c-pp-center">
                        <i class="c-pp-playicon"></i>
                    </div>
                </a>
            </div>
        </li>
    </ul>
</div>

</template>
<script>
 export default {
   name: 'video-feed',
   props: ['videofeed'],
   computed: {
     classObj () {
       const isOneToOneScale = this.videofeed.isOneToOneScale
       return [{
         'm-pp-bigvideo': isOneToOneScale,
         'm-pp-longvideo': !isOneToOneScale
       }, {
         'm-big-video': isOneToOneScale,
         'm-long-video': !isOneToOneScale
       }]
     }
 
   }
 }
</script>