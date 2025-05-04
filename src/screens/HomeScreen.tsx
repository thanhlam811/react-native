import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { getBooks } from '../api/bookApi';
import { Book } from '../types/Book';

const HomeScreen = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBooks().then((data) => {
      setBooks(data);
      setLoading(false);
    });
  }, []);

  const renderItem = ({ item }: { item: Book }) => (
    <View style={styles.item}>
      <Image source={{ uri: `http://10.0.2.2:8080/uploads/${item.image}` }} style={styles.image} />
      <View style={{ marginLeft: 10 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text>{item.author}</Text>
        <Text>Giá: {item.sellingPrice}đ</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Danh sách sách</Text>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={books}
          keyExtractor={(item) => item.bookId.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, paddingTop: 50, flex: 1 },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  item: { flexDirection: 'row', marginBottom: 15, alignItems: 'center' },
  image: { width: 60, height: 80, borderRadius: 4 },
  title: { fontWeight: 'bold', fontSize: 16 },
});

export default HomeScreen;
