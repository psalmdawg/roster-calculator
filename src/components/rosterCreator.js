import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Picker } from 'react-native';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { updateMonthYear, createRoster } from "../actions/dayActions";

// import { Actions } from 'react-native-router-flux';
// import { CardSection } from './common';

class RosterCreator extends Component {
  // constructor(props){
  //   super(props);
  //   console.log(this.props)
  //   // this.props.createRoster(8, 6, '4/10/2017')
  //
  // }
  state = ({
    daysOn:'',
    daysOff:'',
    startDate:moment().format('D/MM/YYYY'),
    outputDate:moment().format('D/MM/YYYY')
  })

  render() {

    return (
      <View >

        <TouchableOpacity onPress={Actions.DaysOn}>
          <Text>Multiple rotation or single rotation?</Text>
        </TouchableOpacity>

      </View>
    );
  }

}

const styles = {
  dashboardMain: {
    backgroundColor: 'lightblue',
    paddingLeft: 15,
    height:100,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dashtext:{
    fontSize:18,
    color: 'red'
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

export default connect(mapStateToProps, mapDispatchToProps)(RosterCreator);
