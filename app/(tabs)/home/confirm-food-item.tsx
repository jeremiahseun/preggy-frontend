import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';
import { StyleSheet, Button } from 'react-native';

export default function ConfirmFoodItemScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Confirm Food Item Screen</ThemedText>
      <Link href="/(tabs)/home/food-details" asChild>
        <Button title="Go to Food Details" />
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
