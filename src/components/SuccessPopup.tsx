import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, Image } from 'react-native';

type Props = {
  visible: boolean;
  onClose: () => void;
};

const SuccessPopup: React.FC<Props> = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <Image
            source={require('../assets/f9362360-dbd7-43bb-baa5-d8a11d5ebaeb.png')} // ✅ ảnh check xanh mới
            style={styles.icon}
          />
          <Text style={styles.title}>Successful!</Text>
          <Text style={styles.subtitle}>Your order is canceled!</Text>
        </View>
      </View>
    </Modal>
  );
};

export default SuccessPopup;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    backgroundColor: '#ffffff',
    paddingVertical: 32,
    paddingHorizontal: 24,
    borderRadius: 16,
    width: 280,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
  },
  icon: {
    width: 56,
    height: 56,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});
