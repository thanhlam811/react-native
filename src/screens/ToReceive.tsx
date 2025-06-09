import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getOrderbyUserIdDELIVERED,getOrderDetailsByOrderId } from '../api/api'; // chỉnh lại path cho đúng
import { useNavigation } from '@react-navigation/native';
const ToReceive = () => {
const [orders, setOrders] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);
 const navigation = useNavigation<any>();

  const fetchOrders = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) return;

      const orderList = await getOrderbyUserIdDELIVERED(Number(userId));
      setOrders(orderList);
    } catch (error) {
      console.error('Lỗi khi load đơn hàng:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const renderOrder = ({ item }: any) => (
  <View style={styles.orderContainer}>
    <Text style={styles.orderId}>Order ID: {item.orderId}</Text>

    {item.details.map((detail: any, index: number) => (
      <View style={styles.card} key={index}>
        <Image source={{ uri: `http://10.0.2.2:8080/storage/upload/${detail.book.image}`  }} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.title}>{detail.book.title}</Text>
          <Text style={styles.price}>{detail.book?.sellingPrice?.toLocaleString()} đ</Text>
          <Text style={styles.quantity}>Quantity: {detail.quantity}</Text>
        </View>
      </View>
    ))}

    <Text style={styles.deliveryText}>
      Expected Delivery: {item.expectedDeliveryDate || 'Updating'}
    </Text>

    <View style={styles.buttonRow}>
      <TouchableOpacity style={styles.viewButton}  onPress={() => navigation.navigate('OrderInformationScreen', { order: item })}>
        <Text style={styles.viewButtonText}>View Order</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.cancelButton}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity> */}
    </View>
  </View>
);

  if (loading) {
    return <ActivityIndicator size="large" color="red" style={{ marginTop: 50 }} />;
  }

  return (
    <FlatList
      data={orders}
      renderItem={renderOrder}
      keyExtractor={(item: any) => item?.order?.orderId.toString()}
      contentContainerStyle={styles.listContainer}
      ListEmptyComponent={<Text>Không có đơn hàng chờ xác nhận.</Text>}
    />
  );
};
const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
    backgroundColor: '#fff',
  },
  orderContainer: {
    marginBottom: 24,
  },
  orderId: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    elevation: 2,
    padding: 10,
  },
  image: {
    width: 70,
    height: 100,
    borderRadius: 8,
    marginRight: 12,
  },
  details: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  price: {
    color: '#000',
    fontWeight: '500',
    marginTop: 6,
  },
  quantity: {
    marginTop: 6,
    fontSize: 12,
    color: '#666',
  },
  deliveryText: {
    marginTop: 10,
    fontSize: 13,
    color: '#444',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 12,
    justifyContent: 'space-between',
  },
  viewButton: {
    backgroundColor: 'red',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  viewButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cancelButton: {
    borderColor: 'red',
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  cancelButtonText: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default ToReceive;
