import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    StatusBar,
    ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { MessageInput, MessageLimitReached } from '@/components/chats/Messaging';
import TypingIndicator from '@/components/chats/TypingIndicator';
import { Message } from '@/src/interfaces/Conversations';
import NewConversationBar from '@/components/chats/ConversationBar';
import ChatRenderFoodItem from '@/components/chats/ChatFoodItem';
import ChatHeader from '@/components/chats/ChatHeader';
import { useChatStore } from '@/providers/chat_store';


const ConversationScreen = () => {
    const insets = useSafeAreaInsets();
    const colorScheme = useColorScheme();
    const router = useRouter();
    const scrollViewRef = useRef<ScrollView>(null);
    const [message, setMessage] = useState('');
    const [isLimitReached, setLimitReached] = useState(false);

    const isDark = colorScheme === 'dark';
    const { id: conversationId } = useLocalSearchParams<{ id: string }>();
    const {
        activeConversationMessages,
        isLoadingConversation,
        isSendingMessage,
        fetchConversationMessages,
        clearActiveConversation,
        sendMessage: sendMessageAction
    } = useChatStore();

    useEffect(() => {
        if (conversationId) {
            fetchConversationMessages(conversationId);
        }

        // Cleanup function to clear messages when the component unmounts
        return () => {
            clearActiveConversation();
        };
    }, [conversationId]);

    // Map ChatMessage to Message
    const messages: Message[] = activeConversationMessages.map(msg => ({
        id: msg.id.toString(),
        type: msg.message_type,
        content: msg.content || '',
        timestamp: new Date(msg.created_at).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        }),
        foodItem: msg.food_item_details
    }));

    const sendMessage = () => {
        if (message.trim()) {
            sendMessageAction(message.trim());
            setMessage('');
            // Scroll to bottom after sending
            setTimeout(() => {
                scrollViewRef.current?.scrollToEnd({ animated: true });
            }, 100);
        }
    };

    const renderMessage = (msg: Message) => {
        return (
            <View key={msg.id} style={styles.messageContainer}>
                <View
                    style={[
                        styles.messageBubble,
                        msg.type === 'user' ? styles.userMessage : styles.assistantMessage,
                        {
                            backgroundColor: msg.type === 'user'
                                ? Colors.primary
                                : (isDark ? '#2A2A2A' : '#F1F5F9'),
                        },
                    ]}
                >
                    <Text
                        style={[
                            styles.messageText,
                            {
                                color: msg.type === 'user'
                                    ? '#FFFFFF'
                                    : (isDark ? '#FFFFFF' : '#1F2937'),
                            },
                        ]}
                    >
                        {msg.content}
                    </Text>

                    {msg.foodItem && <ChatRenderFoodItem foodItem={msg.foodItem} />}
                </View>

                <Text
                    style={[
                        styles.messageTime,
                        msg.type === 'user' ? styles.userMessageTime : styles.assistantMessageTime,
                        { color: isDark ? '#9CA3AF' : '#9CA3AF' }
                    ]}
                >
                    {msg.timestamp}
                </Text>
            </View>
        );
    };

    const dynamicStyles = StyleSheet.create({
        container: {
            backgroundColor: isDark ? '#000000' : '#FFFFFF',
        },
        header: {
            backgroundColor: isDark ? '#1F1F1F' : '#FFFFFF',
            borderBottomColor: isDark ? '#333333' : '#E5E7EB',
        },
    });

    return (
        <ThemedView style={[styles.container, dynamicStyles.container]}>
            <StatusBar
                barStyle={isDark ? "light-content" : "dark-content"}
                backgroundColor={isDark ? '#1F1F1F' : '#FFFFFF'}
            />

            {/* Header */}
            <ChatHeader />
            {/* Messages */}
            <KeyboardAvoidingView
                style={styles.chatContainer}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
            >
                {
                    isLoadingConversation ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator color={isDark ? "#FFFFFF" : "#1F2937"} size="small" />
                        </View>
                    ) : messages.length === 0 ? (
                        <View style={[styles.scrollContent, styles.flexOne]}>
                            <NewConversationBar />
                        </View>
                    ) : (
                        <ScrollView
                            ref={scrollViewRef}
                            style={styles.scrollView}
                            contentContainerStyle={styles.scrollContent}
                            showsVerticalScrollIndicator={false}
                        >
                            {messages.map(renderMessage)}
                            {isSendingMessage && <TypingIndicator />}
                        </ScrollView>
                    )
                }

                {/* Message Input && Message Limit Reached */}
                {
                    isLimitReached ? <MessageLimitReached /> : <MessageInput message={message} sendMessage={sendMessage} setMessage={setMessage} />
                }

            </KeyboardAvoidingView>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    chatContainer: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    messageContainer: {
        marginBottom: 16,
    },
    messageBubble: {
        maxWidth: '85%',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 4,
    },
    userMessage: {
        alignSelf: 'flex-end',
        borderBottomRightRadius: 6,
    },
    assistantMessage: {
        alignSelf: 'flex-start',
        borderBottomLeftRadius: 6,
    },
    messageText: {
        fontSize: 16,
        lineHeight: 22,
    },
    messageTime: {
        fontSize: 12,
        marginHorizontal: 16,
    },
    userMessageTime: {
        textAlign: 'right',
    },
    assistantMessageTime: {
        textAlign: 'left',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    flexOne: {
        flex: 1,
    },
});

export default ConversationScreen;
