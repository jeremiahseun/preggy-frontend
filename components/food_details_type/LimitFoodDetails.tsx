import { Colors } from "@/constants/Colors";
import React from "react";
import { View, ScrollView, useColorScheme } from "react-native";
import { IconButton, TextButton } from "../Buttons";
import Column from "../Column";
import SimilarFoodItem from "../food_details/SimilarFoodItem";
import FoodTag from "../FoodTag";
import { GapRow, GapColumn } from "../Gap";
import Row from "../Row";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import InfoCard from "../food_details/InfoCard";
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';

interface LimitAlternativeFoodItem {
    name: string;
    type: 'safe' | 'limit' | 'avoid';
    description: string;
    image: string;
}

type LimitFoodDetailsProps = {
    name: string;
    description: string;
    sources: string;
    verifiedDate: string;
    safeConsumptionGuidelines: string[];
    healthConsiderations: string[];
    betterAlternatives: string[];
    trimesterNotes: string;
    whyLimitThisFood: string;
    ifYouChooseToConsume: string[];
    saferAlternatives: LimitAlternativeFoodItem[];
}

/**
 * LIMIT FOOD DETAILS API RESPONSE (Region specific for choice of words)
 * {
 * name: "" // Name of the food
 * description: "" // A short description of the food. Usually containing region-aware words.
 * sources: "" // List of strings into one string
 * verifiedDate: "" // Date (Month and Year) E.g: Dec, 2024
 * safeConsumptionGuidelines: []&lt;string&gt; // List of guidelines for safe consumption.
 * healthConsiderations: []&lt;string&gt; // List of health considerations the user should look out.
 * betterAlternatives: []&lt;string&gt; // List of better food alternatives.
 * trimesterNotes: "" // Special (short) notes based on the user trimester period.
 * whyLimitThisFood: "" // A short reason note why to limit this food item.
 * ifYouChooseToConsume: []&lt;string&gt; // List of things to do if you choose to consume.
 * saferAlternatives: []&lt;LimitAlternativeFoodItem&gt; // List of foods that are safer alternatives. They can only be safe.
 * }
 *
 * SAFER ALTERNATIVES RESPONSE
 * {
 *  name: "" // Name of food
 *  type: "" // Safe type (safe | limit | avoid)
 *  description: "" // A short description of the food
 *  image: "" // The food image
 * }
 */

