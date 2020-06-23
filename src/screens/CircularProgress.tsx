import React from 'react';
import {View, StyleSheet} from 'react-native';
import Animated, {
  Easing,
  Clock,
  Value,
  block,
  cond,
  clockRunning,
  set,
  startClock,
  timing,
  // debug,
  stopClock,
  not,
} from 'react-native-reanimated';

import CircularProgress from '../components/CircularProgressSVG';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

function runTiming(clock: Clock, value: number, dest: number) {
  const state: Animated.TimingState = {
    finished: new Value(0),
    position: new Value(value),
    time: new Value(0),
    frameTime: new Value(0),
  };

  const config = {
    duration: 10 * 1000,
    toValue: new Value(0),
    easing: Easing.linear,
  };

  return block([
    cond(not(clockRunning(clock)), [
      set(config.toValue, dest),
      set(state.frameTime, 0),
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      startClock(clock),
    ]),
    // we run the step here that is going to update position
    timing(clock, state, config),
    // if the animation is over we stop the clock
    cond(state.finished, stopClock(clock)),
    // loop
    // cond(state.finished, [
    //   set(state.finished, 0),
    //   set(state.frameTime, 0),
    //   set(state.finished, 0),
    //   set(state.time, 0),
    //   set(state.position, value),
    // ]),
    // we made the block return the updated position
    state.position,
  ]);
}

export default function CircularProgressScreen() {
  const clock = new Clock();
  const progress = runTiming(clock, 0, 1);
  return (
    <View style={styles.container}>
      <CircularProgress progress={progress} />
    </View>
  );
}
