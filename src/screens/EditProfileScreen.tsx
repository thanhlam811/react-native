import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ScrollView, Image } from 'react-native';
import CustomButton from '../components/CustomButton';
import { authApi } from '../api/api'; // bỏ `userApi` vì không dùng nữa

const EditProfileScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await authApi.getAccount();
        setFirstName(data.firstName || '');
        setLastName(data.lastName || '');
        setUsername(data.username || '');
        setEmail(data.email || '');
        setPhone(data.phoneNumber || '');
        setAvatar(data.avatar || '');
      } catch (error) {
        console.error('❌ Error fetching account:', error);
        Alert.alert('Error', 'Failed to load profile');
      }
    };

    loadProfile();
  }, []);

 const handleUpdate = async () => {
  try {
    const updatedUser = {
      firstName,
      lastName,
      phoneNumber: phone,
      avatar,
    };

    await authApi.updateAccount(updatedUser);

    Alert.alert('Success', 'Profile updated successfully!');
  } catch (error) {
    console.error('❌ Failed to update profile:', error);
    Alert.alert('Error', 'Failed to update profile. Please try again.');
  }
};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.avatarSection}>
        <Image
          source={{ uri: `http://10.0.2.2:8080/storage/upload/${avatar}`  || 'https://i.pravatar.cc/100' }}
          style={styles.avatar}
        />
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>First Name</Text>
        <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} />

        <Text style={styles.label}>Last Name</Text>
        <TextInput style={styles.input} value={lastName} onChangeText={setLastName} />

        <Text style={styles.label}>Username</Text>
        <TextInput style={styles.input} value={username} editable={false} />

        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} editable={false} />

        <Text style={styles.label}>Phone Number</Text>
       <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        keyboardType="numeric" // hoặc "phone-pad"
        maxLength={10} // tùy bạn muốn giới hạn độ dài hay không
      />

      </View>

      <View style={styles.buttonWrapper}>
        <CustomButton title="UPDATE" onPress={handleUpdate} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    marginTop: 10,
    marginBottom: 4,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    color: '#000',
  },
  buttonWrapper: {
    marginTop: 30,
    width: '100%',
  },
});

export default EditProfileScreen;
