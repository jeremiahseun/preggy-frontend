import { Stack } from 'expo-router';

export default function SettingsLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{
                title: "Settings", headerBackButtonDisplayMode: 'minimal', animationMatchesGesture: true, headerLargeTitle: true, headerStyle: {
                    backgroundColor: 'transparent',
                } }} />
            <Stack.Screen name="edit-profile" options={{ title: 'Edit Profile' }} />
        </Stack>
    );
}
