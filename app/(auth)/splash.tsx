import { ThemedView } from '@/components/ThemedView';
import { Redirect, router } from 'expo-router';
import { useEffect } from 'react';
import { Image, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useAuthStore } from '@/providers/auth_provider';

export default function SplashScreen() {

    const { isLoading, isAuthenticated, isFirstTime, initializeAuth, getToken } = useAuthStore();

    useEffect(() => {
       const timer = setTimeout(() => {
           // Set up the auth state listener when the app loads
           const unsubscribe = initializeAuth();
           getToken();


           // Clean up the listener when the component unmounts
           return () => {
               unsubscribe();
           };
       }, 1000);
       return () => clearTimeout(timer);
    }, [initializeAuth]);

  return isLoading ? (

    <ThemedView style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../assets/images/preggy-no-bg.png')}
      />
      <ThemedText type="title">Preggy</ThemedText>
    </ThemedView>
  ) : isAuthenticated ? <Redirect href="/(tabs)/home" /> : isFirstTime ? <Redirect href="/(auth)/AuthOnboarding" /> : <Redirect href="/(auth)/login" />;
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
