import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';
import { StyleSheet, Button } from 'react-native';

export default function EditProfileScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Edit Profile Screen</ThemedText>
      <Link href="/(tabs)/settings" asChild>
        <Button title="Go back to Settings" />
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
