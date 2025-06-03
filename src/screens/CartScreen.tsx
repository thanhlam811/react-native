import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../contexts/AuthContext';

import  {cartDetailsApi} from '../api/api'; // giả sử bạn đã export api này đúng

const CartScreen = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigation = useNavigation<any>();
useEffect(() => {
  const fetchCartDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const user = await AsyncStorage.getItem('userId');
      const userId = Number(user);
      console.log('UserId:', userId);
      if (!userId) throw new Error('No userId');

      const cartDetails = await cartDetailsApi.getByUserId(userId);
      console.log('cartDetails:', cartDetails);

      const formatted = cartDetails.map((item: any) => ({
        id: item.cartDetailsId.toString(),
        bookId: item.book?.bookId,
        title: item.book?.title || 'No title',
        description: item.book?.description || '',
        price: item.book?.sellingPrice || 0,
        image: item.book?.image
          ? `http://10.0.2.2:8080/images/${item.book.image}`
          : 'https://via.placeholder.com/70x100',
        quantity: item.quantity || 1,
        selected: true,
      }));

      setCartItems(formatted);
    } catch (err) {
      setError('Failed to load cart details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchCartDetails();
}, []);


  // các hàm xử lý tăng giảm số lượng, xóa, chọn, etc vẫn giữ nguyên
const updateQuantity = async (id: string, type: 'inc' | 'dec') => {
  const targetItem = cartItems.find((item) => item.id === id);
  if (!targetItem) return;

  const delta = type === 'inc' ? 1 : -1;
  const newQuantity = targetItem.quantity + delta;

  if (newQuantity < 1) return;

  console.log(`[CartScreen] Updating quantity:`, {
    bookId: targetItem.bookId,
    delta,
    oldQuantity: targetItem.quantity,
    newQuantity,
  });

  try {
    await cartDetailsApi.addToCart(targetItem.bookId, delta);

    console.log(`[CartScreen] API call success`);

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  } catch (error) {
    console.error('[CartScreen] Failed to update quantity:', error);
  }
};



  const toggleSelect = (id: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const deleteItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>,
    id: string
  ) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
      <RectButton style={styles.deleteBox} onPress={() => deleteItem(id)}>
        <Animated.View style={{ transform: [{ scale }] }}>
          <Icon name="delete" size={24} color="#fff" />
        </Animated.View>
      </RectButton>
    );
  };

  const total = cartItems
    .filter((item) => item.selected)
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  const goToPayment = () => {
    const selectedItems = cartItems.filter(item => item.selected);
    console.log('[CartScreen] Selected Items:', selectedItems); // log kiểm tra
    navigation.navigate('Payment', { selectedItems });
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Cart</Text>
        <Icon name="search" size={24} color="#000" />
      </View>

      {loading && <ActivityIndicator size="large" color="#d42b1c" />}
      {error && (
        <Text style={{ color: 'red', textAlign: 'center', marginVertical: 8 }}>
          {error}
        </Text>
      )}
      {!loading && cartItems.length === 0 && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your cart is empty</Text>
        </View>
      )}

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Swipeable
            renderRightActions={(progress, dragX) =>
              renderRightActions(progress, dragX, item.id)
            }
          >
            <View style={styles.card}>
              <TouchableOpacity onPress={() => toggleSelect(item.id)}>
                <Icon
                  name={item.selected ? 'check-box' : 'check-box-outline-blank'}
                  size={24}
                  color="#d42b1c"
                />
              </TouchableOpacity>

              <Image source={{ uri: item.image }} style={styles.image} />

              <View style={styles.info}>
                <Text style={styles.bookTitle} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={styles.description} numberOfLines={1}>
                  {item.description}
                </Text>

                <Text style={styles.price}>${item.price.toFixed(2)}</Text>

                <View style={styles.quantityRow}>
                  <TouchableOpacity
                    onPress={() => updateQuantity(item.id, 'dec')}
                    style={[styles.circleBtn, { backgroundColor: '#fff' }]}
                  >
                    <Text style={styles.circleText}>-</Text>
                  </TouchableOpacity>

                  <Text style={styles.qtyText}>{item.quantity}</Text>

                  <TouchableOpacity
                    onPress={() => updateQuantity(item.id, 'inc')}
                    style={[styles.circleBtn, { backgroundColor: '#d42b1c' }]}
                  >
                    <Text style={[styles.circleText, { color: '#fff' }]}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Swipeable>
        )}
      />

      <View style={styles.footer}>
        <Text style={styles.totalText}>
          Total: <Text style={styles.totalAmount}>${total}</Text>
        </Text>

        <TouchableOpacity style={styles.payButton} onPress={goToPayment}>
          <Text style={styles.payText}>PAY</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  list: {
    paddingBottom: 100,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    padding: 10,
    elevation: 1,
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 100,
    borderRadius: 4,
    marginHorizontal: 12,
  },
  info: {
    flex: 1,
    justifyContent: 'space-between',
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 13,
    color: '#666',
    marginVertical: 2,
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginTop: 4,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  qtyText: {
    marginHorizontal: 12,
    fontSize: 15,
    fontWeight: '600',
  },
  circleBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  deleteBox: {
    backgroundColor: '#d42b1c',
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    borderRadius: 8,
    marginBottom: 12,
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 8,
    elevation: 4,
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalAmount: {
    color: '#d42b1c',
  },
  payButton: {
    backgroundColor: '#d42a1b',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  payText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  emptyContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 50,
},
emptyText: {
  fontSize: 18,
  color: '#666',
  fontWeight: '600',
},

});
