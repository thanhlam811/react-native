import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function ContactScreen() {
  const handlePress = (type: string) => {
    switch (type) {
      case 'phone':
        Linking.openURL('tel:0123456789');
        break;
      case 'email':
        Linking.openURL('mailto:support@example.com');
        break;
      case 'location':
        Linking.openURL('https://www.google.com/maps?q=Your+Company+Location');
        break;
    }
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Contact Us</Text> */}

      <TouchableOpacity style={styles.item} onPress={() => handlePress('phone')}>
        <Icon name="phone" size={24} color="#007aff" />
        <Text style={styles.text}>0123 456 789</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={() => handlePress('email')}>
        <Icon name="email" size={24} color="#007aff" />
        <Text style={styles.text}>support@example.com</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={() => handlePress('location')}>
        <Icon name="location-on" size={24} color="#007aff" />
        <Text style={styles.text}>123 Street, District 1, HCM</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 30,
    textAlign: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
});
