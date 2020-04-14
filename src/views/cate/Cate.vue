<template>
  <div id="date-m">
    <datePicker
      :options="calendarArr"
      :dayRangeHasMatter="dayRangeHasMatter"
      class="calendar"
      @handleClickDay="handleClickDay"
      @handlePrevMonth="handlePrevMonth"
      @handleNextMonth="handleNextMonth"
      @handleStartEndDate="handleStartEndDate"
      @handleToday="handleToday"
    />
    <div class="zoom">
      <img src="~assets/img/dateMatter/sjts.svg"/>
    </div>
    <tab-c
      :title="title"
      @tabClick="tabClick"/>

    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @position="position"
            :pull-up-load="true"
            @pullingUp="pullingUp">
      <matter-item :matters="matters"/>
    </scroll>


  </div>
</template>

<script>
  import datePicker from 'components/date-picker'
  import Scroll from "components/common/scroll/Scroll";

  import TabC from "./childComps/TabC"
  import MatterItem from "./childComps/MatterItem"

  import {getDayRangeHasMatter,getGetDayMatters} from "network/home"

  export default {
    name: 'date-picker',
    components: {
      datePicker,
      Scroll,
      TabC,
      MatterItem
    },
    data() {
      return {
        calendarArr: {
          type: 'combination',
          headStyle: {
            todayBtn: 'right',
            combination: 'center',
            checkBtn: 'right',
          },
          viewStyle: {
            day: 'center'
          },
          calendarData: []
        },
        starttime:'2020-04-01',
        endtime:'2020-05-01',
        date:'2020-04-14',
        dayRangeHasMatterType:"提醒",
        dayRangeHasMatter:[],
        title:['已设置提醒','创建时间','最后发言时间'],
        matters:[]
      }
    },
    mounted() {
      this.getDayRangeHasMatter()
      this.getGetDayMatters()
    },
    methods: {
      getDayRangeHasMatter() {
        getDayRangeHasMatter(
            this.starttime,
            this.endtime,
            this.dayRangeHasMatterType
        ).then(res => {
          //console.log(res.days)
          this.dayRangeHasMatter = res.days
        })
      },
      getGetDayMatters(){
        getGetDayMatters(
            this.date,
            this.dayRangeHasMatterType
        ).then(res => {
          //console.log(res.days)
          this.matters = res.matters
        })
      },
      handleClickDay() {
      },
      handleToday() {

      },
      handlePrevMonth() {

      },
      handleNextMonth() {

      },
      handleStartEndDate(e) {
        // console.log(11)
        this.starttime = e[0].getFullYear()+"-"+(e[0].getMonth()+1)+"-"+e[0].getDate()
        this.endtime = e[1].getFullYear()+"-"+(e[1].getMonth()+1)+"-"+e[1].getDate()

      },
      tabClick(index){
        switch (index) {
          case 0:
            this.dayRangeHasMatterType = '提醒'
            break
          case 1:
            this.dayRangeHasMatterType = '创建'
            break
          case 2:
            this.dayRangeHasMatterType = '最后'
            break
        }
        this.getDayRangeHasMatter()
      },
      position(){

      },
      pullingUp(){//上拉加载更多
      },
    },
    watch:{
      starttime() {
        this.getDayRangeHasMatter()
      }
    }
  }
</script>

<style scoped>
  #date-m{
    /*padding-top: 44px;*/
    height: 100vh;
    /*vh:viewport height 视口高度*/
    position: relative;
  }
  .content {
    overflow: hidden;
    position: absolute;
    top: 110vw;
    bottom: 10px;
    left: 0;
    right: 0;
  }
  .zoom{
    width: 100%;
    height: 32px;
  }
  .zoom img{
    display: block;
    width: 20px;
    margin: 0 auto;
  }
</style>
