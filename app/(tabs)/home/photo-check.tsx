import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';
import { StyleSheet, Button } from 'react-native';

export default function PhotoCheckScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Photo Check Screen</ThemedText>
      <Link href="/(tabs)/home/analyzing-photo" asChild>
        <Button title="Go to Analyzing Photo" />
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
