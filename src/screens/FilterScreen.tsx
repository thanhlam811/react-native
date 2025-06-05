import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Hoặc 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'; // thêm nếu chưa có


const CustomButton = ({ title, onPress }: { title: string; onPress: () => void }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const TABS = ['Sort', 'Price', 'Rating', 'Genre'] as const;
type TabType = typeof TABS[number];
const sortMap: Record<string, string> = {
  'New releases': 'sort=createdAt,desc',
  'Highest Rating': 'sort=avgRate,desc',
  'Lowest Rating': 'sort=avgRate,asc',
  'Highest Price': 'sort=sellingPrice,desc',
  'Lowest Price': 'sort=sellingPrice,asc',
};

export default function FilterScreen() {
  const navigation = useNavigation<any>();
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
const getPriceFilterQuery = () => {
  const queries: string[] = [];

  priceOptions.forEach((priceRange) => {
    switch (priceRange) {
      case '0-100.000VNĐ':
        queries.push('sellingPrice<101');
        break;
      case '100.000-300.000VNĐ':
        queries.push('sellingPrice>100 and sellingPrice<301');
        break;
      case '300.000-500.000VNĐ':
        queries.push('sellingPrice>300 and sellingPrice<500');
        break;
      case '>500.000VNĐ':
        queries.push('sellingPrice>500');
        break;
    }
  });

  return queries.join('and'); // nối bằng dấu phẩy để backend hiểu là AND
};

const handleApply = () => {
  const sortQuery = sortMap[sortOption];
  const priceFilter = getPriceFilterQuery();
  const filters = {
    sort: sortQuery, // VD: "sort=avgRate,desc"
    price: priceFilter,
    rating: ratingOptions,
    genre: genreOptions,
  };
    console.log(filters)
  navigation.navigate('Search', { filters }); // 👈 Truyền sang SearchScreen
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