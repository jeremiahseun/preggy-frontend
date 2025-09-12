import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';
import { StyleSheet, Button } from 'react-native';

export default function FoodDetailsScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Food Details Screen</ThemedText>
      <Link href="/(tabs)/home" asChild>
        <Button title="Go back to Home" />
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
