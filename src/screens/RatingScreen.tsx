import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createFeedback } from '../api/api'; // đảm bảo đúng path

const RatingScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { order } = route.params as any;

  const [userId, setUserId] = useState<number | null>(null);

  const [ratings, setRatings] = useState(() =>
    order.details.map((detail: any) => ({
      bookId: detail.book.bookId,
      rate: 0,
      feedback: '',
    }))
  );

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await AsyncStorage.getItem('userId');
      if (id) setUserId(Number(id));
    };
    fetchUserId();
  }, []);

  const handleRatingChange = (index: number, rate: number) => {
    const updated = [...ratings];
    updated[index].rate = rate;
    setRatings(updated);
  };

  const handleFeedbackChange = (index: number, text: string) => {
    const updated = [...ratings];
    updated[index].feedback = text;
    setRatings(updated);
  };

  const handleSubmit = async () => {
    if (!userId) {
      Alert.alert('Lỗi', 'Không tìm thấy userId');
      return;
    }

    try {
      for (let i = 0; i < ratings.length; i++) {
        const r = ratings[i];
        if (r.rate === 0 || !r.feedback.trim()) {
          Alert.alert('Thông báo', 'Vui lòng đánh giá và nhập nhận xét cho tất cả sản phẩm.');
          return;
        }
      }

      for (const r of ratings) {
        await createFeedback({
          bookId: r.bookId,
          userId: userId,
          rate: r.rate,
          feedback: r.feedback,
        });
      }

      Alert.alert('Thành công', 'Đánh giá của bạn đã được gửi.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể gửi đánh giá.');
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Đánh giá đơn hàng #{order.orderId}</Text>

      {order.details.map((detail: any, index: number) => (
        <View key={index} style={styles.card}>
          <Image
            source={{ uri: `http://10.0.2.2:8080/storage/upload/${detail.book.image}` }}
            style={styles.image}
          />
          <View style={styles.info}>
            <Text style={styles.title}>{detail.book.title}</Text>
            <View style={styles.stars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                  key={star}
                  onPress={() => handleRatingChange(index, star)}
                >
                  <Text style={{ fontSize: 24, color: star <= ratings[index].rate ? '#FFD700' : '#ccc' }}>
                    ★
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TextInput
              placeholder="Nhập nhận xét..."
              style={styles.input}
              value={ratings[index].feedback}
              onChangeText={(text) => handleFeedbackChange(index, text)}
              multiline
            />
          </View>
        </View>
      ))}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Gửi đánh giá</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 10,
  },
  image: {
    width: 70,
    height: 100,
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  stars: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    padding: 8,
    textAlignVertical: 'top',
    height: 80,
    backgroundColor: '#fff',
  },
  submitButton: {
    backgroundColor: 'red',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default RatingScreen;
