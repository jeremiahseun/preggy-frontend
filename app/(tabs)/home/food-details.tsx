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
import Column from '@/components/Column';
import TitleListCard from '@/components/food_details/TitleListCard';


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
                        <IconSymbol name="heart" size={24} color={Colors.primary} />
                    </Pressable>
                    <GapRow space={15} />
                    <Pressable>
                        <IconSymbol name="square.and.arrow.up" size={24} color={Colors.primary} />
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
                <Row>
                    <FoodTag type={foodType} />
                    <View style={{ flex: 1 }} />
                    <Column style={{ alignItems: 'flex-end' }}>
                        <ThemedText type='small14'>Checked just now</ThemedText>
                        <ThemedText type='small12'>Verified</ThemedText>
                    </Column>
                </Row>
                <GapColumn space={20} />
                <ThemedText type="title">{foodName || 'Jollof Rice with Chicken'}</ThemedText>

                <GapColumn space={15} />
                <ThemedText>This traditional Nigerian dish is generally safe during pregnancy when properly prepared with fresh ingredients.</ThemedText>
                <GapColumn space={20} />
                <Column style={{
                    width: "100%",
                    height: 'auto',
                    borderRadius: 6,
                    padding: 15,
                    backgroundColor: '#FAFAFBFF',
                }}>
                    <ThemedText type="defaultSemiBold">Sources: WHO, NHS, ACOG</ThemedText>
                    <ThemedText style={{
                        fontWeight: '600'
                    }} type="small14">Last verified: Dec 2024</ThemedText>
                </Column>

                <GapColumn space={20} />

                <ThemedText type="subtitle">Key Information</ThemedText>
                <GapColumn space={20} />
                <TitleListCard title='Nutritional Benefits' information={['Rich in protein from chicken', 'Provides essential carbohydrates', 'Contains vitamins from vegetables']} />

                <GapColumn space={20} />
                <TitleListCard title='Preparation Guidelines' information={['Ensure chicken is thoroughly cooked (165°F/74°C)', 'Use fresh, properly stored ingredients', 'Avoid if left at room temperature for >2 hours']} />

                <GapColumn space={20} />

                <Column style={{
                    width: "100%",
                    height: 'auto',
                    borderRadius: 6,
                    padding: 15,
                    backgroundColor: '#FAFAFBFF',
                }}>
                    <ThemedText type="subTitle">2nd Trimester Notes</ThemedText>
                    <GapColumn space={5} />
                    <ThemedText>Perfect for your current stage! The protein and iron content support your baby's growth and can help with increased appetite.</ThemedText>
                </Column>
                <GapColumn space={20} />

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
        padding: 0,
    },
    nutritionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
});
