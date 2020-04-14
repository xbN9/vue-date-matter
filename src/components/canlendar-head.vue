<template>
  <div class="calendar-header clear">
    <div class="calendar-box" v-if="this.headOptions.type == 'combination'">
      <div class="calendar-content" :style="{'text-align': this.headStyle.combination}">
        <span class="calendar-prev" @click="handlePrevMonth"></span>
        <span class="calendar-headDate"> {{this.headOptions.date}} </span>
        <span class="calendar-next" @click="handleNextMonth"></span>
      </div>
      <span class="calendar-today" @click="handleToday()"> 今天 </span>
    </div>
    <div class="calendar-box" v-else>
      <span class="calendar-headDate"> {{this.headOptions.date}} </span>
      <span class="calendar-today dispersion-today" :style="{float: this.headStyle.todayBtn}" @click="handleToday()"> 今天 </span>
      <div class="calendar-content dispersion" :style="{float: this.headStyle.checkBtn}">
        <span class="calendar-prev" @click="handlePrevMonth"></span>
        <span class="calendar-next" @click="handleNextMonth"></span>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    props: {
      headOptions: Object
    },
    data () {
      return {
        headStyle: ''
      }
    },
    mounted() {
      this.headStyle = this.headOptions.style;

    },
    methods: {
      // 上一个月
      handlePrevMonth () {
        this.$emit('handlePrevMonth');
      },
      // 下一个月
      handleNextMonth () {
        this.$emit('handleNextMonth');
      },
      // 回到今天
      handleToday () {
        this.$emit('handleToday');
      }
    }
  }
</script>

<style lang="less" scoped>
  .calendar-header {
    /*margin-bottom: 23px;*/
    width: 100%;
    background: black;
    height: 44px;
    .calendar-box {
      position: relative;
      height: 32px;
      line-height: 32px;
      .calendar-content {
        width: 100%;
        height: 20px;
        padding-top: 5px;
        .calendar-prev,
        .calendar-next {
          display: inline-block;
          vertical-align: middle;
          width: 8px;
          height: 11px;
          background: url('../assets/img/left.png') no-repeat;
          background-size: contain;
          cursor: pointer;
        }
        .calendar-next {
          background: url('../assets/img/right.png') no-repeat;
          background-size: contain;
        }
      }
      .dispersion{
        width: initial;
        display: inline;
      }
      .calendar-headDate {
        vertical-align: middle;
        margin: 0 12px;
        font-size: 16px;
        color: #ffffff;
        -webkit-user-select: none;
        -webkit-touch-callout: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
      .calendar-today {
        position: absolute;
        top: 1px;
        right: 0;
        width: 80px;
        line-height: 44px;
        text-align: center;
        /*border: 1px solid #2061FF;*/
        border-radius: 4px;
        font-size: 14px;
        color: #ffffff;
        cursor: pointer;
      }
      .dispersion-today{
        position: inherit;
      }
      .calendar-center {
        margin: 0 auto;
      }
      .calendar-left {
        float: left;
      }
      .calendar-right {
        float: right;
      }
    }
  }
</style>
