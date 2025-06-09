import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { Book } from '../types/Book';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { cartDetailsApi } from '../api/api';


type BookDetailRouteProp = RouteProp<{ params: { book: Book } }, 'params'>;

type Feedback = {
  feedbackId: number;
  feedback: string;
  rate: number;
  createdAt: string;
  user: {
    userId: number;
    avatar: string | null;
    firstName: string;
    lastName: string;
  };
};

const BookDetailScreen = () => {
  const route = useRoute<BookDetailRouteProp>();
  const { book } = route.params;
  const navigation = useNavigation<any>();

  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      setLoading(true);
      try {
        // Thay url nếu cần phù hợp môi trường phát triển
        const response = await fetch(`http://10.0.2.2:8080/api/feedbacks?filter=book:${book.bookId}`);
        const json = await response.json();
        if (json.statusCode === 200 && json.data && json.data.data) {
          setFeedbacks(json.data.data);
        } else {
          ToastAndroid.show('Failed to load feedbacks', ToastAndroid.SHORT);
        }
      } catch (error) {
        ToastAndroid.show('Error fetching feedbacks', ToastAndroid.SHORT);
        console.error('Fetch feedbacks error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeedbacks();
  }, [book.bookId]);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={styles.container}>
   <View style={styles.imageContainer}>
          <Image
            source={{ uri: `http://10.0.2.2:8080/storage/upload/${book.image}` }}
            style={styles.image}
          />
          <View style={styles.topRightButtons}>
            <TouchableOpacity style={styles.iconButton}>
              <Icon name="share" size={24} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Cart')}>
              <Icon name="shopping-cart" size={24} color="#333" />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.title}>{book.title}</Text>

        <View style={styles.priceRow}>
          <Text style={styles.price}>{book.sellingPrice}đ</Text>
          <Text style={styles.originalPrice}>{book.listPrice || book.sellingPrice * 1.2}đ</Text>
        </View>

        <Text style={styles.sectionTitle}>Descriptions</Text>
        <Text style={styles.description}>{book.description || 'No description available.'}</Text>

        <Text style={styles.sectionTitle}>Ratings & Reviews</Text>

        {loading ? (
          <ActivityIndicator size="small" color="#000" />
        ) : (
          feedbacks.length === 0 ? (
            <Text>No feedbacks available.</Text>
          ) : (
            feedbacks.map(fb => (
              <View key={fb.feedbackId} style={styles.reviewItem}>
                <View style={styles.reviewHeader}>
                  <Image
                    source={{
                      uri: fb.user.avatar
                        ? `http://10.0.2.2:8080/storage/upload/${fb.user.avatar}`
                        : 'https://via.placeholder.com/40',
                    }}
                    style={styles.avatar}
                  />
                  <View style={{ flex: 1, marginLeft: 8 }}>
                    <Text style={styles.userName}>
                      {fb.user.firstName} {fb.user.lastName}
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                      {[...Array(5)].map((_, i) => (
                        <Icon
                          key={i}
                          name="star"
                          size={16}
                          color={i < Math.round(fb.rate) ? '#FFD700' : '#ccc'}
                        />
                      ))}
                    </View>
                  </View>
                  <Text style={styles.reviewDate}>
                    {new Date(fb.createdAt).toLocaleDateString()}
                  </Text>
                </View>
                <Text style={styles.reviewText}>{fb.feedback}</Text>
              </View>
            ))
          )
        )}
      </ScrollView>

      {/* Bottom Action Bar (giữ nguyên như cũ) */}
      <View style={styles.bottomBar}>
        <View style={styles.leftIcons}>
          <TouchableOpacity style={styles.actionIcon}>
            <Icon name="favorite-border" size={24} color="#333" />
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity
            style={styles.actionIcon}
            onPress={async () => {
              try {
                await cartDetailsApi.addToCart(book.bookId, 1);
                ToastAndroid.show('Added to cart!', ToastAndroid.SHORT);
                navigation.navigate('Cart', { refresh: true });
              } catch (err) {
                ToastAndroid.show('Add to cart failed', ToastAndroid.SHORT);
                console.error('❌ Add to cart error:', err);
              }
            }}
          >
            <Icon name="add-shopping-cart" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.buyNowButton}
          onPress={() => {
            navigation.navigate('Payment', {
              bookId: book.bookId,
              quantity: 1,
            });
          }}
        >
          <Text style={styles.buyNowText}>BUY NOW</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 80, // đảm bảo không che nội dung bởi bottom bar
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: '60%',
    aspectRatio: 2 / 3,
    borderRadius: 8,
    marginBottom: 8,
    resizeMode: 'cover',
  },
  topRightButtons: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    gap: 10,
  },
  iconButton: {
    marginLeft: 10,
    backgroundColor: '#fff',
    padding: 6,
    borderRadius: 20,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  price: {
    fontSize: 18,
    color: 'red',
    fontWeight: 'bold',
  },
  originalPrice: {
    fontSize: 16,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  ratingStars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
  },
  soldText: {
    fontSize: 14,
    color: '#555',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop:20,
  },
  description: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  leftIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 50,
    marginHorizontal: 5,
  },
  separator: {
    width: 1,
    height: 20,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  buyNowButton: {
    flex: 1,
    backgroundColor: '#FF6F61',
    paddingVertical: 12,
    borderRadius: 8,
    marginLeft: 10,
    alignItems: 'center',
  },
  buyNowText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
    reviewSummary: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 16,
  },
  reviewLeft: {
    alignItems: 'center',
    width: 80,
  },
  reviewScore: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  reviewStars: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  reviewCount: {
    fontSize: 12,
    color: '#666',
  },
  reviewBars: {
    flex: 1,
    justifyContent: 'center',
    gap: 4,
  },
  reviewBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  barLabel: {
    width: 20,
    fontSize: 12,
    color: '#333',
  },
  barBackground: {
    height: 8,
    backgroundColor: '#eee',
    flex: 1,
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: 8,
    backgroundColor: '#FF6F61',
  },
  reviewItem: {
    marginBottom: 20,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  reviewDate: {
    fontSize: 12,
    color: '#999',
  },
  reviewText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  reviewImages: {
    flexDirection: 'row',
    gap: 8,
  },
  reviewImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },

});

export default BookDetailScreen;
