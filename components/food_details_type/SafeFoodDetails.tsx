import { Colors } from "@/constants/Colors";
import React from "react";
import { View, ScrollView, useColorScheme } from "react-native";
import { IconButton } from "../Buttons";
import Column from "../Column";
import SimilarFoodItem from "../food_details/SimilarFoodItem";
import FoodTag from "../FoodTag";
import { GapRow, GapColumn } from "../Gap";
import Row from "../Row";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import BorderContainer from "../widgets/BorderContainer";
import CircleContainer from "../CircleContainer";
import InfoCard from "../food_details/InfoCard";
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';

interface SafeSimilarFoodItem {
    name: string;
    type: 'safe' | 'limit' | 'avoid';
    description: string;
    image: string;
}

type SafeFoodDetailsProps = {
    name: string;
    description: string;
    sources: string;
    verifiedDate: string;
    nutritionalBenefits: string[];
    preparationGuidelines: string[];
    trimesterNotes: string;
    whyItThisSafe: string;
    ingredientsToWatch: string[];
    similarFoods: SafeSimilarFoodItem[];
}

/**
 * SAFE FOOD DETAILS API RESPONSE (Region specific for choice of words)
 * {
 * name: "" // Name of the food
 * description: "" // A short description of the food. Usually containing region-aware words.
 * sources: "" // List of strings into one string
 * verifiedDate: "" // Date (Month and Year) E.g: Dec, 2024
 * nutritionalBenefits: []<string> // List of nutritional benefits. Max of 1-3
 * preparationGuidelines: []<string> // List of guidelines when preparing this food. Max of 1-3
 * trimesterNotes: "" // Special (short) notes based on the user trimester period.
 * whyItThisSafe: "" // A short reason note this food item is safe.
 * ingredientsToWatch: []<string> // The list of ingredients the user should look out for when cooking. Very short note list.
 * similarFoods: []<SafeSimilarFoodItem> // List of foods that are close to this kind of food. They can be safe, limit or avoid.
 * }
 *
 * SIMILAR FOOD RESPONSE
 * {
 *  name: "" // Name of food
 *  type: "" // Safe type (safe | limit | avoid)
 *  description: "" // A short description of the food
 *  image: "" // The food image
 * }
 */


