import { ThemedText } from '@/components/ThemedText';
import React, { useState, useEffect } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    useColorScheme
} from 'react-native';
import { useHomeStore } from '@/providers/home_store';
import { getRecentQuestions, searchQuestions, getRecentFoods, searchFoodsByName } from '@/core/services/supabaseService';
import useDebounce from '@/hooks/useDebounce';

// --- TYPE DEFINITIONS ---
interface Food {
    id: string;
    name: string;
    description: string;
    safety_type: 'safe' | 'caution' | 'avoid';
}

interface Question {
    id: string;
    question: string;
}

// --- COMPONENTS ---
const FoodCard = ({ item, onPress, isDarkMode }: { item: Food, onPress: () => void, isDarkMode: boolean }) => (
    <TouchableOpacity
        onPress={onPress}
        style={[styles.foodCard, { backgroundColor: isDarkMode ? '#2a2a2a' : '#ffffff' }]}
    >
        <View style={styles.foodCardContent}>
            <View style={[styles.foodIconContainer, {
                backgroundColor: item.safety_type === 'safe' ? '#e8f5e9' :
                    item.safety_type === 'caution' ? '#fff3e0' : '#ffebee'
            }]}>
                <ThemedText style={{ fontSize: 24 }}>
                    {item.safety_type === 'safe' ? '✓' :
                        item.safety_type === 'caution' ? '⚠' : '✕'}
                </ThemedText>
            </View>
            <View style={styles.foodCardText}>
                <ThemedText style={styles.foodName}>{item.name}</ThemedText>
                <ThemedText style={styles.foodDescription} numberOfLines={2}>
                    {item.description}
                </ThemedText>
            </View>
            <View style={styles.arrowIcon}>
                <ThemedText style={{ opacity: 0.4, fontSize: 18 }}>→</ThemedText>
            </View>
        </View>
    </TouchableOpacity>
);

const QuestionCard = ({ question, onPress, isDarkMode }: { question: Question, onPress: () => void, isDarkMode: boolean }) => (
    <TouchableOpacity
        onPress={onPress}
        style={[styles.questionCard, { backgroundColor: isDarkMode ? '#2a2a2a' : '#ffffff' }]}
    >
        <View style={styles.questionIconContainer}>
            <ThemedText style={{ fontSize: 20 }}>💬</ThemedText>
        </View>
        <ThemedText style={styles.questionText}>{question.question}</ThemedText>
        <View style={styles.arrowIcon}>
            <ThemedText style={{ opacity: 0.4, fontSize: 18 }}>→</ThemedText>
        </View>
    </TouchableOpacity>
);

