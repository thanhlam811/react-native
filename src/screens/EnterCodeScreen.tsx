import React, { useState } from 'react';
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

type Props = NativeStackScreenProps<AuthStackParamList, 'EnterCode'>;

const EnterCodeScreen: React.FC<Props> = ({ navigation }) => {
  const [code, setCode] = useState('');

  const handleVerify = () => {
    navigation.navigate('SetNewPassword');
  };

  const handleBack = () => {
    navigation.goBack();
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

            <Text style={styles.title}>Check your email</Text>
            <Text style={styles.description}>
              We sent a reset link to abc@gmail.com{'\n'}
              Enter digit code that mentioned in the email
            </Text>

            <Text style={styles.label}>Verification Code</Text>
            <TextInput
              placeholder="Enter code"
              value={code}
              onChangeText={setCode}
              keyboardType="number-pad"
              style={styles.input}
            />

            <View style={styles.buttonWrapper}>
              <CustomButton title="VERIFY CODE" onPress={handleVerify} />
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default EnterCodeScreen;

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
    marginBottom: 20,
  },
  buttonWrapper: {
    width: '100%',
    marginTop: 8,
  },
});
