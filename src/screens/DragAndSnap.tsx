import React from 'react';
import {View, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    margin: 50,
  },
  square: {
    width: 40,
    height: 40,
  },
});

export default function DragAndSnap() {
  const translation = {
    x: useSharedValue(0),
    y: useSharedValue(0),
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      ctx.startX = translation.x.value;
      ctx.startY = translation.y.value;
    },
    onActive: (event, ctx) => {
      translation.x.value = ctx.startX + event.translationX;
      translation.y.value = ctx.startY + event.translationY;
    },
    onEnd: (event, ctx) => {
      translation.x.value = withSpring(0);
      translation.y.value = withSpring(0);
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    const H = Math.round(
      interpolate(translation.x.value, [0, 300], [0, 360], 'clamp'),
    );
    const S = Math.round(
      interpolate(translation.y.value, [0, 500], [100, 50], 'clamp'),
    );
    const backgroundColor = `hsl(${H},${S}%,50%)`;
    return {
      transform: [
        {
          translateX: translation.x.value,
        },
        {
          translateY: translation.y.value,
        },
      ],
      backgroundColor,
    };
  });

  return (
    <View style={styles.root}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.square, animatedStyle]} />
      </PanGestureHandler>
    </View>
  );
}
