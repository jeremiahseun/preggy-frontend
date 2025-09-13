import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StyleSheet, View, Image, Animated } from 'react-native';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import { LinearGradient } from 'expo-linear-gradient';
import { GapColumn } from '@/components/Gap';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import appStyles from '@/constants/Styles';


const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

export default function AnalyzingPhotoScreen() {
    const router = useRouter();


    useEffect(() => {
        const timer = setTimeout(() => {
            router.replace('/(tabs)/home/confirm-food-item');
        }, 1000); // Simulate a 3-second analysis

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <ThemedView style={appStyles.screen}>
            <GapColumn space={50} />
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
                    style={styles.image}
                />
                <ShimmerPlaceHolder style={[styles.image, styles.shimmer]} />
            </View>
            <GapColumn space={50} />
            <ThemedText style={{ textAlign: 'center' }} type="subtitle">Analyzing your food...</ThemedText>
            <ThemedText style={{ textAlign: 'center' }}>This may take a few seconds</ThemedText>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    imageContainer: {
        width: '100%',
        height: 400,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 16,
    },
    shimmer: {
        position: 'absolute',
        opacity: 0.5,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
});
