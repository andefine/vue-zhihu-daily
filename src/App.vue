<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive">
        <!-- 这里是会被缓存的视图组件 -->
      </router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive">
      <!-- 这里是不被缓存的视图组件 -->
    </router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>

</style>
