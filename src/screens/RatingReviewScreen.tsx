import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RatingReviewScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.back}>{'<'} Rate & review</Text>
      </TouchableOpacity>

      <Text style={styles.orderId}>Order ID: #0678AD3001</Text>

      <View style={styles.productCard}>
        <Image source={{ uri: 'https://example.com/book-cover.jpg' }} style={styles.image} />
        <View>
          <Text style={styles.title}>Harry Potter & the Deathly Hallows</Text>
          <Text style={styles.price}>198.000đ</Text>
          <Text style={styles.quantity}>Quality: 2</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>⭐ ⭐ ⭐ My Orders</Text>

      <Text style={styles.label}>Review</Text>
      <TextInput
        style={styles.input}
        multiline
        numberOfLines={5}
        placeholder="Write your review here..."
      />

      <View style={styles.imageRow}>
        <Image source={{ uri: 'https://example.com/image1.jpg' }} style={styles.uploadedImg} />
        <Image source={{ uri: 'https://example.com/image2.jpg' }} style={styles.uploadedImg} />
        <TouchableOpacity style={styles.uploadBox}>
          <Text style={styles.plus}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitText}>SUBMIT</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: 'white' },
  back: { fontSize: 16, fontWeight: 'bold', color: '#007bff', marginBottom: 10 },
  orderId: { fontWeight: 'bold', marginVertical: 10 },
  productCard: {
    flexDirection: 'row', backgroundColor: '#f9f9f9', borderRadius: 10,
    padding: 10, marginBottom: 16,
  },
  image: { width: 60, height: 80, borderRadius: 8, marginRight: 12 },
  title: { fontWeight: '600' },
  price: { fontWeight: 'bold', marginTop: 4 },
  quantity: { color: 'gray', fontSize: 12 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginVertical: 10 },
  label: { marginBottom: 5 },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 10,
    textAlignVertical: 'top', marginBottom: 16,
  },
  imageRow: {
    flexDirection: 'row', gap: 10, marginBottom: 20,
  },
  uploadedImg: { width: 60, height: 60, borderRadius: 8 },
  uploadBox: {
    width: 60, height: 60, borderRadius: 8, borderWidth: 1,
    borderColor: '#ccc', alignItems: 'center', justifyContent: 'center',
  },
  plus: { fontSize: 24, color: '#999' },
  submitButton: {
    backgroundColor: 'red', padding: 14, borderRadius: 8,
    alignItems: 'center', marginTop: 10,
  },
  submitText: { color: 'white', fontWeight: 'bold' },
});

export default RatingReviewScreen;
    