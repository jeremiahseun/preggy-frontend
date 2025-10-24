import { ThemedText } from '@/components/ThemedText';
import { ThemedScrollView, ThemedView } from '@/components/ThemedView';
import appStyles from '@/constants/Styles';
import { useRouter } from 'expo-router';
import { StyleSheet, Button, Image, View, ActivityIndicator, Pressable, useColorScheme, KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import { useEffect, useState } from 'react';
import { Colors } from '@/constants/Colors';
import ImageView from '@/components/widgets/ImageView';
import Column from '@/components/Column';
import { GapColumn, GapRow } from '@/components/Gap';
import CircularCheckbox from '@/components/CircularCheckbox';
import { IconSymbol } from '@/components/ui/IconSymbol';
import Row from '@/components/Row';
import { AuthButton, NormalButton } from '@/components/Buttons';
import CircleContainer from '@/components/CircleContainer';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { usePhotoCheckStore } from '@/providers/photo_check_store';

export default function ConfirmFoodItemScreen() {
    const router = useRouter();
    const { foodList, imageUri, searchFood, loading, foodItem } = usePhotoCheckStore();
    const [selectedOption, setSelectedOption] = useState<string | 'manual' | null>(null);
    const [manualFoodName, setManualFoodName] = useState('');
    const isDarkMode = useColorScheme() === 'dark';

    useEffect(() => {
        if (foodList.length > 0) {
            setSelectedOption(foodList[0]);
        }
    }, [foodList]);

    useEffect(() => {
        if (foodItem) {
            router.replace({ pathname: '/(tabs)/home/food-details', params: { foodItem: JSON.stringify(foodItem) } });
        }
    }, [foodItem, router]);

    const handleContinue = async () => {
        let foodName = '';
        if (selectedOption === 'manual') {
            foodName = manualFoodName;
        } else {
            foodName = selectedOption || '';
        }

        if (foodName) {
            await searchFood(foodName);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <ThemedScrollView style={appStyles.screen}>
                <Column style={{ justifyContent: 'center' }}>
                    <GapColumn space={10} />
                    {imageUri && <ImageView uri={imageUri} />}
                    <GapColumn space={15} />
                    <View style={[styles.aiDetectionContainer, { backgroundColor: isDarkMode ? '#171a1f' : '#E8F0F7FF' }]}>
                        <Row>
                            <CircleContainer color="#EAEBF3" radius={50}>
                                <FontAwesomeIcon icon={'robot'} size={20} color="#294988" />
                            </CircleContainer>
                            <GapRow space={10} />
                            <Column>
                                <ThemedText type='defaultSemiBold'>AI Detection</ThemedText>
                            </Column>
                        </Row>
                        <GapColumn space={15} />
                        <ThemedText style={{ textAlign: 'center' }} type='subTitle'>I think this is {foodList[0]}</ThemedText>
                        <GapColumn space={10} />
                        <ThemedText style={{ textAlign: 'center' }} type='small14'>Is this correct? Please confirm or choose the right option below.</ThemedText>
                    </View>
                    <GapColumn space={15} />
                    <ThemedText type='subTitle'>Am I correct?</ThemedText>
                    <GapColumn space={15} />

                    {foodList.map((option) => (
                        <Pressable key={option} style={[styles.optionContainer, selectedOption === option && { backgroundColor: "#0F172A", borderColor: Colors.primary }]} onPress={() => setSelectedOption(option)}>
                            <Row style={{ alignItems: 'center' }}>
                                <CircularCheckbox isChecked={selectedOption === option} onPress={() => setSelectedOption(option)} />
                                <ThemedText style={[styles.optionText, selectedOption === option && { color: 'white' }]}>{option}</ThemedText>
                            </Row>
                        </Pressable>
                    ))}

                    <Pressable style={[styles.optionContainer, selectedOption === 'manual' && { backgroundColor: Colors.primary, borderColor: Colors.primary }]} onPress={() => setSelectedOption('manual')}>
                        <Row style={{ alignItems: 'center' }}>
                            <CircularCheckbox isChecked={selectedOption === 'manual'} onPress={() => setSelectedOption('manual')} />
                            <IconSymbol name="pencil" size={20} color={"#0F172A"} style={{ marginLeft: 10 }} />
                            <TextInput onPress={() => setSelectedOption('manual')}
                                style={[styles.manualEntryInput, selectedOption === 'manual' ? isDarkMode ? { color: "white" } : { color: "white" } : { color: "black" }]}
                                placeholder="None of these? Type the food name"
                                placeholderTextColor={isDarkMode ? '#999' : '#6B7280'}
                                value={manualFoodName}
                                autoCapitalize="words"
                                autoCorrect={true}
                                onChangeText={setManualFoodName}
                                onFocus={() => setSelectedOption('manual')}
                            />
                        </Row>
                    </Pressable>
                    <NormalButton buttonText="Continue" onPress={handleContinue} isLoading={loading === 'search'} />
                    <GapColumn space={40} />
                </Column>
            </ThemedScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    aiDetectionContainer: {
        height: 'auto',
        width: "100%",
        padding: 15,
        borderRadius: 10,
    },
    optionContainer: {
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#E8F0F7FF',
        marginBottom: 10,
    },
    optionText: {
        marginLeft: 10,
        flex: 1,
    },
    manualEntryInput: {
        marginLeft: 10,
        flex: 1,
        fontSize: 16,
    },
});
