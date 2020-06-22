import React, {useState, useEffect} from 'react';
import {View, StyleSheet, LayoutChangeEvent} from 'react-native';
import Svg, {Circle, Defs, LinearGradient, Stop} from 'react-native-svg';
import Animated, {interpolateNode, multiply} from 'react-native-reanimated';

interface CircularProgressProps {
  progress: Animated.Node<number>;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function CircularProgress({progress}: CircularProgressProps) {
  const [layoutWidth, setWidth] = useState(0);
  const [layoutHeight, setHeight] = useState(0);
  const [strokeWidth, setStrokeWidth] = useState(0);

  const handleLayoutChange = ({
    nativeEvent: {
      layout: {width, height},
    },
  }: LayoutChangeEvent) => {
    setWidth(width);
    setHeight(height);
  };

  useEffect(() => {
    const size = Math.min(layoutHeight, layoutWidth);
    setStrokeWidth(size * 0.2);
  }, [layoutWidth, layoutHeight]);

  const size = Math.min(layoutHeight, layoutWidth);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  const alpha = interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [0, Math.PI * 2],
  });
  const strokeDashoffset = multiply(alpha, radius);
  const cx = size / 2;
  const cy = size / 2;
  const r = radius;
  return (
    <View style={styles.root} onLayout={handleLayoutChange}>
      <Svg width={size} height={size}>
        <Defs>
          <LinearGradient id="grad" x1="0" y1="0" x2="100%" y2="0">
            <Stop offset="0" stopColor="#FF416C" />
            <Stop offset="1" stopColor="#FF4B2B" />
          </LinearGradient>
        </Defs>
        <Circle
          stroke="rgba(255, 255, 255, 0.2)"
          fill="none"
          {...{strokeWidth, cx, cy, r}}
        />
        <AnimatedCircle
          stroke="url(#grad)"
          fill="none"
          strokeDasharray={`${circumference}, ${circumference}`}
          {...{strokeWidth, strokeDashoffset, cx, cy, r}}
        />
      </Svg>
    </View>
  );
}
