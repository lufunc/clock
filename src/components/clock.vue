<template>
  <div class="clock">
    <div>{{ msg }}</div>
    <halfClock></halfClock>
  </div>
</template>

<script>
import { ref } from 'vue'
import halfClock from './halfClock'
export default {
  components: { halfClock },
  setup () {
    const msg = ref('clock')
    return {
      msg
    }
  }
}
</script>

<style lang="less">

</style>
