import React from 'react';
import { ScrollView, View, Text, StyleSheet, SafeAreaView, StatusBar, useColorScheme } from 'react-native';
import { Heart, CheckCircle, Camera, MessageCircle, Calendar, Shield } from 'lucide-react-native';
import { ThemedScrollView, ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function AboutScreen() {
    const isDarkMode = useColorScheme() === 'dark';

    const features = [
        {
            icon: CheckCircle,
            title: 'Personalized Guidance',
            description: 'Get advice tailored to your specific trimester and region, focusing on local foods and preparation methods.'
        },
        {
            icon: Camera,
            title: 'Food Checks',
            description: 'Quickly find out if a food, drink, or fruit is safe to consume. You can even snap a photo for a quick check!'
        },
        {
            icon: MessageCircle,
            title: 'Expert Answers',
            description: 'Chat with our AI assistant to get reliable, evidence-based answers to your nutrition questions, always with clear sources.'
        },
        {
            icon: Calendar,
            title: 'Weekly Diet Plans',
            description: 'Receive easy-to-follow weekly recommendations to help you maintain a balanced diet throughout your pregnancy.'
        },
        {
            icon: Shield,
            title: 'Safety First',
            description: 'All our advice is grounded in trusted medical sources, and we always show you where the information comes from and when it was last verified.'
        }
    ];

    return (
        <ThemedScrollView
            lightColor='#FFF5F7'
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
        >
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.iconContainer}>
                    <Heart size={40} color="#E91E63" fill="#E91E63" />
                </View>
                <ThemedText type='title' lightColor='black'>About Preggy</ThemedText>
            </View>

            {/* Introduction */}
            <View style={styles.section}>
                <ThemedText lightColor='#4A4A4A' style={styles.introText}>
                    Welcome to <Text style={styles.brandName}>Preggy</Text>, your personal pregnancy nutrition assistant! We know that navigating what to eat and drink during pregnancy can be confusing, especially with so much information out there. Preggy is here to help you make safe and healthy food choices for you and your baby, every step of the way.
                </ThemedText>
            </View>

            {/* Features Section */}
            <View style={styles.section}>
                <ThemedText lightColor='#2D2D2D' style={styles.sectionTitle}>What Preggy Does For You:</ThemedText>

                {features.map((feature, index) => {
                    const IconComponent = feature.icon;
                    return (
                        <ThemedView key={index} style={styles.featureItem}>
                            <View style={styles.featureIconContainer}>
                                <IconComponent size={24} color="#E91E63" strokeWidth={2.5} />
                            </View>
                            <View style={styles.featureContent}>
                                <ThemedText lightColor='#2D2D2D' style={styles.featureTitle}>{feature.title}</ThemedText>
                                <ThemedText lightColor='#666666' style={styles.featureDescription}>{feature.description}</ThemedText>
                            </View>
                        </ThemedView>
                    );
                })}
            </View>

            {/* Goal Section */}
            <View style={styles.section}>
                <ThemedText type='subTitle' style={{
                    paddingBottom: 10
                }}>Our Goal:</ThemedText>
                <ThemedText style={styles.goalText}>
                    To empower you with accurate, culturally relevant, and easy-to-understand nutrition information, so you can feel confident and healthy during your pregnancy journey.
                </ThemedText>
            </View>

            {/* Disclaimer */}
            <View style={styles.disclaimer}>
                <Text style={styles.disclaimerText}>
                    <Text style={styles.disclaimerBold}>Important:</Text> Preggy is not a substitute for professional medical advice. Always consult with your healthcare provider for personalized medical guidance.
                </Text>
            </View>
        </ThemedScrollView>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: '#FFF5F7',
    },
    contentContainer: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 40,
    },
    header: {
        alignItems: 'center',
        marginBottom: 24,
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#FFE4EC',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },

    section: {
        marginBottom: 28,
    },
    introText: {
        fontSize: 16,
        lineHeight: 26,
        textAlign: 'left',
    },
    brandName: {
        fontWeight: '600',
        color: '#E91E63',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 16,
    },
    featureItem: {
        flexDirection: 'row',
        marginBottom: 20,
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    featureIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#FFE4EC',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
        flexShrink: 0,
    },
    featureContent: {
        flex: 1,
    },
    featureTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 6,
    },
    featureDescription: {
        fontSize: 14,
        lineHeight: 22,
    },
    goalText: {
        fontSize: 16,
        lineHeight: 26,
        fontStyle: 'italic',
        padding: 16,
        borderRadius: 12,
        borderLeftWidth: 4,
        borderLeftColor: '#E91E63',
    },
    disclaimer: {
        backgroundColor: '#FFF3E0',
        borderRadius: 12,
        padding: 16,
        marginTop: 8,
        borderWidth: 1,
        borderColor: '#FFE0B2',
    },
    disclaimerText: {
        fontSize: 13,
        lineHeight: 20,
        color: '#5D4037',
        textAlign: 'center',
    },
    disclaimerBold: {
        fontWeight: '700',
    },
});
