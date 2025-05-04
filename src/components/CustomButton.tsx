import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type Props = {
  title: string;
  onPress: () => void;
};

const CustomButton: React.FC<Props> = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#d42b1c',     // Màu nền mặc định (xanh lá)
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,   
    width:"100%"               // Khoảng cách phía trên
  },
  buttonText: {
    color: '#fff',                  // Màu chữ trắng
    fontSize: 18,                   // Kích thước chữ
    fontWeight: '600',
  },
});

export default CustomButton;
