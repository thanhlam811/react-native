import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

const initialData = [
  {
    id: '1',
    title: 'Book A',
    description: 'Exciting adventure story.',
    price: 12.99,
    image: 'https://covers.openlibrary.org/b/id/7222246-L.jpg',
    quantity: 1,
    selected: true,
  },
  {
    id: '2',
    title: 'Book B',
    description: 'Classic novel you must read.',
    price: 14.99,
    image: 'https://covers.openlibrary.org/b/id/8228691-L.jpg',
    quantity: 2,
    selected: false,
  },
  {
    id: '3',
    title: 'Book C',
    description: 'Futuristic dystopian tale.',
    price: 10.5,
    image: 'https://covers.openlibrary.org/b/id/153541-L.jpg',
    quantity: 1,
    selected: true,
  },
];


const CartScreen = () => {
  const [cartItems, setCartItems] = useState(initialData);
    const navigation = useNavigation<any>();
  
   const goToPayment = () => {
    navigation.navigate('Payment');
  };
  const updateQuantity = (id: string, type: 'inc' | 'dec') => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                type === 'inc'
                  ? item.quantity + 1
                  : Math.max(1, item.quantity - 1),
            }
          : item
      )
    );
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

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Cart</Text>
        <Icon name="search" size={24} color="#000" />
      </View>

      {/* Cart List */}
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
                    style={[styles.circleBtn, { backgroundColor: '#ffffff' }]} >
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

      {/* Footer */}
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
    color: '#d42b1c', // màu đỏ giống nút PAY
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
});
