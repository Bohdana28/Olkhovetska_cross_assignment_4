import { ScrollView, View, StyleSheet } from 'react-native';
import { useState } from 'react';

import CustomButton from './src/components/CustomButton';
import EventCard from './src/components/EventCard';
import SearchBar from './src/components/SearchBar';
import CategoryList from './src/components/CategoryList';
import BookingItem from './src/components/BookingItem';
import TabBar from './src/components/TabBar';
import EventInfo from './src/components/EventInfo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },

  content: {
    gap: 16,
    paddingBottom: 24,
  },

  tabBar: {
    paddingVertical: 12,
  },
});

function App() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Music');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('Home');

  const categories = ['Music', 'Sports', 'Festival', 'Art', 'Theatre'];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <CustomButton
          title="Apply Filters"
          variant="primary"
          onPress={() => alert('Primary')}
        />

        <CustomButton
          title="Book ticket"
          variant="secondary"
          onPress={() => alert('Secondary')}
        />

        <EventCard
          title="Sheffield Music Festival"
          imageUrl={require('./assets/images/festival.jpg')}
          date="Sep 20"
          location="Sheffield, UK"
        />

        <SearchBar
          value={search}
          onChangeText={setSearch}
        />

        <CategoryList
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <BookingItem
          title="Sheffield Music Festival"
          imageUrl={require('./assets/images/festival.jpg')}
          date="Sep 20 · 18:00"
          location="Sheffield, UK"
          ticketType="General Admission"
          quantity={quantity}
          price={25}
          onQuantityChange={setQuantity}
        />

        <EventInfo
          title="Sheffield Music Festival"
          price={25}
          description="Join us for an unforgettable day of live music, great food and amazing people."
          time="18:00"
          location="Sheffield, UK"
          date="September 20, 2026"
        />
      </ScrollView>

      <View style={styles.tabBar}>
        <TabBar
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </View>
    </View>
  );
}

export default App;