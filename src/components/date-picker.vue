<template>
  <div class="cc-calendar">
    <calendarHeader
      :headOptions="headOptions"
      @handlePrevMonth = 'handlePrevMonth'
      @handleNextMonth = 'handleNextMonth'
      @handleToday = 'handleToday'
    />
    <ul class="calendar-week clear">
      <li v-for="(item, index) in calendarTitleArr" :key="index" class="week-item">{{item}}</li>
    </ul>
    <ul class="calendar-view clear">
      <li v-for="(item, index) in visibleCalendar"
        :key="index"
        class="date-view"
        :class="[
          {'month-class': !isCurrentMonth(item.date)},
          {todayBg: isCurrentDay(item.date)},
          {handleDay: item.clickDay}
        ]"
        @click="handleClickDay(item,index)"
      >
        <span class="date-day"
          :style="dayStyle"
          :class="[
          {'opacity-class': !isCurrentMonth(item.date)},
          {todayColor: isCurrentDay(item.date)}
          ]"
        >
          {{item.day}}
        </span>
        <span v-if="item.if_matters" class="calendar-num">
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
  import 'assets/css/reset.min.css'
  import calendarHeader from './canlendar-head.vue';
  import * as utils from 'assets/js/utils.js';

  export default {
    name: 'cc-calendar',
    componentName: 'cc-calendar',
    props: {
      options: Object,
      dayRangeHasMatter: Array
    },
    components: {
      calendarHeader
    },
    data() {
      let {year, month, day} = utils.getNewDate(new Date());
      return {
        headOptions: {
          type: this.options.type,
          style: this.options.headStyle,
          date: '',
          matter: '',
        },
        calendarTitleArr: [
          '日',
          '一',
          '二',
          '三',
          '四',
          '五',
          '六'
        ],
        time: {year, month, day},
        calendarList: [],
        dayRangeHasMatterData:[],
        seDate:[]
      }
    },
    computed : {
      dayStyle : function () {
        return {
          textAlign: this.options.viewStyle.day,
        }
      },

      visibleCalendar () {
        let calendatArr = [];
        let {year, month} = utils.getNewDate(utils.getDate(this.time.year, this.time.month, 1));

        let currentFirstDay = utils.getDate(year, month, 1);

        // 获取当前月第一天星期几
        let weekDay = currentFirstDay.getDay();
        let startTime = currentFirstDay - (weekDay) * 24 * 60 * 60 * 1000;

        let monthDayNum;
        if (weekDay == 5 || weekDay == 6){
          monthDayNum = 42
        }else {
          monthDayNum = 35
        }


        for (let i = 0; i < monthDayNum; i++) {
          calendatArr.push({
            date: new Date(startTime + i * 24 * 60 * 60 * 1000),
            year: new Date(startTime + i * 24 * 60 * 60 * 1000).getFullYear(),
            month: new Date(startTime + i * 24 * 60 * 60 * 1000).getMonth()+1,
            day: new Date(startTime + i * 24 * 60 * 60 * 1000).getDate(),
            clickDay: false,
            if_matters: this.dayRangeHasMatterData[i]?this.dayRangeHasMatterData[i].hasmatter:false
          })
        }

        let {year: currentYear, month: currentMonth, day: currentDay} = utils.getNewDate(new Date());
        const idate = currentYear+"-"+currentMonth+"-"+currentDay;
        this.updateidate(idate)
        this.updateCalendarList(calendatArr)
        // this.headOptions.date = `${utils.englishMonth(month)} ${year}`;


        //将时间范围传给父级
        const SEDate = [];
        SEDate.push(calendatArr[0].date,calendatArr.reverse()[0].date)
        this.$emit('handleStartEndDate',SEDate)
        calendatArr.reverse()
        return calendatArr
      },
    },
    methods: {
      updateidate(date){
        this.headOptions.date = date;
      },
      updateCalendarList(arr){
        this.calendarList = arr;
      },
      // 是否是当前月
      isCurrentMonth (date) {
        let {year: currentYear, month: currentMonth} = utils.getNewDate(utils.getDate(this.time.year, this.time.month, 1));
        let {year, month} = utils.getNewDate(date);
        return currentYear == year && currentMonth == month
      },
      // 是否是今天
      isCurrentDay (date) {
        let {year: currentYear, month: currentMonth, day: currentDay} = utils.getNewDate(new Date());
        let {year, month, day} = utils.getNewDate(date);
        return currentYear == year && currentMonth == month && currentDay == day;
      },
      // 上一个月
      handlePrevMonth () {
        let prevMonth = utils.getDate(this.time.year,this.time.month,1);
        prevMonth.setMonth(prevMonth.getMonth() - 1);
        this.time = utils.getNewDate(prevMonth);
        this.headOptions.date = `${utils.englishMonth(this.time.month)} ${this.time.year}`;
        this.$emit('handlePrevMonth');

      },
      // 下一个月
      handleNextMonth () {
        let nextMonth = utils.getDate(this.time.year,this.time.month,1);
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        this.time = utils.getNewDate(nextMonth);
        this.headOptions.date = `${utils.englishMonth(this.time.month)} ${this.time.year}`;
        this.$emit('handleNextMonth');
      },
      // 点击回到今天
      handleToday () {
        this.time = utils.getNewDate(new Date());
        console.log(this.time)
        // this.returnDate();
        this.$emit('handleToday');
      },
      // 点击某一天
      handleClickDay (item,index) {
        const index_clickDay = this.calendarList[index].clickDay
        console.log(index_clickDay)
        this.$forceUpdate();
        this.$emit('handleClickDay', item);
        this.calendarList.map( x => {
          x.clickDay = false;
        });
        if(index_clickDay){
            console.log(2)
            this.calendarList[index].clickDay = false
        }else{
          console.log(1)
          this.calendarList[index].clickDay = true
        }
      }
    },
    watch:{
      dayRangeHasMatter(newV) {
        //获取事项数据更新到日历中
        this.dayRangeHasMatterData = newV
        this.visibleCalendar

      }
    },
    created () {
      this.calendarList = this.visibleCalendar;
      this.calendarType = this.options.calendarType;

    },
    mounted(){

    },
    updated() {

    }
  }
