import React, { Component } from 'react';
import { Dimensions, PanResponder,
  Animated, Text,
  View, TouchableOpacity,
  LayoutAnimation,
  UIManager
} from 'react-native';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { resetTheCurrentDate,updateMonthYear, createRoster, setMonthStartDay } from "../actions/dayActions";
import Day from './day';
// import { Actions } from 'react-native-router-flux';
// import { CardSection } from './common';
const SCREEN_WIDTH = Dimensions.get('window').width
const SWIPE_THRESHOLD = 0.1 * SCREEN_WIDTH
const SWIPE_OUT_DURATION = 50

class Calender extends Component {

  static defaultProps = {
    //these are defaults if no corresponding prop is passed in
    onSwipeRight: () => {},
    onSwipeLeft: () => {}
  }

  constructor(props){
    super(props)

    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy })
      },
      onPanResponderRelease: (event, gesture) => {

        if(gesture.dx > SWIPE_THRESHOLD){
          this.forceSwipe('right')
        } else if(gesture.dx < -SWIPE_THRESHOLD){
          this.forceSwipe('left')
        } else {
          this.resetPosition();
        }
      }
    });

    this.state = {
      monthText: this.props.roster.months[this.props.roster.month],
      panResponder,
      position,
      index: 0
    }
    // console.log(MonthText)
    this.getMonthLength2 = this.getMonthLength2.bind(this)
    this.leapYear = this.leapYear.bind(this)
    this.displayCalenderDays = this.displayCalenderDays.bind(this)
    this.updateMonthDown = this.updateMonthDown.bind(this)
    this.updateMonthUp = this.updateMonthUp.bind(this)



  }
  componentDidMount(){
    this.props.createRoster(this.props.roster.daysOn, this.props.roster.daysOff, this.props.roster.startDate)

    //for setting first day of month, week. ie mon, tues etc
    this.props.setMonthStartDay()

  }

  componentWillUpdate(){
    //for Android
    // UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    // LayoutAnimation.spring();
  }

  getMonthLength2(monthIn, yearIn){

    let monthInput = monthIn, year = yearIn;
    if(monthInput === 1 || monthInput ===  3 || monthInput ===  5 || monthInput ===  7 || monthInput ===  8 || monthInput ===  10 || monthInput ===  12){monthInput:
      return 31;
    } else if (monthInput === 4 || monthInput ===  6 || monthInput === 9 || monthInput === 11){
      return 30;
    } else if ( this.leapYear(year) ){
      return 29
    } else {
      return 28
    }
  }

  leapYear(year) {
    return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
  };


  displayCalenderDays(){
    const startDay = this.props.roster.startDay;
    console.log('startdat', startDay)

    let count = 0;
    let numberOfDays = startDay + this.getMonthLength2(this.props.roster.month, this.props.roster.year)
    let arrayOfDays = [];
    for(let x = 1;x<=startDay;x++){
      if(count <= startDay - 1){
      //these are the blanks spaces in the cal to match date up with correct day .
        count ++
        arrayOfDays.push(<View key={'st' + x} style={styles.day_wrp_empty}><Text> </Text></View>)
      }
    }

    for(let i = 1;i<=this.getMonthLength2(this.props.roster.month + 1, this.props.roster.year); i++){
      arrayOfDays.push(
        <View key={'v'+i} style={styles.day_wrp}>
          <Day
            key={'d'+i}
            day={i}
            month={this.props.roster.month}
            monthText={this.state.MonthText}
            year={this.props.roster.year}
            onClick={()=>{console.log('click')}}
          />
        </View>
      )
    }
    console.log(arrayOfDays.length)
    return(
      arrayOfDays
    )
  }

  updateMonthUp(){
    if(this.props.roster.month === 11 || this.props.month > 11){
      this.props.updateMonthYear(this.props.roster.year + 1, 0)
    } else {
      this.props.updateMonthYear(null,this.props.roster.month + 1)
    }

  }

  updateMonthDown(){
    if(this.props.roster.month === 0 || this.props.roster.month < 0){
      this.props.updateMonthYear(this.props.roster.year- 1, 11)
    } else {
      this.props.updateMonthYear(null,this.props.roster.month - 1)
    }

  }

  resetPosition(){
    Animated.spring(this.state.position, {
      toValue: { x: 0, y: 0 }
    }).start();
  }

  forceSwipe(direction){
    const xValue = direction === 'right' ? SCREEN_WIDTH  : -SCREEN_WIDTH

    Animated.timing(this.state.position, {
      toValue: {x:xValue * 1.3, y:0},
      duration: SWIPE_OUT_DURATION
    }).start(() => this.onSwipeComplete(direction))
  }

  onSwipeComplete(direction){
    const { onSwipeLeft, onSwipeRight, data } = this.props
    // const item = data[this.state.index]
    console.log(direction, data)
    direction === 'right' ? this.updateMonthDown() : this.updateMonthUp()


    //this is not following setState dogma. not being inset state. position doesnt have to be in state, but recommneded It's to do with the animation position best practice.
    this.state.position.setValue({ x: 0, y: 0 })

    // this.setState({
    //   // index: this.state.index + 1
    // })
  }

  getCardStyle(){
    const { position } = this.state;
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.2, 0, SCREEN_WIDTH * 1.2],
      outputRange:['-10deg', '0deg', '10deg']
    })
    return {
      ...position.getLayout(),
      transform:[{ rotate }]
    };
  }


  navHome(){
    // reset to todays date
    let dayDate = new Date().getUTCDate()
    let month = new Date().getMonth()
    let year = new Date().getFullYear()
    this.props.resetTheCurrentDate(dayDate, month, year)

    Actions.dash()
  }

  render() {

    return (
      <View style={{flex:1}}>
        <View style={styles.nav_wrap}>

          <TouchableOpacity
            onPress={this.updateMonthDown}
            style={styles.cal_nav} >
              <Text style={styles.cal_nav_text}>Prev</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={this.updateMonthUp}
            style={styles.cal_nav} >
              <Text style={styles.cal_nav_text}>Next</Text>
          </TouchableOpacity>

        </View>

        <View style={styles.calHeader_wrp}>
          <View style={styles.calHeader_text_wrp}>
            <Text style={styles.calHeader}>{this.props.roster.months[this.props.roster.month]}</Text>
            <Text style={styles.calHeader}>{this.props.roster.year}</Text>
          </View>
          <Text> Roster: {this.props.roster.daysOn} On - {this.props.roster.daysOff} Off. Start: {this.props.roster.startDate}</Text>
        </View>

        <Animated.View
          style={[styles.calenderMain, this.getCardStyle()]}
          { ...this.state.panResponder.panHandlers }
          >

            <View style={styles.day_wrp}><Text style={{textAlign:'center'}} >Sun</Text></View>
            <View style={styles.day_wrp}><Text style={{textAlign:'center'}} >Mon</Text></View>
            <View style={styles.day_wrp}><Text style={{textAlign:'center'}} >Tues</Text></View>
            <View style={styles.day_wrp}><Text style={{textAlign:'center'}} >Weds</Text></View>
            <View style={styles.day_wrp}><Text style={{textAlign:'center'}} >Thurs</Text></View>
            <View style={styles.day_wrp}><Text style={{textAlign:'center'}} >Fri</Text></View>
            <View style={styles.day_wrp}><Text style={{textAlign:'center'}} >Sat</Text></View>

          {this.displayCalenderDays()}
        </Animated.View>

        <View style={styles.nav_bottom}>
          <TouchableOpacity style={styles.nav_btns}>
            <Text style={styles.nav_btns_text}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.nav_btns}>
            <Text style={styles.nav_btns_text}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.nav_btns} onPress={this.navHome.bind(this)}>
            <Text style={styles.nav_btns_text}>New</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

}

