import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';
import { StyleSheet, Button } from 'react-native';

export default function ChatsScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Chats Screen</ThemedText>
      <Link href="/(tabs)/chats/conversation" asChild>
        <Button title="Go to Conversation" />
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
