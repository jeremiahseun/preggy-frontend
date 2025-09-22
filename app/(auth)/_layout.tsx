import { Stack } from 'expo-router';

export default function AuthLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="splash" />
            <Stack.Screen name="AuthOnboarding" />
            <Stack.Screen name="register" />
            <Stack.Screen name="login" />
            <Stack.Screen name="forgot-password" />
        </Stack>
    );
}
