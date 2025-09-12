import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';
import { StyleSheet, Button } from 'react-native';

export default function SplashScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Splash Screen</ThemedText>
      <Link href="/(auth)/register" asChild>
        <Button title="Go to Register" />
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
