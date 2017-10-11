import React, { Component } from 'react';
import { Text, View, TouchableHighlight, Picker } from 'react-native';
import { Actions } from 'react-native-router-flux';

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { updateMonthYear, createRoster } from "../actions/dayActions";


class MonthYearScroller extends Component {
  constructor(props){
    super(props);

  }


  render() {
    return (
      <View style={styles.dayCtr}>
        <Text style={styles.day_text}>
          {this.props.day}
        </Text>
        {this.displayRosterToDom(this.props.day, this.props.month + 1, this.props.year)}
      </View>
    );
  }

}

const styles = {
  dayCtr:{
    backgroundColor: 'lightgrey',
  },
  day_text:{
    textAlign: 'center',
  }
};

function mapDispatchToProps(dispatch){
  return bindActionCreators({

  }, dispatch)
}

function mapStateToProps(state){
  return {
    roster: state.calenderReducer
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MonthYearScroller);
