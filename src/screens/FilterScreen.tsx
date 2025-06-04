import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { bookApi } from '../api/api'; // giả sử bạn đã có api tương tự

const CustomButton = ({ title, onPress }: { title: string; onPress: () => void }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const TABS = ['Sort', 'Price', 'Rating', 'Genre'] as const;
type TabType = typeof TABS[number];

export default function FilterScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('Sort');
  const [sortOption, setSortOption] = useState('');
  const [priceOptions, setPriceOptions] = useState<string[]>([]);
  const [ratingOptions, setRatingOptions] = useState<string[]>([]);
  const [genreOptions, setGenreOptions] = useState<string[]>([]);

  const toggleOption = (value: string, state: string[], setState: (s: string[]) => void) => {
    if (state.includes(value)) {
      setState(state.filter((item) => item !== value));
    } else {
      setState([...state, value]);
    }
  };

  const renderCheckboxRow = (
    label: string,
    checked: boolean,
    onPress: () => void
  ) => (
    <View key={label}>
      <TouchableOpacity style={styles.checkboxRow} onPress={onPress}>
        <MaterialIcons
          name={checked ? 'check-box' : 'check-box-outline-blank'}
          size={24}
          color={checked ? RED : '#888'}
        />
        <Text style={[styles.optionText, checked && styles.optionTextActive]}>
          {label}
        </Text>
      </TouchableOpacity>
      <View style={styles.separator} />
    </View>
  );

  // Hàm chuyển sortOption thành query sort API (ví dụ)
  const mapSortOptionToApi = (option: string) => {
    switch (option) {
      case 'New releases':
        return 'sort=releaseDate,desc';
      case 'Highest Rating':
        return 'sort=rating,desc';
      case 'Lowest Rating':
        return 'sort=rating,asc';
      case 'Highest Price':
        return 'sort=price,desc';
      case 'Lowest Price':
        return 'sort=price,asc';
      default:
        return '';
    }
  };

  // Hàm build filter query string cho price/rating/genre
  const buildFilterQuery = () => {
   let filters: string[] = [];

    // Price filter, ví dụ: price>=0 and price<=100000
    priceOptions.forEach((price) => {
      switch (price) {
        case '0-100.000VNĐ':
          filters.push('(price>=0 and price<=100000)');
          break;
        case '100.000-300.000VNĐ':
          filters.push('(price>100000 and price<=300000)');
          break;
        case '300.000-500.000VNĐ':
          filters.push('(price>300000 and price<=500000)');
          break;
        case '>500.000VNĐ':
          filters.push('(price>500000)');
          break;
      }
    });

    // Rating filter, ví dụ: rating>4 or (rating>=3 and rating<=4)
    ratingOptions.forEach((rating) => {
      switch (rating) {
        case '>4.0':
          filters.push('(rating>4)');
          break;
        case '3.0 - 4.0':
          filters.push('(rating>=3 and rating<=4)');
          break;
        case '2.0 - 3.0':
          filters.push('(rating>=2 and rating<=3)');
          break;
        case '<2.0':
          filters.push('(rating<2)');
          break;
      }
    });

    // Genre filter, ví dụ genre='Fantasy'
    genreOptions.forEach((genre) => {
      filters.push(`(genre='${genre}')`);
    });

    // Nối các filter lại với or giữa các option trong cùng nhóm và and giữa nhóm
    // Ví dụ: (price filters) and (rating filters) and (genre filters)
    // Nếu có nhiều option trong cùng nhóm thì nối bằng or, nhóm khác nối bằng and

    // Các nhóm filter sẽ là một mảng chứa string or...
    const groupedFilters = [];

    // Price
    if (priceOptions.length > 0) {
      groupedFilters.push(`(${filters.filter(f => f.includes('price')).join(' or ')})`);
    }

    // Rating
    if (ratingOptions.length > 0) {
      groupedFilters.push(`(${filters.filter(f => f.includes('rating')).join(' or ')})`);
    }

    // Genre
    if (genreOptions.length > 0) {
      groupedFilters.push(`(${filters.filter(f => f.includes('genre')).join(' or ')})`);
    }

    return groupedFilters.join(' and ');
  };

  const handleApply = async () => {
    try {
      let filterQuery = buildFilterQuery(); // vd: (price=...) and (rating=...) and (genre=...)
      const sortQuery = mapSortOptionToApi(sortOption);

      // Kết hợp filter và sort thành query param
      let query = '';
      if (filterQuery) query += `filter=${encodeURIComponent(filterQuery)}`;
      if (sortQuery) query += (query ? '&' : '') + sortQuery;

      console.log('Final query:', query);

      // Gọi API filter sách
      // Giả sử bookApi.filterBooks nhận param query string:
      const data = await bookApi.filterBooks(query);
      console.log('Filtered books:', data);

      Alert.alert('Filter', `Tìm thấy ${data.length} cuốn sách`);

      // Ở đây bạn có thể chuyển dữ liệu về màn hình kết quả hoặc cập nhật state ở màn hình cha
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Có lỗi khi lọc sách');
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Sort':
        return ['New releases', 'Highest Rating', 'Lowest Rating', 'Highest Price', 'Lowest Price'].map((option) =>
          renderCheckboxRow(option, sortOption === option, () =>
            setSortOption(option)
          )
        );
      case 'Price':
        return ['0-100.000VNĐ', '100.000-300.000VNĐ', '300.000-500.000VNĐ', '>500.000VNĐ'].map((option) =>
          renderCheckboxRow(
            option,
            priceOptions.includes(option),
            () => toggleOption(option, priceOptions, setPriceOptions)
          )
        );
      case 'Rating':
        return ['>4.0', '3.0 - 4.0', '2.0 - 3.0', '<2.0'].map((option) =>
          renderCheckboxRow(
            option,
            ratingOptions.includes(option),
            () => toggleOption(option, ratingOptions, setRatingOptions)
          )
        );
      case 'Genre':
        return [
          'Nonfiction',
          'Action',
          'Advanture',
          'Comedy',
          'Romance',
          'Fantasy',
          'Horror',
          'Thriller',
        ].map((option) =>
          renderCheckboxRow(
            option,
            genreOptions.includes(option),
            () => toggleOption(option, genreOptions, setGenreOptions)
          )
        );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.tabsRow}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabButton,
              activeTab === tab ? styles.tabActive : styles.tabInactive,
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab ? styles.tabTextActive : styles.tabTextInactive,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.optionsContainer}>{renderTabContent()}</View>

      <CustomButton title="APPLY" onPress={handleApply} />
    </ScrollView>
  );
}

const RED = '#d32f2f';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  tabsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  tabButton: {
    borderWidth: 2,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: RED,
    marginBottom: 8,
  },
  tabActive: {
    backgroundColor: RED,
  },
  tabInactive: {
    backgroundColor: '#fff',
  },
  tabText: {
    fontWeight: '600',
    fontSize: 14,
  },
  tabTextActive: {
    color: '#fff',
  },
  tabTextInactive: {
    color: RED,
  },
  optionsContainer: {
    marginBottom: 30,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  optionText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#444',
  },
  optionTextActive: {
    color: RED,
    fontWeight: '600',
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
  },
  button: {
    backgroundColor: RED,
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
});
