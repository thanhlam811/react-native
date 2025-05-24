import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RectButton, Swipeable } from 'react-native-gesture-handler';

const initialNotifications = [
  { id: '1', title: 'Welcome!', message: 'Thanks for joining our app.' },
  { id: '2', title: 'Update Available', message: 'A new version is ready to install.' },
  { id: '3', title: 'Reminder', message: 'Don’t forget to complete your profile.' },
];

export default function NotificationScreen() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
  };

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>,
    itemId: string
  ) => {    
  return (
      <RectButton style={styles.deleteButton} onPress={() => handleDelete(itemId)}>
        <Icon name="delete" size={24} color="#fff" />
      </RectButton>
    );
  };

  const renderItem = ({ item }: any) => (
    <Swipeable renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, item.id)}>
      <View style={styles.notificationItem}>
        <Icon name="notifications" size={24} color="#007aff" style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.message}>{item.message}</Text>
        </View>
      </View>
    </Swipeable>
  );

  return (
    <View style={styles.container}>
      {notifications.length > 0 ? (
        <FlatList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Icon name="notifications-off" size={64} color="#ccc" />
          <Text style={styles.emptyTitle}>No Notifications</Text>
          <Text style={styles.emptyMessage}>
            We’ll let you know when there will be something to update you.
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 24,
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
  deleteButton: {
    backgroundColor: '#ff3b30',
    justifyContent: 'center',
    alignItems: 'center',
    width: 64,
    borderRadius: 8,
    marginBottom: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
  },
  emptyMessage: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 6,
  },
});
