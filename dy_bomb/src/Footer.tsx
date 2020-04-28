import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import Popup from './Popup';


export default function Footer() {

    return (
        <View>
            <Popup />
            <Popup />
        </View>
    )

}

const styles = StyleSheet.create({
  buttonGroup: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
