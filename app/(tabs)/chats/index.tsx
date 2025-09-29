import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link, useRouter } from 'expo-router';
import { StyleSheet, FlatList, View, TouchableOpacity, Dimensions } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';
import { use } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


// Enhanced mock data with more pregnancy-focused content
const mockConversations = [
    {
        id: '1',
        name: 'Dr. Sarah Johnson',
        role: 'Obstetrician',
        lastMessage: 'Your latest ultrasound results look perfect! Baby is growing well.',
        time: '10:30 AM',
        unreadCount: 2,
        avatar: '👩‍⚕️',
        priority: 'high',
        type: 'doctor'
    },
    {
        id: '2',
        name: 'Maya - AI Assistant',
        role: 'Pregnancy Support',
        lastMessage: 'Would you like some gentle stretches for your back pain?',
        time: '2:15 PM',
        unreadCount: 0,
        avatar: '🤖',
        priority: 'normal',
        type: 'ai'
    },
    {
        id: '3',
        name: 'Nutrition Guide',
        role: 'Dietary Support',
        lastMessage: 'Here are iron-rich foods perfect for your second trimester',
        time: 'Yesterday',
        unreadCount: 1,
        avatar: '🥗',
        priority: 'normal',
        type: 'bot'
    },
    {
        id: '4',
        name: 'Birth Prep Coach',
        role: 'Labor & Delivery',
        lastMessage: 'Let\'s practice breathing exercises for labor preparation',
        time: '2d ago',
        unreadCount: 0,
        avatar: '🌸',
        priority: 'normal',
        type: 'coach'
    },
    {
        id: '5',
        name: 'Weekly Check-in',
        role: 'Week 24 Updates',
        lastMessage: 'Your baby is now the size of a cantaloupe! 🍈',
        time: '3d ago',
        unreadCount: 3,
        avatar: '📅',
        priority: 'normal',
        type: 'update'
    }
];

export default function ChatsScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const backgroundColor = useThemeColor({}, 'background');

    const handleChatPress = (chatId: string) => {
        router.push('/(tabs)/chats/conversation');
    };

    const renderHeader = () => (
        <ThemedView style={{
            paddingTop: insets.top + 10,
            paddingHorizontal: 20,
            paddingBottom: 24,
        }}>
            <View style={styles.headerTop}>
                <View>
                    <ThemedText type="title" style={styles.headerTitle}>Your Care Team</ThemedText>
                    <View style={styles.subtitleContainer}>
                        <Ionicons name="heart" size={16} color="#F472B6" />
                        <ThemedText style={styles.subtitle}>Always here to support your journey</ThemedText>
                    </View>
                </View>
                <TouchableOpacity style={styles.profileButton}>
                    <View style={styles.pregnancyBadge}>
                        <ThemedText style={styles.badgeText}>24w</ThemedText>
                    </View>
                </TouchableOpacity>
            </View>
        </ThemedView>
    );

    const renderChatItem = ({ item }: { item: typeof mockConversations[0] }) => (
        <TouchableOpacity
            style={styles.chatItem}
            onPress={() => handleChatPress(item.id)}
            activeOpacity={0.7}
        >
            <ThemedView style={styles.chatContent}>
                <View style={styles.avatarContainer}>
                    <View style={[styles.avatar, getAvatarStyle(item.type)]}>
                        <ThemedText style={styles.avatarText}>{item.avatar}</ThemedText>
                    </View>
                    {item.priority === 'high' && (
                        <View style={styles.priorityIndicator}>
                            <Ionicons name="alert-circle" size={12} color="#EF4444" />
                        </View>
                    )}
                </View>

                <View style={styles.messageContent}>
                    <View style={styles.messageHeader}>
                        <ThemedText style={styles.senderName}>{item.name}</ThemedText>
                        <ThemedText style={styles.messageTime}>{item.time}</ThemedText>
                    </View>
                    <ThemedText style={styles.senderRole}>{item.role}</ThemedText>
                    <ThemedText
                        style={styles.lastMessage}
                        numberOfLines={2}
                    >
                        {item.lastMessage}
                    </ThemedText>
                </View>

                <View style={styles.chatActions}>
                    {item.unreadCount > 0 && (
                        <View style={styles.unreadBadge}>
                            <ThemedText style={styles.unreadText}>
                                {item.unreadCount > 9 ? '9+' : item.unreadCount}
                            </ThemedText>
                        </View>
                    )}
                    <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
                </View>
            </ThemedView>
        </TouchableOpacity>
    );

    return (
        <ThemedView style={[styles.container, { backgroundColor }]}>
            <FlatList
                data={mockConversations}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={renderHeader}
                renderItem={renderChatItem}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
        </ThemedView>
    );
}

const getAvatarStyle = (type: string) => {
    switch (type) {
        case 'doctor':
            return { backgroundColor: '#EBF8FF', borderColor: '#3B82F6' };
        case 'ai':
            return { backgroundColor: '#F0FDF4', borderColor: '#10B981' };
        case 'bot':
            return { backgroundColor: '#FEF7FF', borderColor: '#8B5CF6' };
        case 'coach':
            return { backgroundColor: '#FFF7ED', borderColor: '#F59E0B' };
        case 'update':
            return { backgroundColor: '#FEF3F2', borderColor: '#EF4444' };
        default:
            return { backgroundColor: '#F8FAFC', borderColor: '#CBD5E1' };
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 24,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 4,
    },
    subtitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    subtitle: {
        fontSize: 14,
        color: '#6B7280',
        fontWeight: '500',
    },
    profileButton: {
        alignItems: 'center',
    },
    pregnancyBadge: {
        backgroundColor: '#FEE2E2',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#FCA5A5',
    },
    badgeText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#DC2626',
    },
    quickActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
    },
    quickActionCard: {
        flex: 1,
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#F1F5F9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    quickActionIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 6,
    },
    quickActionEmoji: {
        fontSize: 18,
    },
    quickActionText: {
        fontSize: 11,
        fontWeight: '600',
        color: '#4B5563',
    },
    listContent: {
        flexGrow: 1,
    },
    chatItem: {
        marginHorizontal: 0,
        paddingVertical: 16,
        paddingHorizontal: 20,
    },
    chatContent: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    avatarContainer: {
        position: 'relative',
        marginRight: 12,
    },
    avatar: {
        width: 52,
        height: 52,
        borderRadius: 26,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
    },
    avatarText: {
        fontSize: 20,
    },
    priorityIndicator: {
        position: 'absolute',
        top: -2,
        right: -2,
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'white',
    },
    messageContent: {
        flex: 1,
        marginRight: 12,
    },
    messageHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 2,
    },
    senderName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
        flex: 1,
    },
    messageTime: {
        fontSize: 12,
        color: '#9CA3AF',
        fontWeight: '500',
    },
    senderRole: {
        fontSize: 12,
        color: '#6B7280',
        fontWeight: '500',
        marginBottom: 4,
    },
    lastMessage: {
        fontSize: 14,
        color: '#4B5563',
        lineHeight: 20,
    },
    chatActions: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    unreadBadge: {
        backgroundColor: '#F472B6',
        minWidth: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 6,
    },
    unreadText: {
        fontSize: 11,
        fontWeight: '600',
        color: 'white',
    },
    separator: {
        height: 1,
        backgroundColor: '#F1F5F9',
        marginLeft: 84,
    },
});
