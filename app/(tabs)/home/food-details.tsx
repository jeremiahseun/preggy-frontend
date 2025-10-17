import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { StyleSheet, Image, Pressable, View, useColorScheme } from 'react-native';
import { useEffect, useLayoutEffect } from 'react';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import Row from '@/components/Row';
import { GapColumn, GapRow } from '@/components/Gap';
import { Colors } from '@/constants/Colors';
import FoodTag from '@/components/FoodTag';
import Column from '@/components/Column';
import TitleListCard from '@/components/food_details/TitleListCard';
import LeafIcon from '@/assets/icons/leaf.svg';
import CheckIcon from '@/assets/icons/check.svg';
import CalendarIcon from '@/assets/icons/calendar.svg';
import InfoIcon from '@/assets/icons/info.svg';
import ListCheckIcon from '@/assets/icons/listcheck.svg';
import InfoCard from '@/components/food_details/InfoCard';
import SimilarFoodItem from '@/components/food_details/SimilarFoodItem';
import { ScrollView } from 'react-native-gesture-handler';
import { IconButton } from '@/components/Buttons';
import SafeFoodDetailsView from '@/components/food_details_type/SafeFoodDetails';
import LimitFoodDetailsView from '@/components/food_details_type/LimitFoodDetails';
import AvoidFoodDetailsView from '@/components/food_details_type/AvoidFoodDetails';
import { useFoodDetailsStore } from '@/providers/food_details_store';


export default function FoodDetailsScreen() {
    const navigation = useNavigation();
    const isDarkMode = useColorScheme() === 'dark';
    const params = useLocalSearchParams<{ id?: string }>();
    const { id } = params;

    const { foodDetails, isLoading, error, fetchFoodDetails } = useFoodDetailsStore();

    useEffect(() => {
        if (id) {
            fetchFoodDetails(id);
        }
    }, [id]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Food Details',
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
    }, [navigation]);

    const getSafetyInfo = () => {
        switch (foodDetails.safety_type) {
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
            headerImage={<Image source={{ uri: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }} style={styles.image} />}
            headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
        >
            {/* <AvoidFoodDetailsView
                name='Jollof Rice with Chicken'
                whyAvoidDescription='This traditional Nigerian dish is generally safe during pregnancy when properly prepared with fresh ingredients.'
                sources='WHO, NHS, ACOG'
                verifiedDate='Dec 2024'
                betterAlternatives={['🥙 Grilled Salmon', '🥑 Avocado Toast', '🥗 Quinoa Salad']}
                whyAvoidRisk={[
                    {
                        nameOfRisk: "Salmonella Risk",
                        levelOfRisk: "High risk",
                        description: "Raw eggs can contain salmonella bacteria on both shell and inside",
                        causesOfRisk: [
                            "Can cause severe food poisoning during pregnancy",
                            "May lead to dehydration and complications",
                            "Rare cases can trigger preterm labor"
                        ]
                    }
                ]}
                otherConsiderations={['Rich in protein from chicken', 'Provides essential carbohydrates', 'Contains vitamins from vegetables']}
                safeCookingGuidelines={['Ensure chicken is thoroughly cooked (165°F/74°C)', 'Use fresh, properly stored ingredients', 'Avoid if left at room temperature for >2 hours']}

                foodsContainingSelectedFoods={[
                    {
                        name: "Grilled Salmon",
                        description: "Rich in omega-3s",
                    },
                    {
                        name: "Avocado Toast",
                        description: "Healthy fats and fiber",
                    },
                    {
                        name: "Quinoa Salad",
                        description: "Complete protein source",

                    }

                ]}
            /> */}
            {/* <LimitFoodDetailsView
                name='Jollof Rice with Chicken'
                description='This traditional Nigerian dish is generally safe during pregnancy when properly prepared with fresh ingredients.'
                sources='WHO, NHS, ACOG'
                verifiedDate='Dec 2024'
                ifYouChooseToConsume={[
                    'This food is considered safe because it has been pasteurized and prepared in a way that eliminates harmful bacteria. It is also rich in nutrients that are beneficial for you and your baby.'
                ]}
                betterAlternatives={['Grilled Salmon', 'Avocado Toast', 'Quinoa Salad']}
                healthConsiderations={['Rich in protein from chicken', 'Provides essential carbohydrates', 'Contains vitamins from vegetables']}
                safeConsumptionGuidelines={['Ensure chicken is thoroughly cooked (165°F/74°C)', 'Use fresh, properly stored ingredients', 'Avoid if left at room temperature for >2 hours']}
                trimesterNotes="Perfect for your current stage! The protein and iron content support your baby's growth and can help with increased appetite."
                whyLimitThisFood="This food is considered safe because it has been pasteurized and prepared in a way that eliminates harmful bacteria. It is also rich in nutrients that are beneficial for you and your baby."
                saferAlternatives={[
                    {
                        name: "Grilled Salmon",
                        type: "safe",
                        description: "Rich in omega-3s",
                        image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    },
                    {
                        name: "Avocado Toast",
                        type: "safe",
                        description: "Healthy fats and fiber",
                        image: "https://images.unsplash.com/photo-1584365685244-9adeb5a42142?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    },
                    {
                        name: "Quinoa Salad",
                        type: "safe",
                        description: "Complete protein source",
                        image: "https://images.unsplash.com/photo-1551248429-4097c68298b7?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    }

                ]}
            /> */}
            <SafeFoodDetailsView
                name='Jollof Rice with Chicken'
                description='This traditional Nigerian dish is generally safe during pregnancy when properly prepared with fresh ingredients.'
                sources='WHO, NHS, ACOG'
                verifiedDate='Dec 2024'
                ingredientsToWatch={[
                    'This food is considered safe because it has been pasteurized and prepared in a way that eliminates harmful bacteria. It is also rich in nutrients that are beneficial for you and your baby.'
                ]}
                nutritionalBenefits={['Rich in protein from chicken', 'Provides essential carbohydrates', 'Contains vitamins from vegetables']}
                preparationGuidelines={['Ensure chicken is thoroughly cooked (165°F/74°C)', 'Use fresh, properly stored ingredients', 'Avoid if left at room temperature for >2 hours']}
                trimesterNotes="Perfect for your current stage! The protein and iron content support your baby's growth and can help with increased appetite."
                whyItThisSafe="This food is considered safe because it has been pasteurized and prepared in a way that eliminates harmful bacteria. It is also rich in nutrients that are beneficial for you and your baby."
                similarFoods={[
                    {
                        name: "Grilled Salmon",
                        type: "safe",
                        description: "Rich in omega-3s",
                        image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    },
                    {
                        name: "Avocado Toast",
                        type: "safe",
                        description: "Healthy fats and fiber",
                        image: "https://images.unsplash.com/photo-1584365685244-9adeb5a42142?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    },
                    {
                        name: "Quinoa Salad",
                        type: "safe",
                        description: "Complete protein source",
                        image: "https://images.unsplash.com/photo-1551248429-4097c68298b7?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    }

                ]}
            />
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
