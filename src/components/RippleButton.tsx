import React, {ReactElement, Children, useState} from 'react';
import {View, ViewProps, StyleSheet, LayoutChangeEvent} from 'react-native';
import {TapGestureHandler, State} from 'react-native-gesture-handler';
import {
  useTapGestureHandler,
  translate,
  vec,
  withTransition,
  mix,
} from 'react-native-redash';
import Animated, {
  eq,
  or,
  greaterThan,
  diff,
  useCode,
  onChange,
  cond,
  call,
} from 'react-native-reanimated';
import Color from 'color';

interface IRippleButton {
  children: ReactElement<ViewProps>;
  color: string;
  onPress?: () => void;
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
});

export default function RippleButton({
  children,
  color,
  onPress,
}: IRippleButton) {
  const [radius, setRadius] = useState(-1);

  const child = Children.only(children);
  const {gestureHandler, state, position} = useTapGestureHandler();

  const _onLayout = ({
    nativeEvent: {
      layout: {width, height},
    },
  }: LayoutChangeEvent) => {
    setRadius(Math.sqrt(width ** 2 + height ** 2));
  };

  const progress = withTransition(eq(state, State.BEGAN));
  const scale = mix(progress, 0.001, 1);

  // check if the ripple is going upscale or it in fullscale
  const opacity = or(greaterThan(diff(progress), 0), eq(progress, 1));

  // call onPress after stopping tap gesture
  useCode(
    () => [
      onChange(
        state,
        cond(eq(state, State.END), [call([], onPress || (() => null))]),
      ),
    ],
    [onPress],
  );

  const backgroundColor = Color(color).lighten(0.2).toString();

  return (
    <TapGestureHandler {...gestureHandler}>
      <Animated.View {...child.props}>
        <View
          style={[styles.container, {backgroundColor: color}]}
          onLayout={_onLayout}>
          {radius !== -1 && (
            <Animated.View
              style={{
                opacity,
                backgroundColor,
                borderRadius: radius,
                width: radius * 2,
                height: radius * 2,
                transform: [
                  ...translate(vec.create(-radius)),
                  ...translate(position),
                  {scale},
                ],
              }}
            />
          )}
        </View>
        {children}
      </Animated.View>
    </TapGestureHandler>
  );
}
