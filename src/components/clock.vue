<template>
  <div class="clock">
    <halfClock :num="val" :ampm="ap"></halfClock>
    <halfClock :num="tempVal" :ampm="tempAp" btmpart="true"></halfClock>
  </div>
</template>

<script>
import { watch, unref, reactive, toRefs, onMounted, computed, watchEffect } from 'vue'
import halfClock from './halfClock'
import getap from '../utils/getampm'
export default {
  components: { halfClock },
  props: {
    num: {
      default: 0
    },
    ampm: Boolean
  },
  setup (props) {
    const data = reactive({
      tempVal: 0,
      val: 0,
      tempAp: '',
      ap: ''
    })
    let timeout = null
    watchEffect(()=>{
      console.log('watchEffect',props.num,props.ampm)
      let n = props.num
      data.val = n
      data.ap = getap(props.ampm, n)
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        data.tempVal = n
        data.tempAp = data.ap
      }, 300);
    })
    return {
      ...toRefs(data)
    }
  }
}
</script>

<style lang="less">
.clock{
  height: 100%;
}
</style>