export default function LimitFoodDetailsView({
    name,
    description,
    sources,
    verifiedDate,
    safeConsumptionGuidelines,
    healthConsiderations,
    betterAlternatives,
    trimesterNotes,
    whyLimitThisFood,
    ifYouChooseToConsume,
    saferAlternatives
}: LimitFoodDetailsProps) {
    const isDarkMode = useColorScheme() === 'dark';

    const colors = {
        limit: {
            primary: isDarkMode ? '#FCD34D' : '#F59E0B',
            secondary: isDarkMode ? '#451A03' : '#FEF3C7',
            background: isDarkMode ? '#1C1506' : '#FFFBEB',
            border: isDarkMode ? '#78350F' : '#FDE68A',
            text: isDarkMode ? '#FDE68A' : '#92400E',
        },
        danger: {
            primary: isDarkMode ? '#FCA5A5' : '#EF4444',
            background: isDarkMode ? 'rgba(252, 165, 165, 0.1)' : '#FEE2E2',
            border: isDarkMode ? 'rgba(252, 165, 165, 0.2)' : '#FECACA',
            text: isDarkMode ? '#FCA5A5' : '#EF4444',
        },
        safe: {
            primary: isDarkMode ? '#66D9A6' : '#10B981',
            background: isDarkMode ? 'rgba(102, 217, 166, 0.08)' : '#F0FDF4',
            border: isDarkMode ? 'rgba(102, 217, 166, 0.2)' : '#BBF7D0',
            iconBackground: isDarkMode ? 'rgba(102, 217, 166, 0.2)' : '#D1FAE5',
        },
        info: {
            primary: isDarkMode ? '#93C5FD' : '#3B82F6',
            background: isDarkMode ? 'rgba(147, 197, 253, 0.1)' : '#EFF6FF',
            border: isDarkMode ? 'rgba(147, 197, 253, 0.2)' : '#DBEAFE',
        }
    };

    return (
        <ThemedView style={{ paddingHorizontal: 20 }}>
            {/* Hero Card */}
            <View style={{
                borderRadius: 24,
                padding: 24,
                backgroundColor: colors.limit.background,
                borderWidth: 2,
                borderColor: colors.limit.border,
                shadowColor: colors.limit.primary,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 12,
                elevation: 5,
            }}>
                <Row style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <FoodTag type={'limit'} />
                    <Column style={{ alignItems: 'flex-end' }}>
                        <Row style={{ alignItems: 'center', marginBottom: 4 }}>
                            <FontAwesome5 name="check-circle" size={14} color="#10B981" solid />
                            <GapRow space={6} />
                            <ThemedText
                                lightColor="#10B981"
                                darkColor="#66D9A6"
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
                    backgroundColor: isDarkMode ? 'rgba(252, 211, 77, 0.15)' : 'rgba(245, 158, 11, 0.1)',
                }}>
                    <Row style={{ alignItems: 'center', marginBottom: 10 }}>
                        <FontAwesome5 name="exclamation-triangle" size={16} color={colors.limit.primary} solid />
                        <GapRow space={8} />
                        <ThemedText
                            style={{
                                fontSize: 15,
                                fontWeight: '700',
                                color: colors.limit.primary
                            }}
                        >
                            Consume in Moderation
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
                        <FontAwesome5 name="book-medical" size={14} color={colors.limit.primary} />
                        <GapRow space={8} />
                        <ThemedText style={{ fontSize: 13, fontWeight: '600', flex: 1 }}>
                            Sources: {sources}
                        </ThemedText>
                    </Row>
                    <Row style={{ alignItems: 'center' }}>
                        <FontAwesome name="calendar" size={12} color={colors.limit.primary} />
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
                    backgroundColor: colors.limit.primary,
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

            {/* Safe Consumption Guidelines */}
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
                        backgroundColor: colors.limit.secondary,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <FontAwesome5 name="clock" size={20} color={colors.limit.primary} />
                    </View>
                    <GapRow space={12} />
                    <ThemedText style={{ fontSize: 18, fontWeight: '700', flex: 1 }}>
                        Safe Consumption Guidelines
                    </ThemedText>
                </Row>

                {safeConsumptionGuidelines.map((guideline, index) => (
                    <Row key={index} style={{
                        alignItems: 'flex-start',
                        marginBottom: index < safeConsumptionGuidelines.length - 1 ? 12 : 0,
                        paddingLeft: 8
                    }}>
                        <View style={{
                            width: 20,
                            height: 20,
                            borderRadius: 10,
                            backgroundColor: colors.limit.secondary,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: 12,
                            marginTop: 2
                        }}>
                            <FontAwesome name="circle" size={8} color={colors.limit.primary} />
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

            {/* Health Considerations */}
            <View style={{
                borderRadius: 20,
                padding: 20,
                backgroundColor: colors.danger.background,
                borderWidth: 1,
                borderColor: colors.danger.border,
                marginBottom: 16,
            }}>
                <Row style={{ alignItems: 'center', marginBottom: 16 }}>
                    <View style={{
                        width: 48,
                        height: 48,
                        borderRadius: 24,
                        backgroundColor: isDarkMode ? 'rgba(252, 165, 165, 0.2)' : '#FEE2E2',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <FontAwesome5 name="heartbeat" size={20} color={colors.danger.primary} />
                    </View>
                    <GapRow space={12} />
                    <ThemedText style={{ fontSize: 18, fontWeight: '700', color: colors.danger.text }}>
                        Health Considerations
                    </ThemedText>
                </Row>

                {healthConsiderations.map((consideration, index) => (
                    <Row key={index} style={{
                        alignItems: 'flex-start',
                        marginBottom: index < healthConsiderations.length - 1 ? 12 : 0,
                        paddingLeft: 8
                    }}>
                        <View style={{
                            width: 20,
                            height: 20,
                            borderRadius: 10,
                            backgroundColor: isDarkMode ? 'rgba(252, 165, 165, 0.2)' : '#FEE2E2',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: 12,
                            marginTop: 2
                        }}>
                            <FontAwesome name="exclamation" size={12} color={colors.danger.primary} />
                        </View>
                        <ThemedText style={{
                            flex: 1,
                            fontSize: 15,
                            lineHeight: 22,
                            color: colors.danger.text
                        }}>
                            {consideration}
                        </ThemedText>
                    </Row>
                ))}
            </View>

            {/* Better Alternatives */}
            <View style={{
                borderRadius: 20,
                padding: 20,
                backgroundColor: colors.safe.background,
                borderWidth: 1,
                borderColor: colors.safe.border,
                marginBottom: 16,
            }}>
                <Row style={{ alignItems: 'center', marginBottom: 16 }}>
                    <View style={{
                        width: 48,
                        height: 48,
                        borderRadius: 24,
                        backgroundColor: colors.safe.iconBackground,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <FontAwesome5 name="heart" size={20} color={colors.safe.primary} solid />
                    </View>
                    <GapRow space={12} />
                    <ThemedText style={{ fontSize: 18, fontWeight: '700' }}>
                        Better Alternatives
                    </ThemedText>
                </Row>

                {betterAlternatives.map((alternative, index) => (
                    <Column key={index}>
                        <Row style={{
                            alignItems: 'center',
                            backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.6)',
                            padding: 12,
                            borderRadius: 12,
                            marginBottom: index < betterAlternatives.length - 1 ? 10 : 0,
                        }}>
                            <ThemedText style={{
                                flex: 1,
                                fontSize: 15,
                                fontWeight: '600'
                            }}>
                                {alternative}
                            </ThemedText>
                            <TextButton
                                type="replace"
                                title="Learn More →"
                                navigateTo={'/(tabs)/home/food-details'}
                                style={{ fontSize: 12 }}
                            />
                        </Row>
                    </Column>
                ))}
            </View>

            {/* Trimester Notes */}
            <View style={{
                borderRadius: 20,
                padding: 20,
                backgroundColor: colors.info.background,
                borderWidth: 1,
                borderColor: colors.info.border,
                marginBottom: 16,
            }}>
                <Row style={{ alignItems: 'center', marginBottom: 12 }}>
                    <FontAwesome name="calendar-o" size={18} color={colors.info.primary} />
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
                title="Why limit this food?"
                icon={<FontAwesome5 name="info-circle" size={16} color={colors.info.primary} />}
            >
                <ThemedText style={{ fontSize: 15, lineHeight: 22 }}>
                    {whyLimitThisFood}
                </ThemedText>
            </InfoCard>

            <GapColumn space={16} />

            <InfoCard
                title="If you choose to consume"
                icon={<FontAwesome5 name="list-ul" size={16} color={colors.limit.primary} />}
            >
                <ThemedText style={{ fontSize: 15, lineHeight: 22 }}>
                    {ifYouChooseToConsume.join(', ')}
                </ThemedText>
            </InfoCard>

            <GapColumn space={32} />

            {/* Action Buttons */}
            <IconButton
                title="Save to Favorites"
                iconName="heart"
                onPress={() => {}}
                buttonColor={Colors.primary}
                textColor={'white'}
            />
            <GapColumn space={12} />
            <IconButton
                title="Export to PDF"
                iconName="doc.text"
                onPress={() => {}}
                buttonColor={"#BD20A1FF"}
                textColor={'white'}
            />

            <GapColumn space={32} />

            {/* Safer Alternatives Section */}
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
                    Safer Alternatives
                </ThemedText>
            </Row>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {saferAlternatives.map((food, index) => (
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
