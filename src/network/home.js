import {request} from "./request";

export function getDayRangeHasMatter(starttime, endtime, type) {
  return request({
    url: '/Test/DayRangeHasMatter',
    method: "post",
    data: {
      starttime,
      endtime,
      type
    }
  })
}
export function getGetDayMatters(date, type) {
  return request({
    url: '/Test/GetDayMatters',
    method: "post",
    data: {
      date,
      type
    }
  })
}
