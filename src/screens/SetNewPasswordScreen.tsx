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
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/types';
import CustomButton from '../components/CustomButton';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = NativeStackScreenProps<AuthStackParamList, 'SetNewPassword'>;

const SetNewPasswordScreen: React.FC<Props> = ({ navigation }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSetNewPassword = () => {
    if (newPassword === confirmPassword) {
      navigation.navigate('Login');
    } else {
      alert('Passwords do not match!');
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
            <Text style={styles.description}>Create a new password. Ensure it differs from
            previous ones for security</Text>

            <Text style={styles.label}>New Password</Text>
            <TextInput
              style={styles.input}
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="Enter new password"
              secureTextEntry
            />

            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm new password"
              secureTextEntry
            />

            <View style={styles.buttonWrapper}>
              <CustomButton title="SET NEW PASSWORD" onPress={handleSetNewPassword} />
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
