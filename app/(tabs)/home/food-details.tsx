import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { StyleSheet, Image, Pressable, View, useColorScheme, ActivityIndicator, Button } from 'react-native';
import React, { useEffect, useLayoutEffect } from 'react';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import Row from '@/components/Row';
import { GapRow } from '@/components/Gap';
import { Colors } from '@/constants/Colors';
import SafeFoodDetailsView from '@/components/food_details_type/SafeFoodDetails';
import LimitFoodDetailsView from '@/components/food_details_type/LimitFoodDetails';
import AvoidFoodDetailsView from '@/components/food_details_type/AvoidFoodDetails';
import { useFoodDetailsStore } from '@/providers/food_details_store';
import { AvoidFoodItem, FoodItem, LimitFoodItem, SafeFoodItem } from '@/src/interfaces/Conversations';
import { getMonthAndYearDateShort } from '@/src/utils/helpers';


export default function FoodDetailsScreen() {
    const navigation = useNavigation();
    const isDarkMode = useColorScheme() === 'dark';
    const params = useLocalSearchParams<{ id?: string, foodItem?: string }>();
    const { id, foodItem } = params;

    const { foodDetails, isLoading, error, fetchFoodDetails, setFoodDetails } = useFoodDetailsStore();

    useEffect(() => {
        if (foodItem) {
            setFoodDetails(JSON.parse(foodItem));
        } else if (id) {
            fetchFoodDetails(id);
        }
    }, [id, foodItem]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isLoading || error || !foodDetails ? 'Food Details' : foodDetails.details.name,
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
    }, [navigation, isLoading, error, foodDetails]);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="small" color={Colors.primary} />
            </View>
        );
    }

    if (error) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ThemedText style={{ color: 'red' }}>An error occured.{error}</ThemedText>
                <Button title="Retry" onPress={() => {
                    if (id) {
                        fetchFoodDetails(id);
                    }
                }} />
            </View>
        );
    }

    if (!foodDetails) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ThemedText>Food details not found.</ThemedText>
            </View>
        );
    }

    const food = foodDetails as FoodItem;

    return (
        <ParallaxScrollView
            headerImage={<Image source={{ uri: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }} style={styles.image} />}
            headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
        >

            {foodDetails.safety_type === 'avoid' ? (
                <AvoidFoodDetailsView
                    name={food.name}
                    whyAvoidDescription={food.details.whyAvoidDescription}
                    sources={food.details.source ?? "General Food Safety Guidelines"}
                    verifiedDate={getMonthAndYearDateShort(food.details.verifiedDate)}
                    betterAlternatives={food.details.betterAlternatives}
                    whyAvoidRisk={food.details.whyAvoidRisk.map((risk: any) => {
                        return {
                            nameOfRisk: risk.nameOfRisk,
                            levelOfRisk: risk.levelOfRisk,
                            description: risk.description,
                            causesOfRisk: risk.causesOfRisk
                        }
                    })
                    }
                    otherConsiderations={food.details.otherConsiderations}
                    safeCookingGuidelines={food.details.safeCookingGuidelines}

                    foodsContainingSelectedFoods={food.details.foodsContainingSelectedFoods.map((food: any) => {
                        return {
                            name: food.name,
                            description: food.description,
                        }
                    })}
                />
            ) :
                foodDetails.safety_type === 'limit' ? (
                    <LimitFoodDetailsView
                        name={food.name}
                        description={foodDetails.details.description}
                        sources={food.details.source ?? "General Food Safety Guidelines"}
                        verifiedDate={getMonthAndYearDateShort(food.details.verifiedDate)}
                        ifYouChooseToConsume={food.details.ifYouChooseToConsume}
                        betterAlternatives={food.details.betterAlternatives}
                        healthConsiderations={food.details.healthConsiderations}
                        safeConsumptionGuidelines={food.details.safeConsumptionGuidelines}
                        trimesterNotes={food.details.trimesterNotes}
                        whyLimitThisFood={food.details.whyLimitThisFood}
                        saferAlternatives={food.details.saferAlternatives.map((food: any) => {
                            return {
                                name: food.name,
                                type: food.type,
                                description: food.description,
                                image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            }
                        })}
                    />
                ) : (
                    <SafeFoodDetailsView
                        name={food.name}
                        description={foodDetails.details?.description ?? "No description available"}
                        sources={food.details?.source ?? "General Food Safety Guidelines"}
                        verifiedDate={getMonthAndYearDateShort(food.details.verifiedDate)}
                        ingredientsToWatch={food.details.ingredientsToWatch}
                        nutritionalBenefits={food.details.nutritionalBenefits}
                        preparationGuidelines={food.details.preparationGuidelines}
                            trimesterNotes={food.details.trimesterNotes}
                            whyItThisSafe={food.details.whyItThisSafe}
                        similarFoods={food.details.similarFoods.map((food: any) => {
                            return {
                                name: food.name,
                                type: food.type,
                                description: food.description,
                                image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            }
                        })}
                    />
                )
            }
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
