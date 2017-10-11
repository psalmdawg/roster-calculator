export function setRosterDaysOn(daysOn){

  return {
    type:'SET_ROSTER_DAYS_ON',
    payload:daysOn
  }

}

export function setRosterDaysOff(daysOff){

  return {
    type:'SET_ROSTER_DAYS_OFF',
    payload:daysOff
  }

}

export function setMonthStartDay(){

  return {
    type:'SET_MONTH_START_DAY'
    // payload:daysOff
  }

}

export function setStartDate(startDate){

  return {
    type:'SET_ROSTER_START_DATE',
    payload:startDate
  }

}


export function createRoster(daysOn, daysOff, startDate){

  return {
    type:'CREATE_ROSTER',
    payload:{
      daysOn:daysOn,
      daysOff:daysOff,
      startDate:startDate
    }
  }

}


export function updateMonthYear(year, month){

  return {
    type:'UPDATE_MONTH_YEAR',
    year:year,
    month:month
  }
}

export function resetTheCurrentDate(day, month, year){
  return {
    type: "RESET_DAY_MONTH_YEAR",
    year:year,
    month:month,
    day:day
  }
}
