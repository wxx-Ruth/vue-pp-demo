<template>
    <div id="app">
        <transition name="fade" mode="out-in">
            <router-view class="view"></router-view>
        </transition>
    </div>
</template>

<script>
 export default {
   name: 'app'
 }
</script>
<style>
@import "http://static.iqiyi.com/css/20171128/h5-paopao.css";
</style>