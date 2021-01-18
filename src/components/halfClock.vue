<template>
  <div class="halfClock">
    <div :class="['half_inner',btmpart?'btmpart':'']">
      <div class="num">{{num}}</div>
      <div class="blackLine"></div>
      <div :class="['ampm',ampm==='AM'?'am':'pm']">{{ampm}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    btmpart: {
      default: false
    },
    num: {
      default: 0
    },
    ampm: String
  }
}
</script>

<style lang="less">
.halfClock{
  height: 50%;
  overflow: hidden;
}
.half_inner{
  position: relative;
  height: 200%;
  background: linear-gradient(to bottom, #161616, #0c0c0c);
}
.btmpart{
  top: -100%;
}
.num{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  font-size: 28vw;
  font-weight: bold;
  text-align: center;
  background: linear-gradient(to bottom, #bbbbbb, #b9b9b9);
  background-clip: text;
  color: transparent;
}
.blackLine{
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  height: 2vw;
  background-color: chocolate;
}
.ampm{
  position: absolute;
  left: 5%;
  font-size: 3vw;
  font-weight: bold;
}
.am{
  top: 12%;
  color: #bbbbbb;
}
.pm{
  bottom: 12%;
  color: #b9b9b9;
}
</style>
