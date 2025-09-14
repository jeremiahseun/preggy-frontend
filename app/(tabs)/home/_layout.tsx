import { Stack } from 'expo-router';

export default function HomeLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false, title: "Home" }} />
            <Stack.Screen name="photo-check" options={{ title: 'Photo Check' }} />
            <Stack.Screen name="analyzing-photo" options={{ presentation: 'modal', headerShown: false }} />
            <Stack.Screen name="confirm-food-item" options={{ title: 'Confirm Food Item' }} />
            <Stack.Screen name="food-details" options={{ title: 'Food Details' }} />
        </Stack>
    );
}
