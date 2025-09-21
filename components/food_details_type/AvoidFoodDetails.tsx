import { Colors } from "@/constants/Colors";
import React from "react";
import { View, ScrollView, useColorScheme } from "react-native";
import { IconButton, TextButton } from "../Buttons";
import Column from "../Column";
import InfoCard from "../food_details/InfoCard";
import SimilarFoodItem from "../food_details/SimilarFoodItem";
import TitleListCard from "../food_details/TitleListCard";
import FoodTag from "../FoodTag";
import { GapRow, GapColumn } from "../Gap";
import Row from "../Row";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import LeafIcon from '@/assets/icons/leaf.svg';
import CheckIcon from '@/assets/icons/check.svg';
import CalendarIcon from '@/assets/icons/calendar.svg';
import InfoIcon from '@/assets/icons/info.svg';
import ListCheckIcon from '@/assets/icons/listcheck.svg';
import BorderContainer from "../widgets/BorderContainer";
import CircleContainer from "../CircleContainer";

interface AvoidAlternativeFoodItem {
    name: string;
    type: 'safe' | 'limit' | 'avoid';
    description: string;
    image: string;
}

interface WhyAvoidRisk {
    nameOfRisk: string;
    levelOfRisk: string;
    description: string;
    causesOfRisk: string[];
}

interface FoodsContainingSelectedFoodItem {
    name: string;
    description: string; // Short description of 2-4 words
}

type AvoidFoodDetailsProps = {
    name: string;
    whyAvoidDescription: string;
    sources: string;
    verifiedDate: string;
    whyAvoidRisk: WhyAvoidRisk[];
    otherConsiderations: string[];
    betterAlternatives: string[];
    safeCookingGuidelines: string[];
    foodsContainingSelectedFoods: FoodsContainingSelectedFoodItem[];
}

/**
 * AVOID FOOD DETAILS API RESPONSE (Region specific for choice of words)
 * {
 * name: "" // Name of the food
 * whyAvoidDescription: "" // A short description of why to avoid the food.
 * sources: "" // List of strings into one string
 * verifiedDate: "" // Date (Month and Year) E.g: Dec, 2024
 * whyAvoidRisk: []&lt;WhyAvoidRisk&gt; // List of risks associated with the food.
 * otherConsiderations: []&lt;string&gt; // List of other considerations the user should know.
 * betterAlternatives: []&lt;string&gt; // List of better food alternatives.
 * safeCookingGuidelines: []&lt;string&gt; // List of guidelines for safe cooking.
 * foodsContainingSelectedFoods: []&lt;FoodsContainingSelectedFoodItem&gt; // List of foods containing the selected food item.
 * }
 *
 * WHY AVOID RISK RESPONSE
 * {
 *  nameOfRisk: "" // Name of the risk
 *  levelOfRisk: "" // Level of the risk (2 words: "{high, medium or low} risk")
 *  description: "" // A short description of the risk
 *  causesOfRisk: []&lt;string&gt; // List of causes of the risk
 * }
 *
 * FOODS CONTAINING SELECTED FOOD ITEM RESPONSE
 * {
 *  name: "" // Name of the food
 *  description: "" // Short description of 2-4 words
 * }
 *
 * AVOID ALTERNATIVE FOOD ITEM RESPONSE
 * {
 *  name: "" // Name of food
 *  type: "" // Safe type (safe | limit | avoid)
 *  description: "" // A short description of the food
 *  image: "" // The food image
 * }
 */

