import { Stack } from 'expo-router';

export default function HomeLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false, title: "Home" }} />
            <Stack.Screen name="search" options={{ presentation: 'modal', title: "What's on your mind?", sheetGrabberVisible: true,  headerBackButtonDisplayMode: 'minimal', animationMatchesGesture: true, headerLargeTitle: true, headerStyle: {
                backgroundColor: 'transparent',
            } }} />
            <Stack.Screen name="photo-check" options={{ title: 'Photo Check', headerBackButtonDisplayMode: 'minimal', }} />
            <Stack.Screen name="analyzing-photo" options={{ presentation: 'modal', headerShown: false, headerBackButtonDisplayMode: 'minimal', }} />
            <Stack.Screen name="confirm-food-item" options={{ title: 'Confirm Food Item', headerBackButtonDisplayMode: 'minimal', }} />
            <Stack.Screen name="food-details" options={{ title: 'Food Details', headerBackButtonDisplayMode: 'minimal', }} />
            <Stack.Screen name="all-checks" options={{ title: 'Search Food', headerBackButtonDisplayMode: 'minimal', }} />
        </Stack>
    );
}
