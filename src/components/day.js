import React, { Component } from 'react';
import { Text, View, TouchableHighlight, Picker } from 'react-native';
import { Actions } from 'react-native-router-flux';

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { updateMonthYear, createRoster } from "../actions/dayActions";


class Day extends Component {
  constructor(props){
    super(props);
    // console.log(this.props)
    this.handleClick = this.handleClick.bind(this)
    this.displayRosterToDom = this.displayRosterToDom.bind(this)
    this.state = ({
      daysOn:'',

    })
    // console.log(this.props)
  }

  handleClick(){
    console.log('clicked')
  }

  displayRosterToDom(day, month, year){
    let thisDate = day + '/' + month + '/' + year
    let rostered = false
    // console.log('drd', thisDate)


    if(this.props.roster.roster){
      this.props.roster.roster.map((rosterDay)=>{
        if(rosterDay.date === thisDate){
          if(rosterDay.working){
            rostered = true
          }
        }
      })

      return(
        <View style={{justifyContent: 'center', }}>
          {rostered && <Text style={{color:'#E23030', fontWeight:'bold', textAlign:'center',  paddingTop:7}}>On</Text>}
        </View>
      )
    }

  }

  render() {
    return (
      <View style={styles.dayCtr}>
        <Text style={[styles.day_text, {backgroundColor: '#1D7DE2', color:"white", padding:1}]}>
          {this.props.day}
        </Text>
        {this.displayRosterToDom(this.props.day, this.props.month + 1, this.props.year)}
      </View>
    );
  }

}

const styles = {
  dayCtr:{
    // backgroundColor: 'lightgrey',
  },
  day_text:{
    textAlign: 'center',
  }
};

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    updateMonthYear: updateMonthYear,
    createRoster
  }, dispatch)
}

function mapStateToProps(state){
  return {
    roster: state.calenderReducer
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Day);
