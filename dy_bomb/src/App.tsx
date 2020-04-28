import React from 'react';
import { StyleSheet, View } from 'react-native';
import Bomb from './Bomb';
import Footer from './Footer';

export default function App() {
  return (
    <View style={styles.container}>
      <Bomb n_button={10} n_bomb={3}/>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
