import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface OrderCardProps {
  showCancel?: boolean;
  showWriteReview?: boolean;
}

const OrderCard: React.FC<OrderCardProps> = ({ showCancel, showWriteReview }) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.orderId}>Order ID: #O678AD3001</Text>
      <View style={styles.itemCard}>
        <Image
          source={{ uri: 'https://example.com/book-cover.jpg' }} // Thay bằng ảnh thực
          style={styles.image}
        />
        <View>
          <Text style={styles.title}>Harry Potter & the Deathly Hallows</Text>
          <Text style={styles.price}>198.000 đ</Text>
          <Text style={styles.quantity}>Quality: 2</Text>
        </View>
      </View>
      <Text style={styles.deliveryText}>Expected Delivery by Sunday, Apr 21, 2025</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.viewButton}>
          <Text style={styles.viewText}>View Order</Text>
        </TouchableOpacity>

        {showCancel && (
          <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        )}

        {showWriteReview && (
          <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.cancelText}>Write Review</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    padding: 12,
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  orderId: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  itemCard: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
  },
  image: {
    width: 60,
    height: 80,
    borderRadius: 8,
  },
  title: {
    fontWeight: '600',
    fontSize: 14,
  },
  price: {
    color: 'black',
    fontWeight: 'bold',
    marginTop: 4,
  },
  quantity: {
    color: 'gray',
    fontSize: 12,
    marginTop: 2,
  },
  deliveryText: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
  },
  viewButton: {
    backgroundColor: '#d00',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  viewText: {
    color: 'white',
    fontWeight: '600',
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: '#d00',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  cancelText: {
    color: '#d00',
    fontWeight: '600',
  },
});

export default OrderCard;
