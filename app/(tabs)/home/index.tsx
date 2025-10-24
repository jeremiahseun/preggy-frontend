import BoxContainer from '@/components/BoxContainer';
import CircleContainer from '@/components/CircleContainer';
import Column from '@/components/Column';
import FoodItemCard from '@/components/FoodItemCard';
import { GapColumn, GapRow } from '@/components/Gap';
import TopCard from '@/components/home/TopCard';
import Row from '@/components/Row';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Link, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, FlatList, TextInput, View, StyleSheet, useColorScheme, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useHomeStore } from '@/providers/home_store';
import { getRealDateTime } from '@/src/utils/helpers';

const ListFeedback = ({ isLoading, error, hasData }: { isLoading: boolean, error: string | null, hasData: boolean }) => {
    if (isLoading) {
        return (
            <View style={{ padding: 20 }}>
                <ActivityIndicator />
            </View>
        );
    }

    if (error) {
        return (
            <View style={{ padding: 20, alignItems: 'center' }}>
                <ThemedText style={{ color: 'red' }}>Error: {error}</ThemedText>
            </View>
        );
    }

    if (!hasData) {
        return (
            <View style={{ padding: 20, alignItems: 'center' }}>
                <ThemedText>No recent checks found.</ThemedText>
            </View>
        );
    }

    return <GapColumn space={50} />;
};

