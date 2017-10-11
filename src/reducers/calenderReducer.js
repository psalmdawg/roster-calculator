
const INITIAL_STATE = {

    daysOn:'',
    daysOff:'',
    startDate:'',
    startDay:'',
    dayDate: new Date().getUTCDate(),
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
    months:["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    cal:[],

};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // case 'CREATE_CALENDER':
    //   return action.payload;
    case 'SET_MONTH_START_DAY':

      return Object.assign({}, state, {
        startDay: getNewMonth(state.month, state.year),
      })

    case 'RESET_DAY_MONTH_YEAR':
      return Object.assign({}, state, {
        day:action.day,
        month:action.month,
        year:action.year
      })

    case 'SET_ROSTER_DAYS_ON':

      // return { ...state,  };
      return Object.assign({}, state, {
        daysOn: action.payload
      })

    case 'SET_ROSTER_DAYS_OFF':

      return Object.assign({}, state, {
        daysOff: action.payload
      })

    case 'SET_ROSTER_START_DATE':

      return Object.assign({}, state, {
        startDate:action.payload
      })

    case 'CREATE_ROSTER':


      let generatedRoster = calculateRoster(action.payload.daysOn, action.payload.daysOff, action.payload.startDate)

      return Object.assign({}, state, {
      roster:generatedRoster
      })

    case 'UPDATE_MONTH_YEAR':
      if(!action.year){
        const sameYear = state.year
        // have a check to make sure date of month displayed is not out of sink with what it can be.
        return Object.assign({}, state, {
          year: sameYear,
          month: action.month,
          startDay: getNewMonth(action.month, sameYear)
        })
      } else {
        return Object.assign({}, state, {
          year: action.year,
          month: action.month,
          startDay: getNewMonth(action.month, action.year)
        })
      }

    default:
      return state;
  }
};

function calculateRoster(daysOn, daysOff, startDay){
  var roster = [], date, day, month, year;
    //increment the date. '1/12/19' etc

    day = formatDate(startDay).day
    month = formatDate(startDay).month
    year = formatDate(startDay).year
    date = day + '/' + month + '/' + year;

  for(let i = 0;i<250;i++){
    for(let y = 0; y<daysOn;y++){
      roster.push({date: date, working: true})
      date = incrementDate(day, month, year);
      day = formatDate(date).day
      month = formatDate(date).month
      year = formatDate(date).year

    }
    for(let x = 0;x<daysOff; x++){
      roster.push({date: date, working: false})
      date = incrementDate(day, month, year);
      day = formatDate(date).day
      month = formatDate(date).month
      year = formatDate(date).year
    }
  }
  // console.log('roster called')
  //
  // console.log(roster)
  return roster;
}



function formatDate(date){
  var day ='', month = '', year = '', count = 0;
    // split up date to string
  for(let z=0;z<date.length;z++){
    if(date[z] !== '/'){
      if(count === 0){
        day += (date[z])
      } else if(count === 1){
        month += (date[z])
      } else if(count === 2){
        year += (date[z])
      }
    } else if(date[z] === '/'){
      count ++
      // new line
    }
  }
  count = 0;
  return  {
    day, month, year
  }
}

function incrementDate(day, month, year){
  var day = parseInt(day), month = parseInt(month), year = parseInt(year), date;
  if(day >= getMonthLength2(month, year)){
    day = 1;
    if(month >= 12){
      month = 1
      year ++
    } else {
      month ++
    }
  } else {
    day ++
  }

  day= day.toString();
  month = month.toString();
  year = year.toString();
  date = day + '/' + month + '/' + year
  return date
}

export function getNewMonth(monthIn, yearIn){

  let newDate = new Date(yearIn, monthIn)
  let dateToString = newDate.toDateString()
  let firstDayOfMonth = dateToString.substring(0, 3);
  console.log('START DAY', dateToString, firstDayOfMonth)

  switch (firstDayOfMonth) {
    case "Sun":
      return 0;

    case "Mon":
      return 1;

    case "Tue":
      return 2;

    case "Wed":
      return 3;

    case "Thu":
      return 4;

    case "Fri":
      return 5;

    case "Sat":
      return 6;

  default:
      return("")
  }


  }


