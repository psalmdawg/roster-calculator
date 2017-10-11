import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Picker } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {setRosterDaysOn} from '../actions/dayActions';

class SavedRosters extends Component {
  constructor(props){
    super(props);
    this.updateStoreRoster = this.updateStoreRoster.bind(this)
    console.log(this.props.roster.calenderReducer)
    this.state = ({
      daysOn:'1',
    })
  }

  updateStoreRoster(){
    console.log('usr on', this.state.daysOn)
    this.props.setRosterDaysOn(this.state.daysOn)
    // this.setState({ params }, this.performSearch)
  }

  render() {
    return (
      <View >
        <Text>Saved Rosters</Text>
      </View>
    );
  }

}

const styles = {
  continue_btn:{
    backgroundColor:'#1D7DE2',
    flex:1,
  },
  continue_btn_text:{
    textAlign:'center',
    color:'white',
    height: 60,
    justifyContent: 'center',
    fontSize:20,
    paddingTop: 15
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

export default connect(mapStateToProps, mapDispatchToProps)(SavedRosters);
