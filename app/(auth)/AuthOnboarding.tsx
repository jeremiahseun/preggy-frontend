import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    ScrollView,
    Dimensions,
    Animated,
    PanResponder,
    Image,
    StyleSheet,
    StatusBar,
    Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AuthButton, NormalButton, RouteNormalButton, TextButton } from '@/components/Buttons';
import { GapColumn } from '@/components/Gap';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface OnboardingData {
    id: number;
    title: string;
    subtitle: string;
    image: any;
    primaryColor: string;
    secondaryColor: string;
    buttonText: string;
    showSkip: boolean;
}

const onboardingData: OnboardingData[] = [
    {
        id: 1,
        title: "Welcome to Preggy",
        subtitle: "Your trusted companion for a safe and healthy pregnancy journey.",
        image: require('../../assets/images/onboarding/1.png'),
        primaryColor: '#FF6B9D',
        secondaryColor: '#FFE4ED',
        buttonText: "Continue",
        showSkip: true,
    },
    {
        id: 2,
        title: "Personalized Meal Plans",
        subtitle: "Get weekly, stage-based diet recommendations tailored to your needs.",
        image: require('../../assets/images/onboarding/2.png'),
        primaryColor: '#4ECDC4',
        secondaryColor: '#E8F8F6',
        buttonText: "Continue",
        showSkip: true,
    },
    {
        id: 3,
        title: "AI-Powered Assistance",
        subtitle: "Ask questions and get instant, evidence-based answers from our AI assistant.",
        image: require('../../assets/images/onboarding/3.png'),
        primaryColor: '#A78BFA',
        secondaryColor: '#F3F0FF',
        buttonText: "Get Started",
        showSkip: false,
    },
];

