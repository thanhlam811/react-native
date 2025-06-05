import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function SettingScreen() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(true);

  const handleLogout = () => {
    Alert.alert('Logged out', 'You have been logged out!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      {/* Dark Mode Toggle */}
      <View style={styles.settingItem}>
        <View style={styles.labelContainer}>
          <Icon name="dark-mode" size={20} color="#333" />
          <Text style={styles.label}>Dark Mode</Text>
        </View>
        <Switch
          value={isDarkMode}
          onValueChange={(value) => setIsDarkMode(value)}
        />
      </View>

      {/* Notification Toggle */}
      <View style={styles.settingItem}>
        <View style={styles.labelContainer}>
          <Icon name="notifications" size={20} color="#333" />
          <Text style={styles.label}>Notifications</Text>
        </View>
        <Switch
          value={isNotificationEnabled}
          onValueChange={(value) => setIsNotificationEnabled(value)}
        />
      </View>

      {/* Logout Button */}
      {/* <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Icon name="logout" size={20} color="#fff" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    alignSelf: 'center',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    fontSize: 16,
    marginLeft: 8,
  },
  logoutButton: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff4444',
    paddingVertical: 12,
    borderRadius: 8,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
