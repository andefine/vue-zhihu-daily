<template>
  <div class="container">
    <div class="content">
      <div class="box1"></div>
      <img class="img" src="../../assets/img/bell.png" alt="">
      <div class="green"></div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.container {
  background: red;
  perspective: 1px;
  height: 100%;
  overflow: auto;
}
.content {
  height: 2000px;
  transform-style: preserve-3d;
  position: relative;
}
.box1 {
  height: 400px;
}
.img {
  position: absolute;
  left: 50%;
  transform: translate3D(-50%, -120px, -2px) scale(3);
}
.green {
  height: 200px;
  background: green;
}
</style>
