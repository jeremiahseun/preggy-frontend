import { ThemedText } from '@/components/ThemedText';
import { ThemedScrollView, ThemedView } from '@/components/ThemedView';
import appStyles from '@/constants/Styles';
import { Link } from 'expo-router';
import { StyleSheet, Button, Image, View, ActivityIndicator, Pressable, useColorScheme, KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import { useState } from 'react';
import { Colors } from '@/constants/Colors';
import ImageView from '@/components/widgets/ImageView';
import Column from '@/components/Column';
import { GapColumn } from '@/components/Gap';
import CircularCheckbox from '@/components/CircularCheckbox';
import { IconSymbol } from '@/components/ui/IconSymbol';
import Row from '@/components/Row';
import { AuthButton } from '@/components/Buttons';

const foodOptions = [
    "Yes, this is Jollof Rice with Chicken",
    "This is Fried Rice with Chicken",
    "This is White Rice with Chicken Stew",
];

export default function ConfirmFoodItemScreen() {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | 'manual' | null>(foodOptions[0]);
    const [manualFoodName, setManualFoodName] = useState('');
    const isDarkMode = useColorScheme() === 'dark';

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <ThemedScrollView style={appStyles.screen}>
                <Column style={{ justifyContent: 'center' }}>
                    <GapColumn space={10} />
                    <ImageView uri={'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} />
                    <GapColumn space={15} />
                    <View style={[styles.aiDetectionContainer, { backgroundColor: isDarkMode ? '#171a1f' : '#E8F0F7FF' }]}>
                        <Column>
                            <ThemedText type='defaultSemiBold'>AI Detection</ThemedText>
                            <ThemedText type='small12'>95% confidence</ThemedText>
                        </Column>
                        <GapColumn space={15} />
                        <ThemedText style={{ textAlign: 'center' }} type='subTitle'>I think this is Jollof Rice with Chicken</ThemedText>
                        <GapColumn space={10} />
                        <ThemedText style={{ textAlign: 'center' }} type='small14'>Is this correct? Please confirm or choose the right option below.</ThemedText>
                    </View>
                    <GapColumn space={15} />
                    <ThemedText type='subTitle'>Am I correct?</ThemedText>
                    <GapColumn space={15} />

                    {foodOptions.map((option) => (
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

                    <AuthButton title="Continue" navigateTo="/(tabs)/home/food-details" />
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
