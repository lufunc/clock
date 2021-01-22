<template>
  <div class="time-panel-box">
    <div class="time-panel">
      <div class="scroll-box" ref="sb">
        <ul class="panel-item">
          <li v-for="(item,index) in temp" :key="index">{{item}}</li>
        </ul>
      </div>
      <div class="panel-up" @click="comfirmNum(-1)">︿</div>
      <div class="panel-down" @click="comfirmNum(1)">﹀</div>
    </div>
    <!-- <div class="panel-mask" style="top: -16px;"></div>
      <div class="panel-mask" style="bottom: -16px;"></div> -->
  </div>
  
</template>

<script>
import { reactive, toRefs } from 'vue'
export default {
  setup(){
    const data = reactive({
      val: 0,
      temp: [],
      sb: null
    })
    for(let i=0;i<24;i++){
      let x = i>9? i : '0'+i
      data.temp.push(x)
    }
    const comfirmNum = (n) => {
      let e = data.sb
      // console.log('e', e)
      let t = e.scrollTop
      let h = 24
      let tl = data.temp.length
      // console.log('h', h,tl)
      for(let i=tl-1;i>=0;i--){
        if(t > h*i-h/2){
          console.log('i', i)
          let x = i +n
          if(x<0) x=0;
          if(x>tl-1) x=tl-1;
          console.log('x', x)
          e.scrollTop = h*x
          break
        }
      }
    }
    return {
      ...toRefs(data),
      comfirmNum
    }
  }
}
</script>

<style lang="less">
@import '../assets/pic';
.time-panel-box{
  height: 24px;
  padding: 16px 0;
  &:hover .time-panel{
    overflow: visible;
  }
}
.time-panel{
  position: relative;
  background-color: chocolate;
  // background-image: url(@set_pic);
  width: 60px;
  height: 24px;
  border-radius: 4px;
  line-height: 24px;
  text-align: center;
  overflow: hidden;
}
.panel-up,.panel-down{
  position: absolute;
  left: 50%;
  width: 100%;
  transform: translateX(-50%);
  cursor: pointer;
  &:hover{
    display: block;
  }
}
.panel-up{
  top: -100%;
  background-image: linear-gradient(0deg, rgba(38, 39, 41,0), rgb(38, 39, 41) 100%);
}
.panel-down{
  bottom: -100%;
  background-image: linear-gradient(to bottom, rgba(38, 39, 41,0), rgb(38, 39, 41) 100%);
}
.scroll-box{
  position: relative;
  top: -16px;
  height: 56px;
  overflow-y: scroll;
  color: #fff;
  // &::-::-webkit-scrollbar
  &::-webkit-scrollbar{
    display: none;
  }
}
.panel-item{
  &::before{
    content: "";
    display: block;
    height: 16px;
  }
  &::after{
    content: "";
    display: block;
    height: 16px;
  }
}
.panel-mask{
  position: absolute;
  width: 100%;
  background-color: #262729;
  height: 16px;
}
</style>