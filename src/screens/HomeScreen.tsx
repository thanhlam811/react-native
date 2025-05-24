  import React, { useEffect, useState } from 'react';
  import {
    View,
    Text,
    FlatList,
    Image,
    StyleSheet,
    ActivityIndicator,
    TextInput,
    TouchableOpacity,
    ScrollView,
  } from 'react-native';
  import Icon from 'react-native-vector-icons/MaterialIcons';
  import { bookApi } from '../api/api';
  import { Book } from '../types/Book';
  import { SafeAreaView } from 'react-native-safe-area-context';
  import { useNavigation } from '@react-navigation/native';

  const genres = [
    { id: '1', name: 'Fiction', image: 'https://via.placeholder.com/80' },
    { id: '2', name: 'Business', image: 'https://via.placeholder.com/80' },
    { id: '3', name: 'Romance', image: 'https://via.placeholder.com/80' },
    { id: '4', name: 'Sci-Fi', image: 'https://via.placeholder.com/80' },
  ];

  const HomeScreen = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation<any>();

    useEffect(() => {
    bookApi.getAll().then((data) => {
      setBooks(data);
      setLoading(false);
    });
  }, []);


    const renderBookItem = ({ item }: { item: Book }) => (
      <TouchableOpacity
        onPress={() => navigation.navigate('BookDetail', { book: item })}
        style={styles.bookCard}
      >
        <Image
          source={{ uri: `http://10.0.2.2:8080/uploads/${item.image}` }}
          style={styles.bookImage}
        />
        <Text style={styles.bookTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.bookPrice}>{item.sellingPrice}đ</Text>
        <View style={styles.ratingRow}>
          <Icon name="star" size={16} color="#FFD700" />
          <Text style={styles.ratingText}>4.5</Text>
          <Text style={styles.soldText}>Sold: 100</Text>
        </View>
      </TouchableOpacity>
    );

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <ScrollView style={styles.container}>
          {/* Header */}
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.greeting}>Hello, 👋🏻</Text>
              <Text style={styles.heading}>Keep Exploring</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
              <Icon name="notifications-none" size={28} color="#333" />
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View style={styles.searchBar}>
            <Icon name="search" size={20} color="#888" />
            <TextInput style={styles.searchInput} placeholder="Search" />
            <TouchableOpacity onPress={() => navigation.navigate('Filter')}>
              <Icon name="tune" size={20} color="#888" />
            </TouchableOpacity>
          </View>

          {/* Genres */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Explore by Genre</Text>
            <Text style={styles.seeAll}>See all</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }}>
            {genres.map((genre) => (
              <View key={genre.id} style={styles.genreCard}>
                <Image source={{ uri: genre.image }} style={styles.genreImage} />
                <Text>{genre.name}</Text>
              </View>
            ))}
          </ScrollView>

          {/* Recommended Section */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recommended For You</Text>
            <Text style={styles.seeAll}>See all</Text>
          </View>
          {loading ? (
            <ActivityIndicator size="large" />
          ) : (
            <FlatList
              data={books}
              renderItem={renderBookItem}
              keyExtractor={(item) => item.bookId.toString()}
              numColumns={2}
              scrollEnabled={false}
              contentContainerStyle={{ gap: 10 }}
              columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 16 }}
            />
          )}

          {/* Placeholder Sections */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>On your Purchased</Text>
            <Text style={styles.seeAll}>See all</Text>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>On your Wishlist</Text>
            <Text style={styles.seeAll}>See all</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };

  const styles = StyleSheet.create({
    container: { padding: 20, backgroundColor: '#fff' },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    greeting: { color: '#999', fontSize: 16 },
    heading: { fontSize: 24, fontWeight: 'bold', color: '#000' },
    searchBar: {
      flexDirection: 'row',
      backgroundColor: '#f1f1f1',
      borderRadius: 10,
      paddingHorizontal: 10,
      paddingVertical: 8,
      alignItems: 'center',
      marginBottom: 20,
    },
    searchInput: { flex: 1, marginHorizontal: 10 },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    sectionTitle: { fontWeight: 'bold', fontSize: 18 },
    seeAll: { color: '#999' },
    genreCard: {
      alignItems: 'center',
      marginRight: 16,
    },
    genreImage: {
      width: 80,
      height: 80,
      borderRadius: 8,
      marginBottom: 4,
    },
    bookCard: {
      backgroundColor: '#f9f9f9',
      borderRadius: 10,
      padding: 10,
      width: '48%',
    },
    bookImage: {
      width: '100%',
      height: 150,
      borderRadius: 8,
      marginBottom: 8,
    },
    bookTitle: { fontWeight: 'bold', fontSize: 14 },
    bookPrice: { color: 'red', marginVertical: 4 },
    ratingRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    ratingText: {
      marginLeft: 4,
      fontSize: 12,
    },
    soldText: {
      marginLeft: 'auto',
      fontSize: 12,
      color: '#555',
    },
  });

  export default HomeScreen;
