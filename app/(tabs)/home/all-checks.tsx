import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { FlashList } from '@shopify/flash-list';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import FullWidthFoodItem from '@/components/food_details/FullWidthFoodItem';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import Row from '@/components/Row';
import { GapRow } from '@/components/Gap';
import { useNavigation } from 'expo-router';
import { useLayoutEffect, useState } from 'react';
import appStyles from '@/constants/Styles';
import FilterModal from '@/components/FilterModal';

type FoodDataItem = {
    id: string;
    name: string;
    type: 'safe' | 'limit' | 'avoid';
    description: string;
    image: string;
    date: string;
    source: string;
};

const mockFoodData: FoodDataItem[] = [
    {
        id: '1',
        name: 'Grilled Salmon',
        type: 'safe',
        description: 'Rich in omega-3s',
        image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        date: "2 hours ago",
        source: "Source: NHS, WHO • Verified Today",
    },
    {
        id: '2',
        name: 'Avocado Toast',
        type: 'safe',
        description: 'Healthy fats and fiber',
        image: "https://images.unsplash.com/photo-1584365685244-9adeb5a42142?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        date: "3 hours ago",
        source: "Source: FDA, CDC • Verified Today",
    },
    {
        id: '3',
        name: 'Quinoa Salad',
        type: 'limit',
        description: 'Complete protein source',
        image: "https://images.unsplash.com/photo-1551248429-4097c68298b7?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        date: "5 hours ago",
        source: "Source: EPA, FDA • Verified Today",
    },
    {
        id: '4',
        name: 'Greek Yogurt',
        type: 'avoid',
        description: 'Probiotics and calcium',
        image: "https://images.unsplash.com/photo-1562119479-aa2403487351?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        date: "1 day ago",
        source: "Source: American Pregnancy Association • Verified Yesterday",
    },
];

const filterCategories = [
    'Soups & Stews',
    'Grains & Swallow',
    'Snacks',
    'Fruits & Vegetables',
    'Soft Drinks',
    'Handmade Drinks (Agbo, Zobo, etc.)',
];

export default function AllChecksScreen() {
    const isDarkMode = useColorScheme() === 'dark';
    const navigation = useNavigation();
    const [isFilterModalVisible, setFilterModalVisible] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

    useLayoutEffect(() => {
            navigation.setOptions({
                title: 'All Foods',

            });
        }, [navigation]);

    const handleSelectFilter = (filter: string) => {
        setSelectedFilter(filter);
        setFilterModalVisible(false);
    };

    return (
        <ThemedView style={styles.container}>
            <Row style={{ alignItems: 'center', paddingHorizontal: 20, paddingTop: 20 }}>
                <TextInput
                    placeholder='Search for food...'
                    placeholderTextColor='#9A9A9A'
                    style={[styles.searchBar, { backgroundColor: isDarkMode ? '#171a1f' : '#FAFAFBFF', color: isDarkMode ? 'white' : 'black' }, appStyles.input]}>
                </TextInput>
                <GapRow space={10} />
                <TouchableOpacity onPress={() => setFilterModalVisible(true)} style={[styles.filterButton, { backgroundColor: isDarkMode ? '#171a1f' : '#FAFAFBFF'}]}>
                    <Row style={{alignItems: 'center'}}>
                        <ThemedText>{selectedFilter || 'Filter'}</ThemedText>
                        <GapRow space={5} />
                        <IconSymbol name='chevron.down' size={16} color={Colors.primary} />
                    </Row>
                </TouchableOpacity>
            </Row>
            <FlashList
                data={mockFoodData}
                renderItem={({ item }) => <FullWidthFoodItem {...item} />}

                contentContainerStyle={{ padding: 20 }}
            />
            <FilterModal
                visible={isFilterModalVisible}
                onClose={() => setFilterModalVisible(false)}
                onSelectFilter={handleSelectFilter}
                filters={filterCategories}
            />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchBar: {
        flex: 1,
        // height: 40,
        paddingHorizontal: 15,
        borderRadius: 6,
    },
    filterButton: {
        padding: 8,
        borderRadius: 6,
    }
});
