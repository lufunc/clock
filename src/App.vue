<template>
  <div class="bg">
    <div class="timer">
      <div class="timer_inner">
        <clock :num="num1" :ampm="ampm"></clock>
      </div>
      <div class="timer_inner">
        <clock :num="num2"></clock>
      </div>
      <div class="timer_inner">
        <clock :num="num3"></clock>
      </div>
    </div>
    <div style="color:#fff;" @click="ttt">设置</div>
    <div style="color:#fff;">{{num1}}</div>
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
      ampm: true,
      zero: false,
      num1: 11,
      num2: 0,
      num3: 0,
      // config
      // 12h 24h 024h
      hourFormat: 0,
      scale: 1,
      brightness: 1,
      showBg: true
    })
    const gettimer = () => {
      let t = new Date()
      let h = t.getHours()
      let m = t.getMinutes()
      let s = t.getSeconds()
      return {h,m,s}
    }
    let timer = setInterval(() => {
      let res = gettimer()
      data.num1 = res.h
      data.num2 = res.m
      data.num3 = res.s
    }, 200);
    const ttt = () => {
      console.log('设置time1')
      data.num1++
      data.ampm = !data.ampm
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
  display: flex;
  margin-top: calc(50vh - 16.7vw);
}
.timer_inner{
  box-sizing: border-box;
  width: 33.3vw;
  height: 33.3vw;
  padding: 1vw;
  &:first-child{
    padding-left: 2vw;
  }
  &:last-child{
    padding-right: 2vw;
  }
}
</style>
