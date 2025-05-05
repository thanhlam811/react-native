import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

const mockData = [
  {
    id: '1',
    title: 'The Great Gatsby',
    description: 'A classic novel set in the Jazz Age.',
    rating: 4.5,
    price: '$12.99',
    image: 'https://covers.openlibrary.org/b/id/7222246-L.jpg',
  },
  {
    id: '2',
    title: 'To Kill a Mockingbird',
    description: 'A story of justice and racial tension in the South.',
    rating: 4.8,
    price: '$14.99',
    image: 'https://covers.openlibrary.org/b/id/8228691-L.jpg',
  },
  {
    id: '3',
    title: '1984',
    description: 'A dystopian novel by George Orwell.',
    rating: 4.7,
    price: '$10.50',
    image: 'https://covers.openlibrary.org/b/id/153541-L.jpg',
  },
];

const WishlistScreen = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Wishlist</Text>
        <Icon name="search" size={24} color="#000" />
      </View>

      <FlatList
        data={mockData}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />

            <View style={styles.info}>
              <Text style={styles.bookTitle} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={styles.description} numberOfLines={1}>
                {item.description}
              </Text>

              <View style={styles.ratingRow}>
                <Icon name="star" color="#f5a623" size={18} />
                <Text style={styles.ratingText}>{item.rating}</Text>
              </View>

              <View style={styles.bottomRow}>
                <Text style={styles.price}>{item.price}</Text>
                <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
                  <Icon
                    name={favorites.includes(item.id) ? 'favorite' : 'favorite-border'}
                    color={favorites.includes(item.id) ? '#e91e63' : '#aaa'}
                    size={24}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default WishlistScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingTop: 10,
    paddingHorizontal: 16,
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
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    padding: 10,
    elevation: 2,
  },
  image: {
    width: 70,
    height: 100,
    borderRadius: 4,
    marginRight: 12,
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
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 13,
    color: '#444',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
});
