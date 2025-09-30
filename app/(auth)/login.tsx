
import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Image,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    Alert,
    TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native';
import AuthInput from '@/components/AuthInput';
import { NormalButton, TextButton } from '@/components/Buttons';
import { GapColumn } from '@/components/Gap';
import { ThemedText } from '@/components/ThemedText';
import { ThemedScrollView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import appStyles from '@/constants/Styles';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/providers/auth_store';

export default function LoginScreen() {
    const insets = useSafeAreaInsets();
    const colorScheme = useColorScheme();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const router = useRouter();

    const { isLoading, login, error } = useAuthStore();

    const isDark = colorScheme === 'dark';

    const validateForm = () => {
        let isValid = true;

        if (!formData.email.trim()) {
            Alert.alert('Error', 'Email is required');
            isValid = false;

        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            Alert.alert('Error', 'Please enter a valid email');
            isValid = false;
        }

        if (!formData.password.trim()) {
            Alert.alert('Error', 'Password is required');
            isValid = false;
        } else if (formData.password.length < 6) {
            Alert.alert('Error', 'Password must be at least 6 characters long');
            isValid = false;
        }

        return isValid;
    };

    const handleLogin = async () => {

        if (!validateForm()) return;

        try {
            await login(formData);
            if (error) {
                Alert.alert('Error', error);
                return;
            }
            router.dismissTo('/(tabs)/home')
        } catch (error : any) {
            Alert.alert('Error', error);
            return;
        }
    };

    const updateFormData = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const dynamicStyles = StyleSheet.create({
        container: {
            backgroundColor: isDark ? '#0F0F0F' : '#FAFAFA',
        },
        headerContainer: {
            backgroundColor: isDark ? '#1A1A1A' : '#FFFFFF',
        },
        welcomeCard: {
            backgroundColor: isDark ? '#1A1A1A' : '#FFFFFF',
            shadowColor: isDark ? '#000' : '#E8E8E8',
        },
    });

    return (
        <KeyboardAvoidingView
            style={[appStyles.flex, dynamicStyles.container]}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ThemedScrollView
                style={[{
                    paddingBottom: insets.bottom + 20,
                    flex: 1
                }]}
                showsVerticalScrollIndicator={false}
            >
                {/* Header Section */}
                <View style={[styles.headerContainer, dynamicStyles.headerContainer, {
                    paddingTop: insets.top + 10,
                }]}>
                    <View style={styles.logoContainer}>
                        <Image
                            style={styles.logo}
                            source={require('../../assets/images/preggy-no-bg.png')}
                        />
                    </View>
                    <ThemedText type="title" style={styles.appName}>
                        Preggy
                    </ThemedText>
                    <ThemedText style={styles.tagline}>
                        Your trusted pregnancy companion
                    </ThemedText>
                </View>

                <GapColumn space={40} />

                {/* Welcome Card */}
                <View style={[styles.welcomeCard, dynamicStyles.welcomeCard]}>
                    <ThemedText type="title" style={styles.welcomeTitle}>
                        Welcome Back! 👋
                    </ThemedText>
                    <ThemedText style={styles.welcomeSubtitle}>
                        Continue your healthy pregnancy journey
                    </ThemedText>

                    <GapColumn space={30} />

                    {/* Form Section */}
                    <View style={styles.formContainer}>
                        <AuthInput
                            label="Email Address"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChangeText={(value) => updateFormData('email', value)}
                            secureTextEntry={false}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />

                        <GapColumn space={16} />

                        <AuthInput
                            label="Password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChangeText={(value) => updateFormData('password', value)}
                            secureTextEntry
                        />

                        <View style={styles.forgotPasswordContainer}>
                            <TextButton
                                style={styles.forgotPasswordButton}
                                title="Forgot Password?"
                                textColor={Colors.primary}
                                navigateTo="/(auth)/forgot-password"
                            />
                        </View>

                        <GapColumn space={24} />

                        {/* Login Button with Loading State */}
                        <NormalButton isLoading={isLoading} buttonText='Sign In' onPress={handleLogin} />

                        <GapColumn space={32} />

                        {/* Divider */}
                        <View style={styles.dividerContainer}>
                            <View style={[styles.divider, { backgroundColor: isDark ? '#333' : '#E5E5E5' }]} />
                            <ThemedText style={styles.dividerText}>or</ThemedText>
                            <View style={[styles.divider, { backgroundColor: isDark ? '#333' : '#E5E5E5' }]} />
                        </View>

                        <GapColumn space={24} />

                        {/* Sign Up Link */}
                        <View style={styles.signupContainer}>
                            <ThemedText style={styles.signupText}>
                                Don't have an account?{' '}
                            </ThemedText>
                            <TextButton
                                title="Create Account"
                                textColor={Colors.primary}
                                navigateTo="/(auth)/register"
                                style={styles.signupButton}
                            />
                        </View>
                    </View>
                </View>
            </ThemedScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 20,
    },
    centeredContent: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },

    // Header Styles
    headerContainer: {
        borderRadius: 20,
        padding: 24,
        alignItems: 'center',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    logoContainer: {
        marginBottom: 12,
    },
    logo: {
        height: 80,
        width: 80,
        borderRadius: 20,
    },
    appName: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 8,
    },
    tagline: {
        fontSize: 16,
        textAlign: 'center',
        opacity: 0.8,
        maxWidth: 280,
        lineHeight: 22,
    },

    // Card Styles
    welcomeCard: {
        borderRadius: 20,
        padding: 28,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 6,
    },

    // Title Styles
    welcomeTitle: {
        fontSize: 26,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 8,
    },
    welcomeSubtitle: {
        fontSize: 16,
        textAlign: 'center',
        opacity: 0.8,
        lineHeight: 22,
    },

    // Form Styles
    formContainer: {
        width: '100%',
    },
    forgotPasswordContainer: {
        alignItems: 'flex-end',
        marginTop: 12,
    },
    forgotPasswordButton: {
        alignSelf: 'flex-end',
    },

    loginButton: {
        backgroundColor: Colors.primary,
        borderRadius: 16,
        paddingVertical: 18,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
    },

    // Divider Styles
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    divider: {
        flex: 1,
        height: 1,
    },
    dividerText: {
        marginHorizontal: 16,
        opacity: 0.6,
        fontSize: 14,
    },

    // Link Styles
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    signupText: {
        fontSize: 16,
        opacity: 0.8,
    },
    signupButton: {
        marginLeft: 4,
    },
});
