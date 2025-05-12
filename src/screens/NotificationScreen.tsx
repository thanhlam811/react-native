import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const notifications = [
  { id: '1', title: 'Welcome!', message: 'Thanks for joining our app.' },
  { id: '2', title: 'Update Available', message: 'A new version is ready to install.' },
  { id: '3', title: 'Reminder', message: 'Don’t forget to complete your profile.' },
];

export default function NotificationScreen() {
  const renderItem = ({ item }: any) => (
    <View style={styles.notificationItem}>
      <Icon name="notifications" size={24} color="#007aff" style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.message}>{item.message}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 24,
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  notificationItem: {
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  icon: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
  },
  message: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
  },
});
