import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StyleSheet, View, Image, ActivityIndicator } from 'react-native';
import { GapColumn } from '@/components/Gap';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import appStyles from '@/constants/Styles';
import { usePhotoCheckStore } from '@/providers/photo_check_store';
import { TextButton } from '@/components/Buttons';

export default function AnalyzingPhotoScreen() {
    const router = useRouter();
    const { loading, error, foodList, imageUri, clearStore } = usePhotoCheckStore();

    useEffect(() => {
        if (foodList.length > 0) {
            router.replace('/(tabs)/home/confirm-food-item');
        }
    }, [foodList, router]);

    const handleGoBack = () => {
        clearStore();
        router.back();
    }

    return (
        <ThemedView style={appStyles.screen}>
            <GapColumn space={50} />
            <View style={styles.imageContainer}>
                {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
                {loading === 'confirm' && (
                    <View style={[styles.image, styles.shimmer]}>
                        <ActivityIndicator size="large" />
                    </View>
                )}
            </View>
            <GapColumn space={50} />
            {loading === 'confirm' && (
                <>
                    <ThemedText style={{ textAlign: 'center' }} type="subtitle">Analyzing your food...</ThemedText>
                    <ThemedText style={{ textAlign: 'center' }}>This may take a few seconds</ThemedText>
                </>
            )}
            {error && (
                <>
                    <ThemedText style={{ textAlign: 'center', color: 'red' }} type="subtitle">Error</ThemedText>
                    <ThemedText style={{ textAlign: 'center' }}>{error}</ThemedText>
                    <GapColumn space={20} />
                    <TextButton title="Try Again" onPress={handleGoBack} />
                </>
            )}
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
        justifyContent: 'center',
        alignItems: 'center',
    },
});
