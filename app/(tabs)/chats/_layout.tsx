
import { Stack } from 'expo-router';
import { useColorScheme, View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ChatsLayout() {
    const insets = useSafeAreaInsets();
        const isDark = useColorScheme() === 'dark';
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false, title: 'Chats' }} />
            <Stack.Screen name="conversation" options={{ headerShown: true, title: 'AI Safety Assistant', headerTitleAlign: 'left', headerBackButtonDisplayMode: 'minimal',
                headerTitle: () =>
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
                }} />
        </Stack>
    );
}

const styles = StyleSheet.create({
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
});
