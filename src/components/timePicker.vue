<template>
  <div class="time-panel">
    <div class="panel-up" @click="subItem">︿</div>
    <div class="panel-down" @click="addItem">﹀</div>
    <div class="scroll-box">
      <ul class="panel-item">
        <li v-for="(item,index) in temp" :key="index">{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
export default {
  setup(){
    const data = reactive({
      val: 0,
      temp: []
    })
    for(let i=0;i<24;i++){
      data.temp.push(i)
    }
    const subItem = (e) => {
      let el = e.target.parentElement.children[2]
      let t = el.scrollTop
      let h = 24
      let tl = data.temp.length
      console.log('h', h,tl)
      for(let i=tl-1;i>=0;i--){
        if(t > h*i-h/2){
          console.log('i', i)
          let x = i -1
          if(x<0) x=0;
          el.scrollTop = h*x
          break
        }
      }
    }
    const addItem = (e) => {
      let el = e.target.parentElement.children[2]
      let t = el.scrollTop
      let h = 24
      let tl = data.temp.length
      console.log('h', h,tl)
      for(let i=tl-1;i>=0;i--){
        if(t > h*i-h/2){
          console.log('i', i)
          let x = i +1
          if(x>tl-1) x=tl-1;
          el.scrollTop = h*x
          break
        }
      }
    }
    return {
      ...toRefs(data),
      subItem,
      addItem
    }
  }
}
</script>

<style lang="less">
@import '../assets/pic';
.time-panel{
  position: relative;
  background-color: chocolate;
  // background-image: url(@set_pic);
  width: 60px;
  height: 24px;
  border-radius: 4px;
  line-height: 24px;
  text-align: center;
  &:hover .panel-up{
    display: block;
  }
  &:hover .panel-down{
    display: block;
  }
}
.panel-up,.panel-down{
  display: none;
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
  height: 48px;
  margin-top: -12px;
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
    height: 12px;
  }
  &::after{
    content: "";
    display: block;
    height: 12px;
  }
}
</style>