import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';

const Stack = createStackNavigator<RootParamsList>();

import {RootParamsList} from './navigation/types';
import {NavigatorMap} from './navigation/NavigatorMap';
import CircularProgress from './screens/CircularProgress';

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen
          name={NavigatorMap.CircularProgress}
          component={CircularProgress}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
