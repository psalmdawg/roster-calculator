import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Picker } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {setRosterDaysOn} from '../actions/dayActions';

class DaysOn extends Component {
  constructor(props){
    super(props);
    this.updateStoreRoster = this.updateStoreRoster.bind(this)
    console.log(this.props.roster.calenderReducer)
    this.state = ({
      daysOn:'',
    })
  }

  updateStoreRoster(){
    console.log('usr on', this.state.daysOn)
    this.props.setRosterDaysOn(this.state.daysOn)
    // this.setState({ params }, this.performSearch)
  }

  navForward(){
    if(this.state.daysOn === ''){
      return alert('please select days rostered on')
    }
    Actions.DaysOff()
  }



  render() {
    return (
      <View style={{flex:1}}>
        <View style={{flex:2}}>

          <Picker

            selectedValue={this.state.daysOn}
            onValueChange={ (itemValue, itemIndex) => this.setState( {daysOn: itemValue}, this.updateStoreRoster)}>
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

          <Text>Days On {this.state.daysOn.toString()}</Text>
        </View>

        <View style={{flex:2}}>
          <TouchableOpacity style={styles.continue_btn} onPress={this.navForward.bind(this)}>
            <Text style={styles.continue_btn_text} >continue</Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }

}

const styles = {
  continue_btn:{
    backgroundColor:'#1D7DE2',
    // flex:1,

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
    setRosterDaysOn
  }, dispatch)
}

function mapStateToProps(state){
  return {
    roster: state
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DaysOn);
