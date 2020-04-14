<template>
  <div class="matter">
    <div class="matter-item" v-for="(item,index) in matters" :key="index">
      <div class="line">
        <span class="font-a">{{item.title}}</span>
        <span class="font-b">{{item.createdate|dateformat}}</span>
      </div>
      <div class="line">
        <span class="font-c" style="margin-top: 5px;">{{item.subtitle}}</span>
      </div>
      <div class="line">
        <span class="font-c colorjiaobenren" :class="{colorjingbanren:item.role=='经办人'}">我的角色：{{item.role}}</span>
        <span class="font-b" style="font-weight: bold"> · · · </span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "MatterItem",
    props:{
      matters:{
        type:Array,
        default(){
          return []
        }
      }
    },
    filters:{
      dateformat(value){
        return value.substr(value.length-5)
      }
    }
  }
</script>

<style scoped>
  .matter-item{
    width: 98%;
    margin:0 1%;
    padding: 5px 10px;
    border-bottom: 1px #F5F5F5 solid;
  }
  .line{
    height: 20px;
    position: relative;
  }
  .font-a{
    position: absolute;
    font-size: 18px;
    color: #3D3E3D;
    font-weight: bold;
  }
  .font-b{
    position: absolute;
    top: 2px;
    right: 0px;
    font-size: 12px;
    color: #898B8D;
  }
  .font-c{
    display: block;
    line-height: 20px;
    font-size: 14px;
    color: #898B8D;
  }
  .colorjingbanren{
    color: #4DB8DC !important;
  }
  .colorjiaobenren{
    color: #FFA12E;
  }
</style>
