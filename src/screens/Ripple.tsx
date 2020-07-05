import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import RippleButton from '../components/RippleButton';
import {getRandomColor} from '../utils/getRandomColor';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  touchable: {
    margin: 16,
    width: '100%',
    // height: 400,
    // borderColor: 'black',
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: '400',
    marginLeft: 16,
    color: 'white',
  },
});

export default function Ripple() {
  const [color, setColor] = useState('red');
  const handlePress = () => {
    setColor(getRandomColor());
  };
  return (
    <View style={styles.container}>
      <RippleButton color={color} onPress={handlePress}>
        <View style={styles.touchable}>
          <Text style={[styles.text]}>Ripple Effect</Text>
        </View>
      </RippleButton>
      <RippleButton color="#DC034E">
        <View style={styles.touchable}>
          <Text style={styles.text}>Send</Text>
        </View>
      </RippleButton>
    </View>
  );
}
