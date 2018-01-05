<template>
<div class="m-header-group" v-show="!isApp">
    <div class="header-group-innder header-fixed">
        <div class="m-box-items m-box-items-full">
            <section class="m-header">
                <router-link to="/" class="logo-iqiyi" title="爱奇艺"></router-link>
                <p class="m-header-title">泡泡圈</p>
                <div class="m-user">
                    <div class="header-app">
                        <a data-id="topNavigation" 
                           data-type="goDown" 
                           data-rseat="505540_02" 
                           href="javascript:;" 
                           class="link-app" 
                           data-download-pos="bubble_top_banner" 
                           data-subtype="153" @click="callApp">打开APP</a>
                	</div>
                </div>
            </section>
        </div>
    </div>
</div>

</template>
<script>
  export default {
    data () {
      return {
        isApp: false
      }
    },
    methods: {
      goIndex: function () {
        window.location.href = '//m.iqiyi.com'
      },
      callApp: function () {
        console.log('weewewe')
      }
    }
  }
</script>

