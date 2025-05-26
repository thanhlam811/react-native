import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const mockOrders = [
  {
    id: '#O678AD3001',
    title: 'Harry Potter & the Deathly Hallows',
    price: '198.000 đ',
    quantity: 2,
    deliveryDate: 'Sunday, Apr 21, 2025',
    image: 'https://m.media-amazon.com/images/I/81iqZ2HHD-L._SL1500_.jpg',
  },
  {
    id: '#O678AD3002',
    title: 'Harry Potter & the Deathly Hallows',
    price: '198.000 đ',
    quantity: 1,
    deliveryDate: 'Sunday, Apr 21, 2025',
    image: 'https://m.media-amazon.com/images/I/81iqZ2HHD-L._SL1500_.jpg',
  },
  {
    id: '#O678AD3003',
    title: 'Harry Potter & the Deathly Hallows',
    price: '198.000 đ',
    quantity: 3,
    deliveryDate: 'Sunday, Apr 21, 2025',
    image: 'https://m.media-amazon.com/images/I/81iqZ2HHD-L._SL1500_.jpg',
  },
];

const ToConfirm = () => {
  const renderOrder = ({ item }: any) => (
    <View style={styles.orderContainer}>
      <Text style={styles.orderId}>Order ID: {item.id}</Text>
      <View style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.price}>{item.price}</Text>
          <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
        </View>
      </View>
      <Text style={styles.deliveryText}>Expected Delivery by {item.deliveryDate}</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.viewButton}>
          <Text style={styles.viewButtonText}>View Order</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <FlatList
      data={mockOrders}
      renderItem={renderOrder}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
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

export default ToConfirm;
