import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OrderInformationScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.back}>{'<'} Order information</Text>
      </TouchableOpacity>

      <Text style={styles.orderId}>Order ID: #0678AD3001</Text>

      {[1, 2].map((_, index) => (
        <View key={index} style={styles.productCard}>
          <Image source={{ uri: 'https://example.com/book-cover.jpg' }} style={styles.image} />
          <View>
            <Text style={styles.title}>Harry Potter & the Deathly Hallows</Text>
            <Text style={styles.price}>198.000đ</Text>
            <Text style={styles.quantity}>Quality: 2</Text>
          </View>
        </View>
      ))}

      <Text style={styles.sectionTitle}>Order Status</Text>

      <View style={styles.statusBlock}>
        <Text style={styles.statusText}>🔵 Order Confirmed</Text>
        <Text style={styles.statusDesc}>Your order has accepted</Text>
        <Text style={styles.time}>Sun, Apr 21, 2025 at 02:45 PM</Text>
      </View>

      <View style={styles.statusBlock}>
        <Text style={styles.statusText}>🔵 Out for Delivery</Text>
        <Text style={styles.statusDesc}>Delivery boy has out and reaching your location</Text>
        <Text style={styles.time}>Mon, Apr 22, 2025 at 08:00 AM</Text>
      </View>

      <View style={styles.statusBlock}>
        <Text style={styles.statusText}>🔵 Order Delivered</Text>
        <Text style={styles.statusDesc}>Your order has successfully delivered</Text>
        <Text style={styles.time}>Mon, Apr 22, 2025 at 01:00 PM</Text>
      </View>

      <Text style={styles.sectionTitle}>Order Summary</Text>
      <View style={styles.summary}>
        <Text>Item Total</Text>
        <Text>515.000đ</Text>
      </View>
      <View style={styles.summary}>
        <Text>Discount</Text>
        <Text style={{ color: 'green' }}>15.000đ</Text>
      </View>
      <View style={styles.summary}>
        <Text>Delivery Charge</Text>
        <Text style={{ color: 'blue' }}>Free</Text>
      </View>
      <View style={styles.summaryTotal}>
        <Text>Total</Text>
        <Text>500.000đ</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: 'white' },
  back: { fontSize: 16, fontWeight: 'bold', color: '#007bff', marginBottom: 10 },
  orderId: { fontWeight: 'bold', marginVertical: 10 },
  productCard: {
    flexDirection: 'row', backgroundColor: '#f9f9f9', borderRadius: 10,
    padding: 10, marginBottom: 10,
  },
  image: { width: 60, height: 80, borderRadius: 8, marginRight: 12 },
  title: { fontWeight: '600' },
  price: { fontWeight: 'bold', marginTop: 4 },
  quantity: { color: 'gray', fontSize: 12 },
  sectionTitle: { fontWeight: 'bold', fontSize: 16, marginVertical: 12 },
  statusBlock: { marginBottom: 10 },
  statusText: { fontWeight: '600' },
  statusDesc: { color: 'gray' },
  time: { fontSize: 12, color: 'gray' },
  summary: {
    flexDirection: 'row', justifyContent: 'space-between', marginVertical: 4,
  },
  summaryTotal: {
    flexDirection: 'row', justifyContent: 'space-between',
    marginVertical: 10, borderTopWidth: 1, borderColor: '#ccc', paddingTop: 10,
  },
});

export default OrderInformationScreen;
