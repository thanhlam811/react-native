import React, { useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useRoute,RouteProp  } from '@react-navigation/native'; // ✅ thêm dòng này
import { ScrollView } from 'react-native';
import OrderCard from './OrderCard';
import ToConfirm from './ToConfirm';
import ToShip from './ToShip';
import ToReceive from './ToReceive';
import Rating from './Rating';


const renderScene = SceneMap({
  confirm: ToConfirm,
  ship: ToShip,
  receive: ToReceive,
  rating: Rating,
});

type MyOrdersRouteParams = {
  tabIndex?: number;
};


const MyOrdersScreen = () => {
  const layout = useWindowDimensions();
    const route = useRoute<RouteProp<{ params: MyOrdersRouteParams }, 'params'>>();
    const initialTab = route.params?.tabIndex ?? 0;

  const [index, setIndex] = useState(initialTab); // ✅ dùng tabIndex làm giá trị ban đầu
  const [routes] = useState([
    { key: 'confirm', title: 'To Confirm' },
    { key: 'ship', title: 'To Ship' },
    { key: 'receive', title: 'To Receive' },
    { key: 'rating', title: 'Rating' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={props => (
        <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: 'red', height: 2 }}
          style={{ backgroundColor: 'white' }}
          activeColor="black"
          inactiveColor="gray"
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MyOrdersScreen;
