import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabsNavigator from './BottomTabsNavigator';
import EditProfile from '../screens/EditProfileScreen';
import Setting from '../screens/SettingScreen';
import Contact from '../screens/ContactScreen';
import Payment from '../screens/PaymentScreen';
import Notification from '../screens/NotificationScreen';
import Filter from '../screens/FilterScreen';
import BookDetail from '../screens/BookDetailScreen';
import MyOrders from '../screens/MyOrderScreen';
import Search from '../screens/SearchScreen';
import AuthStackNavigator from './AuthStackNavigator';
import { useAuth } from '../contexts/AuthContext';
// import MyOrder from '../screens/MyOrderScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { isLoggedIn } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <>
          <Stack.Screen name="Main" component={BottomTabsNavigator} />        
          <Stack.Screen name="BookDetail" component={BookDetail} />
          
          <Stack.Screen name="MyOrders" component={MyOrders} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="Setting" component={Setting} />
          <Stack.Screen name="Contact" component={Contact} />
          <Stack.Screen name="Payment" component={Payment} />
          <Stack.Screen name="Notification" component={Notification} />
          <Stack.Screen name="Filter" component={Filter} />
          <Stack.Screen name="Search" component={Search} />
        </>
      ) : (
        <>
          <Stack.Screen name="Auth" component={AuthStackNavigator} />
        </>
      )}
    </Stack.Navigator>
  );
}
