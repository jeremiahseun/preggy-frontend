import AuthInput from '@/components/AuthInput';
import { NormalButton, TextButton } from '@/components/Buttons';
import { GapColumn } from '@/components/Gap';
import { ThemedText } from '@/components/ThemedText';
import { ThemedScrollView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import appStyles from '@/constants/Styles';
import { useAuthStore } from '@/providers/auth_store';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, useColorScheme, View, StyleSheet } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function RegisterScreen() {
    const insets = useSafeAreaInsets();
    const colorScheme = useColorScheme();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const { isLoading, register, error } = useAuthStore();
    const [errors, setErrors] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const isDark = colorScheme === 'dark';

    const validateForm = () => {
        const newErrors = {
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
        };
        let isValid = true;

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
            isValid = false;
        }

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
        } else if (formData.password.length < 8) {
            Alert.alert('Error', 'Password must be at least 8 characters long');
            newErrors.password = 'Password must be at least 8 characters';
            isValid = false;
        }

        if (formData.password !== formData.confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            newErrors.confirmPassword = 'Passwords do not match';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleRegister = async () => {

        if (!validateForm()) return;

        await register(formData);

        try {
            if (error) {
                Alert.alert('Error', error);
                return;
            }
            router.push("/(onboarding)");

        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'Registration failed. Please try again.');
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
        signupCard: {
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
                    <ThemedText style={{
                        textAlign: 'center', paddingHorizontal: 10
                    }}>
                        Your trusted companion for pregnancy nutrition safety
                    </ThemedText>
                </View>

                <GapColumn space={32} />

                {/* Signup Card */}
                <View style={[styles.signupCard, dynamicStyles.signupCard]}>
                    <ThemedText style={styles.signupTitle}>
                        Create Your Account 🤱
                    </ThemedText>
                    <ThemedText style={{
                        textAlign: 'center', paddingHorizontal: 30
                    }}>
                        Join thousands of expecting mothers who trust Preggy
                    </ThemedText>

                    <GapColumn space={30} />

                    {/* Form Section */}
                    <View style={styles.formContainer}>
                        <AuthInput
                            label="Full Name"
                            placeholder="Enter your full name"
                            value={formData.fullName}
                            onChangeText={(value) => updateFormData('fullName', value)}
                            secureTextEntry={false}
                        />

                        <GapColumn space={16} />

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

                        <GapColumn space={16} />

                        <AuthInput
                            label="Confirm Password"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChangeText={(value) => updateFormData('confirmPassword', value)}
                            secureTextEntry
                        />

                        <GapColumn space={24} />

                        <NormalButton isLoading={isLoading} buttonText='Create Account' onPress={handleRegister} />

                        <GapColumn space={32} />

                        {/* Divider */}
                        <View style={styles.dividerContainer}>
                            <View style={[styles.divider, { backgroundColor: isDark ? '#333' : '#E5E5E5' }]} />
                            <ThemedText style={styles.dividerText}>or</ThemedText>
                            <View style={[styles.divider, { backgroundColor: isDark ? '#333' : '#E5E5E5' }]} />
                        </View>

                        <GapColumn space={24} />

                        {/* Login Link */}
                        <View style={styles.loginLinkContainer}>
                            <ThemedText style={styles.loginLinkText}>
                                Already have an account?{' '}
                            </ThemedText>
                            <TextButton
                                title="Sign In"
                                textColor={Colors.primary}
                                navigateTo="/(auth)/login"
                                style={styles.loginLinkButton}
                            />
                        </View>
                    </View>
                </View>
            </ThemedScrollView>
        </KeyboardAvoidingView>
    );
}


const styles = StyleSheet.create({

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

    signupCard: {
        borderRadius: 20,
        padding: 28,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 6,
    },
    signupTitle: {
        fontSize: 26,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 8,
    },

    // Form Styles
    formContainer: {
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
});
