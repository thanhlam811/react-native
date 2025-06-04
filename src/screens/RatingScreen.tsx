import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const RatingScreen = () => {
  const navigation = useNavigation();
  const [rating, setRating] = useState(4.5);
  const [review, setReview] = useState('');
  const [images, setImages] = useState([
    { id: '1', uri: 'https://via.placeholder.com/60' },
    { id: '2', uri: 'https://via.placeholder.com/60' },
  ]);

  const handleAddImage = () => {
    // TODO: Chọn ảnh từ thư viện
  };

  const renderStars = () => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;

    return (
      <View style={{ flexDirection: 'row', marginVertical: 12 }}>
        {[...Array(fullStars)].map((_, i) => (
          <Ionicons key={i} name="star" size={24} color="#FACC15" />
        ))}
        {halfStar && <Ionicons name="star-half" size={24} color="#FACC15" />}
        {[...Array(5 - fullStars - (halfStar ? 1 : 0))].map((_, i) => (
          <Ionicons key={i + 10} name="star-outline" size={24} color="#FACC15" />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Rate & review</Text>
      </View>

      {/* Order Info */}
      <Text style={styles.orderId}>Order ID: #O678AD3001</Text>
      <View style={styles.bookCard}>
        <Image
          source={{ uri: 'https://upload.wikimedia.org/wikipedia/en/a/a9/Harry_Potter_and_the_Deathly_Hallows.jpg' }}
          style={styles.bookImage}
        />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.bookTitle}>Harry Potter & the Deathly Hallows</Text>
          <Text style={styles.bookPrice}>198.000 đ</Text>
          <Text style={styles.bookQuantity}>Quantity: 2</Text>
        </View>
      </View>

      {/* Star Rating */}
      {renderStars()}

      {/* Review Text */}
      <Text style={styles.label}>Review</Text>
      <TextInput
        value={review}
        onChangeText={setReview}
        multiline
        numberOfLines={5}
        style={styles.textArea}
        placeholder="Write your review here..."
      />

      {/* Images */}
      <View style={{ flexDirection: 'row', gap: 8, marginVertical: 16 }}>
        {images.map((img) => (
          <Image key={img.id} source={{ uri: img.uri }} style={styles.reviewImage} />
        ))}
        <TouchableOpacity style={styles.addImageBox} onPress={handleAddImage}>
          <Ionicons name="add" size={24} color="#aaa" />
        </TouchableOpacity>
      </View>

      {/* Submit */}
      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitText}>SUBMIT</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RatingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
  },
  orderId: {
    fontWeight: '600',
    marginBottom: 8,
  },
  bookCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    elevation: 2,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  bookImage: {
    width: 60,
    height: 90,
    borderRadius: 6,
  },
  bookTitle: {
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 4,
  },
  bookPrice: {
    color: '#D42A1B',
    fontWeight: '600',
  },
  bookQuantity: {
    color: '#666',
    fontSize: 12,
    marginTop: 4,
  },
  label: {
    fontWeight: '600',
    marginBottom: 6,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    textAlignVertical: 'top',
  },
  reviewImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  addImageBox: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButton: {
    backgroundColor: '#D42A1B',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
