import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabsNavigator from './BottomTabsNavigator';
import EditProfile from '../screens/EditProfileScreen';
import Setting from '../screens/SettingScreen';
import Contact from '../screens/ContactScreen';
import Payment from '../screens/PaymentScreen';


const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={BottomTabsNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="Contact" component={Contact} />
      <Stack.Screen name="Payment" component={Payment} />
 
    </Stack.Navigator>
  );
}