const styles = {
  calHeader:{
    color:'red',
    fontSize: 20,
    fontWeight:'bold',
    paddingLeft:3,
    paddingRight:3
  },
  calHeader_text_wrp:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  calHeader_wrp:{
    flex:1,
    backgroundColor:'#1D7DE2',
  },
  calenderMain: {
    flex: 8,
    // backgroundColor: 'blue',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: SCREEN_WIDTH
  },
  day_wrp:{
    width: SCREEN_WIDTH / 7.28,
    height: 55,
    backgroundColor: '#f5f5f5',
    margin: 1,
    borderColor:'grey',
    borderWidth:1
  },
  day_wrp_empty:{
    width: SCREEN_WIDTH / 7.29,
    height: 55,
    backgroundColor: 'lightgrey',
    margin: 1,
  },
  nav_wrap:{
    flex: 1,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'space-between',
    paddingLeft:20,
    paddingRight:20,
    backgroundColor: '#1D7DE2'
  },
  cal_nav:{
    width: SCREEN_WIDTH / 3,
    // backgroundColor: '#f5f5f5'
  },
  cal_nav_text:{
    textAlign:'center',
    fontWeight:'bold',
    fontSize:25,
    color:'white'
    // lineHeight:30,
  },
  nav_bottom:{
    flex:1,
    flexDirection:'row',
    backgroundColor: '#1D7DE2',
  },
  nav_btns:{
    flex:1,
    justifyContent: 'center',
  },
  nav_btns_text:{
    textAlign:'center',
    fontSize:20,
    color:'white'
  }
};


function mapDispatchToProps(dispatch){
  return bindActionCreators({
    updateMonthYear,
    createRoster,
    setMonthStartDay,
    resetTheCurrentDate
  }, dispatch)
}

function mapStateToProps(state){
  return {
    roster: state.calenderReducer
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Calender);
