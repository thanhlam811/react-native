import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { userApi,cartDetailsApi } from '../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

type CartItem = {
  id: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
};

type PaymentRouteParams = {
  selectedItems: CartItem[];
};

// ... import giữ nguyên như bạn đã có

const PaymentScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { selectedItems } = route.params as PaymentRouteParams;

  const [cartItems, setCartItems] = useState<CartItem[]>(selectedItems);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [availableVouchers, setAvailableVouchers] = useState<any[]>([]);
  const [selectedVoucher, setSelectedVoucher] = useState<any | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'Momo' | 'COD'>('COD');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userIdStr = await AsyncStorage.getItem('userId');
        if (!userIdStr) {
          Alert.alert('Lỗi', 'Không tìm thấy thông tin người dùng');
          return;
        }
        const userId = parseInt(userIdStr, 10);
        const user = await userApi.getOne(userId);
        setFirstName(user.firstName || '');
        setLastName(user.lastName || '');
        setEmail(user.email || '');
        setPhone(user.phoneNumber || '');
        setAddress(user.buyingAddress || '');

        const userVoucherList = await cartDetailsApi.getVoucherbyUserId(userId);
        const unusedVouchers = userVoucherList.filter((item: any) => !item.used);
        setAvailableVouchers(unusedVouchers);
      } catch (err) {
        console.error('Lỗi lấy thông tin người dùng hoặc voucher:', err);
      }
    };

    fetchUserInfo();
  }, []);

  const totalBeforeDiscount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const discount = selectedVoucher
    ? totalBeforeDiscount * selectedVoucher.voucher.discountAmount
    : 0;

  const total = totalBeforeDiscount - discount;

  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={{ flex: 1 }}>
        <Text style={styles.bookTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.description} numberOfLines={1}>
          {item.description}
        </Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} edges={['bottom']}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={
          <View style={styles.container}>
            <Text style={styles.sectionTitle}>Delivery address</Text>
            <View style={styles.nameRow}>
              <TextInput
                style={[styles.input, styles.nameInput]}
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
              />
              <TextInput
                style={[styles.input, styles.nameInput]}
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
              />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Phone number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
            <TextInput
              style={styles.input}
              placeholder="Address"
              value={address}
              onChangeText={setAddress}
            />

            <Text style={styles.sectionTitle}>Product items</Text>
          </View>
        }
        ListFooterComponent={
          <View style={{ paddingHorizontal: 16 }}>
            
            <Text style={styles.sectionTitle}>Voucher</Text>
            {availableVouchers.length > 0 ? (
              availableVouchers.map((item: any) => (
                <TouchableOpacity
                  key={item.voucher.voucherId}
                  style={[
                    styles.voucherCard,
                    selectedVoucher?.voucher.voucherId === item.voucher.voucherId &&
                      styles.voucherCardSelected,
                  ]}
                  onPress={() =>
                    setSelectedVoucher((prev:any) =>
                      prev?.voucher.voucherId === item.voucher.voucherId ? null : item
                    )
                  }
                >
                  <Text
                    style={{
                      color:
                        selectedVoucher?.voucher.voucherId === item.voucher.voucherId
                          ? '#fff'
                          : '#000',
                      fontWeight: 'bold',
                    }}
                  >
                    {item.voucher.code}
                  </Text>
                  <Text
                    style={{
                      color:
                        selectedVoucher?.voucher.voucherId === item.voucher.voucherId
                          ? '#fff'
                          : '#000',
                    }}
                  >
                    Discount: {item.voucher.discountAmount * 100}%
                  </Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={{ color: 'gray', marginBottom: 10 }}>
                No voucher available
              </Text>
            )}

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

            <View style={styles.footer}>
              <Text style={styles.totalText}>
                Total: <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
              </Text>
              <TouchableOpacity
                style={styles.orderButton}
                onPress={() => {
                  if (!firstName || !lastName || !email || !phone || !address) {
                    Alert.alert('Thiếu thông tin', 'Vui lòng điền đầy đủ thông tin giao hàng.');
                  } else {
                    Alert.alert('Đặt hàng thành công', 'Cảm ơn bạn đã mua hàng!');
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
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  nameInput: {
    flex: 1,
  },
  voucherCard: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  voucherCardSelected: {
    backgroundColor: '#d42b1c',
    borderColor: '#d42b1c',
  },
});
