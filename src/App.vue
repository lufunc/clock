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
            <div class="setName">Hour Format:</div>
            <ul class="pickItem">
              <li @click="hourFormat=0" :class="{'pick-active':hourFormat===0}">12h</li>
              <li @click="hourFormat=1" :class="{'pick-active':hourFormat===1}">24h</li>
              <li @click="hourFormat=2" :class="{'pick-active':hourFormat===2}">024h</li>
            </ul>
          </li>
          <li>
            <div class="setName">Scale:</div>
            <slider v-model="scale"></slider>
            <div style="width:32px;padding-left: 8px;">{{scale}}</div>
          </li>
          <li>
            <div class="setName">Brightn:</div>
            <slider v-model="brightness"></slider>
            <div style="width:32px;padding-left: 8px;">{{brightness}}</div>
          </li>
          <li>
            <div class="setName">Background:</div>
            <div>
              <input type="checkbox" v-model="showBg" style="margin: 0;vertical-align: middle;width: 18px;height: 18px;">
            </div>
            <span>Background---</span>
            <div>{{showBg}}</div>
          </li>
          <li>
            <div class="setName">Stopwatch:</div>
            <button class="timerBtn" style="background-color: #666666;color: #fff;">Start</button>
          </li>
          <li>
            <div class="setName">Timer:</div>
            <button class="timerBtn">
              <span class="iconTime"></span>
              <span style="vertical-align: middle;">5m</span>
            </button>
            <button class="timerBtn">
              <span class="iconTime"></span>
              <span style="vertical-align: middle;">10m</span>
            </button>
            <button class="timerBtn">
              <span class="iconTomato"></span>
              <span style="vertical-align: middle;">25m</span>
            </button>
          </li>
          <li>
            <div class="setName">自定义计时:</div>
            <timePicker :numRange="24" v-model="my_h"></timePicker>
            <timePicker :numRange="60" v-model="my_m"></timePicker>
            <timePicker :numRange="60" v-model="my_s"></timePicker>
            <button class="timerBtn" style="margin-left: 4px;">go</button>
            <span style="font-size: 8px;">{{my_h+' '+my_m+' '+my_s}}</span>
          </li>
        </ul>
        <footer style="margin: -8px 20px 0px;">
          <a href="http://baidu.com">1.0.0 @lufunc 2021</a>
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
      showSecond: true,
      my_h: 1,
      my_m: 2,
      my_s: 3
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
@import './assets/pic.less';
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
  padding-bottom: 0px;
  color: #fff;
  font-size: 18px;
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
  text-align: center;
  border-radius: 6px;
  cursor: pointer;
  &>li{
    box-sizing: border-box;
    width: 60px;
    height: 24px;
    line-height: 22px;
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
.setName{
  width: 116px;
  margin-right: 12px;
  text-align: right;
}
.timerBtn{
  box-sizing: border-box;
  width: 60px;
  height: 24px;
  border-radius: 4px;
  margin-right: 6px;
  background-color: #fff;
  color: #1c1c1c;
  font-size: 16px;
  // font-size: 18px;
  cursor: pointer;
  &:active{
    background-color: #ddd;
  }
}
.iconTime{
  display: inline-block;
  width: 20px;
  height: 20px;
  vertical-align: middle;
  background-image: url(@timer);
  background-size: contain;
}
.iconTomato{
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-top: -3px;
  vertical-align: middle;
  background-image: url(@tomato);
  background-size: contain;
}
</style>
