import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

interface ChatListItemProps {
    name: string;
    lastMessage: string;
    time: string;
    unreadCount?: number;
    onPress: () => void;
}

export const ChatListItem: React.FC<ChatListItemProps> = ({
    name,
    lastMessage,
    time,
    unreadCount = 0,
    onPress,
}) => {
    const backgroundColor = useThemeColor({}, 'background');
    const borderColor = useThemeColor({}, 'border');

    return (
        <TouchableOpacity onPress={onPress}>
            <ThemedView
                style={[
                    styles.container,
                    {
                        backgroundColor,
                        borderColor,
                    },
                ]}>
                <View style={styles.avatarContainer}>
                    <ThemedText style={styles.avatarText}>
                        {name.charAt(0).toUpperCase()}
                    </ThemedText>
                </View>
                <View style={styles.contentContainer}>
                    <View style={styles.headerContainer}>
                        <ThemedText type="subtitle" style={styles.name}>
                            {name}
                        </ThemedText>
                        <ThemedText style={styles.time}>{time}</ThemedText>
                    </View>
                    <View style={styles.messageContainer}>
                        <ThemedText
                            numberOfLines={1}
                            style={[styles.lastMessage, unreadCount > 0 && styles.unreadMessage]}>
                            {lastMessage}
                        </ThemedText>
                        {unreadCount > 0 && (
                            <View style={styles.unreadBadge}>
                                <ThemedText style={styles.unreadCount}>
                                    {unreadCount}
                                </ThemedText>
                            </View>
                        )}
                    </View>
                </View>
            </ThemedView>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 16,
        borderBottomWidth: 1,
        alignItems: 'center',
    },
    avatarContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#E2E8F0',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    avatarText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    contentContainer: {
        flex: 1,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    name: {
        fontWeight: '600',
    },
    time: {
        fontSize: 12,
        color: '#64748B',
    },
    messageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    lastMessage: {
        fontSize: 14,
        color: '#64748B',
        flex: 1,
        marginRight: 8,
    },
    unreadMessage: {
        color: '#0F172A',
        fontWeight: '500',
    },
    unreadBadge: {
        backgroundColor: '#0F172A',
        borderRadius: 12,
        minWidth: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 8,
    },
    unreadCount: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '600',
    },
});
