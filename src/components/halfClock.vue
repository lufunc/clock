<template>
  <div class="halfClock">
    <div>{{ msg }}</div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  setup () {
    const msg = ref('halfClock')
    return {
      msg
    }
  }
}
</script>

<style lang="less">

</style>
