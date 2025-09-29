
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { NormalButton } from '@/components/Buttons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function NetworkErrorScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const handleRetry = () => {
        // Navigate to the root to restart the app flow, which should show the splash screen.
        router.replace('/(auth)/splash');
    };

    return (
        <ThemedView style={[styles.container, { paddingBottom: insets.bottom }]}>
            <View style={styles.content}>
                <ThemedText type="title" style={styles.title}>
                    Network Error
                </ThemedText>
                <ThemedText style={styles.subtitle}>
                    There was a problem connecting to the server. Please check your internet connection and try again.
                </ThemedText>
                <NormalButton
                    buttonText="Retry"
                    onPress={handleRetry}
                    buttonStyle={styles.button}
                />
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    content: {
        alignItems: 'center',
        maxWidth: 300,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        opacity: 0.8,
        marginBottom: 32,
        lineHeight: 22,
    },
    button: {
        width: '100%',
        paddingHorizontal: 120
    },
});
