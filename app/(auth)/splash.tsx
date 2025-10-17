import { ThemedView } from '@/components/ThemedView';
import { Redirect, router } from 'expo-router';
import { useEffect } from 'react';
import { Image, StyleSheet, ActivityIndicator } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useAuthStore } from '@/providers/auth_store';
import { useNetInfo } from '@react-native-community/netinfo';
import { Colors } from '@/constants/Colors';

export default function SplashScreen() {

    const { isLoading: isAuthLoading, isAuthenticated, isFirstTime, initializeAuth, getToken, refreshToken } = useAuthStore();
    const netInfo = useNetInfo();

    useEffect(() => {
        // Wait until the network check is complete (isInternetReachable is not null).
        console.log("Checking useEffect")
        if (netInfo.isInternetReachable === null) {
            console.log("Still checking network status")
            return; // Still checking network status, do nothing yet.
        }

        if (netInfo.isInternetReachable === false) {
            console.log("Network is offline")
            // If determined to be offline, redirect to the error screen.
            router.replace('/network-error');
        } else if (netInfo.isInternetReachable === true) {
            console.log("Network is online")
            // If determined to be online, proceed with authentication.
            const unsubscribe = initializeAuth();
            getToken();
            refreshToken();

            // Clean up the auth listener when the component unmounts.
            return () => {
                unsubscribe();
            };
        }
    }, [netInfo.isInternetReachable, initializeAuth, getToken]);

    // Determine if the app is in a loading state.
    // This is true if we are still checking the network OR if we are online and waiting for auth to resolve.
    const isLoading = netInfo.isInternetReachable === null || isAuthLoading;

    if (isLoading) {
        return (
            <ThemedView style={styles.container}>
                <Image
                    style={styles.logo}
                    source={require('../../assets/images/preggy-no-bg.png')}
                />
                <ThemedText type="title">Preggy</ThemedText>
                <ActivityIndicator size="small" color={Colors.primary} style={styles.spinner} />
            </ThemedView>
        );
    }

    // Once all loading is complete, perform the necessary redirects.
    return isAuthenticated ? <Redirect href="/(tabs)/home" /> : isFirstTime ? <Redirect href="/(auth)/AuthOnboarding" /> : <Redirect href="/(auth)/login" />;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },
    spinner: {
        marginTop: 20,
    },
});
