import React, { useEffect, useState } from 'react';
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
import { useRoute,RouteProp } from '@react-navigation/native';
import { bookApi } from '../api/api'; // Đường dẫn đúng
import AsyncStorage from '@react-native-async-storage/async-storage';
const previousSearches = [
  'Tôi thấy hoa vàng trên cỏ xanh',
  'Harry Potter and the Half Blood Prince',
  'The Lord of the rings',
  'Mắt Biếc',
];
// Định nghĩa kiểu cho route params
type SearchScreenRouteParams = {
  filters?: any; // hoặc cụ thể hơn nếu biết rõ cấu trúc: filters?: { sort?: string; price?: string[]; ... }
};

const SearchScreen = () => {

  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<any>();
const [previousSearches, setPreviousSearches] = useState<string[]>([]);
  const route = useRoute<RouteProp<Record<string, SearchScreenRouteParams>, string>>();
  const filters = route.params?.filters || null;

  useEffect(() => {
  const loadHistory = async () => {
    const saved = await AsyncStorage.getItem('SEARCH_HISTORY');
    if (saved) {
      setPreviousSearches(JSON.parse(saved));
    }
  };
  loadHistory();
}, []);

// Lưu và cập nhật lịch sử tìm kiếm
const saveSearchHistory = async (text: string) => {
  const trimmed = text.trim();
  if (!trimmed) return;

  const updated = [trimmed, ...previousSearches.filter((i) => i !== trimmed)].slice(0, 10);
  setPreviousSearches(updated);
  await AsyncStorage.setItem('SEARCH_HISTORY', JSON.stringify(updated));
};

// Xoá 1 item khỏi lịch sử
const deleteHistoryItem = async (index: number) => {
  const updated = [...previousSearches];
  updated.splice(index, 1);
  setPreviousSearches(updated);
  await AsyncStorage.setItem('SEARCH_HISTORY', JSON.stringify(updated));
};

  const handleSearch = async () => {
  const trimmedSearch = search.trim();
  if (trimmedSearch === '') {
    setSearchResults([]);
    return;
  }

  setLoading(true);
  setError(null);

  try {
    // Lưu vào lịch sử
    await saveSearchHistory(trimmedSearch);

    // Tạo filter query như bạn đã có
    const filterParts: string[] = [];

    if (trimmedSearch) {
      filterParts.push(`title~'${trimmedSearch}'`);
    }

    if (filters?.price?.length) {
      filterParts.push(filters.price);
    }

    if (filters?.rating?.length) {
      const ratingQuery = filters.rating
        .map((r: string) => {
          if (r === '>4.0') return 'avgRate>4.0';
          if (r === '3.0 - 4.0') return 'avgRate>=3.0 and avgRate<=4.0';
          if (r === '2.0 - 3.0') return 'avgRate>=2.0 and avgRate<=3.0';
          if (r === '<2.0') return 'avgRate<2.0';
          return '';
        })
        .filter(Boolean)
        .join(' or ');
      if (ratingQuery) filterParts.push(`(${ratingQuery})`);
    }

    if (filters?.genre?.length) {
      const genreQuery = filters.genre.map((g: string) => `genre='${g}'`).join(' or ');
      if (genreQuery) filterParts.push(`(${genreQuery})`);
    }

    let query = '';
    if (filterParts.length) {
      query += `?filter=${encodeURIComponent(filterParts.join(' and '))}`;
    }

    if (filters?.sort) {
      query += `${query ? '&' : '?'}${filters.sort}`;
    }

    console.log('query:', query);

    const data = await bookApi.searchWithQuery(query);
    setSearchResults(data);
    Keyboard.dismiss();
  } catch (err) {
    setError('Lỗi khi tìm kiếm sách');
  } finally {
    setLoading(false);
  }
};


useEffect(() => {
  if (search.trim() !== '') {
    handleSearch();
  }
}, [filters]);
  const renderBookItem = ({ item }: any) => (
    <View style={styles.bookItem}>
      <Image source={{ uri:`http://10.0.2.2:8080/storage/upload/${item.image}`}} style={styles.bookImage} />
      <Text style={styles.bookTitle} numberOfLines={2}>{item.title}</Text>
      <Text style={styles.bookPrice}>{item.price}</Text>
      <View style={styles.bookInfo}>
        <Text style={styles.bookRating}>⭐ {item.rating}</Text>
        <Text style={styles.bookSold}>Sold {item.sold}k</Text>
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

{previousSearches.length > 0 && (
  <>
    <Text style={styles.sectionTitle}>Previous search</Text>
    {previousSearches.map((item, index) => (
      <View key={index} style={styles.historyItem}>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => {
            setSearch(item);
            handleSearch();
          }}
        >
          <Text style={styles.historyText}>{item}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteHistoryItem(index)}>
          <Ionicons name="close" size={16} color="#aaa" />
        </TouchableOpacity>
      </View>
    ))}
  </>
)}

        {/* Search Results */}
        <Text style={styles.sectionTitle}>Search results</Text>
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
      aspectRatio: 2 / 3,
      borderRadius: 8,
      marginBottom: 8,
      resizeMode: 'cover',
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
