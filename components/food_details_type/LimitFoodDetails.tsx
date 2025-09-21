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

export default function LimitFoodDetailsView({ name, description, sources, verifiedDate, safeConsumptionGuidelines, healthConsiderations, betterAlternatives, trimesterNotes, whyLimitThisFood, ifYouChooseToConsume, saferAlternatives }: LimitFoodDetailsProps) {
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <ThemedView style={{
            paddingHorizontal: 20,
        }}>

            <BorderContainer
                darkModeBorderColor="#755707"
                lightModeBorderColor="#FFC700"
                darkModeFillColor="#1c1a01"
                lightModeFillColor="#fffbeb"
            >
                <Row>
                    <FoodTag type={'limit'} />
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
                    darkModeBorderColor="#755707"
                    lightModeBorderColor="#FFC700"
                    darkModeFillColor="#2e2a0b"
                    lightModeFillColor="#fff5cc"
                >
                    <ThemedText lightColor="#8B6F00" darkColor="#FFD700" type="defaultSemiBold">Limit consumption during pregnancy</ThemedText>
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
                    <CircleContainer color={isDarkMode ? "black" : '#fffbeb'} radius={40}>
                        <ThemedText>⏰</ThemedText>
                    </CircleContainer>
                    <GapRow space={15} />
                    <ThemedText style={{
                        fontWeight: '700'
                    }} type="defaultSemiBold">Safe Consumption Guidelines</ThemedText>
                </Row>
                <GapColumn space={20} />
                {safeConsumptionGuidelines.map((cause, index) => (
                    <Row key={index} style={{ alignItems: 'baseline', marginBottom: 5 }}>
                        <ThemedText lightColor="#FFC700" darkColor="#FFC700" style={{ marginRight: 10 }}>{"🔘"}</ThemedText>
                        <ThemedText>{cause}</ThemedText>
                    </Row>
                ))}
            </BorderContainer>

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
                    <CircleContainer color={isDarkMode ? "black" : '#fce6e6'} radius={40}>
                        <AlertIcon width={20} height={20} />
                    </CircleContainer>
                    <GapRow space={15} />
                    <ThemedText style={{
                        fontWeight: '700'
                    }} type="defaultSemiBold">Health Considerations</ThemedText>
                </Row>

                <GapColumn space={20} />
                {healthConsiderations.map((cause, index) => (
                    <Row key={index} style={{ alignItems: 'baseline', marginBottom: 5 }}>
                        <ThemedText lightColor="red" darkColor="red" style={{ marginRight: 10 }}>{"\u2715"}</ThemedText>
                        <ThemedText>{cause}</ThemedText>
                    </Row>
                ))}
            </BorderContainer>

            <GapColumn space={20} />

            <BorderContainer
                darkModeBorderColor="green"
                lightModeBorderColor="#046610"
                darkModeFillColor='#011a07'
                lightModeFillColor="white"
            >
                <Row style={{
                    alignItems: 'center'
                }}>
                    <CircleContainer color={isDarkMode ? "black" : '#afe0bb'} radius={40}>
                        <ThemedText>💚</ThemedText>
                    </CircleContainer>
                    <GapRow space={15} />
                    <ThemedText style={{
                        fontWeight: '700'
                    }} type="defaultSemiBold">Better Alternatives</ThemedText>
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
                            }} />
                        </Row>
                        <GapColumn space={10} />
                    </Column>
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
            <InfoCard title="Why limit this food?" icon={<InfoIcon width={16} height={16} />}>
                <ThemedText>{whyLimitThisFood}</ThemedText>
            </InfoCard>
            <GapColumn space={20} />
            <InfoCard title="If you choose to consume" icon={<ListCheckIcon width={16} height={16} />}>
                <ThemedText>{ifYouChooseToConsume.join(', ')}</ThemedText>
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
            <ThemedText type="subtitle">Safer alternatives</ThemedText>
            <GapColumn space={20} />
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
    )
}
