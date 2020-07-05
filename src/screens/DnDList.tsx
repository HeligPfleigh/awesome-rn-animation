import React, {useState, useRef} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';

import {getRandomColor} from '../utils/getRandomColor';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 16,
  },
  pickItem: {
    backgroundColor: 'black',
    zIndex: 2,
    width: '100%',
  },
  list: {
    width: '100%',
  },
});

const DnDListItem = ({item, colorMap}: any) => (
  <View style={[styles.itemContainer, {backgroundColor: colorMap[item]}]}>
    <View>
      <Text style={{fontSize: 28}}>@</Text>
    </View>
    <Text style={{fontSize: 22, textAlign: 'center', flex: 1}}>{item}</Text>
  </View>
);

const DnDList = () => {
  const colorMapRef = useRef<any>({});
  const [dragging] = useState<boolean>(false);
  const [data] = useState<number[]>(
    Array.from(Array(200), (_, i) => {
      colorMapRef.current[i] = getRandomColor();
      return i;
    }),
  );
  const translation = {
    y: useSharedValue(0),
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      ctx.startY = translation.y.value;
    },
    onActive: (event, ctx) => {
      translation.y.value = ctx.startY + event.translationY;
    },
  });

  const stylez = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: translation.y.value,
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.pickItem, stylez]}>
          <DnDListItem item={3} colorMap={colorMapRef.current} />
        </Animated.View>
      </PanGestureHandler>
      <FlatList
        scrollEnabled={!dragging}
        style={styles.list}
        data={data}
        renderItem={({item}) => (
          <DnDListItem item={item} colorMap={colorMapRef.current} />
        )}
        keyExtractor={(item) => '' + item}
      />
    </View>
  );
};

export default DnDList;
