<template>
  <div class="bg">
    <div>
      <clock></clock>
    </div>
    <div>设置</div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import clock from './components/clock.vue'
export default {
  components: { clock },
  setup () {
    const data = reactive({
      // clock content
      timer1: {
        ampm: false,
        zero: false,
        value: 0
      },
      timer2: {
        ampm: false,
        zero: false,
        value: 0
      },
      // config
      // 12h 24h 024h
      hourFormat: 0,
      scale: 1,
      brightness: 1,
      showBg: true
    })
    return {
      ...toRefs(data)
    }
  }
}
</script>

<style lang="less">
body{
  margin: 0;
}
.bg{
  background-color: burlywood;
}
</style>
