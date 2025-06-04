import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // hoặc 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
 import Icon from 'react-native-vector-icons/MaterialIcons';

const previousSearches = [
  'Tôi thấy hoa vàng trên cỏ xanh',
  'Harry Potter and the Half Blood Prince',
  'The Lord of the rings',
  'Mắt Biếc',
];

const popularBooks = [
  {
    id: '1',
    title: 'Mùa hè không tên',
    price: '90.000đ',
    rating: 4.5,
    sold: 1.8,
    image: 'https://upload.wikimedia.org/wikipedia/vi/9/98/T%C3%B4i_l%C3%A0_B%C3%AAt%C3%B4.jpg',
  },
  {
    id: '2',
    title: 'Tôi thấy hoa vàng trên cỏ xanh',
    price: '90.000đ',
    rating: 4.5,
    sold: 1.1,
    image: 'https://upload.wikimedia.org/wikipedia/vi/9/98/T%C3%B4i_l%C3%A0_B%C3%AAt%C3%B4.jpg',
  },
  {
    id: '3',
    title: 'Làm bạn với bầu trời',
    price: '90.000đ',
    rating: 4.5,
    sold: 1.6,
    image: 'https://upload.wikimedia.org/wikipedia/vi/9/98/T%C3%B4i_l%C3%A0_B%C3%AAt%C3%B4.jpg',
  },
  {
    id: '4',
    title: 'Trên đỉnh một mái nhà',
    price: '90.000đ',
    rating: 4.5,
    sold: 1.3,
    image: 'https://upload.wikimedia.org/wikipedia/vi/9/98/T%C3%B4i_l%C3%A0_B%C3%AAt%C3%B4.jpg',
  },
];

const SearchScreen = () => {
  const [search, setSearch] = useState('');
  const navigation = useNavigation<any>();


  const renderBookItem = ({ item }: any) => (
    <View style={styles.bookItem}>
      <Image source={item.image} style={styles.bookImage} />
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
            placeholder="Search"
            style={styles.input}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Ionicons name="close" size={16} color="#888" />
            </TouchableOpacity>
            
          )}

        <TouchableOpacity onPress={() => navigation.navigate('Filter')}>
              <Icon name="tune" size={20} color="#888" />
            </TouchableOpacity>
        </View>
      </View>

      {/* Previous search */}
      <Text style={styles.sectionTitle}>Previous Search</Text>
      {previousSearches.map((item, index) => (
        <View key={index} style={styles.historyItem}>
          <Text style={styles.historyText}>{item}</Text>
          <TouchableOpacity>
            <Ionicons name="close" size={16} color="#aaa" />
          </TouchableOpacity>
        </View>
      ))}

      {/* Popular Books */}
      <Text style={styles.sectionTitle}>Popular Books</Text>
      <FlatList
        data={popularBooks}
        keyExtractor={(item) => item.id}
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
  safeArea: {
  flex: 1,
  backgroundColor: '#fff',
},

});
