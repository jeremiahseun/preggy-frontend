import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { StyleSheet, Image, Pressable, View } from 'react-native';
import { useLayoutEffect } from 'react';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import Row from '@/components/Row';
import { GapColumn, GapRow } from '@/components/Gap';
import { Colors } from '@/constants/Colors';
import FoodTag from '@/components/FoodTag';

export default function FoodDetailsScreen() {
    const navigation = useNavigation();
    const params = useLocalSearchParams<{ foodName?: string; foodImage?: string; foodType?: 'safe' | 'limit' | 'avoid' }>();
    const { foodName, foodImage, foodType = 'safe' } = params;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: foodName || 'Food Details',
            headerRight: () => (
                <Row>
                    <Pressable>
                        <IconSymbol name="favorite" size={24} color={Colors.primary} />
                    </Pressable>
                    <GapRow space={15} />
                    <Pressable>
                        <IconSymbol name="share" size={24} color={Colors.primary} />
                    </Pressable>
                </Row>
            ),
        });
    }, [navigation, foodName]);

    const getSafetyInfo = () => {
        switch (foodType) {
            case 'safe':
                return {
                    text: 'Safe to eat',
                    description: 'This food is generally considered safe to eat during pregnancy. Enjoy!',
                };
            case 'limit':
                return {
                    text: 'Limit intake',
                    description: 'This food is safe in moderation, but excessive consumption should be avoided. Please consult your doctor for personalized advice.',
                };
            case 'avoid':
                return {
                    text: 'Avoid',
                    description: 'This food is generally recommended to be avoided during pregnancy due to potential risks. Please consult your doctor for personalized advice.',
                };
            default:
                return {
                    text: 'Safe to eat',
                    description: 'This food is generally considered safe to eat during pregnancy. Enjoy!',
                };
        }
    };

    const safetyInfo = getSafetyInfo();

    return (
        <ParallaxScrollView
            headerImage={<Image source={{ uri: foodImage || 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }} style={styles.image} />}
            headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
        >
            <ThemedView style={styles.contentContainer}>
                <ThemedText type="title">{foodName || 'Jollof Rice with Chicken'}</ThemedText>
                <GapColumn space={20} />

                <FoodTag type={foodType} text={safetyInfo.text} />
                <GapColumn space={15} />
                <ThemedText>{safetyInfo.description}</ThemedText>
                <GapColumn space={20} />

                <ThemedText type="subtitle">Why?</ThemedText>
                <ThemedText>
                    Jollof Rice with Chicken is a balanced meal, providing carbohydrates for energy and protein for growth. Chicken is a great source of lean protein, which is essential for your baby's development. Ensure the chicken is thoroughly cooked to an internal temperature of 165°F (74°C) to eliminate any harmful bacteria like Salmonella.
                </ThemedText>
                <GapColumn space={20} />

                <ThemedText type="subtitle">Nutritional Information</ThemedText>
                <GapColumn space={10} />
                <View style={styles.nutritionRow}>
                    <ThemedText>Calories</ThemedText>
                    <ThemedText>450 kcal</ThemedText>
                </View>
                <View style={styles.nutritionRow}>
                    <ThemedText>Protein</ThemedText>
                    <ThemedText>30g</ThemedText>
                </View>
                <View style={styles.nutritionRow}>
                    <ThemedText>Carbohydrates</ThemedText>
                    <ThemedText>50g</ThemedText>
                </View>
                <View style={styles.nutritionRow}>
                    <ThemedText>Fat</ThemedText>
                    <ThemedText>15g</ThemedText>
                </View>
                <GapColumn space={20} />

                <ThemedText type="subtitle">Sources</ThemedText>
                <ThemedText>NHS, American Pregnancy Association, FDA</ThemedText>
            </ThemedView>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%',
    },
    contentContainer: {
        padding: 20,
    },
    nutritionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
});