</script>

<style lang="less" scoped>
  .cc-calendar {
    //padding: 23px 30px 30px;
    width: 100%;
    //height: 100%;
    background: #ffffff;
    box-sizing: border-box;
    .calendar-week {
      width: 96%;
      margin: 0 auto;
      height: 40px;
      line-height: 46px;
      padding: 0 5px 0 5px;
      //border: 1px solid #E4E7EA;
      border-right: none;
      .week-item {
        float: left;
        display: block;
        height: 40px;
        width: 14.285%;
        text-align: center;
        font-size: 14px;
        color: #424953;
        //border-right: 1px solid #E4E7EA;
        font-weight: 600;
      }
    }
    .calendar-view {
      width: 96%;
      margin: 0 auto;
      padding: 0 5px 0 5px;
      //border-left: 1px solid #E4E7EA;
      .date-view {
        float: left;
        width: 14.285%;
        height:13vw;
        border-radius: 50%;
        border: 1px #ffffff solid;
        //border-right: 1px solid #E4E7EA;
        //border-bottom: 1px solid #E4E7EA;
        cursor: pointer;
        .date-day {
          padding: 10px 8px 0;
          display: block;
          width: 100%;
          font-size: 14px;
          color: #7F8794;
        }
        .calendar-num {
          /*margin-top: 6px;*/
          /*display: block;*/
          /*width: 100%;*/
          /*text-align: center;*/
          /*font-size: 30px;*/
          /*color: #424953;*/
          display: block;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background-color: #FF9900;
          margin: 5px auto 0px;
        }
      }
      .opacity-class {
        opacity: .5;
      }
      .month-class {
        background-image: linear-gradient(45deg,rgba(000, 000, 000, .03) 25%,transparent 25%,transparent 50%,rgba(000, 000, 000, .03) 50%,rgba(000, 000, 000, .03) 75%,transparent 75%,transparent);
        background-size: 20px 20px;
      }
      .todayBg {
        background: #2A579A;
      }
      .todayColor {
        color: #fff !important;
      }
      .handleDay {
        background: #fff !important;
        border: 1px #2A579A solid;
        .date-day {
          color: #2A579A !important;
        }
        .calendar-num {
          color: #fff !important;
        }
      }
    }
  }
</style>
