import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { FlashList } from '@shopify/flash-list';
import { StyleSheet, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import FullWidthFoodItem from '@/components/food_details/FullWidthFoodItem';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import Row from '@/components/Row';
import { GapRow } from '@/components/Gap';
import { useNavigation, useRouter } from 'expo-router';
import { useLayoutEffect, useState, useEffect } from 'react';
import appStyles from '@/constants/Styles';
import FilterModal from '@/components/FilterModal';
import { useHomeStore } from '@/providers/home_store';
import { getRealDateTime } from '@/src/utils/helpers';
import useDebounce from '@/hooks/useDebounce';

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
    const router = useRouter();

    const [isFilterModalVisible, setFilterModalVisible] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    const {
        recentFoods,
        searchedFoods,
        isLoading,
        error,
        fetchRecentFoods,
        searchFoods,
        setSearchedFoods
    } = useHomeStore();


    useEffect(() => {
        if (recentFoods.length === 0) {
            fetchRecentFoods();
        }
    }, []);

    useEffect(() => {
        if (debouncedSearchQuery) {
            searchFoods(debouncedSearchQuery);
        } else {
            setSearchedFoods(recentFoods);
        }
    }, [debouncedSearchQuery, recentFoods]);

    const handleSelectFilter = (filter: string) => {
        setSelectedFilter(filter);
        setFilterModalVisible(false);
    };

    const listData = searchQuery ? searchedFoods : recentFoods;

    return (
        <ThemedView style={styles.container}>
            <Row style={{ alignItems: 'center', paddingHorizontal: 20, paddingTop: 20 }}>
                <TextInput
                    placeholder='Search for food...'
                    placeholderTextColor='#9A9A9A'
                    style={[styles.searchBar, { backgroundColor: isDarkMode ? '#171a1f' : '#FAFAFBFF', color: isDarkMode ? 'white' : 'black' }, appStyles.input]}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                >
                </TextInput>
                {/* <GapRow space={10} />
                <TouchableOpacity onPress={() => setFilterModalVisible(true)} style={[styles.filterButton, { backgroundColor: isDarkMode ? '#171a1f' : '#FAFAFBFF'}]}>
                    <Row style={{alignItems: 'center'}}>
                        <ThemedText>{selectedFilter || 'Filter'}</ThemedText>
                        <GapRow space={5} />
                        <IconSymbol name='chevron.down' size={16} color={Colors.primary} />
                    </Row>
                </TouchableOpacity> */}
            </Row>

            {isLoading && <ActivityIndicator style={{ marginTop: 20 }} />}

            {error && <ThemedText style={{ color: 'red', textAlign: 'center', marginTop: 20 }}>{error}</ThemedText>}

            <FlashList
                data={listData}
                style={{
                }}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => router.push(`/home/food-details?id=${item.id}`)}>
                        <FullWidthFoodItem
                            // id={item.id}
                            name={item.name}
                            type={item.safety_type ?? 'safe'}
                            description={item.details.description ?? item.details.whyAvoidDescription ?? 'No description available'}
                            image={item.image_url ?? "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                            date={getRealDateTime(new Date(item.created_at))}
                            source={item.sources}
                        />
                    </TouchableOpacity>
                )}
                contentContainerStyle={{ paddingVertical: 20 }}
                ListEmptyComponent={() => (
                    !isLoading && (
                        <ThemedView style={styles.emptyContainer}>
                            <ThemedText>No foods found.</ThemedText>
                        </ThemedView>
                    )
                )}
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
        paddingHorizontal: 15,
        borderRadius: 6,
    },
    filterButton: {
        padding: 8,
        borderRadius: 6,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    }
});
