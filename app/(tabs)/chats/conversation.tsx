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
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { MessageInput, MessageLimitReached } from '@/components/chats/Messaging';
import TypingIndicator from '@/components/chats/TypingIndicator';
import { Message } from '@/src/interfaces/Conversations';
import NewConversationBar from '@/components/chats/ConversationBar';
import ChatRenderFoodItem from '@/components/chats/ChatFoodItem';
import ChatHeader from '@/components/chats/ChatHeader';


const ConversationScreen = () => {
    const insets = useSafeAreaInsets();
    const colorScheme = useColorScheme();
    const router = useRouter();
    const scrollViewRef = useRef<ScrollView>(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoadingMessages, setLoadingMessages] = useState(true);
    const [isLoadingSendMessage, setLoadingSendMessage] = useState(false);
    const [isLimitReached, setLimitReached] = useState(false);

    const isDark = colorScheme === 'dark';


    const sampleMessages: Message[] = [
        {
            id: '2',
            type: 'user',
            content: "I'm craving sushi but worried about raw fish. Is it safe during pregnancy?",
            timestamp: '2:34 PM',
        },
        {
            id: '3',
            type: 'assistant',
            content: "I understand your craving! Raw fish in sushi poses risks during pregnancy due to potential bacteria and parasites that could harm you and your baby.",
            timestamp: '2:35 PM',
            foodItem: {
                name: 'Raw fish sushi',
                status: 'avoid',
                description: 'Risk of foodborne illness and parasites',
                lastVerified: 'Jan 2024',
                alternatives: [
                    'California rolls (cooked crab)',
                    'Cooked shrimp tempura rolls',
                    'Vegetable rolls',
                ],
                sources: [
                    {
                        name: 'NHS - Foods to avoid in pregnancy',
                        description: 'Raw shellfish and fish guidance',
                        updated: 'Dec 2023',
                        verified: true,
                    },
                    {
                        name: 'ACOG - Nutrition During Pregnancy',
                        description: 'Seafood safety recommendations',
                        updated: 'Nov 2023',
                        verified: true,
                    },
                    {
                        name: 'FDA - Advice about Eating Fish',
                        description: 'Fish consumption guidelines',
                        updated: 'Oct 2023',
                        verified: true,
                    },
                ],
            },
        },
        {
            id: '4',
            type: 'user',
            content: 'What about smoked salmon bagels? My partner brought some home.',
            timestamp: '2:38 PM',
        },
        {
            id: '5',
            type: 'assistant',
            content: "Great question! Smoked salmon requires some caution, but it's not completely off-limits.",
            timestamp: '2:40 PM',
            foodItem: {
                name: 'Cold smoked salmon',
                status: 'limit',
                description: 'Possible listeria risk - choose carefully',
                lastVerified: 'Jan 2024',
                guidelines: [
                    'Cook it first - Heat in pasta dishes, quiches, or toast it',
                    'Fresh from trusted source - Buy from reputable stores, consume quickly',
                ],
                trimester: {
                    trimesterStage: "1st",
                    trimesterNote: "Your immune system is slightly stronger now, but still be cautious with cold-smoked fish."
                },
            },
        },
        {
            id: '6',
            type: 'user',
            content: "What about dragon fruit? I've never had it before.",
            timestamp: '2:42 PM',
        },
        {
            id: '7',
            type: 'assistant',
            content: "Dragon fruit is safe and nutritious during pregnancy! It's rich in vitamin C, fiber, and antioxidants.",
            timestamp: '2:44 PM',
            foodItem: {
                name: 'Dragon fruit',
                status: 'safe',
                lastVerified: 'Jan 2024',
                description: 'Nutritious tropical fruit, safe when washed',
                benefits: [
                    "High in folate for baby's development",
                    'Natural fiber aids digestion',
                ],
            },
        },
        {
            id: '8',
            type: 'user',
            content: "How do you get all these information?",
            timestamp: '3:12 PM',
        },
        {
            id: '9',
            type: 'assistant',
            content: "I have a knowledge base that feeds me with all the information that I am giving you. And the best part? They are verified.",
            timestamp: '3:14 PM',
        },
    ];

    useEffect(() => {
        // Simulate loading messages
        setLoadingMessages(true);
        const timer = setTimeout(() => {
            setMessages(prev => [...prev, ...sampleMessages]);
            setLoadingMessages(false); // Set to false after messages are loaded

            // Scroll to bottom after loading
            setTimeout(() => {
                scrollViewRef.current?.scrollToEnd({ animated: true });
            }, 100);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const sendMessage = () => {
        if (message.trim()) {
            const newMessage: Message = {
                id: Date.now().toString(),
                type: 'user',
                content: message.trim(),
                timestamp: new Date().toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true,
                }),
            };
            setMessages(prev => [...prev, newMessage]);
            setMessage('');
            setLoadingSendMessage(true);
            setLimitReached(true)

            // Scroll to bottom after sending
            setTimeout(() => {
                scrollViewRef.current?.scrollToEnd({ animated: true });
            }, 100);

            // Simulate assistant response
            setTimeout(() => {
                const assistantResponse: Message = {
                    id: Date.now().toString(),
                    type: 'assistant',
                    content: "This is a simulated response.",
                    timestamp: new Date().toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true,
                    }),
                };
                setMessages(prev => [...prev, assistantResponse]);
                setLoadingSendMessage(false);
                setTimeout(() => {
                    scrollViewRef.current?.scrollToEnd({ animated: true });
                }, 100);
            }, 2000);
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

                    {msg.foodItem && <ChatRenderFoodItem foodItem={msg.foodItem}/>}
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
                    isLoadingMessages ? (
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
                            {isLoadingSendMessage && <TypingIndicator />}
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
