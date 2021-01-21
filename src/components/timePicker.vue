<template>
  <div class="time-panel">
    <ul class="time-spinner">
      <li>
        <ul class="time-list">
          <li v-for="(item,index) in h_list" :key="index">{{item}}</li>
        </ul>
      </li>
      <li>
        <ul class="time-list">
          <li v-for="(item,index) in m_list" :key="index">{{item}}</li>
        </ul>
      </li>
      <li>
        <ul class="time-list">
          <li v-for="(item,index) in s_list" :key="index">{{item}}</li>
        </ul>
      </li>
    </ul>
    <div class="panel_footer">
      <button>取消</button>
      <button>确定</button>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
export default {
  setup(){
    const data = reactive({
      h:0,
      m:0,
      s:0,
      h_list: [],
      m_list: [],
      s_list: []
    })
    for(let i=0;i<60;i++){
      if(i<24) data.h_list.push(i);
      data.m_list.push(i)
      data.s_list.push(i)
    }
    return {
      ...toRefs(data)
    }
  }
}
</script>

<style lang="less">
.time-panel{
  position: relative;
  width: 250px;
  // height: 398px;
  border: 1px solid #666;
  border-radius: 12px;
  background-color: burlywood;
  &::before{
    content: "";
    top: 50%;
    position: absolute;
    margin-top: -15px;
    height: 32px;
    z-index: -1;
    left: 0;
    right: 0;
    box-sizing: border-box;
    padding-top: 6px;
    text-align: left;
    border-top: 1px solid #e4e7ed;
    border-bottom: 1px solid #e4e7ed;
  }
}
.time-spinner{
  width: 100%;
  &>li{
    width: 33.3%;
    display: inline-block;
    max-height: 190px;
    overflow-y: scroll;
  }
}
.time-list{
  text-align: center;
  >li{
    height: 32px;
    line-height: 32px;
  }
  &::before{
    content: "";
    display: block;
    width: 100%;
    height: 80px;
  }
  &::after{
    content: "";
    display: block;
    width: 100%;
    height: 80px;
  }
}

.panel_footer{
  box-sizing: border-box;
  border-top: 1px solid #e4e4e4;
  padding: 4px;
  height: 36px;
  line-height: 25px;
  text-align: right;
}
</style>