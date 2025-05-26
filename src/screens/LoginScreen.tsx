import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/types';
import CustomButton from '../components/CustomButton';
import { authApi } from '../api/api';  

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('Validation Error', 'Username and password cannot be blank');
      return;
    }

    try {
      const userData = await authApi.login(username, password);
      console.log('Login success:', userData);

      // TODO: Lưu token hoặc user info (nếu cần)

      navigation.replace('HomeTabs');
    } catch (error: any) {
      console.error('Login failed:', error.response?.data?.message || error.message);

      Alert.alert('Login Failed', error.response?.data?.message || 'Email or password is incorrect');
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const handleSignUp = () => {
    navigation.navigate('Register');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
              <Text style={styles.title}>Welcome Back 👋</Text>
              <Text style={styles.description}>Sign in to your account</Text>

              <Text style={styles.label}>Username</Text>
              <TextInput
                placeholder="Enter your username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                style={styles.input}
              />

              <Text style={styles.label}>Password</Text>
              <TextInput
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
              />

              <TouchableOpacity style={styles.forgotWrapper} onPress={handleForgotPassword}>
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>

              <View style={styles.buttonWrapper}>
                <CustomButton title="SIGN IN" onPress={handleLogin} />
              </View>

              <View style={styles.signupWrapper}>
                <Text style={styles.signupText}>
                  Don’t have an account?{' '}
                  <Text style={styles.signupLink} onPress={handleSignUp}>
                    Sign Up
                  </Text>
                </Text>
              </View>

              <View style={styles.dividerWrapper}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>Or with</Text>
                <View style={styles.dividerLine} />
              </View>

              <TouchableOpacity
                style={styles.googleButton}
                onPress={() => console.log('Google Sign-In')}
              >
                <FontAwesome name="google" size={20} color="#d42a1b" style={styles.googleIcon} />
                <Text style={styles.googleText}>Continue with Google</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  container: {
    width: '100%',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: '500',
  },
  description: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 30,
    color: '#a6a6a6',
  },
  label: {
    fontSize: 14,
    color: 'black',
    marginBottom: 6,
    marginTop: 10,
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
    marginBottom: 10,
  },
  forgotWrapper: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  forgotText: {
    color: '#d42a1b',
    fontWeight: 'bold',
  },
  buttonWrapper: {
    width: '100%',
    marginTop: 8,
  },
  signupWrapper: {
    marginTop: 16,
    alignItems: 'center',
  },
  signupText: {
    fontSize: 14,
    color: '#333',
  },
  signupLink: {
    color: '#d42a1b',
    fontWeight: 'bold',
  },
  dividerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  dividerText: {
    marginHorizontal: 12,
    color: '#999',
    fontSize: 14,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 16,
  },
  googleIcon: {
    marginRight: 8,
  },
  googleText: {
    fontSize: 16,
    color: '#000',
  },
});
