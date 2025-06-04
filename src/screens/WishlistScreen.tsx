import React, { useEffect, useState } from 'react';
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
import  {getFavouritebyUserId} from '../api/api'; // đường dẫn tới file API của bạn
import AsyncStorage from '@react-native-async-storage/async-storage';

const WishlistScreen = () => {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  const userId = 1; // <-- giả lập, bạn có thể lấy từ AsyncStorage

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
          const user = await AsyncStorage.getItem('userId');
          const userId = Number(user);
          console.log('UserId:', userId);
          const data = await getFavouritebyUserId(userId);
          setFavorites(data);
            // Lưu danh sách các ID yêu thích (nếu cần toggle)
          const ids = data.map((item: any) => item.book?.id?.toString());
          setFavoriteIds(ids);
      } catch (err) {
        console.error('Lỗi lấy userId từ AsyncStorage:', err);
      }
  


    };

    fetchFavorites();
  }, []);

  const toggleFavorite = (id: string) => {
    setFavoriteIds((prev) =>
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
        data={favorites}
      keyExtractor={(item, index) => item.favoriteId.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{ uri: item.book?.image || 'https://via.placeholder.com/70x100' }}
              style={styles.image}
            />

            <View style={styles.info}>
              <Text style={styles.bookTitle} numberOfLines={1}>
                {item.book?.title}
              </Text>
              <Text style={styles.description} numberOfLines={1}>
                {item.book?.description || 'No description'}
              </Text>

              <View style={styles.ratingRow}>
                <Icon name="star" color="#f5a623" size={18} />
                <Text style={styles.ratingText}>{item.book?.avgRate || 0}</Text>
              </View>

              <View style={styles.bottomRow}>
                <Text style={styles.price}>${item.book?.sellingPrice || '0.00'}</Text>
                <TouchableOpacity onPress={() => toggleFavorite(item.book?.id?.toString())}>
                  <Icon
                    name={
                      favoriteIds.includes(item.book?.id?.toString())
                        ? 'favorite'
                        : 'favorite-border'
                    }
                    color={favoriteIds.includes(item.book?.id?.toString()) ? '#e91e63' : '#aaa'}
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
