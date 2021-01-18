<template>
  <div class="clock">
    <halfClock :num="val" :ampm="ap"></halfClock>
    <halfClock :num="tempVal" :ampm="tempAp" btmpart="true"></halfClock>
    <halfClock v-show="flipshow" :num="tempVal" :ampm="tempAp" :class="['page_front',flipping?'page_front_end':'']"></halfClock>
    <halfClock v-show="flipshow" :num="val" :ampm="ap" btmpart="true" :class="['page_back',flipping?'page_back_end':'']"></halfClock>
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
      ap: '',
      flipshow: false,
      flipping: false,
      cache: []
    })
    let timeout
    watchEffect(()=>{
      console.log('watchEffect',props.num,props.ampm)
      let n = props.num
      data.val = n
      data.ap = getap(props.ampm, n)
      data.flipshow = true
      setTimeout(() => {
        data.flipping = true
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          data.tempVal = n
          data.tempAp = data.ap
          data.flipshow = false
          data.flipping = false
        }, 600);
      }, 0);
    })
    return {
      ...toRefs(data)
    }
  }
}
</script>

<style lang="less">
.clock{
  position: relative;
  width: 100%;
  height: 100%;
}
.page_front,.page_back{
  position: absolute;
  width: 100%;
  height: 50%;
  backface-visibility: hidden;
  transition: all 0.6s ease-in;
}
.page_front{
  top: 0;
  transform-origin: bottom;
  transform: rotateX(360deg);
}
.page_back{
  top: 50%;
  transform-origin: top;
  transform: rotateX(180deg);
}
.page_front_end{
  transform: rotateX(180deg);
}
.page_back_end{
  transform: rotateX(0deg);
}
</style>
