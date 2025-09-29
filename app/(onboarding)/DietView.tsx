import CircleContainer from "@/components/CircleContainer";
import Column from "@/components/Column";
import { GapColumn, GapRow } from "@/components/Gap";
import Row from "@/components/Row";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import appStyles from "@/constants/Styles";
import { ScrollView, useColorScheme, View, TextInput, StyleSheet, TouchableOpacity, Button } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";
import RadioButton from "@/components/RadioButton";
import Checkbox from "@/components/Checkbox";
import { NormalButton, RouteNormalButton, TextButton } from "@/components/Buttons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useRouter } from "expo-router";
import { useProfileState } from "@/providers/profile_provider";

export default function DietView() {
    const { trimesterStage, everydayMeal, anythingElse, foodsToAvoid, country, dueDate, isLoading, setEverydayMeal, setAnythingElse, setFoodsToAvoid, setLoading, } = useProfileState();
    const insets = useSafeAreaInsets();
    const isDarkMode = useColorScheme() === 'dark';
    const [diet, setDiet] = useState<string | null>(null);
    const [avoidances, setAvoidances] = useState<string[]>([]);
    const [otherAvoidances, setOtherAvoidances] = useState("");
    const router = useRouter();


    const toggleAvoidance = (item: string) => {
        setAvoidances(prev =>
            prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
        );
        const newFoodsToAvoid = foodsToAvoid.includes(item)
            ? foodsToAvoid.filter(i => i !== item)
            : [...foodsToAvoid, item];
        setFoodsToAvoid(newFoodsToAvoid);
    };

    return (
        <ThemedView style={[appStyles.screen, {
            paddingTop: insets.top + 30, paddingBottom: insets.bottom,
        }, appStyles.column]}>
            <ThemedText type="title">Diet Stage</ThemedText>
            <ThemedText type="defaultSemiBold">Almost done!</ThemedText>

            <GapColumn space={30} />
            <Row style={{
                alignContent: 'space-between',
                alignItems: 'center'
            }}>
                <ThemedText style={{ flex: 1 }} type="small14">Step 3 of 3</ThemedText>
                <ThemedText type="small14">100%</ThemedText>
            </Row>
            <GapColumn space={10} />
            <View style={{
                backgroundColor: '#f0f0f0',
                width: '100%',
                height: 10,
                position: 'fixed',
                borderRadius: 10
            }}>
                <View style={{
                    backgroundColor: Colors.primary,
                    width: '100%',
                    height: 10,
                    borderRadius: 10
                }}></View>
            </View>
            <GapColumn space={10} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <GapColumn space={50} />
                <Column style={{
                    alignSelf: 'center',
                    alignContent: 'center',
                    alignItems: 'center'
                }}>
                    <CircleContainer color="#EAEBF3" radius={80}>
                        <FontAwesomeIcon icon={'utensils'} size={32} color="#294988" />
                    </CircleContainer>
                    <GapColumn space={10} />
                    <ThemedText style={{
                        alignSelf: 'center'
                    }} type="subtitle">Your Food, Your Way</ThemedText>
                    <GapColumn space={10} />
                    <ThemedText style={{

                        textAlign: 'center',
                        paddingHorizontal: 20
                    }}>Let's personalize your food tips. Tell us a bit about your meals and anything you avoid to stay safe and healthy.</ThemedText>
                    <GapColumn space={40} />
                </Column>

                <ThemedText type="subTitle">Your Everyday Meals</ThemedText>
                <ThemedText>Which of these best describes your eating style?</ThemedText>
                <GapColumn space={20} />

                <TouchableOpacity style={styles.optionContainer} onPress={() => setDiet('everything')}>
                    <RadioButton selected={diet === 'everything'} onPress={() => setDiet('everything')} />
                    <GapRow space={10} />
                    <ThemedText style={{ flex: 1 }}>I eat everything (meat, fish, vegetables, etc.)</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionContainer} onPress={() => setDiet('plant-based')}>
                    <RadioButton selected={diet === 'plant-based'} onPress={() => setDiet('plant-based')} />
                    <GapRow space={10} />
                    <ThemedText style={{ flex: 1 }}>My meals are mainly staples (Yam, Garri, Rice, Beans, vegetable soups etc), with a little meat or fish sometimes.</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionContainer} onPress={() => setDiet('pescatarian')}>
                    <RadioButton selected={diet === 'pescatarian'} onPress={() => setDiet('pescatarian')} />
                    <GapRow space={10} />
                    <ThemedText style={{ flex: 1 }}>I eat fish, but I don't eat other meat.</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionContainer} onPress={() => setDiet('vegetarian')}>
                    <RadioButton selected={diet === 'vegetarian'} onPress={() => setDiet('vegetarian')} />
                    <GapRow space={10} />
                    <ThemedText style={{ flex: 1 }}>I don't eat any meat or fish.</ThemedText>
                </TouchableOpacity>

                <GapColumn space={40} />

                <ThemedText type="subTitle">Foods You Avoid</ThemedText>
                <ThemedText>Do you need to avoid any of the following? (You can select more than one)</ThemedText>
                <GapColumn space={20} />

                <View style={{
                    gap: 10
                }}>
                    <TouchableOpacity style={styles.optionContainer} onPress={() => toggleAvoidance('nuts')}>
                        <Checkbox isChecked={avoidances.includes('nuts')} onValueChange={() => toggleAvoidance('nuts')} />
                        <GapRow space={10} />
                        <ThemedText style={{ flex: 1 }}>Groundnuts (Peanuts) or Cashew nuts</ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionContainer} onPress={() => toggleAvoidance('shellfish')}>
                        <Checkbox isChecked={avoidances.includes('shellfish')} onValueChange={() => toggleAvoidance('shellfish')} />
                        <GapRow space={10} />
                        <ThemedText style={{ flex: 1 }}>Shellfish (like Crayfish, Prawns, Snails)</ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionContainer} onPress={() => toggleAvoidance('dairy')}>
                        <Checkbox isChecked={avoidances.includes('dairy')} onValueChange={() => toggleAvoidance('dairy')} />
                        <GapRow space={10} />
                        <ThemedText style={{ flex: 1 }}>Fresh Milk or Yoghurt (Dairy)</ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionContainer} onPress={() => toggleAvoidance('eggs')}>
                        <Checkbox isChecked={avoidances.includes('eggs')} onValueChange={() => toggleAvoidance('eggs')} />
                        <GapRow space={10} />
                        <ThemedText style={{ flex: 1 }}>Eggs</ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionContainer} onPress={() => toggleAvoidance('wheat')}>
                        <Checkbox isChecked={avoidances.includes('wheat')} onValueChange={() => toggleAvoidance('wheat')} />
                        <GapRow space={10} />
                        <ThemedText style={{ flex: 1 }}>Foods made with Wheat Flour (like bread)</ThemedText>
                    </TouchableOpacity>
                </View>

                <GapColumn space={40} />

                <ThemedText type="subTitle">Anything else?</ThemedText>
                <ThemedText>Please list any other foods you stay away from for any reason.</ThemedText>
                <GapColumn space={20} />
                <TextInput
                    style={styles.textInput}
                    placeholder="Enter other foods here..."
                    value={otherAvoidances}
                    onChangeText={setOtherAvoidances}
                    multiline
                />

                <GapColumn space={40} />
                <NormalButton buttonText="Complete Setup & Start using Preggy" onPress={() => {

                    router.push("/(tabs)/home");
                }} />
                <GapColumn space={30} />
                <TextButton style={{
                    alignSelf: 'center'
                }} navigateTo={"/(tabs)/home"} title="Skip this - I will do this later" />
                <GapColumn space={50} />
            </ScrollView>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    textInput: {
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 10,
        padding: 15,
        minHeight: 100,
        textAlignVertical: 'top'
    }
});
