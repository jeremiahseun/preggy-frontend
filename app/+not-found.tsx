import React, { useRef, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Animated,
    TouchableOpacity,
    Image,
} from 'react-native';
import { Link, Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedScrollView, ThemedView } from '@/components/ThemedView';
import { GapColumn } from '@/components/Gap';

const { width: screenWidth } = Dimensions.get('window');

export default function NotFoundScreen() {
    const colorScheme = useColorScheme();
    const insets = useSafeAreaInsets();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;
    const floatAnim = useRef(new Animated.Value(0)).current;
    const bounceAnim = useRef(new Animated.Value(0)).current;

    const isDark = colorScheme === 'dark';

    useEffect(() => {
        // Entrance animations
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 100,
                friction: 8,
                useNativeDriver: true,
            }),
        ]).start();

        // Floating animation for background elements
        const floatingAnimation = Animated.loop(
            Animated.sequence([
                Animated.timing(floatAnim, {
                    toValue: 1,
                    duration: 3000,
                    useNativeDriver: true,
                }),
                Animated.timing(floatAnim, {
                    toValue: 0,
                    duration: 3000,
                    useNativeDriver: true,
                }),
            ])
        );
        floatingAnimation.start();

        // Gentle bounce animation for the main illustration
        const bounceAnimation = Animated.loop(
            Animated.sequence([
                Animated.timing(bounceAnim, {
                    toValue: 1,
                    duration: 2000,
                    useNativeDriver: true,
                }),
                Animated.timing(bounceAnim, {
                    toValue: 0,
                    duration: 2000,
                    useNativeDriver: true,
                }),
            ])
        );
        bounceAnimation.start();

        return () => {
            floatingAnimation.stop();
            bounceAnimation.stop();
        };
    }, []);

    const floatingTranslateY = floatAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -20],
    });

    const bounceTranslateY = bounceAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -10],
    });

    const dynamicStyles = StyleSheet.create({
        container: {
            backgroundColor: isDark ? '#0F0F0F' : '#FAFAFA',
        },
        mainCard: {
            backgroundColor: isDark ? '#1A1A1A' : '#FFFFFF',
            shadowColor: isDark ? '#000' : '#E8E8E8',
        },
        floatingCircle1: {
            backgroundColor: isDark ? '#FF6B9D15' : '#FF6B9D20',
        },
        floatingCircle2: {
            backgroundColor: isDark ? '#4ECDC410' : '#4ECDC415',
        },
        floatingCircle3: {
            backgroundColor: isDark ? '#A78BFA08' : '#A78BFA10',
        },
    });

    return (
        <>
            <Stack.Screen options={{
                title: 'Oops!',
                headerShown: false,
            }} />

            <ThemedScrollView showsVerticalScrollIndicator={false} style={[styles.container, dynamicStyles.container]}>
                {/* Floating Background Elements */}
                <View style={styles.floatingElements}>
                    <Animated.View
                        style={[
                            styles.floatingCircle1,
                            dynamicStyles.floatingCircle1,
                            {
                                transform: [
                                    { translateY: floatingTranslateY },
                                    { rotate: '45deg' }
                                ]
                            }
                        ]}
                    />
                    <Animated.View
                        style={[
                            styles.floatingCircle2,
                            dynamicStyles.floatingCircle2,
                            {
                                transform: [
                                    {
                                        translateY: floatAnim.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [0, 15],
                                        })
                                    },
                                    { rotate: '-30deg' }
                                ]
                            }
                        ]}
                    />
                    <Animated.View
                        style={[
                            styles.floatingCircle3,
                            dynamicStyles.floatingCircle3,
                            {
                                transform: [
                                    {
                                        translateY: floatAnim.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [0, -8],
                                        })
                                    }
                                ]
                            }
                        ]}
                    />
                </View>

                <Animated.View
                    style={[
                        styles.content,
                        {
                            opacity: fadeAnim,
                            transform: [{ scale: scaleAnim }],
                            paddingTop: insets.top + 40,
                            paddingBottom: insets.bottom + 20,
                        },
                    ]}
                >
                    {/* Main Illustration */}
                    <Animated.View
                        style={[
                            styles.illustrationContainer,
                            {
                                transform: [{ translateY: bounceTranslateY }],
                            }
                        ]}
                    >
                        <View style={[styles.illustrationBackground, dynamicStyles.mainCard]}>
                            <View style={styles.errorCodeContainer}>
                                <ThemedText style={[styles.errorCode, { color: '#FF6B9D' }]}>
                                    404
                                </ThemedText>
                                <View style={styles.iconContainer}>
                                    <Ionicons
                                        name="search-outline"
                                        size={40}
                                        color={isDark ? '#FF6B9D' : '#FF6B9D'}
                                    />
                                </View>
                            </View>
                        </View>
                    </Animated.View>

                    {/* Main Content Card */}
                    <View style={[styles.contentCard, dynamicStyles.mainCard]}>
                        {/* Pregnancy-themed emoji */}
                        <ThemedText style={styles.emoji}>🤱</ThemedText>

                        <ThemedText type="title" style={styles.title}>
                            Oops! Wrong Path
                        </ThemedText>

                        <ThemedText style={styles.subtitle}>
                            Looks like this page took a little detour! Don't worry, we'll help you find your way back to your pregnancy journey.
                        </ThemedText>

                        {/* Quick Actions */}
                        <View style={styles.actionsContainer}>
                            <ThemedText style={styles.actionsTitle}>
                                Where would you like to go?
                            </ThemedText>

                            <View style={styles.actionsList}>
                                {/* Home Button */}
                                <Link href="/" asChild>
                                    <TouchableOpacity style={[styles.actionButton, styles.primaryAction]}>
                                        <Ionicons name="home" size={20} />
                                        <ThemedText type='defaultSemiBold'>
                                            Back to Home
                                        </ThemedText>
                                    </TouchableOpacity>
                                </Link>
                                <GapColumn space={10}/>

                                {/* AI Assistant Button */}
                                <Link href="/chats" asChild>
                                    <TouchableOpacity style={[styles.actionButton, styles.secondaryAction, {
                                        borderColor: isDark ? '#4ECDC4' : '#4ECDC4',
                                    }]}>
                                        <Ionicons name="chatbubble-ellipses" size={20} color="#4ECDC4" />
                                        <ThemedText style={[styles.secondaryActionText, { color: '#4ECDC4' }]}>
                                            Ask AI Assistant
                                        </ThemedText>
                                    </TouchableOpacity>
                                </Link>
                            </View>
                        </View>

                        {/* Help Section */}
                        <View style={styles.helpSection}>
                            <View style={[styles.helpCard, { backgroundColor: isDark ? '#1F2937' : '#F0FDF4' }]}>
                                <Ionicons name="information-circle" size={20} color="#10B981" />
                                <View style={styles.helpContent}>
                                    <ThemedText style={[styles.helpTitle, { color: isDark ? '#10B981' : '#065F46' }]}>
                                        Need Help?
                                    </ThemedText>
                                    <ThemedText style={[styles.helpText, { color: isDark ? '#D1D5DB' : '#6B7280' }]}>
                                        If you're looking for something specific, try using our AI assistant for personalized guidance.
                                    </ThemedText>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Fun Fact */}
                    <View style={[styles.funFactContainer, dynamicStyles.mainCard]}>
                        <ThemedText style={styles.funFactIcon}>💡</ThemedText>
                        <ThemedText style={styles.funFactTitle}>
                            Did you know?
                        </ThemedText>
                        <ThemedText style={[styles.funFactText, { color: isDark ? '#D1D5DB' : '#6B7280' }]}>
                            Getting lost can actually be good for your brain! Just like how pregnancy helps create new neural pathways. 🧠✨
                        </ThemedText>
                    </View>
                </Animated.View>
            </ThemedScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    floatingElements: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    floatingCircle1: {
        position: 'absolute',
        width: 120,
        height: 120,
        borderRadius: 60,
        top: '10%',
        right: -40,
    },
    floatingCircle2: {
        position: 'absolute',
        width: 80,
        height: 80,
        borderRadius: 40,
        bottom: '25%',
        left: -20,
    },
    floatingCircle3: {
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 30,
        top: '35%',
        left: '15%',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    illustrationContainer: {
        marginBottom: 32,
    },
    illustrationBackground: {
        width: 160,
        height: 160,
        borderRadius: 80,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 10,
    },
    errorCodeContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorCode: {
        fontSize: 48,
        fontWeight: '800',
        marginBottom: 8,
    },
    iconContainer: {
        opacity: 0.7,
    },
    contentCard: {
        borderRadius: 20,
        padding: 32,
        alignItems: 'center',
        width: '100%',
        maxWidth: 400,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 6,
        marginBottom: 24,
    },
    emoji: {
        fontSize: 48,
        marginBottom: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 16,
        lineHeight: 24,
        textAlign: 'center',
        opacity: 0.8,
        marginBottom: 32,
        maxWidth: 300,
    },
    actionsContainer: {
        width: '100%',
        marginBottom: 24,
    },
    actionsTitle: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 20,
    },
    actionsList: {
        gap: 12,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 16,
        gap: 12,
    },
    primaryAction: {
        backgroundColor: '#FF6B9D',
        shadowColor: '#FF6B9D',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 8,
    },
    primaryActionText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    secondaryAction: {
        backgroundColor: 'transparent',
        borderWidth: 2,
    },
    secondaryActionText: {
        fontSize: 16,
        fontWeight: '600',
    },
    helpSection: {
        width: '100%',
    },
    helpCard: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 16,
        borderRadius: 12,
        gap: 12,
    },
    helpContent: {
        flex: 1,
    },
    helpTitle: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 4,
    },
    helpText: {
        fontSize: 13,
        lineHeight: 18,
    },
    funFactContainer: {
        borderRadius: 16,
        padding: 20,
        alignItems: 'center',
        width: '100%',
        maxWidth: 400,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },
    funFactIcon: {
        fontSize: 32,
        marginBottom: 8,
    },
    funFactTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        textAlign: 'center',
    },
    funFactText: {
        fontSize: 14,
        lineHeight: 20,
        textAlign: 'center',
    },
});
