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
import { getFavouritebyUserId, removeFavorite } from '../api/api'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';  // <-- import hook navigation



const WishlistScreen = () => {
  const [favorites, setFavorites] = useState<any[]>([]);
    const navigation = useNavigation<any>(); // <-- lấy navigation

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const user = await AsyncStorage.getItem('userId');
        const userId = Number(user);
        const data = await getFavouritebyUserId(userId);
        setFavorites(data);
      } catch (err) {
        console.error('Lỗi lấy userId từ AsyncStorage:', err);
      }
    };

    fetchFavorites();
  }, []);

  const handleRemoveFavorite = (favoriteId: number) => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc muốn xóa khỏi danh sách yêu thích?',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Xóa',
          onPress: async () => {
            const success = await removeFavorite(favoriteId);
            if (success) {
              setFavorites((prev) =>
                prev.filter((item) => item.favoriteId !== favoriteId)
              );
            }
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  const handlePressItem = (bookId: number) => {
    navigation.navigate('BookDetail', { bookId });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Wishlist</Text>
      </View>

      <FlatList
        data={favorites}
        keyExtractor={(item) => item.favoriteId.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}>
            <Image
              source={{
                uri: `http://10.0.2.2:8080/storage/upload/${item.book?.image}`,
              }}
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
                <TouchableOpacity
                  onPress={() => handleRemoveFavorite(item.favoriteId)}
                >
                  <Icon name="favorite" color="#e91e63" size={24} />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default WishlistScreen;

// ...styles giữ nguyên


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
