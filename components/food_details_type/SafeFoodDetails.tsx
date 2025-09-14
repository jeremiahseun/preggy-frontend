import { Colors } from "@/constants/Colors";
import React from "react";
import { View, ScrollView, useColorScheme } from "react-native";
import { IconButton } from "../Buttons";
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

export default function SafeFoodDetailsView({ name, description, sources, verifiedDate, nutritionalBenefits, preparationGuidelines, trimesterNotes, whyItThisSafe, ingredientsToWatch, similarFoods }: SafeFoodDetailsProps) {
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <ThemedView style={{
            padding: 0,
        }}>
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
                        <ThemedText type='small12'>Verified</ThemedText>
                    </Row>
                </Column>
            </Row>
            <GapColumn space={20} />
            <ThemedText type="title">{name}</ThemedText>

            <GapColumn space={15} />
            <ThemedText>{description}</ThemedText>
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

            <GapColumn space={20} />

            <ThemedText type="subtitle">Key Information</ThemedText>
            <GapColumn space={20} />
            <TitleListCard type='safe' title='Nutritional Benefits' information={nutritionalBenefits} />

            <GapColumn space={20} />
            <TitleListCard type='limit' title='Preparation Guidelines' information={preparationGuidelines} />

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
