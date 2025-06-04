import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/types';
import CustomButton from '../components/CustomButton';
import Icon from 'react-native-vector-icons/Ionicons';
import { authApi } from '../api/api'; // nhớ import đúng đường dẫn
import { showToast } from '../utils/toast'; // hàm hiển thị toast

type Props = NativeStackScreenProps<AuthStackParamList, 'SetNewPassword'>;

const SetNewPasswordScreen: React.FC<Props> = ({ navigation, route }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Nhận email và otp từ route params (nếu cần)
  const { email } = route.params as { email: string};

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSetNewPassword = async () => {
    if (!newPassword || !confirmPassword) {
      showToast('Vui lòng nhập đầy đủ mật khẩu');
      return;
    }

    if (newPassword !== confirmPassword) {
      showToast('Mật khẩu xác nhận không khớp');
      return;
    }

    // Ví dụ thêm validate password mạnh (có thể bổ sung thêm)
    if (newPassword.length < 6) {
      showToast('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    try {
      setLoading(true);
      await authApi.changeForgotPassword(email, newPassword);
      setLoading(false);

      Alert.alert(
        'Thành công',
        'Mật khẩu của bạn đã được thay đổi. Vui lòng đăng nhập lại.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login'),
          },
        ]
      );
    } catch (error: any) {
      setLoading(false);
      const msg =
        error.response?.data?.message ||
        'Đổi mật khẩu thất bại. Vui lòng thử lại.';
      showToast(msg);
      console.log(msg);
      
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <Icon name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>

            <Text style={styles.title}>Set New Password</Text>
            <Text style={styles.description}>
              Create a new password. Ensure it differs from previous ones for
              security
            </Text>

            <Text style={styles.label}>New Password</Text>
            <TextInput
              style={styles.input}
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="Enter new password"
              secureTextEntry
              autoCapitalize="none"
            />

            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm new password"
              secureTextEntry
              autoCapitalize="none"
            />

            <View style={styles.buttonWrapper}>
              <CustomButton
                title={loading ? 'Loading...' : 'SET NEW PASSWORD'}
                onPress={handleSetNewPassword}
                disabled={loading}
              />
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SetNewPasswordScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    padding: 16,
    backgroundColor: 'white',
  },
  container: {
    width: '100%',
    marginTop: 40,
  },
  backButton: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#a6a6a6',
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    color: 'black',
    marginBottom: 6,
    fontWeight: '600',
  },
  input: {
    width: '100%',
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  buttonWrapper: {
    marginTop: 8,
  },
});
