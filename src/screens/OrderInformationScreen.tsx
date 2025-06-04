import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation,useRoute  } from '@react-navigation/native';

const OrderInformationScreen = () => {
  const navigation = useNavigation();
   const route = useRoute();
     const { order } = route.params as { order: any };
     // Tính tổng giá các sản phẩm trong đơn hàng
  const itemTotal = order.details?.reduce((sum: number, detail: any) => {
  return sum + detail.quantity * detail.book.sellingPrice;
}, 0) || 0;

const discount: number = Number(order.discount || 0);
const deliveryCharge: number = 0;
const total: number = itemTotal - discount + deliveryCharge;


  return (
    <ScrollView style={styles.container}>
      {/* <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.back}>{'<'} Order information</Text>
      </TouchableOpacity> */}

      <Text style={styles.orderId}>Order ID: #{order.orderId}</Text>

{order.details?.map((detail: any, index: number) => (
  <View key={index} style={styles.productCard}>
    <Image source={{ uri: detail.book.imageUrl }} style={styles.image} />
    <View>
      <Text style={styles.title}>{detail.book.title}</Text>
      <Text style={styles.price}>{detail.book.sellingPrice?.toLocaleString()}đ</Text>
      <Text style={styles.quantity}>Quantity: {detail.quantity}</Text>
    </View>
  </View>
))}


      <Text style={styles.sectionTitle}>Order Status</Text>

      <View style={styles.statusBlock}>
        <Text style={styles.statusText}>🔵 Order Confirmed</Text>
        <Text style={styles.statusDesc}>Your order has accepted</Text>

      </View>

    

      <Text style={styles.sectionTitle}>Order Summary</Text>

      <View style={styles.summary}>
        <Text>Item Total</Text>
        <Text>{itemTotal.toLocaleString()}đ</Text>
      </View>

      <View style={styles.summary}>
        <Text>Discount</Text>
        <Text style={{ color: 'green' }}>{discount > 0 ? `-${discount.toLocaleString()}đ` : '0đ'}</Text>
      </View>

      <View style={styles.summary}>
        <Text>Delivery Charge</Text>
        <Text style={{ color: deliveryCharge === 0 ? 'blue' : 'black' }}>
          {deliveryCharge === 0 ? 'Free' : `${deliveryCharge.toLocaleString()}đ`}
        </Text>
      </View>

      <View style={styles.summaryTotal}>
        <Text>Total</Text>
        <Text>{total.toLocaleString()}đ</Text>
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