export default function SafeFoodDetailsView({
    name,
    description,
    sources,
    verifiedDate,
    nutritionalBenefits,
    preparationGuidelines,
    trimesterNotes,
    whyItThisSafe,
    ingredientsToWatch,
    similarFoods
}: SafeFoodDetailsProps) {
    const isDarkMode = useColorScheme() === 'dark';

    const colors = {
        safe: {
            primary: isDarkMode ? '#66D9A6' : '#10B981',
            secondary: isDarkMode ? '#1F4838' : '#D1FAE5',
            background: isDarkMode ? '#0F2419' : '#ECFDF5',
            border: isDarkMode ? '#2D5F48' : '#A7F3D0',
            text: isDarkMode ? '#A7F3D0' : '#065F46',
        }
    };

    return (
        <ThemedView style={{ paddingHorizontal: 20 }}>
            {/* Hero Card */}
            <View style={{
                borderRadius: 24,
                padding: 24,
                backgroundColor: colors.safe.background,
                borderWidth: 2,
                borderColor: colors.safe.border,
                shadowColor: colors.safe.primary,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 12,
                elevation: 5,
            }}>
                <Row style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <FoodTag type={'safe'} />
                    <Column style={{ alignItems: 'flex-end' }}>
                        <Row style={{ alignItems: 'center', marginBottom: 4 }}>
                            <FontAwesome5 name="check-circle" size={14} color={colors.safe.primary} solid />
                            <GapRow space={6} />
                            <ThemedText
                                lightColor={colors.safe.text}
                                darkColor={colors.safe.primary}
                                style={{ fontSize: 12, fontWeight: '600' }}
                            >
                                Verified
                            </ThemedText>
                        </Row>
                        <ThemedText type='small12' style={{ opacity: 0.7 }}>
                            Updated just now
                        </ThemedText>
                    </Column>
                </Row>

                <GapColumn space={20} />

                <ThemedText
                    type="title"
                    style={{
                        fontSize: 28,
                        fontWeight: '700',
                        color: isDarkMode ? '#FFFFFF' : '#1F2937'
                    }}
                >
                    {name}
                </ThemedText>

                <GapColumn space={16} />

                <View style={{
                    borderRadius: 16,
                    padding: 16,
                    backgroundColor: isDarkMode ? 'rgba(102, 217, 166, 0.15)' : 'rgba(16, 185, 129, 0.1)',
                }}>
                    <Row style={{ alignItems: 'center', marginBottom: 10 }}>
                        <FontAwesome5 name="shield-alt" size={16} color={colors.safe.primary} solid />
                        <GapRow space={8} />
                        <ThemedText
                            style={{
                                fontSize: 15,
                                fontWeight: '700',
                                color: colors.safe.primary
                            }}
                        >
                            Safe to Enjoy During Pregnancy
                        </ThemedText>
                    </Row>
                    <ThemedText style={{
                        fontSize: 15,
                        lineHeight: 22,
                        opacity: 0.9
                    }}>
                        {description}
                    </ThemedText>
                </View>

                <GapColumn space={16} />

                <View style={{
                    borderRadius: 12,
                    padding: 14,
                    backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                }}>
                    <Row style={{ alignItems: 'center', marginBottom: 8 }}>
                        <FontAwesome5 name="book-medical" size={14} color={colors.safe.primary} />
                        <GapRow space={8} />
                        <ThemedText style={{ fontSize: 13, fontWeight: '600', flex: 1 }}>
                            Sources: {sources}
                        </ThemedText>
                    </Row>
                    <Row style={{ alignItems: 'center' }}>
                        <FontAwesome name="calendar" size={12} color={colors.safe.primary} />
                        <GapRow space={8} />
                        <ThemedText style={{ fontSize: 12, opacity: 0.8 }}>
                            Last verified: {verifiedDate}
                        </ThemedText>
                    </Row>
                </View>
            </View>

            <GapColumn space={32} />

            {/* Key Information Section */}
            <Row style={{ alignItems: 'center', marginBottom: 16 }}>
                <View style={{
                    width: 4,
                    height: 24,
                    backgroundColor: colors.safe.primary,
                    borderRadius: 2,
                    marginRight: 12
                }} />
                <ThemedText
                    type="subtitle"
                    style={{
                        fontSize: 22,
                        fontWeight: '700'
                    }}
                >
                    Key Information
                </ThemedText>
            </Row>

            {/* Nutritional Benefits */}
            <View style={{
                borderRadius: 20,
                padding: 20,
                backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : '#FFFFFF',
                borderWidth: 1,
                borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#F3F4F6',
                marginBottom: 16,
            }}>
                <Row style={{ alignItems: 'center', marginBottom: 16 }}>
                    <View style={{
                        width: 48,
                        height: 48,
                        borderRadius: 24,
                        backgroundColor: isDarkMode ? 'rgba(102, 217, 166, 0.2)' : '#D1FAE5',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <FontAwesome5 name="leaf" size={20} color={colors.safe.primary} />
                    </View>
                    <GapRow space={12} />
                    <ThemedText style={{ fontSize: 18, fontWeight: '700' }}>
                        Nutritional Benefits
                    </ThemedText>
                </Row>

                {nutritionalBenefits.map((benefit, index) => (
                    <Row key={index} style={{
                        alignItems: 'flex-start',
                        marginBottom: index < nutritionalBenefits.length - 1 ? 12 : 0,
                        paddingLeft: 8
                    }}>
                        <View style={{
                            width: 20,
                            height: 20,
                            borderRadius: 10,
                            backgroundColor: isDarkMode ? 'rgba(102, 217, 166, 0.2)' : '#D1FAE5',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: 12,
                            marginTop: 2
                        }}>
                            <FontAwesome name="check" size={11} color={colors.safe.primary} />
                        </View>
                        <ThemedText style={{
                            flex: 1,
                            fontSize: 15,
                            lineHeight: 22
                        }}>
                            {benefit}
                        </ThemedText>
                    </Row>
                ))}
            </View>

            {/* Preparation Guidelines */}
            <View style={{
                borderRadius: 20,
                padding: 20,
                backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : '#FFFFFF',
                borderWidth: 1,
                borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#F3F4F6',
                marginBottom: 16,
            }}>
                <Row style={{ alignItems: 'center', marginBottom: 16 }}>
                    <View style={{
                        width: 48,
                        height: 48,
                        borderRadius: 24,
                        backgroundColor: isDarkMode ? 'rgba(102, 217, 166, 0.2)' : '#D1FAE5',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <FontAwesome5 name="utensils" size={18} color={colors.safe.primary} />
                    </View>
                    <GapRow space={12} />
                    <ThemedText style={{ fontSize: 18, fontWeight: '700' }}>
                        Preparation Guidelines
                    </ThemedText>
                </Row>

                {preparationGuidelines.map((guideline, index) => (
                    <Row key={index} style={{
                        alignItems: 'flex-start',
                        marginBottom: index < preparationGuidelines.length - 1 ? 12 : 0,
                        paddingLeft: 8
                    }}>
                        <View style={{
                            width: 20,
                            height: 20,
                            borderRadius: 10,
                            backgroundColor: isDarkMode ? 'rgba(102, 217, 166, 0.2)' : '#D1FAE5',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: 12,
                            marginTop: 2
                        }}>
                            <FontAwesome name="check" size={11} color={colors.safe.primary} />
                        </View>
                        <ThemedText style={{
                            flex: 1,
                            fontSize: 15,
                            lineHeight: 22
                        }}>
                            {guideline}
                        </ThemedText>
                    </Row>
                ))}
            </View>

            {/* Trimester Notes */}
            <View style={{
                borderRadius: 20,
                padding: 20,
                backgroundColor: isDarkMode ? 'rgba(147, 197, 253, 0.1)' : '#EFF6FF',
                borderWidth: 1,
                borderColor: isDarkMode ? 'rgba(147, 197, 253, 0.2)' : '#DBEAFE',
                marginBottom: 16,
            }}>
                <Row style={{ alignItems: 'center', marginBottom: 12 }}>
                    <FontAwesome name="calendar-o" size={18} color={isDarkMode ? '#93C5FD' : '#3B82F6'} />
                    <GapRow space={10} />
                    <ThemedText style={{ fontSize: 18, fontWeight: '700' }}>
                        2nd Trimester Notes
                    </ThemedText>
                </Row>
                <ThemedText style={{ fontSize: 15, lineHeight: 22, opacity: 0.9 }}>
                    {trimesterNotes}
                </ThemedText>
            </View>

            {/* Expandable Cards */}
            <InfoCard
                title="Why is this safe?"
                icon={<FontAwesome5 name="info-circle" size={16} color={isDarkMode ? '#93C5FD' : '#3B82F6'} />}
            >
                <ThemedText style={{ fontSize: 15, lineHeight: 22 }}>
                    {whyItThisSafe}
                </ThemedText>
            </InfoCard>

            <GapColumn space={16} />

            <InfoCard
                title="Ingredients to watch"
                icon={<FontAwesome5 name="eye" size={16} color={isDarkMode ? '#FCD34D' : '#F59E0B'} />}
            >
                <ThemedText style={{ fontSize: 15, lineHeight: 22 }}>
                    {ingredientsToWatch.join(', ')}
                </ThemedText>
            </InfoCard>

            <GapColumn space={32} />

            {/* Action Buttons */}
            <IconButton
                title="Save to Favorites"
                iconName="heart"
                onPress={() => { }}
                buttonColor={Colors.primary}
                textColor={'white'}
            />
            <GapColumn space={12} />
            <IconButton
                title="Export to PDF"
                iconName="doc.text"
                onPress={() => { }}
                buttonColor={"#BD20A1FF"}
                textColor={'white'}
            />

            <GapColumn space={32} />

            {/* Similar Foods Section */}
            <Row style={{ alignItems: 'center', marginBottom: 16 }}>
                <View style={{
                    width: 4,
                    height: 24,
                    backgroundColor: colors.safe.primary,
                    borderRadius: 2,
                    marginRight: 12
                }} />
                <ThemedText
                    type="subtitle"
                    style={{
                        fontSize: 22,
                        fontWeight: '700'
                    }}
                >
                    You might also like
                </ThemedText>
            </Row>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {similarFoods.map((food, index) => (
                    <SimilarFoodItem
                        key={index}
                        name={food.name}
                        type={food.type}
                        description={food.description}
                        image={food.image}
                    />
                ))}
            </ScrollView>

            <GapColumn space={40} />
        </ThemedView>
    );
}
