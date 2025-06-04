import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/types';
import CustomButton from '../components/CustomButton';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';
import { authApi } from '../api/api';
import { showToast } from '../utils/toast';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<AuthStackParamList, 'EnterCode'>;

const EnterCodeScreen: React.FC<Props> = ({ navigation }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputs = useRef<Array<TextInput | null>>([]);
  const route = useRoute();
  const { email } = route.params as { email: string };

  const handleChange = (text: string, index: number) => {
    if (/^\d$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);
      if (index < 5) {
        inputs.current[index + 1]?.focus();
      }
    } else if (text === '') {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
    }
  };

  const handleVerify = async () => {
    const fullCode = otp.join('');
    if (fullCode.length === 6) {
      try {
        await authApi.verifyOtp(email, fullCode);
        navigation.navigate('SetNewPassword', { email });
      } catch (err: any) {
        const msg = err.response?.data?.message || 'OTP không hợp lệ hoặc đã hết hạn';
        showToast(msg);
      }
    } else {
      showToast('Vui lòng nhập đủ 6 chữ số OTP');
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

 
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
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

              <Text style={styles.title}>Check your email</Text>
              <Text style={styles.description}>
                We sent a reset link to {email}
                {'\n'}Enter the digit code mentioned in the email
              </Text>

              <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={(ref) => (inputs.current[index] = ref)}
                    style={styles.otpInput}
                    keyboardType="number-pad"
                    maxLength={1}
                    value={digit}
                    onChangeText={(text) => handleChange(text, index)}
                    onKeyPress={({ nativeEvent }) => {
                      if (
                        nativeEvent.key === 'Backspace' &&
                        otp[index] === '' &&
                        index > 0
                      ) {
                        inputs.current[index - 1]?.focus();
                      }
                    }}
                  />
                ))}
              </View>

              <View style={styles.buttonWrapper}>
                <CustomButton title="VERIFY CODE" onPress={handleVerify} />
              </View>

              <TouchableOpacity style={{ marginTop: 20 }}>
                <Text style={styles.resendText}>
                  Haven’t got the email yet?{' '}
                  <Text style={styles.resendLink}>Resend email</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default EnterCodeScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  backButton: {
    marginTop: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 40,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 18,
  },
  buttonWrapper: {
    paddingHorizontal: 20,
  },
  resendText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#444',
  },
  resendLink: {
    color: '#007bff',
    fontWeight: 'bold',
  },
});