export default function AuthOnboarding() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollViewRef = useRef<ScrollView>(null);
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const slideAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const titleAnim = useRef(new Animated.Value(0)).current;
    const subtitleAnim = useRef(new Animated.Value(0)).current;
    const buttonAnim = useRef(new Animated.Value(0)).current;
    const insets = useSafeAreaInsets();
    const colorScheme = useColorScheme();
    const router = useRouter();

    // Floating animation for images
    const floatAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Start floating animation
        const floatingAnimation = Animated.loop(
            Animated.sequence([
                Animated.timing(floatAnim, {
                    toValue: 1,
                    duration: 2000,
                    useNativeDriver: true,
                }),
                Animated.timing(floatAnim, {
                    toValue: 0,
                    duration: 2000,
                    useNativeDriver: true,
                }),
            ])
        );
        floatingAnimation.start();

        return () => floatingAnimation.stop();
    }, []);

    useEffect(() => {
        animateIn();
    }, [currentIndex]);

    const animateIn = () => {
        // Reset animations
        titleAnim.setValue(0);
        subtitleAnim.setValue(0);
        buttonAnim.setValue(0);
        scaleAnim.setValue(0.8);
        slideAnim.setValue(50);

        // Animate elements in sequence
        Animated.parallel([
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 100,
                friction: 8,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 600,
                useNativeDriver: true,
            }),
        ]).start();

        Animated.stagger(200, [
            Animated.timing(titleAnim, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }),
            Animated.timing(subtitleAnim, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }),
            Animated.timing(buttonAnim, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const handleNext = () => {
        if (currentIndex < onboardingData.length - 1) {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }).start(() => {
                setCurrentIndex(currentIndex + 1);
                scrollViewRef.current?.scrollTo({
                    x: (currentIndex + 1) * screenWidth,
                    animated: false,
                });
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }).start();
            });
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }).start(() => {
                setCurrentIndex(currentIndex - 1);
                scrollViewRef.current?.scrollTo({
                    x: (currentIndex - 1) * screenWidth,
                    animated: false,
                });
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }).start();
            });
        }
    };

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: (_, gestureState) => {
            return Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
        },
        onPanResponderRelease: (_, gestureState) => {
            if (gestureState.dx > 50) {
                handlePrevious();
            } else if (gestureState.dx < -50) {
                handleNext();
            }
        },
    });

    const currentData = onboardingData[currentIndex];
    const isDark = colorScheme === 'dark';

    const dynamicStyles = StyleSheet.create({
        gradientBackground: {
            backgroundColor: isDark ? '#1a1a1a' : currentData.secondaryColor,
        },
        floatingElements: {
            position: 'absolute',
            width: '100%',
            height: '100%',
        },
        floatingCircle1: {
            position: 'absolute',
            width: 150,
            height: 150,
            borderRadius: 75,
            backgroundColor: isDark
                ? `${currentData.primaryColor}15`
                : `${currentData.primaryColor}20`,
            top: '10%',
            right: -50,
        },
        floatingCircle2: {
            position: 'absolute',
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: isDark
                ? `${currentData.primaryColor}10`
                : `${currentData.primaryColor}15`,
            bottom: '20%',
            left: -30,
        },
        floatingCircle3: {
            position: 'absolute',
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: isDark
                ? `${currentData.primaryColor}08`
                : `${currentData.primaryColor}10`,
            top: '40%',
            left: '10%',
        },
    });

    const floatingTranslateY = floatAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -20],
    });

    const titleTranslateY = titleAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [30, 0],
    });

    const subtitleTranslateY = subtitleAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [30, 0],
    });

    const buttonTranslateY = buttonAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [30, 0],
    });

    return (
        <ThemedView style={[styles.container]}>
            <StatusBar
                barStyle={isDark ? "light-content" : "dark-content"}
                backgroundColor="transparent"
                translucent
            />

            {/* Animated Background */}
            <Animated.View style={[styles.backgroundContainer, dynamicStyles.gradientBackground]}>
                <View style={dynamicStyles.floatingElements}>
                    <Animated.View
                        style={[
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
                            dynamicStyles.floatingCircle3,
                            {
                                transform: [
                                    {
                                        translateY: floatAnim.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [0, -10],
                                        })
                                    }
                                ]
                            }
                        ]}
                    />
                </View>
            </Animated.View>

            <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                scrollEnabled={false}
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                {...panResponder.panHandlers}
            >
                {onboardingData.map((item, index) => (
                    <Animated.View
                        key={item.id}
                        style={[
                            styles.slideContainer,
                            {
                                paddingTop: insets.top + 20,
                                paddingBottom: insets.bottom + 20,
                                opacity: fadeAnim,
                            },
                        ]}
                    >
                        {/* Progress Indicator */}
                        <View style={styles.progressContainer}>
                            {onboardingData.map((_, i) => (
                                <View
                                    key={i}
                                    style={[
                                        styles.progressDot,
                                        {
                                            backgroundColor: i === currentIndex
                                                ? currentData.primaryColor
                                                : isDark ? '#444' : '#E5E5E5',
                                            width: i === currentIndex ? 24 : 8,
                                        },
                                    ]}
                                />
                            ))}
                        </View>

                        <View style={styles.contentContainer}>
                            {/* Image Container */}
                            <Animated.View
                                style={[
                                    styles.imageContainer,
                                    {
                                        transform: [
                                            { scale: scaleAnim },
                                            { translateY: slideAnim },
                                            { translateY: floatingTranslateY },
                                        ],
                                    },
                                ]}
                            >
                                <View
                                    style={[
                                        styles.imageBackground,
                                        {
                                            backgroundColor: isDark
                                                ? `${currentData.primaryColor}20`
                                                : `${currentData.primaryColor}15`,
                                        },
                                    ]}
                                >
                                    <Image style={styles.image} source={item.image} />
                                </View>
                            </Animated.View>

                            {/* Text Content */}
                            <View style={styles.textContainer}>
                                <Animated.View
                                    style={{
                                        transform: [{ translateY: titleTranslateY }],
                                        opacity: titleAnim,
                                    }}
                                >
                                    <ThemedText type="title" style={styles.title}>
                                        {item.title}
                                    </ThemedText>
                                </Animated.View>

                                <GapColumn space={16} />

                                <Animated.View
                                    style={{
                                        transform: [{ translateY: subtitleTranslateY }],
                                        opacity: subtitleAnim,
                                    }}
                                >
                                    <ThemedText style={styles.subtitle}>
                                        {item.subtitle}
                                    </ThemedText>
                                </Animated.View>
                            </View>

                            {/* Button Container */}
                            <Animated.View
                                style={[
                                    styles.buttonContainer,
                                    {
                                        transform: [{ translateY: buttonTranslateY }],
                                        opacity: buttonAnim,
                                    },
                                ]}
                            >
                                <NormalButton buttonStyle={[
                                    styles.primaryButton,
                                    { backgroundColor: currentData.primaryColor },
                                ]} buttonText={item.buttonText} onPress={() => {
                                    if (item.showSkip) {
                                        handleNext();
                                    } else {
                                        router.replace("/(auth)/register");
                                    }
                                }} />

                                {item.showSkip && (
                                    <>
                                        <GapColumn space={16} />
                                        <TextButton
                                            title="Skip"
                                            navigateTo="/(auth)/register"
                                            textColor={isDark ? '#999' : Colors.primary}
                                            style={styles.skipButton}
                                        />
                                    </>
                                )}
                            </Animated.View>
                        </View>

                        {/* Navigation Hints */}
                        {currentIndex > 0 && (
                            <Animated.View style={[styles.navHint, styles.navHintLeft]}>
                                <ThemedText style={styles.navHintText}>← Swipe</ThemedText>
                            </Animated.View>
                        )}
                        {currentIndex < onboardingData.length - 1 && (
                            <Animated.View style={[styles.navHint, styles.navHintRight]}>
                                <ThemedText style={styles.navHintText}>Swipe →</ThemedText>
                            </Animated.View>
                        )}
                    </Animated.View>
                ))}
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    slideContainer: {
        width: screenWidth,
        flex: 1,
        paddingHorizontal: 24,
    },
    progressContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
        gap: 8,
    },
    progressDot: {
        height: 8,
        borderRadius: 4,
        // transition: 'all 0.3s ease',
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    imageBackground: {
        width: 280,
        height: 280,
        borderRadius: 140,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 10,
    },
    image: {
        width: 260,
        height: 260,
        resizeMode: 'contain',
    },
    textContainer: {
        alignItems: 'center',
        paddingHorizontal: 16,
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        textAlign: 'center',
        fontSize: 32,
        fontWeight: '700',
        lineHeight: 40,
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 18,
        lineHeight: 26,
        opacity: 0.8,
        maxWidth: 300,
    },
    buttonContainer: {
        width: '100%',
        paddingBottom: 20,
    },
    primaryButton: {
        borderRadius: 16,
        paddingVertical: 18,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
    },
    skipButton: {
        alignSelf: 'center',
    },
    navHint: {
        position: 'absolute',
        top: '50%',
        backgroundColor: 'rgba(0,0,0,0.1)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    navHintLeft: {
        left: 10,
    },
    navHintRight: {
        right: 10,
    },
    navHintText: {
        fontSize: 12,
        opacity: 0.6,
    },
});
