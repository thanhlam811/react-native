import 'react-native-gesture-handler';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import AuthStackNavigator from './src/navigation/AuthStackNavigator';
// hoặc nếu sau này đăng nhập xong thì chuyển sang BottomTabsNavigator
import BottomTabsNavigator from './src/navigation/BottomTabsNavigator';
import RootNavigator from './src/navigation/RootStack';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
          <RootNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
