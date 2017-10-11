import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Picker } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {setRosterDaysOff} from '../actions/dayActions';

class DaysOff extends Component {
  constructor(props){
    super(props);
    this.updateStoreRoster = this.updateStoreRoster.bind(this)
    console.log(this.props.roster.calenderReducer)
    this.state = ({
      daysOff:'',
    })
  }

  updateStoreRoster(){
    console.log('usr off', this.state.daysOff)
    this.props.setRosterDaysOff(this.state.daysOff)
  }

  navForward(){
    if(this.state.daysOff === ''){
      return alert('please select days rostered off')
    }
    Actions.StartDate()
  }

  render() {
    return (
      <View style={{flex:1}} >

        <View style={{flex:1}}>
          <Picker
            selectedValue={this.state.daysOff}
            onValueChange={
              (itemValue, itemIndex) => this.setState({
                daysOff: itemValue}, this.updateStoreRoster
              )}>

            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
            <Picker.Item label="4" value="4" />
            <Picker.Item label="5" value="5" />
            <Picker.Item label="6" value="6" />
            <Picker.Item label="7" value="7" />
            <Picker.Item label="8" value="8" />
            <Picker.Item label="9" value="9" />
            <Picker.Item label="10" value="10" />
            <Picker.Item label="11" value="11" />
            <Picker.Item label="12" value="12" />
            <Picker.Item label="13" value="13" />

          </Picker>
          <Text>Days Off {this.state.daysOff.toString()}</Text>
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
    setRosterDaysOff
  }, dispatch)
}

function mapStateToProps(state){
  return {
    roster: state
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DaysOff);
