import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
// import { Actions } from 'react-native-router-flux';
// import { CardSection } from './common';

class Dashboard extends Component {

  render() {
    return (
      <View style={styles.dashboardMain}>

        <View style={styles.dash_main}>
          <TouchableOpacity onPress={Actions.DaysOn}
            style={styles.continue_btn}>
            <Text style={styles.continue_btn_text}_text>Create a new roster</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.nav_bottom}>
          <TouchableOpacity
            style={styles.nav_btns}
            onPress={Actions.SavedRosters}
            >
            <Text style={styles.nav_btns_text}>Saved</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.nav_btns}>
            <Text> </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.nav_btns}>
            <Text> </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

}

const styles = {
  dashboardMain: {
    backgroundColor: '#f7f7f7',
    flex: 1,
    justifyContent: 'center',
  },
  nav_bottom:{
    flex:1,
    flexDirection:'row',
    backgroundColor: '#1D7DE2',
  },
  dash_main:{
    flex:10,
  },
  nav_btns:{
    flex:1,
    justifyContent: 'center',
  },
  dashtext:{
    fontSize:18,
    color: 'red'
  },
  continue_btn:{
    backgroundColor: '#1D7DE2',
    height: 60,
    borderRadius:10,
    // width: 300,
    paddingTop: 15,
    // flex:1,
    margin: 20
  },
  continue_btn_text:{
    textAlign:'center',
    color:'white',
    justifyContent: 'center',
    fontSize:20,

  },
  nav_btns_text:{
    textAlign:'center',
    fontSize:15,
    color:'white'
  }
};

export default Dashboard;
