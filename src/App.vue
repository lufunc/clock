<template>
  <div class="bg">
    <div class="timer">
      <div class="timer_inner">
        <clock :num="num1" :ampm="ampm"></clock>
      </div>
      <div class="timer_inner">
        <clock :num="num2"></clock>
      </div>
    </div>
    <div @click="ttt">设置</div>
    <div>{{num1}}</div>
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
      num1: 0,
      num2: 0,
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
    // let timer = setInterval(() => {
    //   let res = gettimer()
    //   data.num1 = res.m
    //   data.num2 = res.s
    // }, 200);
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
  background-color: burlywood;
}
.timer{
  display: flex;
}
.timer_inner{
  box-sizing: border-box;
  width: 50vw;
  height: 50vw;
  padding: 6vw;
}
</style>
