import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.downloadButton} 
        onPress={() => navigation.navigate('CatGallery')}
      >
        <FontAwesome name="paw" size={18} color="white" style={{ marginRight: 10 }} />
        <Text style={styles.downloadButtonText}>Ver Gatinhos</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD6E7',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  downloadButton: {
    backgroundColor: '#FF6B9E',
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', 
    maxWidth: 300, 
  },
  downloadButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
});