import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const selectedItems = [
  {
    id: '1',
    title: 'Clean Code',
    description: 'A Handbook of Agile Software Craftsmanship',
    price: 25.99,
    quantity: 1,
    image: 'https://images-na.ssl-images-amazon.com/images/I/41xShlnTZTL._SX374_BO1,204,203,200_.jpg',
  },
  {
    id: '2',
    title: 'The Pragmatic Programmer',
    description: 'Your Journey to Mastery',
    price: 30.00,
    quantity: 2,
    image: 'https://m.media-amazon.com/images/I/51A5Q0tQnGL.jpg',
  },
  {
    id: '3',
    title: 'Design Patterns',
    description: 'Elements of Reusable Object-Oriented Software',
    price: 45.50,
    quantity: 1,
    image: 'https://m.media-amazon.com/images/I/51k0qaip5iL._SX342_SY445_QL70_ML2_.jpg',
  },
];

const PaymentScreen = () => {

  const navigation = useNavigation();
  const route = useRoute();
  const [cartItems, setCartItems] = useState(selectedItems);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Momo' | 'COD'>('COD');

  const total = cartItems
    .reduce((sum: number, item: any) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={{ flex: 1 }}>
        <Text style={styles.bookTitle} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.description} numberOfLines={1}>{item.description}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} edges={['bottom']}>
      <FlatList
      data={cartItems} // Use cartItems state instead of selectedItems
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      ListHeaderComponent={
        <View style={styles.container}>
         

          {/* Delivery address */}
          <Text style={styles.sectionTitle}>Delivery address</Text>
          <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
          <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
          <TextInput style={styles.input} placeholder="Phone number" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
          <TextInput style={styles.input} placeholder="Address" value={address} onChangeText={setAddress} />

          {/* Product items */}
          <Text style={styles.sectionTitle}>Product items</Text>
        </View>
      }
      ListFooterComponent={
        <View style={{ paddingHorizontal: 16 }}>
          {/* Promo Code */}
          <Text style={styles.sectionTitle}>Promo Code</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Promo Code"
            value={promoCode}
            onChangeText={setPromoCode}
          />

          {/* Payment method */}
          <Text style={styles.sectionTitle}>Payment method</Text>
          <View style={styles.paymentMethods}>
            {['Momo', 'COD'].map((method) => (
              <TouchableOpacity
                key={method}
                style={[
                  styles.paymentOption,
                  paymentMethod === method && styles.selectedOption,
                ]}
                onPress={() => setPaymentMethod(method as 'Momo' | 'COD')}
              >
                <Text style={styles.paymentText}>{method}</Text>
                {paymentMethod === method && (
                  <Icon name="check" size={18} color="#fff" style={styles.checkIcon} />
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Total and Order button */}
          <View style={styles.footer}>
            <Text style={styles.totalText}>Total: <Text style={styles.totalAmount}>${total}</Text></Text>
            <TouchableOpacity
              style={styles.orderButton}
              onPress={() => {
                if (!name || !email || !phone || !address) {
                  alert('Please fill in all delivery information.');
                } else {
                  alert('Order placed successfully!');
                  navigation.goBack();
                }
              }}
            >
              <Text style={styles.orderText}>ORDER</Text>
            </TouchableOpacity>
          </View>
        </View>
      }
      contentContainerStyle={{ paddingBottom: 100 }}
    />
    </SafeAreaView>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },

  sectionTitle: {
    marginTop: 0,
    marginBottom: 8,
    fontWeight: 'bold',
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    marginHorizontal: 16,
  },
  image: {
    width: 70,
    height: 100,
    borderRadius: 4,
    marginRight: 12,
  },
  bookTitle: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  description: {
    fontSize: 13,
    color: '#666',
  },
  price: {
    fontSize: 14,
    marginTop: 4,
  },
  quantity: {
    marginTop: 4,
    color: '#333',
  },
  paymentMethods: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#ccc',
    position: 'relative',
  },
  selectedOption: {
    backgroundColor: '#d42b1c',
    borderColor: '#d42b1c',
  },
  paymentText: {
    color: '#000',
  },
  checkIcon: {
    marginLeft: 8,
  },
  footer: {
    flexDirection: 'row',
    marginTop: 24,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalAmount: {
    color: '#d42b1c',
  },
  orderButton: {
    backgroundColor: '#d42b1c',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  orderText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
