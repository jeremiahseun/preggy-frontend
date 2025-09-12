import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';
import { StyleSheet, Button } from 'react-native';

export default function ConversationScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Conversation Screen</ThemedText>
      <Link href="/(tabs)/chats" asChild>
        <Button title="Go back to Chats" />
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
