<template>
  <div class="bg">
    <div class="timer" :style="{'transform': 'translateY(-50%) scale('+(scale/100)+')','filter': 'brightness('+brightness/100+')'}">
      <clock :num="num1" :ampm="hourFormat === 0" :class="[showSecond?'timer_inner3':'timer_inner2']"></clock>
      <clock :num="num2" :class="[showSecond?'timer_inner3':'timer_inner2']"></clock>
      <clock :num="num3" v-if="showSecond" :class="[showSecond?'timer_inner3':'timer_inner2']"></clock>
    </div>
    <div class="set_box">
      <div class="set_box_item">
        <ul class="set_box_inner">
          <li>
            <div>Hour Format:</div>
            <ul class="pickItem">
              <li @click="hourFormat=0" :class="{'pick-active':hourFormat===0}">12h</li>
              <li @click="hourFormat=1" :class="{'pick-active':hourFormat===1}">24h</li>
              <li @click="hourFormat=2" :class="{'pick-active':hourFormat===2}">024h</li>
            </ul>
          </li>
          <li>
            <div style="margin-right: 6px;">Scale:</div>
            <slider style="margin: 0 10px;" v-model="scale"></slider>
            <div style="width:94px;">数值{{scale}}</div>
          </li>
          <li>
            <div>Brightn:</div>
            <slider style="margin: 0 10px;" v-model="brightness"></slider>
            <div style="width:94px;">数值{{brightness}}</div>
          </li>
          <li>
            <div>Show</div>
            <input type="checkbox" v-model="showBg" style="vertical-align: middle;">
            <span>Background---</span>
            <div>{{showBg}}</div>
          </li>
          <li>
            <span>Timer</span>
            <button>5min</button>
            <button>10min</button>
            <button>25min</button>
          </li>
          <li style="height: 72px;">
            <span>自定义计时</span>
            <timePicker></timePicker>
            <timePicker></timePicker>
            <button>go</button>
          </li>
          <li>
            <div>Stopwatch</div>
            <button>Reset/Lap</button>
            <button>Start/Stop</button>
          </li>
        </ul>
        <footer>
          <a href="http://baidu.com">@lufunc 2021</a>
        </footer>
      </div>
      <img @click="ttt" class="setting" :src="pic_setting" alt="">
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, computed } from 'vue'
import myPic from './assets/pic'
import clock from './components/clock.vue'
import slider from './components/slider'
import timePicker from './components/timePicker'
export default {
  components: { clock,slider,timePicker },
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
      scale: 100,
      brightness: 100,
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
      // data.showSecond = !data.showSecond
      data.hourFormat++
      if(data.hourFormat>2) data.hourFormat=0
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
button { border:none; padding:0;margin:0;outline-style:none; }
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
  display: flex;
  justify-content: space-evenly;
}
.timer_inner2{
  width: 47.5vw;
  height: 47.5vw;
  font-size: 34vw;
}
.timer_inner3{
  width: 30vw;
  height: 30vw;
  font-size: 22vw;
}
.set_box{
  // display: none;
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
.set_box_inner{
  padding: 20px;
  color: #fff;
  &>li{
    display: flex;
    align-items: center;
    margin-bottom: 8px;
  }
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
.pickItem{
  display: flex;
  margin-left: 12px;
  text-align: center;
  border-radius: 6px;
  cursor: pointer;
  &>li{
    width: 60px;
    line-height: 24px;
    border: 1px solid #666;
    border-right: 0;
    &:first-child{
      border-top-left-radius: inherit;
      border-bottom-left-radius: inherit;
    }
    &:last-child{
      border-right: 1px solid #666;
      border-top-right-radius: inherit;
      border-bottom-right-radius: inherit;
    }
  }
}
.pick-active{
  color: #333;
  background-color: #fff;
}
</style>
