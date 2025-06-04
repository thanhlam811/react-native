import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { bookApi } from '../api/api'; // Đường dẫn đúng

const previousSearches = [
  'Tôi thấy hoa vàng trên cỏ xanh',
  'Harry Potter and the Half Blood Prince',
  'The Lord of the rings',
  'Mắt Biếc',
];

const SearchScreen = () => {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<any>();

  const handleSearch = async () => {
    if (search.trim() === '') {
      setSearchResults([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await bookApi.search(search.trim());
      setSearchResults(data);
      Keyboard.dismiss();
    } catch (err) {
      setError('Lỗi khi tìm kiếm sách');
    } finally {
      setLoading(false);
    }
  };

  const renderBookItem = ({ item }: any) => (
    <View style={styles.bookItem}>
      <Image source={{ uri: item.image }} style={styles.bookImage} />
      <Text style={styles.bookTitle} numberOfLines={2}>{item.title}</Text>
      <Text style={styles.bookPrice}>{item.price}</Text>
      <View style={styles.bookInfo}>
        <Text style={styles.bookRating}>⭐ {item.rating}</Text>
        <Text style={styles.bookSold}>Đã bán {item.sold}k</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Search bar */}
        <View style={styles.searchContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={20} color="#000" />
          </TouchableOpacity>

          <View style={styles.searchBox}>
            <Ionicons name="search" size={16} color="#888" style={{ marginHorizontal: 6 }} />
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Tìm kiếm sách..."
              style={styles.input}
              onSubmitEditing={handleSearch}
              returnKeyType="search"
              clearButtonMode="while-editing"
            />
            {search.length > 0 && (
              <TouchableOpacity onPress={() => {
                setSearch('');
                setSearchResults([]);
              }}>
                <Ionicons name="close" size={16} color="#888" />
              </TouchableOpacity>
            )}

            <TouchableOpacity onPress={() => navigation.navigate('Filter')}>
              <Icon name="tune" size={20} color="#888" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Previous search */}
        <Text style={styles.sectionTitle}>Tìm kiếm trước đó</Text>
        {previousSearches.map((item, index) => (
          <View key={index} style={styles.historyItem}>
            <Text style={styles.historyText}>{item}</Text>
            <TouchableOpacity>
              <Ionicons name="close" size={16} color="#aaa" />
            </TouchableOpacity>
          </View>
        ))}

        {/* Search Results */}
        <Text style={styles.sectionTitle}>Kết quả tìm kiếm</Text>
        {loading && <ActivityIndicator size="small" color="#d42a1b" />}
        {error && <Text style={{ color: 'red' }}>{error}</Text>}

        {!loading && searchResults.length === 0 && search.trim() !== '' && (
          <Text>Không tìm thấy sách phù hợp</Text>
        )}

        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          renderItem={renderBookItem}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          contentContainerStyle={{ paddingBottom: 80 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  searchBox: {
    flex: 1,
    marginLeft: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  input: {
    flex: 1,
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  historyText: {
    fontSize: 14,
    color: '#333',
  },
  bookItem: {
    width: '48%',
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  bookImage: {
    width: '100%',
    height: 160,
    borderRadius: 8,
    marginBottom: 8,
  },
  bookTitle: {
    fontSize: 13,
    fontWeight: '500',
    color: '#000',
    marginBottom: 4,
  },
  bookPrice: {
    fontSize: 13,
    color: '#d42a1b',
    fontWeight: '600',
  },
  bookInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  bookRating: {
    fontSize: 12,
    color: '#555',
  },
  bookSold: {
    fontSize: 12,
    color: '#555',
  },
});
