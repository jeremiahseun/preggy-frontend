import { Stack } from 'expo-router';

export default function OnboardingLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" options={{
                title: "Location",
            }} />
            <Stack.Screen name="TrimesterView" options={{
                title: "Trimester",
            }} />
            <Stack.Screen name="DietView" />
        </Stack>
    );
}
