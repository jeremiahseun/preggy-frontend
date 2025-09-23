import { ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { Image, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

export default function SplashScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/(auth)/AuthOnboarding');
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemedView style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../assets/images/preggy-no-bg.png')}
      />
      <ThemedText type="title">Preggy</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
});
