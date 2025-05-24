import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { Book } from '../types/Book';
import Icon from 'react-native-vector-icons/MaterialIcons';

type BookDetailRouteProp = RouteProp<{ params: { book: Book } }, 'params'>;

const BookDetailScreen = () => {
  const route = useRoute<BookDetailRouteProp>();
  const { book } = route.params;
  const navigation = useNavigation<any>();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: `http://10.0.2.2:8080/uploads/${book.image}` }}
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
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
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
});

export default BookDetailScreen;
