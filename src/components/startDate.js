import React, { Component } from 'react';
import {
  Text, View,
  TouchableOpacity,
   Picker
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
import DatePicker from 'react-native-datepicker';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { setStartDate } from '../actions/dayActions';



class StartDate extends Component {

  constructor(props){
    super(props)
    this.updateStoreRoster = this.updateStoreRoster.bind(this)

    this.state = ({ date:'' })

  }

  updateStoreRoster(){
    console.log('usr on', this.state.daysOn)
    this.props.setStartDate(this.state.date)
    // this.setState({ params }, this.performSearch)
  }

  navForward(){
    if(this.state.date === ''){
      return alert('please select start date for roster')
    }
    Actions.Calender()
  }

  render() {
    return (
      <View style={{flex:1}}>

      <View style={{flex:1}}>
        <DatePicker
          style={{width: 200}}
          date={this.state.date}
          mode="date"
          placeholder="select date"
          format="D/M/YYYY"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
            // ... You can check the source to find the other keys.
          }}
          onDateChange={(date) => {
            this.setState({date: date},
            this.updateStoreRoster) }}
        />

        <Text>Roster Start Date:{this.state.date.toString()}</Text>

      </View>
      <View style={{flex:1}}>
        <TouchableOpacity style={styles.continue_btn} onPress={this.navForward.bind(this)}>
          <Text style={styles.continue_btn_text}>Continue</Text>
        </TouchableOpacity>
      </View>

      </View>
    );
  }

}

const styles = {
  continue_btn:{
    backgroundColor:'#1D7DE2',
  },
  continue_btn_text:{
    textAlign:'center',
    color:'white',
    height: 60,
    justifyContent: 'center',
    fontSize:20,
    paddingTop: 15,

  }
};


function mapDispatchToProps(dispatch){
  return bindActionCreators({
    setStartDate
  }, dispatch)
}

function mapStateToProps(state){
  return {
    roster: state
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StartDate);
