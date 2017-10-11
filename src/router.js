import React from 'react';
import { Scene, Router, Actions, Stack } from 'react-native-router-flux';
import Dashboard from './components/dashboard';
import Calender from './components/calender';
import RosterCreator from './components/rosterCreator';
import DaysOn from './components/daysOn';
import DaysOff from './components/daysOff';
import StartDate from './components/startDate';
import SavedRosters from './components/savedRosters';


const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root" >

        <Scene key="dash" component={Dashboard} title="Dashboard" />
        <Scene key="RosterCreator" component={RosterCreator} title="Create Roster"/>
        <Scene key="DaysOn" component={DaysOn} title="Days On"/>
        <Scene key="DaysOff" component={DaysOff} title="Days Off"/>
        <Scene key="StartDate" component={StartDate} title="Start Date"/>
        <Scene key="SavedRosters" component={SavedRosters} title="Saved Rosters"/>
        <Scene key="Calender" component={Calender} title="Calender"/>


      </Scene>
    </Router>
  );
};
const styles = {
  dashboardMain: {
    backgroundColor: 'lightblue',
  },
  dashtext:{
    fontSize:18,
    color: 'red'
  }
};

export default RouterComponent;
