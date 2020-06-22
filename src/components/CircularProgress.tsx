import React from 'react';
import {Dimensions} from 'react-native';
import Svg, {Circle} from 'react-native-svg';
import Animated, {interpolateNode, multiply} from 'react-native-reanimated';

const {width} = Dimensions.get('window');
const size = width - 32;
const strokeWidth = 50;
const radius = (size - strokeWidth) / 2;
const circumference = radius * 2 * Math.PI;

interface CircularProgressProps {
  progress: Animated.Node<number>;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function CircularProgress({progress}: CircularProgressProps) {
  const alpha = interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [0, Math.PI * 2],
  });
  const strokeDashoffset = multiply(alpha, radius);
  return (
    <Svg width={size} height={size}>
      <AnimatedCircle
        stroke="red"
        fill="none"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeDasharray={`${circumference}, ${circumference}`}
        {...{strokeWidth, strokeDashoffset}}
      />
    </Svg>
  );
}