// --- MAIN SCREEN ---
export default function UnifiedSearchScreen() {
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';

    const [searchMode, setSearchMode] = useState('food');
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedQuery = useDebounce(searchQuery, 500);

    const [isLoading, setIsLoading] = useState(false);
    const [searchResults, setSearchResults] = useState<(Food | Question)[]>([]);
    const [popularFoods, setPopularFoods] = useState<Food[]>([]);
    const [popularQuestions, setPopularQuestions] = useState<Question[]>([]);

    const { searchFoods } = useHomeStore();

    // Fetch initial popular data
    useEffect(() => {
        const fetchPopularData = async () => {
            setIsLoading(true);
            if (searchMode === 'food') {
                const { data } = await getRecentFoods();
                setPopularFoods(data as Food[] || []);
            } else {
                const { data } = await getRecentQuestions();
                setPopularQuestions(data as Question[] || []);
            }
            setIsLoading(false);
        };
        fetchPopularData();
    }, [searchMode]);

    // Handle search
    useEffect(() => {
        const performSearch = async () => {
            if (debouncedQuery) {
                setIsLoading(true);
                setSearchResults([]);
                if (searchMode === 'food') {
                    const { data } = await searchFoodsByName(debouncedQuery);
                    setSearchResults(data || []);
                } else {
                    const { data } = await searchQuestions(debouncedQuery);
                    setSearchResults(data || []);
                }
                setIsLoading(false);
            } else {
                setSearchResults([]);
            }
        };
        performSearch();
    }, [debouncedQuery, searchMode, searchFoods]);

    const handleModeToggle = (mode: 'food' | 'question') => {
        setSearchMode(mode);
        setSearchQuery('');
        setSearchResults([]);
    };

    const renderContent = () => {
        if (isLoading) {
            return (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="small" color="#ff9aac" />
                </View>
            );
        }

        if (searchQuery && searchResults.length > 0) {
            return (
                <View>
                    <ThemedText style={styles.sectionTitle}>Search Results</ThemedText>
                    {searchResults.map(item =>
                        searchMode === 'food' ? (
                            <FoodCard
                                key={(item as Food).id}
                                item={item as Food}
                                isDarkMode={isDarkMode}
                                onPress={() => console.log('Navigate to food:', (item as Food).id)}
                            />
                        ) : (
                            <QuestionCard
                                key={(item as Question).id}
                                question={item as Question}
                                isDarkMode={isDarkMode}
                                onPress={() => console.log('Navigate to question:', (item as Question).id)}
                            />
                        )
                    )}
                </View>
            );
        }

        if (searchQuery && !isLoading) {
            return (
                <View style={styles.emptyContainer}>
                    <ThemedText style={styles.emptyText}>
                        No results found for "{searchQuery}"
                    </ThemedText>
                </View>
            );
        }

        // Default popular content
        return (
            <View>
                <View style={styles.sectionHeader}>
                    <ThemedText style={{ fontSize: 20 }}>{searchMode === 'food' ? '⭐' : '💡'}</ThemedText>
                    <ThemedText style={styles.sectionTitle}>
                        {searchMode === 'food' ? 'Popular Foods' : 'Popular Questions'}
                    </ThemedText>
                </View>
                {searchMode === 'food'
                    ? popularFoods.map(food => (
                        <FoodCard
                            key={food.id}
                            item={food}
                            isDarkMode={isDarkMode}
                            onPress={() => console.log('Navigate to food:', food.id)}
                        />
                    ))
                    : popularQuestions.map(question => (
                        <QuestionCard
                            key={question.id}
                            question={question}
                            isDarkMode={isDarkMode}
                            onPress={() => console.log('Navigate to question:', question.id)}
                        />
                    ))}
            </View>
        );
    };

    return (
        <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={[styles.container, { backgroundColor: isDarkMode ? '#1a1a1a' : '#fafafa' }]}
            keyboardShouldPersistTaps="handled"
        >
            <View style={styles.header}>

                <ThemedText style={[styles.headerSubtitle, { opacity: 0.6 }]}>
                    {searchMode === 'food'
                        ? 'Find out if foods are safe during pregnancy'
                        : 'Get answers to your pregnancy questions'}
                </ThemedText>
            </View>

            <View style={styles.toggleContainer}>
                <View style={[styles.toggleWrapper, { backgroundColor: isDarkMode ? '#2a2a2a' : '#f0f0f0' }]}>
                    <TouchableOpacity
                        style={[
                            styles.toggleButton,
                            searchMode === 'food' && styles.toggleButtonActive,
                            searchMode === 'food' && { backgroundColor: '#ff9aac' }
                        ]}
                        onPress={() => handleModeToggle('food')}
                    >
                        <ThemedText style={[styles.toggleText, searchMode === 'food' && styles.toggleTextActive]}>
                            🍽️ Foods
                        </ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.toggleButton,
                            searchMode === 'question' && styles.toggleButtonActive,
                            searchMode === 'question' && { backgroundColor: '#ff9aac' }
                        ]}
                        onPress={() => handleModeToggle('question')}
                    >
                        <ThemedText style={[styles.toggleText, searchMode === 'question' && styles.toggleTextActive]}>
                            ❓ Questions
                        </ThemedText>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.searchSection}>
                <View style={[styles.searchBar, { backgroundColor: isDarkMode ? '#2a2a2a' : '#ffffff' }]}>
                    <View style={styles.searchIconContainer}>
                        <ThemedText style={{ fontSize: 18, opacity: 0.5 }}>🔍</ThemedText>
                    </View>
                    <TextInput
                        style={[styles.searchInput, { color: isDarkMode ? '#fff' : '#000' }]}
                        placeholder={searchMode === 'food' ? 'Search for a food...' : 'Ask your question...'}
                        placeholderTextColor={isDarkMode ? '#888' : '#999'}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        autoFocus={false}
                    />
                    {searchQuery !== '' && (
                        <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
                            <ThemedText style={{ opacity: 0.5 }}>✕</ThemedText>
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            <View style={styles.content}>{renderContent()}</View>

            {searchMode === 'food' && !searchQuery && (
                <View style={styles.legendContainer}>
                    <ThemedText style={styles.legendTitle}>Safety Guide</ThemedText>
                    <View style={styles.legendRow}>
                        <View style={styles.legendItem}>
                            <View style={[styles.legendIcon, { backgroundColor: '#e8f5e9' }]}><ThemedText>✓</ThemedText></View>
                            <ThemedText style={styles.legendText}>Safe</ThemedText>
                        </View>
                        <View style={styles.legendItem}>
                            <View style={[styles.legendIcon, { backgroundColor: '#fff3e0' }]}><ThemedText>⚠</ThemedText></View>
                            <ThemedText style={styles.legendText}>Caution</ThemedText>
                        </View>
                        <View style={styles.legendItem}>
                            <View style={[styles.legendIcon, { backgroundColor: '#ffebee' }]}><ThemedText>✕</ThemedText></View>
                            <ThemedText style={styles.legendText}>Avoid</ThemedText>
                        </View>
                    </View>
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 16,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 8,
    },
    headerSubtitle: {
        fontSize: 15,
        lineHeight: 20,
    },
    toggleContainer: {
        paddingHorizontal: 24,
        marginBottom: 20,
    },
    toggleWrapper: {
        flexDirection: 'row',
        padding: 4,
        borderRadius: 12,
        gap: 4,
    },
    toggleButton: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    toggleButtonActive: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    toggleText: {
        fontSize: 15,
        fontWeight: '600',
        opacity: 0.6,
    },
    toggleTextActive: {
        fontWeight: '700',
        opacity: 1,
        color: '#ffffff',
    },
    searchSection: {
        paddingHorizontal: 24,
        marginBottom: 24,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    searchIconContainer: {
        marginRight: 12,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        padding: 0,
    },
    clearButton: {
        padding: 4,
    },
    content: {
        paddingHorizontal: 24,
        paddingBottom: 40,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 16,
    },
    foodCard: {
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 2,
    },
    foodCardContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    foodIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    foodCardText: {
        flex: 1,
    },
    foodName: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    foodDescription: {
        fontSize: 14,
        opacity: 0.7,
        lineHeight: 18,
    },
    questionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 2,
    },
    questionIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#fff0f3',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    questionText: {
        flex: 1,
        fontSize: 15,
        fontWeight: '500',
        lineHeight: 20,
    },
    arrowIcon: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
    loadingContainer: {
        paddingVertical: 40,
        alignItems: 'center',
    },
    emptyContainer: {
        paddingVertical: 40,
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        opacity: 0.6,
        textAlign: 'center',
    },
    legendContainer: {
        marginHorizontal: 24,
        marginTop: 24,
        marginBottom: 40,
        padding: 16,
        backgroundColor: '#f8f8f8',
        borderRadius: 12,
    },
    legendTitle: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 12,
        opacity: 0.7,
    },
    legendRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    legendItem: {
        alignItems: 'center',
    },
    legendIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 6,
    },
    legendText: {
        fontSize: 12,
        fontWeight: '500',
    },
});
