import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/types';
import CustomButton from '../components/CustomButton';

type Props = NativeStackScreenProps<AuthStackParamList, 'Intro'>;

const IntroScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/intro.png')} style={styles.logo} />
      <Text style={styles.title}>Your personal library in your pocket</Text>
      <Text style={styles.description}>It is a long established fact that a reader will be distracted by the readable content.</Text>
      <CustomButton
        title="Next"
        onPress={() => navigation.navigate('Login')}
        />

    </View>
  );
};

export default IntroScreen;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20 // Cung cấp khoảng cách padding để tránh quá sát các cạnh
  },
  logo: { 
    width: 240, 
    height: 240, 
    marginBottom: 30,  // Khoảng cách giữa logo và tiêu đề
  },
  title: { 
    fontSize: 24, 
    marginBottom: 20, 
    fontWeight: '500',
    textAlign: 'center',  // Căn giữa văn bản
  },
  description: {
    fontSize: 16, 
    marginTop: 10,
    marginBottom:60,
    textAlign: 'center',  // Đảm bảo văn bản được căn giữa
  },
  buttonStyle: {
    marginTop: 0, 

  }
});
