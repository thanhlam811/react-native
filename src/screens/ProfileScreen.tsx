import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Avatar và Tên */}
      <View style={styles.avatarSection}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/100' }}
          style={styles.avatar}
        />
        <Text style={styles.username}>John Doe</Text>
      </View>

      {/* 4 mục hàng ngang */}
      <View style={styles.statusRow}>
        {[
          { label: 'To Confirm', icon: 'access-time' },
          { label: 'To Ship', icon: 'local-shipping' },
          { label: 'To Receive', icon: 'inventory' },
          { label: 'Rating', icon: 'star-rate' },
        ].map((item, index) => (
          <View key={index} style={styles.statusItem}>
            <Icon name={item.icon} size={28} color="#333" />
            <Text style={styles.statusLabel}>{item.label}</Text>
          </View>
        ))}
      </View>

      {/* 4 mục dọc có icon trái và mũi tên phải */}
      <View style={styles.menu}>
        {[
          { label: 'Edit Profile', icon: 'edit' },
          { label: 'Setting', icon: 'settings' },
          { label: 'Contact', icon: 'support-agent' },
          { label: 'Log Out', icon: 'logout' },
        ].map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <Icon name={item.icon} size={22} color="#444" style={styles.menuIcon} />
              <Text style={styles.menuText}>{item.label}</Text>
            </View>
            <Icon name="keyboard-arrow-right" size={24} color="#888" />
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  avatarSection: {
    alignItems: 'center',
    marginTop: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  username: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: 'bold',
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 30,
  },
  statusItem: {
    alignItems: 'center',
  },
  statusLabel: {
    marginTop: 5,
    fontSize: 12,
  },
  menu: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 15,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    marginRight: 15,
  },
  menuText: {
    fontSize: 16,
  },
});

export default ProfileScreen;
