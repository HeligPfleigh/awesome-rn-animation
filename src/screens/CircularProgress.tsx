import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Easing, Clock} from 'react-native-reanimated';
import {timing} from 'react-native-redash';

import CircularProgress from '../components/CircularProgressSVG';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default function CircularProgressScreen() {
  const clock = new Clock();
  const config = {
    duration: 10 * 1000,
    toValue: 1,
    easing: Easing.linear,
  };
  return (
    <View style={styles.container}>
      <CircularProgress progress={timing({clock, ...config})} />
    </View>
  );
}
