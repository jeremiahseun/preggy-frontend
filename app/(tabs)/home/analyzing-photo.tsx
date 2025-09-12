import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';
import { StyleSheet, Button } from 'react-native';

export default function AnalyzingPhotoScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Analyzing Photo Screen</ThemedText>
      <Link href="/(tabs)/home/confirm-food-item" asChild>
        <Button title="Go to Confirm Food Item" />
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
