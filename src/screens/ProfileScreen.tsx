import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import Popup from '../components/Popup'; // 🟢 Thêm dòng này

// Giả sử bạn có api logout
import { authApi } from '../api/api'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../contexts/AuthContext'; // 🔥 import context

const ProfileScreen = () => {
  const { logout } = useAuth();

  const navigation = useNavigation<any>();
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const showPopup = (message: string) => {
  setPopupMessage(message);
  setPopupVisible(true);
  setTimeout(() => setPopupVisible(false), 2000);
};

  const handleLogout = async () => {
    try {
      await authApi.logout(); // Gọi API nếu có xử lý backend
      logout(); // Xóa token khỏi AsyncStorage, xóa header
      showPopup('Logged out successfully');
      navigation.reset({
      index: 0,
      routes: [{ name: 'Auth' }],
    });
    } catch (error) {
      showPopup('Logout failed');
      console.error('Logout error:', error);
    }
  };


  const handleNavigate = (label: string) => {
    switch (label) {
      case 'Edit Profile':
        navigation.navigate('EditProfile');
        break;
      case 'Setting':
        navigation.navigate('Setting');
        break;
      case 'Contact':
        navigation.navigate('Contact');
        break;
      case 'Log Out':
        handleLogout();
        break;
    }
  };

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

      <View style={styles.statusRow}>
        {[
          { label: 'To Confirm', icon: 'access-time', tabIndex: 0 },
          { label: 'To Ship', icon: 'local-shipping', tabIndex: 1 },
          { label: 'To Receive', icon: 'inventory', tabIndex: 2 },
          { label: 'Rating', icon: 'star-rate', tabIndex: 3 },
        ].map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.statusItem}
            onPress={() =>
              navigation.navigate('MyOrders', { tabIndex: item.tabIndex })
            }
          >
            <Icon name={item.icon} size={28} color="#333" />
            <Text style={styles.statusLabel}>{item.label}</Text>
          </TouchableOpacity>
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
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => handleNavigate(item.label)}
          >
            <View style={styles.menuLeft}>
              <Icon
                name={item.icon}
                size={22}
                color="#444"
                style={styles.menuIcon}
              />
              <Text style={styles.menuText}>{item.label}</Text>
            </View>
            <Icon name="keyboard-arrow-right" size={24} color="#888" />
          </TouchableOpacity>
        ))}
      </View>
        <Popup
          visible={popupVisible}
          message={popupMessage}
          onClose={() => setPopupVisible(false)}
        />
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
