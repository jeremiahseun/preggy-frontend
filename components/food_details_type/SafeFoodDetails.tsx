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
import LeafIcon from '@/assets/icons/leaf.svg';
import CheckIcon from '@/assets/icons/check.svg';
import CalendarIcon from '@/assets/icons/calendar.svg';
import AlertIcon from '@/assets/icons/alert.svg';
import BorderContainer from "../widgets/BorderContainer";
import CircleContainer from "../CircleContainer";
import InfoCard from "../food_details/InfoCard";
import InfoIcon from '@/assets/icons/info.svg';
import ListCheckIcon from '@/assets/icons/listcheck.svg';

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

export default function SafeFoodDetailsView({ name, description, sources, verifiedDate, nutritionalBenefits, preparationGuidelines, trimesterNotes, whyItThisSafe, ingredientsToWatch, similarFoods }: SafeFoodDetailsProps) {
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <ThemedView style={{
            paddingHorizontal: 20,
        }}>

            <BorderContainer
                darkModeBorderColor="#046610"
                lightModeBorderColor="green"
                darkModeFillColor="#011a07"
                lightModeFillColor="#dff2e3"
            >
                <Row>
                    <FoodTag type={'safe'} />
                    <View style={{ flex: 1 }} />
                    <Column style={{ alignItems: 'flex-end' }}>
                        <ThemedText type='small14'>Checked just now</ThemedText>
                        <Row style={{
                            alignItems: 'center'
                        }}>
                            <CheckIcon color={'#4AC477FF'} width={12} height={12} />
                            <GapRow space={5} />
                            <ThemedText lightColor="green" darkColor="green" type='small12'>Verified</ThemedText>
                        </Row>
                    </Column>
                </Row>
                <GapColumn space={20} />
                <ThemedText type="title">{name}</ThemedText>

                <GapColumn space={15} />
                <BorderContainer
                    darkModeBorderColor="#046610"
                    lightModeBorderColor="green"
                    darkModeFillColor="#0b2e1a"
                    lightModeFillColor="#cce8d4"
                >
                    <ThemedText lightColor="#008B00" darkColor="#00FF00" type="defaultSemiBold">Safe to eat during pregnancy</ThemedText>
                    <GapColumn space={10} />
                    <ThemedText>{description}</ThemedText>
                </BorderContainer>
                <GapColumn space={20} />
                <Column style={{
                    width: "100%",
                    height: 'auto',
                    borderRadius: 6,
                    padding: 15,
                    backgroundColor: isDarkMode ? '#171a1f' : '#FAFAFBFF',
                }}>
                    <Row style={{
                        alignItems: 'center'
                    }}>
                        <LeafIcon color={'#4AC477FF'} width={16} height={16} />
                        <GapRow space={10} />
                        <ThemedText type="defaultSemiBold">Sources: {sources}</ThemedText>
                    </Row>
                    <Row style={{
                        alignItems: 'center'
                    }}>
                        <CheckIcon color={'#4AC477FF'} width={12} height={12} />
                        <GapRow space={10} />
                        <ThemedText style={{
                            fontWeight: '600'
                        }} type="small14"> Last verified: {verifiedDate}</ThemedText>
                    </Row>
                </Column>
            </BorderContainer>

            <GapColumn space={40} />

            <ThemedText type="subtitle">Key Information</ThemedText>
            <GapColumn space={20} />

            <BorderContainer
                darkModeBorderColor="#969393"
                lightModeBorderColor="grey"
                darkModeFillColor=''
                lightModeFillColor="white"
            >
                <Row style={{
                    alignItems: 'center'
                }}>
                    <CircleContainer color={isDarkMode ? "black" : '#dff2e3'} radius={40}>
                        <LeafIcon color="green" width={20} height={20} />
                    </CircleContainer>
                    <GapRow space={15} />
                    <ThemedText style={{
                        fontWeight: '700'
                    }} type="defaultSemiBold">Nutritional Benefits</ThemedText>
                </Row>
                <GapColumn space={20} />
                {nutritionalBenefits.map((benefit, index) => (
                    <Row key={index} style={{ alignItems: 'baseline', marginBottom: 5 }}>
                        <ThemedText lightColor="green" darkColor="green" style={{ marginRight: 10 }}>{"\u2713"}</ThemedText>
                        <ThemedText>{benefit}</ThemedText>
                    </Row>
                ))}
            </BorderContainer>

            <GapColumn space={20} />

            <BorderContainer
                darkModeBorderColor="#969393"
                lightModeBorderColor="grey"
                darkModeFillColor=''
                lightModeFillColor="white"
            >
                <Row style={{
                    alignItems: 'center'
                }}>
                    <CircleContainer color={isDarkMode ? "black" : '#dff2e3'} radius={40}>
                        <CheckIcon color="green" width={20} height={20} />
                    </CircleContainer>
                    <GapRow space={15} />
                    <ThemedText style={{
                        fontWeight: '700'
                    }} type="defaultSemiBold">Preparation Guidelines</ThemedText>
                </Row>
                <GapColumn space={20} />
                {preparationGuidelines.map((guideline, index) => (
                    <Row key={index} style={{ alignItems: 'baseline', marginBottom: 5 }}>
                        <ThemedText lightColor="green" darkColor="green" style={{ marginRight: 10 }}>{"\u2713"}</ThemedText>
                        <ThemedText>{guideline}</ThemedText>
                    </Row>
                ))}
            </BorderContainer>

            <GapColumn space={20} />


            <Column style={{
                width: "100%",
                height: 'auto',
                borderRadius: 6,
                padding: 15,
                backgroundColor: isDarkMode ? '#171a1f' : '#FAFAFBFF',
            }}>
                <Row style={{
                    alignItems: 'center'
                }}>
                    <CalendarIcon width={16} height={16} />
                    <GapRow space={10} />

                    <ThemedText type="subTitle">2nd Trimester Notes</ThemedText>
                </Row>
                <GapColumn space={5} />
                <ThemedText>{trimesterNotes}</ThemedText>
            </Column>
            <GapColumn space={20} />
            <InfoCard title="Why is this safe?" icon={<InfoIcon width={16} height={16} />}>
                <ThemedText>{whyItThisSafe}</ThemedText>
            </InfoCard>

            <GapColumn space={20} />
            <InfoCard title="Ingredients to watch" icon={<ListCheckIcon width={16} height={16} />}>
                <ThemedText>{ingredientsToWatch.join(', ')}</ThemedText>
            </InfoCard>

            <GapColumn space={40} />
            <IconButton
                title="Save to Favorites"
                iconName="heart"
                onPress={() => { }}
                buttonColor={Colors.primary}
                textColor={'white'}
            />
            <GapColumn space={10} />
            <IconButton
                title="Export to PDF"
                iconName="doc.text"
                onPress={() => { }}
                buttonColor={"#BD20A1FF"}
                textColor={'white'}
            />

            <GapColumn space={40} />
            <ThemedText type="subtitle">You might also like</ThemedText>
            <GapColumn space={20} />
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
    )
}