export default function AvoidFoodDetailsView({ name, whyAvoidDescription, sources, verifiedDate, whyAvoidRisk, otherConsiderations, betterAlternatives, safeCookingGuidelines, foodsContainingSelectedFoods }: AvoidFoodDetailsProps) {
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <ThemedView style={{
            paddingHorizontal: 20,
        }}>

            <BorderContainer
                darkModeBorderColor="#750707"
                lightModeBorderColor="red"
                darkModeFillColor="#1c0101"
                lightModeFillColor="#fce6e6"
            >
                <Row>
                    <FoodTag type={'avoid'} />
                    <View style={{ flex: 1 }} />
                    <Column style={{ alignItems: 'flex-end' }}>
                        <ThemedText type='small14'>Checked just now</ThemedText>
                        <Row style={{
                            alignItems: 'center'
                        }}>
                            <CheckIcon color={'red'} width={12} height={12} />
                            <GapRow space={5} />
                            <ThemedText lightColor="red" darkColor="red" type='small12'>Verified</ThemedText>
                        </Row>
                    </Column>
                </Row>
                <GapColumn space={20} />
                <ThemedText type="title">{name}</ThemedText>

                <GapColumn space={15} />
                <BorderContainer
                    darkModeBorderColor="#750707"
                    lightModeBorderColor="red"
                    darkModeFillColor="#2e0b0b"
                    lightModeFillColor="#fccaca"
                >
                    <ThemedText lightColor="red" darkColor="#fccaca" type="defaultSemiBold">Not recommended during pregnancy</ThemedText>
                    <GapColumn space={10} />
                    <ThemedText>{whyAvoidDescription}</ThemedText>
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

            <ThemedText type="subtitle">Why avoid during pregnancy?</ThemedText>
            <GapColumn space={20} />

            <BorderContainer
                darkModeBorderColor="#750707"
                lightModeBorderColor="red"
                darkModeFillColor=''
                lightModeFillColor="white"
            >

                <Row style={{
                    alignItems: 'center'
                }}>
                    <CircleContainer color={isDarkMode ? "black" : '#fce6e6'} radius={40}></CircleContainer>
                    <GapRow space={15} />
                    <ThemedText style={{
                        fontWeight: '700'
                    }} type="defaultSemiBold">{whyAvoidRisk[0].nameOfRisk}</ThemedText>
                </Row>

                <GapColumn space={10} />
                <BorderContainer darkModeBorderColor="#2e0b0b"
                    lightModeBorderColor="#fce6e6"
                    darkModeFillColor='#2e0b0b'
                    lightModeFillColor="#fce6e6">
                    <ThemedText lightColor="red" darkColor="#fccaca" type="defaultSemiBold">Not recommended during pregnancy</ThemedText>
                    <GapColumn space={10} />
                    <ThemedText>{whyAvoidDescription}</ThemedText>
                </BorderContainer>

                <GapColumn space={20} />
                {whyAvoidRisk[0].causesOfRisk.map((cause, index) => (
                    <Row key={index} style={{ alignItems: 'baseline', marginBottom: 5 }}>
                        <ThemedText lightColor="red" darkColor="red" style={{ marginRight: 10 }}>{"\u2715"}</ThemedText>
                        <ThemedText>{cause}</ThemedText>
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
                    <CircleContainer color={isDarkMode ? "black" : '#e3e7e8'} radius={40}></CircleContainer>
                    <GapRow space={15} />
                    <ThemedText style={{
                        fontWeight: '700'
                    }} type="defaultSemiBold">Other Considerations</ThemedText>
                </Row>
                <GapColumn space={20} />
                {otherConsiderations.map((cause, index) => (
                    <Row key={index} style={{ alignItems: 'baseline', marginBottom: 5 }}>
                        <ThemedText lightColor="red" darkColor="red" style={{ marginRight: 10 }}>{"🔘"}</ThemedText>
                        <ThemedText>{cause}</ThemedText>
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
                    <CircleContainer color={isDarkMode ? "black" : '#d4f0fc'} radius={40}></CircleContainer>
                    <GapRow space={15} />
                    <ThemedText style={{
                        fontWeight: '700'
                    }} type="defaultSemiBold">Safe Cooking Guidelines</ThemedText>
                </Row>
                <GapColumn space={20} />
                {safeCookingGuidelines.map((cause, index) => (
                    <Row key={index} style={{ alignItems: 'baseline', marginBottom: 5 }}>
                        <ThemedText type="small12" style={{ marginRight: 10 }}>{"🟢"}</ThemedText>
                        <ThemedText>{cause}</ThemedText>
                    </Row>
                ))}
            </BorderContainer>

            <GapColumn space={40} />

            <ThemedText type="subtitle">Safe alternatives</ThemedText>
            <GapColumn space={20} />

            <BorderContainer
                darkModeBorderColor="green"
                lightModeBorderColor="#046610"
                darkModeFillColor='#011a07'
                lightModeFillColor="#dff2e3"
            >
                <Row style={{
                    alignItems: 'center'
                }}>
                    <CircleContainer color={isDarkMode ? "black" : '#afe0bb'} radius={40}>
                        <ThemedText>✅</ThemedText>
                    </CircleContainer>
                    <GapRow space={15} />
                    <ThemedText style={{
                        fontWeight: '700'
                    }} type="defaultSemiBold">Recommended Options</ThemedText>
                </Row>
                <GapColumn space={20} />
                {betterAlternatives.map((alternative, index) => (
                    <Column key={index}>
                        <Row style={{
                            alignItems: 'center'
                        }}>
                            <ThemedText type="defaultSemiBold" style={{
                                flex: 1,
                                backgroundColor: isDarkMode ? '' : '', padding: 10,
                                borderRadius: 10
                            }} >{alternative}</ThemedText>
                            <TextButton type="replace" title="Learn More →" navigateTo={'/(tabs)/home/food-details'} style={{
                                fontSize: 12,
                            }}/>
                        </Row>
                        <GapColumn space={10} />
                    </Column>
                ))}
            </BorderContainer>


            <GapColumn space={40} />
            <ThemedText type="subTitle">Foods containing {name.toLowerCase()}</ThemedText>
            <GapColumn space={20} />
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {foodsContainingSelectedFoods.map((food, index) => (
                    <SimilarFoodItem
                        key={index}
                        name={food.name}
                        type={'avoid'}
                        description={food.description}
                        image={''}
                    />
                ))}

            </ScrollView>

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

        </ThemedView>
    )
}
