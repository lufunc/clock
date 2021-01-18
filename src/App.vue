<template>
  <div class="bg">
    <div class="timer">
      <div :class="[showSecond?'timer_inner3':'timer_inner2']">
        <clock :num="num1" :ampm="hourFormat === 0"></clock>
      </div>
      <div :class="[showSecond?'timer_inner3':'timer_inner2']">
        <clock :num="num2"></clock>
      </div>
      <div v-if="showSecond" :class="[showSecond?'timer_inner3':'timer_inner2']">
        <clock :num="num3"></clock>
      </div>
    </div>
    <div style="position: fixed;bottom: 8%;right: 8%;">
      <div style="color:#fff;" @click="ttt">设置</div>
      <div style="color:#fff;">{{num1}}</div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, computed } from 'vue'
import clock from './components/clock.vue'
export default {
  components: { clock },
  setup () {
    const data = reactive({
      // clock content
      num1: 11,
      num2: 0,
      num3: 0,
      // config
      // 12h 24h 024h
      hourFormat: 0,
      scale: 1,
      brightness: 1,
      showBg: true,
      fs: 22,
      showSecond: true
    })
    const zeroNum = (n) => {
      return n<10 ? '0'+n : n
    }
    const formatNum = (n) => {
      if(data.hourFormat < 2){
        return n
      }else{
        return zeroNum(n)
      }
    }
    const gettimer = () => {
      let t = new Date()
      let h = t.getHours()
      let m = t.getMinutes()
      let s = t.getSeconds()
      return {h,m,s}
    }
    let timer = setInterval(() => {
      let res = gettimer()
      data.num1 = formatNum(res.h)
      data.num2 = zeroNum(res.m)
      data.num3 = zeroNum(res.s)
    }, 200);
    const ttt = () => {
      console.log('设置ttt')
      data.showSecond = !data.showSecond
    }
    return {
      ...toRefs(data),
      ttt
    }
  }
}
</script>

<style lang="less">
body{
  margin: 0;
}
.bg{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #000;
}
.timer{
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  padding: 0 2vw;
}
.timer_inner2{
  box-sizing: border-box;
  width: 47.6vw;
  height: 47.6vw;
  padding: 1vw;
  font-size: 28vw;
}
.timer_inner3{
  box-sizing: border-box;
  width: 30.8vw;
  height: 30.8vw;
  font-size: 22vw;
}
</style>