export default function HomeScreen() {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const isDarkMode = useColorScheme() === 'dark'
    const {recentFoods, isLoading, error, fetchRecentFoods} = useHomeStore();

    useEffect(() => {
        fetchRecentFoods();
    }, []);

    const renderListHeader = () => (
        <ThemedView>

            <TopCard />

            <GapColumn space={24} />

            {/* Search Bar with Icon */}
            <TouchableOpacity style={styles.searchContainer} onPress={() => router.push('/(tabs)/home/search')}>
                <FontAwesomeIcon icon={'search'} size={16} color="#9A9A9A" style={{ marginRight: 12 }} />
                <TextInput
                    style={[styles.searchInput]}
                    placeholder='Search food or ask a question...'
                    placeholderTextColor='#9A9A9A'
                    editable={false}
                    pointerEvents="none"
                />
            </TouchableOpacity>

            <GapColumn space={28} />

            {/* Quick Actions Grid */}
            <ThemedText type="subtitle" style={styles.sectionTitle}>Quick Actions</ThemedText>
            <GapColumn space={16} />

            <Row style={{ gap: 12 }}>
                <Link href={'/home/photo-check'} asChild style={{ flex: 1 }}>
                    <BoxContainer style={styles.actionCard}>
                        <View style={[styles.iconCircle, { backgroundColor: '#FFE8F0' }]}>
                            <FontAwesomeIcon icon={'camera'} size={24} color="#E91E63" />
                        </View>
                        <GapColumn space={12} />
                        <ThemedText type="subTitle" style={styles.actionTitle}>Photo Check</ThemedText>
                        <ThemedText style={styles.actionSubtitle}>Scan food instantly</ThemedText>
                    </BoxContainer>
                </Link>

                <Link href={'/(tabs)/chats'} asChild style={{ flex: 1 }}>
                    <BoxContainer style={styles.actionCard}>
                        <View style={[styles.iconCircle, { backgroundColor: '#E8F4FF' }]}>
                            <FontAwesomeIcon icon={'comments'} size={24} color="#2196F3" />
                        </View>
                        <GapColumn space={12} />
                        <ThemedText type="subTitle" style={styles.actionTitle}>AI Chat</ThemedText>
                        <ThemedText style={styles.actionSubtitle}>Get instant answers</ThemedText>
                    </BoxContainer>
                </Link>
            </Row>

            <GapColumn space={12} />

            <Row style={{ gap: 12 }}>
                <BoxContainer style={[styles.actionCard, { flex: 1 }]}>
                    <View style={[styles.iconCircle, { backgroundColor: '#FFF4E8' }]}>
                        <FontAwesomeIcon icon={'book'} size={24} color="#FF9800" />
                    </View>
                    <GapColumn space={12} />
                    <ThemedText type="subTitle" style={styles.actionTitle}>Food Guide</ThemedText>
                    <ThemedText style={styles.actionSubtitle}>Browse safe foods</ThemedText>
                </BoxContainer>

                <BoxContainer style={[styles.actionCard, { flex: 1 }]}>
                    <View style={[styles.iconCircle, { backgroundColor: '#F0E8FF' }]}>
                        <FontAwesomeIcon icon={'utensils'} size={24} color="#9C27B0" />
                    </View>
                    <GapColumn space={12} />
                    <ThemedText type="subTitle" style={styles.actionTitle}>Meal Plans</ThemedText>
                    <ThemedText style={styles.actionSubtitle}>Healthy recipes</ThemedText>
                </BoxContainer>
            </Row>

            <GapColumn space={28} />

            {/* Daily Tip Card */}
            <View style={[styles.tipCard, {
                backgroundColor: isDarkMode ? '#171a1f' : '#FFFBF0'
            }]}>
                <Row style={{ alignItems: 'flex-start' }}>
                    <View style={[styles.tipIcon, { backgroundColor: '#E8F5E9' }]}>
                        <FontAwesomeIcon icon={'lightbulb'} size={20} color="#4CAF50" />
                    </View>
                    <GapRow space={12} />
                    <Column style={{ flex: 1 }}>
                        <ThemedText type="defaultSemiBold" style={{ fontSize: 15, marginBottom: 4 }}>
                            💡 Daily Tip
                        </ThemedText>
                        <ThemedText style={styles.tipText}>
                            Stay hydrated! Aim for 8-10 glasses of water daily to support your baby's development.
                        </ThemedText>
                    </Column>
                </Row>
            </View>

            <GapColumn space={40} />

            {/* Recent Checks Header */}
            <Row style={{ alignItems: 'center' }}>
                <Column style={{ flex: 1 }}>
                    <ThemedText type="subtitle" style={styles.sectionTitle}>Recent Checks</ThemedText>
                    <ThemedText style={styles.sectionSubtitle}>Latest food safety searches</ThemedText>
                </Column>
                <Link href="/home/all-checks" asChild>
                    <ThemedText type="link" style={styles.viewAllLink}>View All →</ThemedText>
                </Link>
            </Row>
            <GapColumn space={16} />
        </ThemedView>
    );

    return (
        <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
            <FlatList
                data={recentFoods}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <GapColumn space={16} />}
                renderItem={({ item }) => (
                    <FoodItemCard
                        onTap={() => router.push(`/home/food-details?id=${item.id}`)}
                        type={item.safety_type ?? 'safe'}
                        date={getRealDateTime(new Date(item.created_at))}
                        title={item.name}
                        source={item.sources}
                        description={item.details.description ?? item.details.whyAvoidDescription ?? 'No description available'}
                    />
                )}
                ListHeaderComponent={renderListHeader}
                ListFooterComponent={<ListFeedback isLoading={isLoading} error={error} hasData={recentFoods.length > 0} />}
            />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    heroCard: {
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: '#E8EAED',
    },
    welcomeText: {
        fontSize: 28,
        fontWeight: '700',
    },
    pregnancyBadge: {
        backgroundColor: '#294988',
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20,
        alignSelf: 'flex-start',
    },
    badgeText: {
        color: '#FFFFFF',
        fontSize: 13,
        fontWeight: '600',
    },
    dueText: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
    profileImage: {
        width: 56,
        height: 56,
        borderRadius: 28,
        borderWidth: 3,
        borderColor: '#FFFFFF',
    },
    progressContainer: {
        marginTop: 4,
    },
    progressLabel: {
        fontSize: 13,
        color: '#666',
        fontWeight: '500',
    },
    progressPercentage: {
        fontSize: 13,
        color: '#294988',
        fontWeight: '700',
    },
    progressBar: {
        height: 8,
        backgroundColor: '#E8EAED',
        borderRadius: 10,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#4CAF50',
        borderRadius: 10,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 16,
        paddingHorizontal: 16,
        height: 52,
        borderWidth: 1,
        borderColor: '#E8EAED',
    },
    searchInput: {
        flex: 1,
        fontSize: 15,
        color: '#000',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
    },
    sectionSubtitle: {
        fontSize: 13,
        color: '#888',
        marginTop: 2,
    },
    actionCard: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 140,
    },
    iconCircle: {
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionTitle: {
        fontSize: 15,
        fontWeight: '700',
        textAlign: 'center',
    },
    actionSubtitle: {
        fontSize: 12,
        color: '#888',
        textAlign: 'center',
        marginTop: 2,
    },
    tipCard: {
        backgroundColor: '#FFFBF0',
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: '#FFE8A3',
    },
    tipIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tipText: {
        fontSize: 13,
        color: '#666',
        lineHeight: 20,
    },
    viewAllLink: {
        fontSize: 14,
        fontWeight: '600',
    },
});
