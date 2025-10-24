import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';
import { StyleSheet, FlatList, View, TouchableOpacity, ActivityIndicator, useColorScheme } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Row from '@/components/Row';
import { useChatStore } from '@/providers/chat_store';
import { useEffect } from 'react';
import { ChatMessage } from '@/src/interfaces/db';
import { useProfileStore } from '@/providers/profile_store';

// Quick action suggestions
const quickActions = [
    { id: '1', icon: 'restaurant-outline', text: 'Find Foods', color: '#10B981', bgColor: '#D1FAE5' },
    { id: '2', icon: 'fitness-outline', text: 'Exercises', color: '#3B82F6', bgColor: '#DBEAFE' },
    { id: '3', icon: 'moon-outline', text: 'Sleep Tips', color: '#8B5CF6', bgColor: '#E9D5FF' },
    { id: '4', icon: 'heart-outline', text: 'Symptoms', color: '#F59E0B', bgColor: '#FEF3C7' },
];

export default function ChatsScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const backgroundColor = useThemeColor({}, 'background');
    const cardColor = useThemeColor({ light: 'white', dark: '#171a1f' }, 'background');
    const borderColor = useThemeColor({ light: '#F1F5F9', dark: 'grey' }, 'tint');

    const { chatHistory, isLoading, error, fetchChatHistory } = useChatStore();
    const profile = useProfileStore((state) => state.profile);
    const isLoadingProfile = useProfileStore((state) => state.isLoading);


    useEffect(() => {
        fetchChatHistory();
    }, []);

    const handleChatPress = (chatId: string) => {
        router.push(`/(tabs)/chats/conversation?id=${chatId}`);
    };

    const handleNewChat = () => {
        router.push('/(tabs)/chats/conversation');
    };

    const handleQuickAction = (action: string) => {
        // Navigate to conversation with pre-filled prompt
        router.push(`/(tabs)/chats/conversation?action=${encodeURIComponent(action)}`);
    };

    const renderHeader = () => (
        <ThemedView style={styles.headerContainer}>
            <View style={styles.headerTop}>
                <View>
                    <ThemedText type="title">Chat with Maya</ThemedText>
                    <View style={styles.subtitleContainer}>
                        <Ionicons name="sparkles" size={16} color="#F472B6" />
                        <ThemedText style={styles.subtitle}>Your AI pregnancy companion</ThemedText>
                    </View>
                </View>
                <View style={styles.weekBadge}>
                    {isLoadingProfile ? <ActivityIndicator size="small" color="#92400E" /> : <ThemedText style={styles.weekBadgeText}>Week {profile?.current_week}</ThemedText>}
                </View>
            </View>

            {/* Quick Actions */}
            <View style={styles.quickActionsContainer}>
                <ThemedText type='defaultSemiBold' style={{ marginBottom: 12 }}>What can I help with?</ThemedText>
                <View style={styles.quickActionsGrid}>
                    {quickActions.map((action) => (
                        <TouchableOpacity
                            key={action.id}
                            style={[styles.quickActionCard, {
                                backgroundColor: cardColor, borderColor: borderColor
                            }]}
                            onPress={() => handleQuickAction(action.text)}
                            activeOpacity={0.7}
                        >
                            <View style={[styles.quickActionIcon, { backgroundColor: action.bgColor }]}>
                                <Ionicons name={action.icon as any} size={24} color={action.color} />
                            </View>
                            <ThemedText style={{
                                fontWeight: '600',
                                fontSize: 14,
                                lineHeight: 20,
                            }}>{action.text}</ThemedText>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* New Chat Button */}
            <TouchableOpacity
                style={styles.newChatButton}
                onPress={handleNewChat}
                activeOpacity={0.8}
            >
                <Ionicons name="add-circle" size={24} color="white" />
                <ThemedText style={styles.newChatButtonText}>Start New Conversation</ThemedText>
            </TouchableOpacity>

            {/* Recent Chats Header */}
            <View style={styles.recentHeader}>
                <ThemedText type='defaultSemiBold' style={{ marginBottom: 12 }}>Recent Conversations</ThemedText>
                <ThemedText style={[styles.recentCount, {
                    // color: '#9CA3AF',
                    backgroundColor: borderColor,
                }]}>{chatHistory.length}</ThemedText>
            </View>
        </ThemedView>
    );

    const renderChatItem = ({ item }: { item: ChatMessage }) => (
        <TouchableOpacity
            style={[styles.chatItem, {
                backgroundColor: cardColor, borderColor: borderColor
            }]}
            onPress={() => handleChatPress(item.conversation_id)}
            activeOpacity={0.7}
        >
            <View style={styles.chatIconContainer}>
                <View style={styles.chatIcon}>
                    <Ionicons name="chatbubble-ellipses" size={20} color="#F472B6" />
                </View>
                {/* {item.hasUnread && <View style={styles.unreadDot} />} */}
            </View>

            <View style={styles.chatContent}>
                <Row style={styles.chatHeader}>
                    <ThemedText type='defaultSemiBold' numberOfLines={1}>
                        {item.content?.substring(0, 25)}...
                    </ThemedText>
                    <ThemedText style={styles.chatTime}>{new Date(item.created_at).toLocaleTimeString()}</ThemedText>
                </Row>
                <ThemedText style={styles.chatMessage} numberOfLines={2}>
                    {item.content}
                </ThemedText>
            </View>

            <Ionicons name="chevron-forward" size={20} color="#CBD5E1" />
        </TouchableOpacity>
    );

    const renderEmptyState = () => (
        <View style={styles.emptyState}>
            <View style={styles.emptyIconContainer}>
                <Ionicons name="chatbubbles-outline" size={64} color="#CBD5E1" />
            </View>
            <ThemedText type='subTitle' style={{
                marginBottom: 8,
                textAlign: 'center'
            }}>No conversations yet</ThemedText>
            <ThemedText style={styles.emptySubtitle}>
                Start chatting with Maya to get personalized pregnancy support
            </ThemedText>
        </View>
    );

    if (isLoading) {
        return <ActivityIndicator style={{ flex: 1 }} />
    }

    if (error) {
        return <View style={styles.centered}><ThemedText>Error: {error}</ThemedText></View>
    }

    return (
        <ThemedView style={[styles.container, { backgroundColor, paddingTop: insets.top }]}>
            <FlatList<ChatMessage>
                data={chatHistory}
                keyExtractor={(item) => item.conversation_id}
                ListHeaderComponent={renderHeader}
                renderItem={renderChatItem}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={renderEmptyState}
            />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContent: {
        flexGrow: 1,
        paddingBottom: 20,
    },
    headerContainer: {
        paddingHorizontal: 20,
        paddingTop: 30,
        paddingBottom: 24,
        backgroundColor: 'transparent',
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 24,
    },
    subtitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    subtitle: {
        fontSize: 15,
        color: '#6B7280',
        fontWeight: '500',
    },
    weekBadge: {
        backgroundColor: '#FEF3C7',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#FDE68A',
    },
    weekBadgeText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#92400E',
    },
    quickActionsContainer: {
        marginBottom: 24,
    },
    quickActionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    quickActionCard: {
        flex: 1,
        minWidth: '47%',
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F1F5F9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    quickActionIcon: {
        width: 52,
        height: 52,
        borderRadius: 26,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    newChatButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F472B6',
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 16,
        marginBottom: 32,
        gap: 10,
        shadowColor: '#F472B6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    newChatButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
    },
    recentHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    recentCount: {
        fontSize: 14,
        fontWeight: '600',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    chatItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        marginHorizontal: 20,
        marginBottom: 12,
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#F1F5F9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 1,
    },
    chatIconContainer: {
        position: 'relative',
        marginRight: 14,
    },
    chatIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#FCE7F3',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FBCFE8',
    },
    unreadDot: {
        position: 'absolute',
        top: -2,
        right: -2,
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#F472B6',
        borderWidth: 2,
        borderColor: 'white',
    },
    chatContent: {
        flex: 1,
        marginRight: 12,
    },
    chatHeader: {
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    chatTime: {
        fontSize: 12,
        color: '#9CA3AF',
        fontWeight: '500',
    },
    chatMessage: {
        fontSize: 14,
        color: '#6B7280',
        lineHeight: 20,
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
        paddingHorizontal: 40,
    },
    emptyIconContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#F9FAFB',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 8,
        textAlign: 'center',
    },
    emptySubtitle: {
        fontSize: 15,
        color: '#6B7280',
        textAlign: 'center',
        lineHeight: 22,
    },
});
