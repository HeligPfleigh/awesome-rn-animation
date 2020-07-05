import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import 'react-native-gesture-handler';

const Drawer = createDrawerNavigator<RootParamsList>();

import {RootParamsList} from './navigation/types';
import {NavigatorMap} from './navigation/NavigatorMap';
import CircularProgress from './screens/CircularProgress';
import DnDList from './screens/DnDList';
import DragAndSnap from './screens/DragAndSnap';
import Ripple from './screens/Ripple';

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName={NavigatorMap.Ripple}>
        <Drawer.Screen
          name={NavigatorMap.CircularProgress}
          component={CircularProgress}
        />
        <Drawer.Screen
          name={NavigatorMap.DragAndSnap}
          component={DragAndSnap}
        />
        <Drawer.Screen name={NavigatorMap.DnDList} component={DnDList} />
        <Drawer.Screen name={NavigatorMap.Ripple} component={Ripple} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
