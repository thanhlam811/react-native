import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';  // Import SafeAreaView
import CustomButton from '../components/CustomButton'; // If you have the CustomButton component
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);

  const handleRegister = () => {
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);
  };

  const togglePasswordVisibility = () => {
    setSecureText(!secureText);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
              <Text style={styles.title}>Sign Up</Text>
              <Text style={styles.description}>
                Create account and choose your favorite book
              </Text>

              {/* Name Input */}
              <Text style={styles.label}>Name</Text>
              <TextInput
                placeholder="Enter your name"
                value={name}
                onChangeText={setName}
                style={styles.input}
              />

              {/* Email Input */}
              <Text style={styles.label}>Email</Text>
              <TextInput
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
              />

              {/* Password Input */}
              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordWrapper}>
                <TextInput
                  placeholder="Enter your password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={secureText}
                  style={styles.input}
                />
                <TouchableOpacity onPress={togglePasswordVisibility}>
                  <FontAwesome
                    name={secureText ? 'eye-slash' : 'eye'}
                    size={20}
                    color="#ccc"
                    style={styles.eyeIcon}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.buttonWrapper}>
                <CustomButton title="SIGN UP" onPress={handleRegister} />
              </View>

              <View style={styles.signupWrapper}>
                <Text style={styles.signupText}>
                  Already have an account?{' '}
                  <Text style={styles.signupLink} onPress={() => navigation.navigate('Login')}>
                    Sign In
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

export default RegisterScreen;

const styles = StyleSheet.create({
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
  passwordWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: [{ translateY: -45 }],
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
