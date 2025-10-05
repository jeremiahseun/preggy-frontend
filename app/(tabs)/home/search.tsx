import React, { useState } from 'react';
import { View, TextInput, StyleSheet, useColorScheme, TouchableOpacity, LayoutAnimation, UIManager, Platform, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedScrollView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faAppleAlt, faCommentDots, faMugHot, faCarrot, faCheese, faBreadSlice, faArrowRight, faArrowCircleRight, faCow, faPlantWilt } from '@fortawesome/free-solid-svg-icons';
import { GapColumn } from '@/components/Gap';
import Column from '@/components/Column';
import { useRouter } from 'expo-router';
import Row from '@/components/Row';


if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

type SearchMode = 'food' | 'question';

export default function SearchScreen() {
    const insets = useSafeAreaInsets();
    const isDarkMode = useColorScheme() === 'dark';
    const router = useRouter();
    const [searchMode, setSearchMode] = useState<SearchMode>('food');
    const [searchQuery, setSearchQuery] = useState('');
    const [activeSheet, setActiveSheet] = useState(null);


    const popularQuestions = [
        { id: 1, text: 'Is it safe to eat pineapple?', icon: faAppleAlt, color: '#FFB84D' },
        { id: 2, text: 'What are the benefits of eating salmon?', icon: faAppleAlt, color: '#FF8C69' },
        { id: 3, text: 'Can I drink coffee during pregnancy?', icon: faMugHot, color: '#8B6F47' },
    ];

    const popularFoods = [
        { id: 1, text: 'Fried Rice and Chicken', icon: faAppleAlt, color: '#FF6B6B' },
        { id: 2, text: 'Eba and Vegetable Soup', icon: faPlantWilt, color: '#4ECDC4' },
        { id: 3, text: 'Nutri Milk', icon: faCow, color: '#FFD166' },
        { id: 4, text: 'Bread and Butter', icon: faBreadSlice, color: '#A08A7B' },
    ];

    const handleModeChange = (mode: SearchMode) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setSearchMode(mode);
    };

    const handleSearchSubmit = () => {
        if (searchQuery.trim() === '') return;

        if (searchMode === 'food') {
            router.push({ pathname: '/(tabs)/home/search', params: { query: searchQuery } });
        } else {
            router.push({ pathname: '/(tabs)/chats/conversation', params: { question: searchQuery } });
        }
    };

    const renderContent = () => {
        if (searchMode === 'question') {
            return (
                <Column>
                    <View style={styles.sectionHeader}>
                        <FontAwesomeIcon icon={faCommentDots} size={18} color="#FF9AAC" />
                        <ThemedText style={styles.sectionTitle}>Popular Questions</ThemedText>
                    </View>
                    <GapColumn space={12} />
                    {popularQuestions.map((question) => (
                        <TouchableOpacity
                            key={question.id}
                            activeOpacity={0.7}
                            style={[styles.card, { backgroundColor: isDarkMode ? '#2C2C2E' : '#FFFFFF' }]}
                            onPress={() => router.push({ pathname: '/(tabs)/chats/conversation', params: { question: question.text } })}
                        >
                            <View style={[styles.cardIconContainer, { backgroundColor: `${question.color}20` }]}>
                                <FontAwesomeIcon icon={question.icon} size={18} color={question.color} />
                            </View>
                            <ThemedText style={styles.cardText} numberOfLines={2}>{question.text}</ThemedText>
                            <View style={styles.arrowContainer}>
                                <ThemedText style={styles.arrow}>→</ThemedText>
                            </View>
                        </TouchableOpacity>
                    ))}
                </Column>
            );
        }

        if (searchMode === 'food') {
            return (
                <Column>
                    <View style={styles.sectionHeader}>
                        <FontAwesomeIcon icon={faSearch} size={18} color="#FF9AAC" />
                        <ThemedText style={styles.sectionTitle}>Popular Foods</ThemedText>
                    </View>
                    <GapColumn space={12} />
                    {popularFoods.map((category) => (
                        <TouchableOpacity
                            key={category.id}
                            activeOpacity={0.7}
                            style={[styles.card, { backgroundColor: isDarkMode ? '#2C2C2E' : '#FFFFFF' }]}
                            onPress={() => router.push({ pathname: '/(tabs)/home/search', params: { query: category.text } })}
                        >
                            <View style={[styles.cardIconContainer, { backgroundColor: `${category.color}20` }]}>
                                <FontAwesomeIcon icon={category.icon} size={18} color={category.color} />
                            </View>
                            <ThemedText style={styles.cardText}>{category.text}</ThemedText>
                            <View style={styles.arrowContainer}>
                                <ThemedText style={styles.arrow}>→</ThemedText>
                            </View>
                        </TouchableOpacity>
                    ))}
                </Column>
            );
        }

        return null;
    };

    return (
        <View>
        <ThemedScrollView contentInsetAdjustmentBehavior="automatic" style={[styles.container]} keyboardShouldPersistTaps="handled">
            <Column style={styles.headerContainer}>
                <ThemedText style={styles.headerSubtitle}>
                    Search for safe foods or get answers to your questions.
                </ThemedText>
            </Column>

            <GapColumn space={20} />

            <View style={styles.searchWrapper}>
                <Row style={[styles.modeSelector, { backgroundColor: isDarkMode ? '#1C1C1E' : '#F2F2F7' }]}>
                    <TouchableOpacity
                        style={[styles.modeButton, searchMode === 'food' && [styles.activeMode, { backgroundColor: isDarkMode ? '#FF9AAC' : '#FFFFFF' }]]}
                        onPress={() => handleModeChange('food')}
                        activeOpacity={0.8}
                    >
                        <ThemedText style={[styles.modeText, searchMode === 'food' && styles.activeModeText]}>
                            Search Food
                        </ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.modeButton, searchMode === 'question' && [styles.activeMode, { backgroundColor: isDarkMode ? '#FF9AAC' : '#FFFFFF' }]]}
                        onPress={() => handleModeChange('question')}
                        activeOpacity={0.8}
                    >
                        <ThemedText style={[styles.modeText, searchMode === 'question' && styles.activeModeText]}>
                            Ask a Question
                        </ThemedText>
                    </TouchableOpacity>
                </Row>

                <View style={[styles.searchContainer, { backgroundColor: isDarkMode ? '#2C2C2E' : '#FFFFFF' }]}>
                    <View style={[styles.iconCircle, { backgroundColor: isDarkMode ? '#3C3C3E' : '#FFF5F7' }]}>
                        <FontAwesomeIcon icon={faSearch} size={16} color="#FF9AAC" />
                    </View>
                    <TextInput
                        style={[styles.searchInput, { color: isDarkMode ? '#FFF' : '#000' }]}
                        placeholder={searchMode === 'food' ? 'Search for a food...' : 'Ask a question...'}
                        placeholderTextColor={isDarkMode ? '#8E8E93' : '#A0A0A0'}
                        multiline
                        autoFocus
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        onSubmitEditing={handleSearchSubmit}
                        returnKeyType="search"
                    />
                    <TouchableOpacity onPress={handleSearchSubmit}style={[ { backgroundColor: isDarkMode ? '#3C3C3E' : '#FFF5F7' }]}>
                        <FontAwesomeIcon icon={faArrowCircleRight} size={20} color="#FF9AAC" />
                    </TouchableOpacity>
                </View>
            </View>

            <GapColumn space={32} />

            <Column style={styles.contentContainer}>
                {renderContent()}
            </Column>
        </ThemedScrollView>


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        paddingHorizontal: 24,
    },
    headerSubtitle: {
        fontSize: 15,
        opacity: 0.6,
        marginTop: 4,
    },
    searchWrapper: {
        paddingHorizontal: 20,
    },
    modeSelector: {
        borderRadius: 12,
        padding: 4,
        marginBottom: 16,
    },
    modeButton: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    activeMode: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    modeText: {
        fontWeight: '600',
        fontSize: 15,
        opacity: 0.7,
    },
    activeModeText: {
        fontWeight: '700',
        opacity: 1,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 16,
        paddingHorizontal: 16,
        height: 56,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 4,
    },
    iconCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
    },
    contentContainer: {
        paddingHorizontal: 20,
        flex: 1,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 2,
    },
    cardIconContainer: {
        width: 42,
        height: 42,
        borderRadius: 21,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },
    cardText: {
        flex: 1,
        fontSize: 15,
        fontWeight: '500',
        lineHeight: 20,
    },
    arrowContainer: {
        width: 28,
        height: 28,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
    arrow: {
        fontSize: 18,
        opacity: 0.4,
    },
});
