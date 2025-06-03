import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { Book } from '../types/Book';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { cartDetailsApi } from '../api/api';

type BookDetailRouteProp = RouteProp<{ params: { book: Book } }, 'params'>;

const BookDetailScreen = () => {
  const route = useRoute<BookDetailRouteProp>();
  const { book } = route.params;
  const navigation = useNavigation<any>();

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: `http://10.0.2.2:8080/storage/upload/${book.image}` }}
            style={styles.image}
          />
          <View style={styles.topRightButtons}>
            <TouchableOpacity style={styles.iconButton}>
              <Icon name="share" size={24} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Cart')}>
              <Icon name="shopping-cart" size={24} color="#333" />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.title}>{book.title}</Text>

        <View style={styles.priceRow}>
          <Text style={styles.price}>{book.sellingPrice}đ</Text>
          <Text style={styles.originalPrice}>{book.listPrice || book.sellingPrice * 1.2}đ</Text>
        </View>

        <View style={styles.ratingRow}>
          <View style={styles.ratingStars}>
            <Icon name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>4.5</Text>
          </View>
          <Text style={styles.soldText}>Sold: 123</Text>
        </View>

        <Text style={styles.sectionTitle}>Descriptions</Text>
        <Text style={styles.description}>
          {book.description || 'No description available.'}
        </Text>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.leftIcons}>
          <TouchableOpacity style={styles.actionIcon}>
            <Icon name="favorite-border" size={24} color="#333" />
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity
            style={styles.actionIcon}
            onPress={async () => {
              try {
                await cartDetailsApi.addToCart(book.bookId, 1); // <-- gọi API thêm vào giỏ
                ToastAndroid.show('Added to cart!', ToastAndroid.SHORT);
                navigation.navigate('Cart', { refresh: true }); 
              } catch (err) {
                ToastAndroid.show('Add to cart failed', ToastAndroid.SHORT);
                console.error('❌ Add to cart error:', err);
              }
            }}
          >
            <Icon name="add-shopping-cart" size={24} color="#333" />
          </TouchableOpacity>

        </View>

        {/* Buy Now button - dùng CustomButton sau */}
        <TouchableOpacity style={styles.buyNowButton} onPress={() => {}}>
          <Text style={styles.buyNowText}>BUY NOW</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 80, // đảm bảo không che nội dung bởi bottom bar
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: '60%',
    aspectRatio: 2 / 3,
    borderRadius: 8,
    marginBottom: 8,
    resizeMode: 'cover',
  },
  topRightButtons: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    gap: 10,
  },
  iconButton: {
    marginLeft: 10,
    backgroundColor: '#fff',
    padding: 6,
    borderRadius: 20,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  price: {
    fontSize: 18,
    color: 'red',
    fontWeight: 'bold',
  },
  originalPrice: {
    fontSize: 16,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  ratingStars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
  },
  soldText: {
    fontSize: 14,
    color: '#555',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  leftIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 50,
    marginHorizontal: 5,
  },
  separator: {
    width: 1,
    height: 20,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  buyNowButton: {
    flex: 1,
    backgroundColor: '#FF6F61',
    paddingVertical: 12,
    borderRadius: 8,
    marginLeft: 10,
    alignItems: 'center',
  },
  buyNowText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default BookDetailScreen;