export function leapYear(year) {
  return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
};

export function howManyDaysInMonth(currentmonth, year){

  if(currentmonth === "April" || currentmonth === "June" || currentmonth === "September" || currentmonth === "November") {
    return 30;
  } else if(currentmonth === "January" || currentmonth === "March" ||
  currentmonth === "May" || currentmonth === "July" || currentmonth ===  "August"
  || currentmonth ===  "October" || currentmonth ===  "December") {
      return 31
  } else {
    if(leapYear(year)){
      return 29
    } else {
      return 28
    }
  }
};


export function getMonthLength2(monthInput, year){

  if(monthInput === 1 || monthInput ===  3 || monthInput ===  5 || monthInput ===  7 || monthInput ===  8 || monthInput ===  10 || monthInput ===  12){monthInput:
    return 31;
  } else if (monthInput === 4 || monthInput ===  6 || monthInput === 9 || monthInput === 11){
    return 30;
  } else if ( leapYear(year) ){
    return 29
  } else {
    return 28
  }
}

function incrementMonth(month, year){
  if(month >= 11){
    month = 0
    year ++
  } else {
    month ++
  }
  console.log('month',month, 'year', year)
  return{
    month: month,
    year: year
  }
}

function decrementMonth(month, year){
  if(month <= 0){
    month = 11
    year --
  } else {
    month  --
  }
  console.log('month',month, 'year', year)
  return{
    month: month,
    year: year
  }
}

//
// function createTheCalender(){
//   // console.log(this.props)
//   this.calWindowsTemp = [];
//   const startDay = this.state.startDay;
//
//   let count = 0;
//   let numberOfDays = startDay + howManyDaysInMonth(this.state.month, this.state.year)
//
//   for(let i = 1;i<=numberOfDays;i++){
//     if(count <= startDay - 1){
//       //these are the blanks spaces in the cal to match date up with correct day .
//       count ++
//       this.calWindowsTemp.push(<div className='cal_window prevMonth' key={'st' + i}> </div>)
//     } else if (count % 7 === 0){
//         //SUNDAYS and change of row
//         count ++
//         if( i - startDay === this.props.dayDate){
//           this.calWindowsTemp.push(<div onClick={()=> this.showDay(i - startDay)} className='cal_window clearfix weekend' key={i - startDay}>{i - startDay}</div>)
//         } else {
//           this.calWindowsTemp.push(<div onClick={()=> this.showDay(i - startDay)}  className='cal_window clearfix weekend' key={i - startDay}>
//            {i - startDay}</div>)
//         }
//     } else if ( count === 6 || count === 13 || count === 20 || count === 27 ||count === 34){
//         // SATURDAYS
//         count ++
//         if( i - startDay === this.props.dayDate){
//           this.calWindowsTemp.push(<div onClick={()=> this.showDay(i - startDay)} className='cal_window weekend' key={i - startDay}>{i - startDay}</div>)
//         } else {
//           this.calWindowsTemp.push(<div onClick={()=> this.showDay(i - startDay)} className='cal_window weekend' key={i - startDay}>{i - startDay}</div>)
//         }
//     } else if( i - startDay === this.props.dayDate) {
//       count ++
//       this.calWindowsTemp.push(<div onClick={()=> this.showDay(i - startDay)}
//         className='cal_window' key={i - startDay}>{i - startDay}</div>)
//     } else {
//       count ++
//       this.calWindowsTemp.push(<div onClick={()=> this.showDay(i - startDay)}
//         className='cal_window' key={i - startDay}>{i - startDay }</div>)
//     }
//   };
//   console.log(this.calWindowsTemp)
//   return this.calWindowsTemp
//   // console.log(this.calWindowsTemp)
//   // this.setState({
//   //   calWindows:this.calWindowsTemp
//   // })
//   // // console.log(this.state.calWindows)
//   // return this.calWindowsTemp;
// };
