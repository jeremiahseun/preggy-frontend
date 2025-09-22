import AuthInput from '@/components/AuthInput';
import { AuthButton, TextButton } from '@/components/Buttons';
import { GapColumn } from '@/components/Gap';
import { ThemedText } from '@/components/ThemedText';
import { ThemedScrollView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';

import { useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, useColorScheme, View, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';


export default function ForgotPasswordScreen() {
    const insets = useSafeAreaInsets();
    const colorScheme = useColorScheme();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const [error, setError] = useState('');

    const isDark = colorScheme === 'dark';

    const validateEmail = () => {
        if (!email.trim()) {
            setError('Email is required');
            return false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Please enter a valid email');
            return false;
        }
        setError('');
        return true;
    };

    const handleResetPassword = async () => {
        if (!validateEmail()) return;

        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            setEmailSent(true);
        } catch (error) {
            setError('Failed to send reset email. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const dynamicStyles = StyleSheet.create({
        container: {
            backgroundColor: isDark ? '#0F0F0F' : '#FAFAFA',
        },
        resetCard: {
            backgroundColor: isDark ? '#1A1A1A' : '#FFFFFF',
            shadowColor: isDark ? '#000' : '#E8E8E8',
        },
    });

    if (emailSent) {
        return (
            <KeyboardAvoidingView style={[styles.container, dynamicStyles.container]}>
                <ThemedScrollView
                    style={styles.scrollView}
                    contentContainerStyle={[
                        styles.centeredContent,
                        { paddingTop: insets.top + 40, paddingBottom: insets.bottom + 20 }
                    ]}
                >
                    <View style={[styles.resetCard, dynamicStyles.resetCard]}>
                        <View style={styles.successIconContainer}>
                            <ThemedText style={styles.successIcon}>📧</ThemedText>
                        </View>
                        <ThemedText type="title" style={styles.successTitle}>
                            Check Your Email
                        </ThemedText>
                        <ThemedText style={styles.successMessage}>
                            We've sent password reset instructions to:
                        </ThemedText>
                        <ThemedText style={styles.emailText}>{email}</ThemedText>
                        <ThemedText style={styles.instructionText}>
                            Click the link in the email to reset your password. If you don't see it, check your spam folder.
                        </ThemedText>

                        <GapColumn space={32} />

                        <TouchableOpacity style={styles.backButton}>
                            <TextButton
                                title="← Back to Login"
                                textColor={Colors.primary}
                                navigateTo="/(auth)/login"
                            />
                        </TouchableOpacity>
                    </View>
                </ThemedScrollView>
            </KeyboardAvoidingView>
        );
    }

    return (
        <KeyboardAvoidingView style={[styles.container, dynamicStyles.container]}>
            <ThemedScrollView
                style={styles.scrollView}
                contentContainerStyle={[
                    styles.centeredContent,
                    { paddingTop: insets.top + 40, paddingBottom: insets.bottom + 20 }
                ]}
            >
                <View style={[styles.resetCard, dynamicStyles.resetCard]}>
                    <View style={styles.iconContainer}>
                        <ThemedText style={styles.icon}>🔒</ThemedText>
                    </View>

                    <ThemedText type="title" style={styles.resetTitle}>
                        Forgot Password?
                    </ThemedText>
                    <ThemedText style={styles.resetSubtitle}>
                        No worries! Enter your email address and we'll send you instructions to reset your password.
                    </ThemedText>

                    <GapColumn space={32} />

                    <View style={styles.formContainer}>
                        <AuthInput
                            label="Email Address"
                            placeholder="Enter your email"
                            value={email}
                            onChangeText={setEmail}
                            secureTextEntry={false}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            // error={error}
                        />

                        <GapColumn space={24} />

                        {/* Reset Button with Loading State */}
                        <View style={styles.resetButtonContainer}>
                            {isLoading ? (
                                <View style={[styles.loadingButton, { backgroundColor: Colors.primary }]}>
                                    <ActivityIndicator color="#FFFFFF" size="small" />
                                    <ThemedText style={styles.loadingText}>Sending reset link...</ThemedText>
                                </View>
                            ) : (
                                <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword}>
                                    <ThemedText style={styles.resetButtonText}>Send Reset Link</ThemedText>
                                </TouchableOpacity>
                            )}
                        </View>

                        <GapColumn space={32} />

                        <TouchableOpacity style={styles.backButton}>
                            <TextButton
                                title="← Back to Login"
                                textColor={Colors.primary}
                                navigateTo="/(auth)/login"
                            />
                        </TouchableOpacity>
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
    signupCard: {
        borderRadius: 20,
        padding: 28,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 6,
    },
    resetCard: {
        borderRadius: 20,
        padding: 32,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 6,
        alignItems: 'center',
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
    signupTitle: {
        fontSize: 26,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 8,
    },
    signupSubtitle: {
        fontSize: 16,
        textAlign: 'center',
        opacity: 0.8,
        lineHeight: 22,
        maxWidth: 280,
        alignSelf: 'center',
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

    // Button Styles
    loginButtonContainer: {
        width: '100%',
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
    loginButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
    },
    registerButtonContainer: {
        width: '100%',
    },
    registerButton: {
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
    registerButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
    },
    resetButtonContainer: {
        width: '100%',
    },
    resetButton: {
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
    resetButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
    },

    // Loading Button Styles
    loadingButton: {
        borderRadius: 16,
        paddingVertical: 18,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
    },
    loadingText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
        marginLeft: 12,
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
    loginLinkContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginLinkText: {
        fontSize: 16,
        opacity: 0.8,
    },
    loginLinkButton: {
        marginLeft: 4,
    },
    backButton: {
        alignSelf: 'center',
    },

    // Forgot Password Success Styles
    iconContainer: {
        marginBottom: 24,
    },
    icon: {
        fontSize: 64,
    },
    successIconContainer: {
        marginBottom: 24,
    },
    successIcon: {
        fontSize: 64,
    },
    resetTitle: {
        fontSize: 28,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 16,
    },
    resetSubtitle: {
        fontSize: 16,
        textAlign: 'center',
        opacity: 0.8,
        lineHeight: 22,
        maxWidth: 300,
    },
    successTitle: {
        fontSize: 28,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 16,
    },
    successMessage: {
        fontSize: 16,
        textAlign: 'center',
        opacity: 0.8,
        marginBottom: 8,
    },
    emailText: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        color: Colors.primary,
        marginBottom: 16,
    },
    instructionText: {
        fontSize: 14,
        textAlign: 'center',
        opacity: 0.7,
        lineHeight: 20,
        maxWidth: 300,
    },
});
