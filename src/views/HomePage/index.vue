<template>
  <div class="home-page">
    <Header></Header>
    <Swiper></Swiper>
  </div>
</template>

<script>
export default {
  components: {
    Header: () => import('@/components/Header'),
    Swiper: () => import('@/components/Swiper')
  }
}
</script>

<style lang="scss" scoped>
.home-page {
  .test {
    width: 375px;
    height: 100px;
    background: red;
  }
}
</style>
