import AuthInput from '@/components/AuthInput';
import { AuthButton, NormalButton, TextButton } from '@/components/Buttons';
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
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
            isValid = false;
        }

        if (!formData.password.trim()) {
            newErrors.password = 'Password is required';
            isValid = false;
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
            isValid = false;
        }

        if (formData.password !== formData.confirmPassword) {
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
                        // error={errors.fullName}
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
                        // error={errors.email}
                        />

                        <GapColumn space={16} />

                        <AuthInput
                            label="Password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChangeText={(value) => updateFormData('password', value)}
                            secureTextEntry
                        // error={errors.password}
                        />

                        <GapColumn space={16} />

                        <AuthInput
                            label="Confirm Password"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChangeText={(value) => updateFormData('confirmPassword', value)}
                            secureTextEntry
                        // error={errors.confirmPassword}
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






// // ===============================
// // LOGIN SCREEN
// // ===============================

// import React, { useState } from 'react';
// import {
//     View,
//     StyleSheet,
//     Image,
//     ActivityIndicator,
//     KeyboardAvoidingView,
//     Platform,
//     Alert,
//     TouchableOpacity,
// } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { useColorScheme } from 'react-native';
// import AuthInput from '@/components/AuthInput';
// import { AuthButton, TextButton } from '@/components/Buttons';
// import { GapColumn } from '@/components/Gap';
// import { ThemedText } from '@/components/ThemedText';
// import { ThemedScrollView } from '@/components/ThemedView';
// import { Colors } from '@/constants/Colors';
// import appStyles from '@/constants/Styles';

// export function LoginScreen() {
//     const insets = useSafeAreaInsets();
//     const colorScheme = useColorScheme();
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const [errors, setErrors] = useState({ email: '', password: '' });

//     const isDark = colorScheme === 'dark';

//     const validateForm = () => {
//         const newErrors = { email: '', password: '' };
//         let isValid = true;

//         if (!email.trim()) {
//             newErrors.email = 'Email is required';
//             isValid = false;
//         } else if (!/\S+@\S+\.\S+/.test(email)) {
//             newErrors.email = 'Please enter a valid email';
//             isValid = false;
//         }

//         if (!password.trim()) {
//             newErrors.password = 'Password is required';
//             isValid = false;
//         } else if (password.length < 6) {
//             newErrors.password = 'Password must be at least 6 characters';
//             isValid = false;
//         }

//         setErrors(newErrors);
//         return isValid;
//     };

//     const handleLogin = async () => {
//         if (!validateForm()) return;

//         setIsLoading(true);
//         try {
//             // Simulate API call
//             await new Promise(resolve => setTimeout(resolve, 2000));
//             // Navigate to home on success
//             // navigateTo("/(tabs)/home");
//         } catch (error) {
//             Alert.alert('Error', 'Login failed. Please try again.');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const dynamicStyles = StyleSheet.create({
//         container: {
//             backgroundColor: isDark ? '#0F0F0F' : '#FAFAFA',
//         },
//         headerContainer: {
//             backgroundColor: isDark ? '#1A1A1A' : '#FFFFFF',
//         },
//         welcomeCard: {
//             backgroundColor: isDark ? '#1A1A1A' : '#FFFFFF',
//             shadowColor: isDark ? '#000' : '#E8E8E8',
//         },
//     });

//     return (
//         <KeyboardAvoidingView
//             style={[styles.container, dynamicStyles.container]}
//             behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         >
//             <ThemedScrollView
//                 style={[styles.scrollView]}
//                 contentContainerStyle={[
//                     styles.scrollContent,
//                     { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 20 }
//                 ]}
//                 showsVerticalScrollIndicator={false}
//             >
//                 {/* Header Section */}
//                 <View style={[styles.headerContainer, dynamicStyles.headerContainer]}>
//                     <View style={styles.logoContainer}>
//                         <Image
//                             style={styles.logo}
//                             source={require('../../assets/images/preggy-no-bg.png')}
//                         />
//                     </View>
//                     <ThemedText type="title" style={styles.appName}>
//                         Preggy
//                     </ThemedText>
//                     <ThemedText style={styles.tagline}>
//                         Your trusted pregnancy companion
//                     </ThemedText>
//                 </View>

//                 <GapColumn space={40} />

//                 {/* Welcome Card */}
//                 <View style={[styles.welcomeCard, dynamicStyles.welcomeCard]}>
//                     <ThemedText type="title" style={styles.welcomeTitle}>
//                         Welcome Back! 👋
//                     </ThemedText>
//                     <ThemedText style={styles.welcomeSubtitle}>
//                         Continue your healthy pregnancy journey
//                     </ThemedText>

//                     <GapColumn space={30} />

//                     {/* Form Section */}
//                     <View style={styles.formContainer}>
//                         <AuthInput
//                             label="Email Address"
//                             placeholder="Enter your email"
//                             value={email}
//                             onChangeText={setEmail}
//                             secureTextEntry={false}
//                             keyboardType="email-address"
//                             autoCapitalize="none"
//                             error={errors.email}
//                         />

//                         <GapColumn space={16} />

//                         <AuthInput
//                             label="Password"
//                             placeholder="Enter your password"
//                             value={password}
//                             onChangeText={setPassword}
//                             secureTextEntry
//                             error={errors.password}
//                         />

//                         <View style={styles.forgotPasswordContainer}>
//                             <TextButton
//                                 style={styles.forgotPasswordButton}
//                                 title="Forgot Password?"
//                                 textColor={Colors.primary}
//                                 navigateTo="/(auth)/forgot-password"
//                             />
//                         </View>

//                         <GapColumn space={24} />

//                         {/* Login Button with Loading State */}
//                         <View style={styles.loginButtonContainer}>
//                             {isLoading ? (
//                                 <View style={[styles.loadingButton, { backgroundColor: Colors.primary }]}>
//                                     <ActivityIndicator color="#FFFFFF" size="small" />
//                                     <ThemedText style={styles.loadingText}>Signing you in...</ThemedText>
//                                 </View>
//                             ) : (
//                                 <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
//                                     <ThemedText style={styles.loginButtonText}>Sign In</ThemedText>
//                                 </TouchableOpacity>
//                             )}
//                         </View>

//                         <GapColumn space={32} />

//                         {/* Divider */}
//                         <View style={styles.dividerContainer}>
//                             <View style={[styles.divider, { backgroundColor: isDark ? '#333' : '#E5E5E5' }]} />
//                             <ThemedText style={styles.dividerText}>or</ThemedText>
//                             <View style={[styles.divider, { backgroundColor: isDark ? '#333' : '#E5E5E5' }]} />
//                         </View>

//                         <GapColumn space={24} />

//                         {/* Sign Up Link */}
//                         <View style={styles.signupContainer}>
//                             <ThemedText style={styles.signupText}>
//                                 Don't have an account?{' '}
//                             </ThemedText>
//                             <TextButton
//                                 title="Create Account"
//                                 textColor={Colors.primary}
//                                 navigateTo="/(auth)/register"
//                                 style={styles.signupButton}
//                             />
//                         </View>
//                     </View>
//                 </View>
//             </ThemedScrollView>
//         </KeyboardAvoidingView>
//     );
// }

// // ===============================
// // REGISTER SCREEN
// // ===============================

// export function RegisterScreen() {
//     const insets = useSafeAreaInsets();
//     const colorScheme = useColorScheme();
//     const [formData, setFormData] = useState({
//         fullName: '',
//         email: '',
//         password: '',
//         confirmPassword: '',
//     });
//     const [isLoading, setIsLoading] = useState(false);
//     const [errors, setErrors] = useState({
//         fullName: '',
//         email: '',
//         password: '',
//         confirmPassword: '',
//     });

//     const isDark = colorScheme === 'dark';

//     const validateForm = () => {
//         const newErrors = {
//             fullName: '',
//             email: '',
//             password: '',
//             confirmPassword: '',
//         };
//         let isValid = true;

//         if (!formData.fullName.trim()) {
//             newErrors.fullName = 'Full name is required';
//             isValid = false;
//         }

//         if (!formData.email.trim()) {
//             newErrors.email = 'Email is required';
//             isValid = false;
//         } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//             newErrors.email = 'Please enter a valid email';
//             isValid = false;
//         }

//         if (!formData.password.trim()) {
//             newErrors.password = 'Password is required';
//             isValid = false;
//         } else if (formData.password.length < 6) {
//             newErrors.password = 'Password must be at least 6 characters';
//             isValid = false;
//         }

//         if (formData.password !== formData.confirmPassword) {
//             newErrors.confirmPassword = 'Passwords do not match';
//             isValid = false;
//         }

//         setErrors(newErrors);
//         return isValid;
//     };

//     const handleRegister = async () => {
//         if (!validateForm()) return;

//         setIsLoading(true);
//         try {
//             // Simulate API call
//             await new Promise(resolve => setTimeout(resolve, 2500));
//             // Navigate to onboarding on success
//             // navigateTo("/(onboarding)");
//         } catch (error) {
//             Alert.alert('Error', 'Registration failed. Please try again.');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const updateFormData = (field: string, value: string) => {
//         setFormData(prev => ({ ...prev, [field]: value }));
//     };

//     const dynamicStyles = StyleSheet.create({
//         container: {
//             backgroundColor: isDark ? '#0F0F0F' : '#FAFAFA',
//         },
//         headerContainer: {
//             backgroundColor: isDark ? '#1A1A1A' : '#FFFFFF',
//         },
//         signupCard: {
//             backgroundColor: isDark ? '#1A1A1A' : '#FFFFFF',
//             shadowColor: isDark ? '#000' : '#E8E8E8',
//         },
//     });

//     return (
//         <KeyboardAvoidingView
//             style={[styles.container, dynamicStyles.container]}
//             behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         >
//             <ThemedScrollView
//                 style={styles.scrollView}
//                 contentContainerStyle={[
//                     styles.scrollContent,
//                     { paddingTop: insets.top + 10, paddingBottom: insets.bottom + 20 }
//                 ]}
//                 showsVerticalScrollIndicator={false}
//             >
//                 {/* Header Section */}
//                 <View style={[styles.headerContainer, dynamicStyles.headerContainer]}>
//                     <View style={styles.logoContainer}>
//                         <Image
//                             style={styles.logo}
//                             source={require('../../assets/images/preggy-no-bg.png')}
//                         />
//                     </View>
//                     <ThemedText type="title" style={styles.appName}>
//                         Preggy
//                     </ThemedText>
//                     <ThemedText style={styles.tagline}>
//                         Your trusted companion for pregnancy nutrition safety
//                     </ThemedText>
//                 </View>

//                 <GapColumn space={32} />

//                 {/* Signup Card */}
//                 <View style={[styles.signupCard, dynamicStyles.signupCard]}>
//                     <ThemedText type="title" style={styles.signupTitle}>
//                         Create Your Account 🤱
//                     </ThemedText>
//                     <ThemedText style={styles.signupSubtitle}>
//                         Join thousands of expecting mothers who trust Preggy
//                     </ThemedText>

//                     <GapColumn space={30} />

//                     {/* Form Section */}
//                     <View style={styles.formContainer}>
//                         <AuthInput
//                             label="Full Name"
//                             placeholder="Enter your full name"
//                             value={formData.fullName}
//                             onChangeText={(value) => updateFormData('fullName', value)}
//                             secureTextEntry={false}
//                             error={errors.fullName}
//                         />

//                         <GapColumn space={16} />

//                         <AuthInput
//                             label="Email Address"
//                             placeholder="Enter your email"
//                             value={formData.email}
//                             onChangeText={(value) => updateFormData('email', value)}
//                             secureTextEntry={false}
//                             keyboardType="email-address"
//                             autoCapitalize="none"
//                             error={errors.email}
//                         />

//                         <GapColumn space={16} />

//                         <AuthInput
//                             label="Password"
//                             placeholder="Enter your password"
//                             value={formData.password}
//                             onChangeText={(value) => updateFormData('password', value)}
//                             secureTextEntry
//                             error={errors.password}
//                         />

//                         <GapColumn space={16} />

//                         <AuthInput
//                             label="Confirm Password"
//                             placeholder="Confirm your password"
//                             value={formData.confirmPassword}
//                             onChangeText={(value) => updateFormData('confirmPassword', value)}
//                             secureTextEntry
//                             error={errors.confirmPassword}
//                         />

//                         <GapColumn space={24} />

//                         {/* Register Button with Loading State */}
//                         <View style={styles.registerButtonContainer}>
//                             {isLoading ? (
//                                 <View style={[styles.loadingButton, { backgroundColor: Colors.primary }]}>
//                                     <ActivityIndicator color="#FFFFFF" size="small" />
//                                     <ThemedText style={styles.loadingText}>Creating your account...</ThemedText>
//                                 </View>
//                             ) : (
//                                 <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
//                                     <ThemedText style={styles.registerButtonText}>Create Account</ThemedText>
//                                 </TouchableOpacity>
//                             )}
//                         </View>

//                         <GapColumn space={32} />

//                         {/* Divider */}
//                         <View style={styles.dividerContainer}>
//                             <View style={[styles.divider, { backgroundColor: isDark ? '#333' : '#E5E5E5' }]} />
//                             <ThemedText style={styles.dividerText}>or</ThemedText>
//                             <View style={[styles.divider, { backgroundColor: isDark ? '#333' : '#E5E5E5' }]} />
//                         </View>

//                         <GapColumn space={24} />

//                         {/* Login Link */}
//                         <View style={styles.loginLinkContainer}>
//                             <ThemedText style={styles.loginLinkText}>
//                                 Already have an account?{' '}
//                             </ThemedText>
//                             <TextButton
//                                 title="Sign In"
//                                 textColor={Colors.primary}
//                                 navigateTo="/(auth)/login"
//                                 style={styles.loginLinkButton}
//                             />
//                         </View>
//                     </View>
//                 </View>
//             </ThemedScrollView>
//         </KeyboardAvoidingView>
//     );
// }

// // ===============================
// // FORGOT PASSWORD SCREEN
// // ===============================

// export function ForgotPasswordScreen() {
//     const insets = useSafeAreaInsets();
//     const colorScheme = useColorScheme();
//     const [email, setEmail] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const [emailSent, setEmailSent] = useState(false);
//     const [error, setError] = useState('');

//     const isDark = colorScheme === 'dark';

//     const validateEmail = () => {
//         if (!email.trim()) {
//             setError('Email is required');
//             return false;
//         } else if (!/\S+@\S+\.\S+/.test(email)) {
//             setError('Please enter a valid email');
//             return false;
//         }
//         setError('');
//         return true;
//     };

//     const handleResetPassword = async () => {
//         if (!validateEmail()) return;

//         setIsLoading(true);
//         try {
//             // Simulate API call
//             await new Promise(resolve => setTimeout(resolve, 2000));
//             setEmailSent(true);
//         } catch (error) {
//             setError('Failed to send reset email. Please try again.');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const dynamicStyles = StyleSheet.create({
//         container: {
//             backgroundColor: isDark ? '#0F0F0F' : '#FAFAFA',
//         },
//         resetCard: {
//             backgroundColor: isDark ? '#1A1A1A' : '#FFFFFF',
//             shadowColor: isDark ? '#000' : '#E8E8E8',
//         },
//     });

//     if (emailSent) {
//         return (
//             <KeyboardAvoidingView style={[styles.container, dynamicStyles.container]}>
//                 <ThemedScrollView
//                     style={styles.scrollView}
//                     contentContainerStyle={[
//                         styles.centeredContent,
//                         { paddingTop: insets.top + 40, paddingBottom: insets.bottom + 20 }
//                     ]}
//                 >
//                     <View style={[styles.resetCard, dynamicStyles.resetCard]}>
//                         <View style={styles.successIconContainer}>
//                             <ThemedText style={styles.successIcon}>📧</ThemedText>
//                         </View>
//                         <ThemedText type="title" style={styles.successTitle}>
//                             Check Your Email
//                         </ThemedText>
//                         <ThemedText style={styles.successMessage}>
//                             We've sent password reset instructions to:
//                         </ThemedText>
//                         <ThemedText style={styles.emailText}>{email}</ThemedText>
//                         <ThemedText style={styles.instructionText}>
//                             Click the link in the email to reset your password. If you don't see it, check your spam folder.
//                         </ThemedText>

//                         <GapColumn space={32} />

//                         <TouchableOpacity style={styles.backButton}>
//                             <TextButton
//                                 title="← Back to Login"
//                                 textColor={Colors.primary}
//                                 navigateTo="/(auth)/login"
//                             />
//                         </TouchableOpacity>
//                     </View>
//                 </ThemedScrollView>
//             </KeyboardAvoidingView>
//         );
//     }

//     return (
//         <KeyboardAvoidingView style={[styles.container, dynamicStyles.container]}>
//             <ThemedScrollView
//                 style={styles.scrollView}
//                 contentContainerStyle={[
//                     styles.centeredContent,
//                     { paddingTop: insets.top + 40, paddingBottom: insets.bottom + 20 }
//                 ]}
//             >
//                 <View style={[styles.resetCard, dynamicStyles.resetCard]}>
//                     <View style={styles.iconContainer}>
//                         <ThemedText style={styles.icon}>🔒</ThemedText>
//                     </View>

//                     <ThemedText type="title" style={styles.resetTitle}>
//                         Forgot Password?
//                     </ThemedText>
//                     <ThemedText style={styles.resetSubtitle}>
//                         No worries! Enter your email address and we'll send you instructions to reset your password.
//                     </ThemedText>

//                     <GapColumn space={32} />

//                     <View style={styles.formContainer}>
//                         <AuthInput
//                             label="Email Address"
//                             placeholder="Enter your email"
//                             value={email}
//                             onChangeText={setEmail}
//                             secureTextEntry={false}
//                             keyboardType="email-address"
//                             autoCapitalize="none"
//                             error={error}
//                         />

//                         <GapColumn space={24} />

//                         {/* Reset Button with Loading State */}
//                         <View style={styles.resetButtonContainer}>
//                             {isLoading ? (
//                                 <View style={[styles.loadingButton, { backgroundColor: Colors.primary }]}>
//                                     <ActivityIndicator color="#FFFFFF" size="small" />
//                                     <ThemedText style={styles.loadingText}>Sending reset link...</ThemedText>
//                                 </View>
//                             ) : (
//                                 <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword}>
//                                     <ThemedText style={styles.resetButtonText}>Send Reset Link</ThemedText>
//                                 </TouchableOpacity>
//                             )}
//                         </View>

//                         <GapColumn space={32} />

//                         <TouchableOpacity style={styles.backButton}>
//                             <TextButton
//                                 title="← Back to Login"
//                                 textColor={Colors.primary}
//                                 navigateTo="/(auth)/login"
//                             />
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </ThemedScrollView>
//         </KeyboardAvoidingView>
//     );
// }

// // ===============================
// // SHARED STYLES
// // ===============================

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     scrollView: {
//         flex: 1,
//     },
//     scrollContent: {
//         flexGrow: 1,
//         paddingHorizontal: 20,
//     },
//     centeredContent: {
//         flexGrow: 1,
//         justifyContent: 'center',
//         paddingHorizontal: 20,
//     },

//     // Header Styles
//     headerContainer: {
//         borderRadius: 20,
//         padding: 24,
//         alignItems: 'center',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 8,
//         elevation: 4,
//     },
//     logoContainer: {
//         marginBottom: 12,
//     },
//     logo: {
//         height: 80,
//         width: 80,
//         borderRadius: 20,
//     },
//     appName: {
//         fontSize: 28,
//         fontWeight: '700',
//         marginBottom: 8,
//     },
//     tagline: {
//         fontSize: 16,
//         textAlign: 'center',
//         opacity: 0.8,
//         maxWidth: 280,
//         lineHeight: 22,
//     },

//     // Card Styles
//     welcomeCard: {
//         borderRadius: 20,
//         padding: 28,
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.1,
//         shadowRadius: 12,
//         elevation: 6,
//     },
//     signupCard: {
//         borderRadius: 20,
//         padding: 28,
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.1,
//         shadowRadius: 12,
//         elevation: 6,
//     },
//     resetCard: {
//         borderRadius: 20,
//         padding: 32,
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.1,
//         shadowRadius: 12,
//         elevation: 6,
//         alignItems: 'center',
//     },

//     // Title Styles
//     welcomeTitle: {
//         fontSize: 26,
//         fontWeight: '700',
//         textAlign: 'center',
//         marginBottom: 8,
//     },
//     welcomeSubtitle: {
//         fontSize: 16,
//         textAlign: 'center',
//         opacity: 0.8,
//         lineHeight: 22,
//     },
//     signupTitle: {
//         fontSize: 26,
//         fontWeight: '700',
//         textAlign: 'center',
//         marginBottom: 8,
//     },
//     signupSubtitle: {
//         fontSize: 16,
//         textAlign: 'center',
//         opacity: 0.8,
//         lineHeight: 22,
//         maxWidth: 280,
//         alignSelf: 'center',
//     },

//     // Form Styles
//     formContainer: {
//         width: '100%',
//     },
//     forgotPasswordContainer: {
//         alignItems: 'flex-end',
//         marginTop: 12,
//     },
//     forgotPasswordButton: {
//         alignSelf: 'flex-end',
//     },

//     // Button Styles
//     loginButtonContainer: {
//         width: '100%',
//     },
//     loginButton: {
//         backgroundColor: Colors.primary,
//         borderRadius: 16,
//         paddingVertical: 18,
//         alignItems: 'center',
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.15,
//         shadowRadius: 12,
//         elevation: 8,
//     },
//     loginButtonText: {
//         color: '#FFFFFF',
//         fontSize: 18,
//         fontWeight: '600',
//     },
//     registerButtonContainer: {
//         width: '100%',
//     },
//     registerButton: {
//         backgroundColor: Colors.primary,
//         borderRadius: 16,
//         paddingVertical: 18,
//         alignItems: 'center',
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.15,
//         shadowRadius: 12,
//         elevation: 8,
//     },
//     registerButtonText: {
//         color: '#FFFFFF',
//         fontSize: 18,
//         fontWeight: '600',
//     },
//     resetButtonContainer: {
//         width: '100%',
//     },
//     resetButton: {
//         backgroundColor: Colors.primary,
//         borderRadius: 16,
//         paddingVertical: 18,
//         alignItems: 'center',
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.15,
//         shadowRadius: 12,
//         elevation: 8,
//     },
//     resetButtonText: {
//         color: '#FFFFFF',
//         fontSize: 18,
//         fontWeight: '600',
//     },

//     // Loading Button Styles
//     loadingButton: {
//         borderRadius: 16,
//         paddingVertical: 18,
//         alignItems: 'center',
//         justifyContent: 'center',
//         flexDirection: 'row',
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.15,
//         shadowRadius: 12,
//         elevation: 8,
//     },
//     loadingText: {
//         color: '#FFFFFF',
//         fontSize: 18,
//         fontWeight: '600',
//         marginLeft: 12,
//     },

//     // Divider Styles
//     dividerContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginVertical: 8,
//     },
//     divider: {
//         flex: 1,
//         height: 1,
//     },
//     dividerText: {
//         marginHorizontal: 16,
//         opacity: 0.6,
//         fontSize: 14,
//     },

//     // Link Styles
//     signupContainer: {
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     signupText: {
//         fontSize: 16,
//         opacity: 0.8,
//     },
//     signupButton: {
//         marginLeft: 4,
//     },
//     loginLinkContainer: {
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     loginLinkText: {
//         fontSize: 16,
//         opacity: 0.8,
//     },
//     loginLinkButton: {
//         marginLeft: 4,
//     },
//     backButton: {
//         alignSelf: 'center',
//     },

//     // Forgot Password Success Styles
//     iconContainer: {
//         marginBottom: 24,
//     },
//     icon: {
//         fontSize: 64,
//     },
//     successIconContainer: {
//         marginBottom: 24,
//     },
//     successIcon: {
//         fontSize: 64,
//     },
//     resetTitle: {
//         fontSize: 28,
//         fontWeight: '700',
//         textAlign: 'center',
//         marginBottom: 16,
//     },
//     resetSubtitle: {
//         fontSize: 16,
//         textAlign: 'center',
//         opacity: 0.8,
//         lineHeight: 22,
//         maxWidth: 300,
//     },
//     successTitle: {
//         fontSize: 28,
//         fontWeight: '700',
//         textAlign: 'center',
//         marginBottom: 16,
//     },
//     successMessage: {
//         fontSize: 16,
//         textAlign: 'center',
//         opacity: 0.8,
//         marginBottom: 8,
//     },
//     emailText: {
//         fontSize: 16,
//         fontWeight: '600',
//         textAlign: 'center',
//         color: Colors.primary,
//         marginBottom: 16,
//     },
//     instructionText: {
//         fontSize: 14,
//         textAlign: 'center',
//         opacity: 0.7,
//         lineHeight: 20,
//         maxWidth: 300,
//     },
// });
