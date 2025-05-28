// components/Popup.tsx
import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';

type PopupProps = {
  visible: boolean;
  onClose: () => void;
  message: string;
  type?: 'error' | 'success';
};

const Popup: React.FC<PopupProps> = ({ visible, onClose, message, type = 'error' }) => {
  const bgColor = type === 'error' ? '#f8d7da' : '#d4edda';
  const textColor = type === 'error' ? '#721c24' : '#155724';

  return (
    <Modal animationType="fade" transparent visible={visible}>
      <View style={styles.overlay}>
        <View style={[styles.popup, { backgroundColor: bgColor }]}>
          <Text style={[styles.message, { color: textColor }]}>{message}</Text>
          <TouchableOpacity onPress={onClose} style={styles.button}>
            <Text style={{ color: '#007bff', fontWeight: '600' }}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default Popup;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  popup: {
    width: '80%',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 4,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 12,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
});
