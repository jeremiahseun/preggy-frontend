import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    StatusBar,
    ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { ThemedText } from '@/components/ThemedText';
import { GapColumn } from '@/components/Gap';
import FoodTag from '@/components/FoodTag';
import { MessageInput, MessageLimitReached } from '@/components/chats/Messaging';
import TypingIndicator from '@/components/chats/TypingIndicator';


interface Message {
    id: string;
    type: 'user' | 'assistant' | 'welcome';
    content: string;
    timestamp: string;
    foodItem?: FoodItem;
}

type FoodItem = {
    name: string;
    status: 'safe' | 'avoid' | 'limit';
    description: string;
    reason?: string;
    alternatives?: string[];
    guidelines?: string[];
    benefits?: string[];
    trimester?: TrimesterInfo;
    lastVerified?: string;
    sources?: Array<Sources>;
}

type TrimesterInfo = {
    trimesterStage?: "1st" | "2nd" | "3rd" | null;
    trimesterNote?: string;
}

type Sources = {
    name: string;
    description: string;
    updated: string;
    verified: boolean;
}

const NewConversationBar = () => {
    const isDark = useColorScheme() === 'dark';
    return (
        <View style={[styles.welcomeContainer, { backgroundColor: isDark ? '#1F2937' : '#F0FDF4' }]}>
            <Text style={styles.welcomeIcon}>❤️</Text>
            <ThemedText type='subTitle'>
                Welcome to your safety assistant
            </ThemedText>
            <GapColumn space={10} />
            <ThemedText style={[styles.welcomeSubtitle, { color: isDark ? '#D1D5DB' : '#6B7280' }]}>
                I'm here to help you make informed decisions about food safety during your pregnancy. Ask me about any food, ingredient, or safety concern!
            </ThemedText>
            <View style={styles.disclaimerContainer}>
                <Ionicons name="information-circle-outline" size={16} color="#3B82F6" />
                <Text style={[styles.disclaimerText, { color: isDark ? '#D1D5DB' : '#6B7280' }]}>
                    All advice is based on verified medical sources and updated regularly.
                </Text>
            </View>
        </View>
    )
}

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

    const renderFoodCard = (foodItem: FoodItem) => (
        <View style={[styles.foodCard, { backgroundColor: isDark ? '#2A2A2A' : '#F8F9FA' }]}>
            <View style={styles.foodHeader}>
                <FoodTag type={foodItem.status} />
                <Text style={[styles.foodName, { color: isDark ? '#FFFFFF' : '#1F2937' }]}>
                    {foodItem.name}
                </Text>
                {foodItem.status === 'limit' && (
                    <TouchableOpacity style={styles.guidelinesButton}>
                        <Text style={styles.guidelinesText}>Guidelines</Text>
                    </TouchableOpacity>
                )}
            </View>

            <Text style={[styles.foodDescription, { color: isDark ? '#D1D5DB' : '#6B7280' }]}>
                {foodItem.description}
            </Text>

            {foodItem.lastVerified && (
                <View style={styles.verifiedContainer}>
                    <Ionicons name="checkmark-circle-outline" size={16} color="#10B981" />
                    <Text style={[styles.verifiedText, { color: isDark ? '#9CA3AF' : '#6B7280' }]}>
                        Last verified: {foodItem.lastVerified}
                    </Text>
                </View>
            )}

            {foodItem.alternatives && (
                <View style={styles.alternativesContainer}>
                    <Text style={[styles.alternativesTitle, { color: isDark ? '#FFFFFF' : '#1F2937' }]}>
                        However, you can safely enjoy these delicious alternatives:
                    </Text>
                    <View style={[styles.alternativesList, { backgroundColor: isDark ? '#1F2937' : '#F0FDF4' }]}>
                        {foodItem.alternatives.map((alt: string, index: number) => (
                            <View key={index} style={styles.alternativeItem}>
                                <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                                <Text style={[styles.alternativeText, { color: isDark ? '#D1D5DB' : '#374151' }]}>
                                    {alt}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>
            )}

            {foodItem.guidelines && (
                <View style={styles.guidelinesContainer}>
                    <Text style={[styles.guidelinesTitle, { color: isDark ? '#FFFFFF' : '#1F2937' }]}>
                        Here's how to enjoy it safely:
                    </Text>
                    <View style={styles.guidelinesList}>
                        {foodItem.guidelines.map((guideline: string, index: number) => {
                            const [title, description] = guideline.split(' - ');
                            return (
                                <View
                                    key={index}
                                    style={[
                                        styles.guidelineItem,
                                        { backgroundColor: index === 0 ? (isDark ? '#1F2937' : '#F0FDF4') : (isDark ? '#2D1B0F' : '#FFFBEB') }
                                    ]}
                                >
                                    <Ionicons
                                        name={index === 0 ? "checkmark-circle" : "time-outline"}
                                        size={16}
                                        color={index === 0 ? "#10B981" : "#F59E0B"}
                                    />
                                    <View style={styles.guidelineContent}>
                                        <Text style={[styles.guidelineTitle, { color: isDark ? '#FFFFFF' : '#1F2937' }]}>
                                            {title}
                                        </Text>
                                        <Text style={[styles.guidelineDescription, { color: isDark ? '#D1D5DB' : '#6B7280' }]}>
                                            {description}
                                        </Text>
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                </View>
            )}

            {foodItem.trimester && (
                <View style={[styles.trimesterNote, { backgroundColor: isDark ? '#1E3A8A' : '#EFF6FF' }]}>
                    <Ionicons name="calendar-outline" size={16} color="#3B82F6" />
                    <View style={styles.trimesterContent}>
                        <Text style={[styles.trimesterTitle, { color: isDark ? '#93C5FD' : '#3B82F6' }]}>
                            {foodItem.trimester ? `${foodItem.trimester.trimesterStage} Trimester Note` : "No Trimester Info"}
                        </Text>
                        <Text style={[styles.trimesterText, { color: isDark ? '#DBEAFE' : '#1E40AF' }]}>
                            {foodItem.trimester ? `${foodItem.trimester.trimesterNote}` : "No Trimester Info"}
                        </Text>
                    </View>
                </View>
            )}

            {foodItem.benefits && (
                <View style={styles.benefitsContainer}>
                    <Text style={[styles.benefitsTitle, { color: isDark ? '#FFFFFF' : '#1F2937' }]}>
                        Benefits for pregnancy:
                    </Text>
                    <View style={styles.benefitsList}>
                        {foodItem.benefits.map((benefit: string, index: number) => (
                            <View key={index} style={styles.benefitItem}>
                                <View style={styles.benefitDot} />
                                <Text style={[styles.benefitText, { color: isDark ? '#D1D5DB' : '#374151' }]}>
                                    {benefit}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>
            )}

            {foodItem.sources && (
                <View style={[styles.sourcesContainer, { backgroundColor: isDark ? '#1F2937' : '#FFFFFF' }]}>
                    <View style={styles.sourcesHeader}>
                        <Ionicons name="library-outline" size={16} color="#3B82F6" />
                        <Text style={[styles.sourcesTitle, { color: isDark ? '#FFFFFF' : '#1F2937' }]}>
                            Medical Sources
                        </Text>
                        <TouchableOpacity>
                            <Text style={styles.viewAllText}>View All</Text>
                        </TouchableOpacity>
                    </View>

                    {foodItem.sources.slice(0, 3).map((source: any, index: number) => (
                        <View key={index} style={styles.sourceItem}>
                            <View style={[styles.sourceNumber, { backgroundColor: '#3B82F6' }]}>
                                <Text style={styles.sourceNumberText}>{index + 1}</Text>
                            </View>
                            <View style={styles.sourceContent}>
                                <Text style={[styles.sourceName, { color: isDark ? '#FFFFFF' : '#1F2937' }]}>
                                    {source.name}
                                </Text>
                                <Text style={[styles.sourceDescription, { color: isDark ? '#D1D5DB' : '#6B7280' }]}>
                                    {source.description}
                                </Text>
                                <View style={styles.sourceFooter}>
                                    <Text style={[styles.sourceUpdated, { color: isDark ? '#9CA3AF' : '#9CA3AF' }]}>
                                        Updated: {source.updated}
                                    </Text>
                                    {source.verified && (
                                        <View style={styles.verifiedBadge}>
                                            <Ionicons name="checkmark" size={12} color="#10B981" />
                                            <Text style={styles.verifiedBadgeText}>Verified</Text>
                                        </View>
                                    )}
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
            )}
        </View>
    );

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

                    {msg.foodItem && renderFoodCard(msg.foodItem)}
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
            <View style={[styles.header, dynamicStyles.header, {
                paddingTop: insets.top + 10
            }]}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={isDark ? '#FFFFFF' : '#1F2937'} />
                </TouchableOpacity>

                <View style={styles.headerContent}>
                    <Text style={[styles.headerTitle, { color: isDark ? '#FFFFFF' : '#1F2937' }]}>
                        AI Safety Assistant
                    </Text>
                    <View style={styles.statusContainer}>
                        <View style={styles.onlineIndicator} />
                        <Text style={[styles.statusText, { color: isDark ? '#10B981' : '#10B981' }]}>
                            Always here to help
                        </Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.menuButton}>
                    <Ionicons name="ellipsis-vertical" size={24} color={isDark ? '#FFFFFF' : '#1F2937'} />
                </TouchableOpacity>
            </View>

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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
    },
    backButton: {
        marginRight: 12,
    },
    headerContent: {
        flex: 1,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 2,
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    onlineIndicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#10B981',
        marginRight: 6,
    },
    statusText: {
        fontSize: 14,
    },
    menuButton: {
        marginLeft: 12,
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
    welcomeContainer: {
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        alignItems: 'center',
    },
    welcomeIcon: {
        fontSize: 24,
        marginBottom: 12,
    },
    welcomeTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
        textAlign: 'center',
    },
    welcomeSubtitle: {
        fontSize: 14,
        lineHeight: 20,
        textAlign: 'center',
        marginBottom: 12,
    },
    disclaimerContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    disclaimerText: {
        fontSize: 12,
        marginLeft: 6,
        flex: 1,
        lineHeight: 16,
    },
    foodCard: {
        borderRadius: 12,
        padding: 16,
        marginTop: 12,
    },
    foodHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        gap: 10,
        flexWrap: 'wrap',
    },
    foodName: {
        fontSize: 16,
        fontWeight: '600',
        flex: 1,
    },
    guidelinesButton: {
        marginLeft: 'auto',
    },
    guidelinesText: {
        color: '#3B82F6',
        fontSize: 12,
        fontWeight: '500',
    },
    foodDescription: {
        fontSize: 14,
        marginBottom: 12,
    },
    verifiedContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    verifiedText: {
        fontSize: 12,
        marginLeft: 6,
    },
    alternativesContainer: {
        marginTop: 16,
    },
    alternativesTitle: {
        fontSize: 14,
        marginBottom: 12,
    },
    alternativesList: {
        borderRadius: 8,
        padding: 12,
    },
    alternativeItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    alternativeText: {
        fontSize: 14,
        marginLeft: 8,
        flex: 1,
    },
    guidelinesContainer: {
        marginTop: 16,
    },
    guidelinesTitle: {
        fontSize: 14,
        marginBottom: 12,
    },
    guidelinesList: {
        gap: 8,
    },
    guidelineItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 12,
        borderRadius: 8,
    },
    guidelineContent: {
        flex: 1,
        marginLeft: 8,
    },
    guidelineTitle: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 2,
    },
    guidelineDescription: {
        fontSize: 13,
    },
    trimesterNote: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 12,
        borderRadius: 8,
        marginTop: 16,
    },
    trimesterContent: {
        flex: 1,
        marginLeft: 8,
    },
    trimesterTitle: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 2,
    },
    trimesterText: {
        fontSize: 13,
    },
    benefitsContainer: {
        marginTop: 16,
    },
    benefitsTitle: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
    },
    benefitsList: {
        gap: 4,
    },
    benefitItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    benefitDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#10B981',
        marginTop: 6,
        marginRight: 8,
    },
    benefitText: {
        fontSize: 13,
        flex: 1,
    },
    sourcesContainer: {
        borderRadius: 8,
        padding: 16,
        marginTop: 16,
    },
    sourcesHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    sourcesTitle: {
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 6,
        flex: 1,
    },
    viewAllText: {
        color: '#3B82F6',
        fontSize: 14,
    },
    sourceItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    sourceNumber: {
        width: 24,
        height: 24,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    sourceNumberText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '600',
    },
    sourceContent: {
        flex: 1,
    },
    sourceName: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 2,
    },
    sourceDescription: {
        fontSize: 13,
        marginBottom: 4,
    },
    sourceFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    sourceUpdated: {
        fontSize: 11,
    },
    verifiedBadge: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    verifiedBadgeText: {
        color: '#10B981',
        fontSize: 11,
        marginLeft: 4,
        fontWeight: '600',
    },
    sourcesFooter: {
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
    },
    sourcesFooterText: {
        fontSize: 11,
        textAlign: 'center',
    },

    pagination: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        gap: 16,
    },
    paginationButton: {
        padding: 8,
    },
    paginationText: {
        fontSize: 16,
        fontWeight: '500',
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
