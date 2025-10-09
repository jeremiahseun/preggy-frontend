import { Stack } from 'expo-router';

export default function ChatsLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false, title: "Chat with Maya",headerBackButtonDisplayMode: 'minimal', animationMatchesGesture: true, headerLargeTitle: true, headerStyle: {
                    backgroundColor: 'transparent',
                } }} />
            <Stack.Screen name="conversation" options={{ headerShown: false, title: 'Conversation' }} />
        </Stack>
    );
}
