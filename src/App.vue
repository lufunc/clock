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
    <div class="set_box">
      <div class="set_box_item">
        <ul class="set_box_inner">
          <li>
            <div>Hour Format:</div>
            <div>选择器</div>
          </li>
          <li>
            <div>Scale:</div>
            <div>进度条</div>
          </li>
          <li>
            <div>Brightn:</div>
            <div>进度条</div>
          </li>
          <li>
            <div>Show</div>
            <input type="checkbox" name="Background" id="Background" style="vertical-align: middle;">
            <span>Background</span>
          </li>
        </ul>
        <footer>@lupass 2021</footer>
        <div>OK</div>
      </div>
      <img @click="ttt" class="setting" :src="pic_setting" alt="">
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, computed } from 'vue'
import myPic from './assets/pic'
import clock from './components/clock.vue'
export default {
  components: { clock },
  setup () {
    const data = reactive({
      pic_setting: myPic.pic_setting,
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
      console.log('设置ttt',myPic)
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
ul{
  margin: 0;
  padding: 0;
  list-style-type: none;
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
  font-size: 34vw;
}
.timer_inner3{
  box-sizing: border-box;
  width: 30.8vw;
  height: 30.8vw;
  font-size: 22vw;
}
.set_box{
  position: fixed;
  bottom: 8%;
  right: 8%;
  width: 200px;
  height: 200px;
  &:hover .setting{
    opacity: 1;
  }
}
.set_box_item{
  // display: none;
  position: absolute;
  top: -170px;
  left: -196px;
  width: 430px;
  height: 310px;
  background-color: #262729;
  border-radius: 20px;
  border: 1px solid #666;
  &::before{
    content: '';
    position: absolute;
    bottom: 0;
    right: 40px;
    width: 24px;
    height: 24px;
    background-color: #262729;
    border: 1px solid #666;
    border-top-color: transparent;
    border-left-color: transparent;
    transform: translateY(50%) rotateZ(45deg);
  }
}
.set_box_inner>li>div{
  display: inline-block;
}
.setting{
  position: absolute;
  bottom: 0;
  right: 0;
  width: 36px;
  height: 36px;
  opacity: 0;
  transition: all 0.5s ease-in-out;
  &:hover{
    transform: rotateZ(120deg);
  }
}
</style>
