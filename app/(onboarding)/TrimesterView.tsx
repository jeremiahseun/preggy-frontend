import { NormalButton, RouteNormalButton } from "@/components/Buttons";
import CircleContainer from "@/components/CircleContainer";
import Column from "@/components/Column";
import { GapColumn, GapRow } from "@/components/Gap";
import Row from "@/components/Row";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import appStyles from "@/constants/Styles";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View, Platform, Modal, Button, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import RadioButton from "@/components/RadioButton";
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useProfileState } from "@/providers/profile_provider";
import { useRouter } from "expo-router";

export default function TrimesterView() {
    const insets = useSafeAreaInsets();
    const [selectedTrimester, setSelectedTrimester] = useState<string | null>(null);
    const [date, setDate] = useState<Date | null>(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const currentDate = new Date();
    const futureDate = new Date(currentDate);
    futureDate.setFullYear(futureDate.getFullYear() + 1);

    const { trimesterStage, setTrimesterStage, setDueDate, dueDate} = useProfileState();
    const router = useRouter();




    const onDateChange = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || date;
        if (Platform.OS === 'android') {
            setShowDatePicker(false);
        }
        setDate(currentDate);
        setDueDate(currentDate);
    };

    const renderDatePicker = () => {
        if (Platform.OS === 'ios') {
            return (
                <Modal
                    transparent={true}
                    animationType="slide"
                    visible={showDatePicker}
                    onRequestClose={() => setShowDatePicker(false)}
                >
                    <View style={styles.modalContainer}>
                        <ThemedView style={styles.modalContent}>
                            <DateTimePicker
                                testID="dateTimePicker"
                                maximumDate={futureDate}
                                minimumDate={currentDate}
                                value={date || new Date()}
                                mode={'date'}
                                display="spinner"
                                onChange={onDateChange}
                            />
                            <Button title="Done" onPress={() => setShowDatePicker(false)} />
                        </ThemedView>
                    </View>
                </Modal>
            );
        } else {
            return (
                showDatePicker && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date || new Date()}
                        mode={'date'}
                        display="default"
                        onChange={onDateChange}
                    />
                )
            );
        }
    };

    return (
        <ThemedView style={[appStyles.screen, {
            paddingTop: insets.top + 30, paddingBottom: insets.bottom,
        }, appStyles.column]}>
            <ThemedText type="title">Trimester Stage</ThemedText>
            <ThemedText type="defaultSemiBold">Let's personalize your experience</ThemedText>

            <GapColumn space={30} />
            <Row style={{
                alignContent: 'space-between',
                alignItems: 'center'
            }}>
                <ThemedText style={{ flex: 1 }} type="small14">Step 2 of 3</ThemedText>
                <ThemedText type="small14">67%</ThemedText>
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
                    width: '67%',
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
                        <FontAwesomeIcon icon={'baby'} size={32} color="#294988" />
                    </CircleContainer>
                    <GapColumn space={10} />
                    <ThemedText style={{
                        alignSelf: 'center'
                    }} type="subtitle">How far along are you?</ThemedText>
                    <GapColumn space={10} />
                    <ThemedText style={{

                        textAlign: 'center',
                        paddingHorizontal: 20
                    }}>Each stage of pregnancy has unique nutritional needs. This helps us provide the most relevant guidance for you and your baby.</ThemedText>
                    <GapColumn space={40} />
                </Column>
                <TouchableOpacity onPress={() => setSelectedTrimester("first")} style={[styles.container, {
                    borderColor: selectedTrimester === "first" ? Colors.primary : 'grey',
                    borderWidth: selectedTrimester === "first" ? 2 : 1,
                }]}>
                    <Row style={{
                        alignItems: 'center',
                        alignContent: 'center'
                    }}>
                        <CircleContainer color="#FFBFD9" radius={50}>
                            <FontAwesomeIcon icon={'seedling'} size={20} color="#FF2056" />
                        </CircleContainer>
                        <GapRow space={15} />
                        <Column style={{ flex: 1 }}>
                            <ThemedText type="subTitle" >First Trimester</ThemedText>
                            <GapColumn space={5} />
                            <ThemedText type="small14" >Weeks 1-12</ThemedText>
                            <GapColumn space={5} />
                            <ThemedText type="small12">Early development stage</ThemedText>
                        </Column>
                        <RadioButton selected={selectedTrimester === "first"} onPress={() => {
                            setTrimesterStage(1);
                            setSelectedTrimester("first");
                        }}
                            />
                    </Row>
                </TouchableOpacity>
                <GapColumn space={20} />
                <TouchableOpacity onPress={() => setSelectedTrimester("second")} style={[styles.container, {
                    borderColor: selectedTrimester === "second" ? Colors.primary : 'grey',
                    borderWidth: selectedTrimester === "second" ? 2 : 1,
                }]}>
                    <Row style={{
                        alignItems: 'center',
                        alignContent: 'center'
                    }}>
                        <CircleContainer color="#E1DFFF" radius={50}>
                            <FontAwesomeIcon icon={'heart'} size={20} color="#1A17E6" />
                        </CircleContainer>
                        <GapRow space={15} />
                        <Column style={{ flex: 1 }}>
                            <ThemedText type="subTitle" >Second Trimester</ThemedText>
                            <GapColumn space={5} />
                            <ThemedText type="small14" >Weeks 13-26</ThemedText>
                            <GapColumn space={5} />
                            <ThemedText type="small12">Growth & development</ThemedText>
                        </Column>
                        <RadioButton selected={selectedTrimester === "second"} onPress={() => {
                            setTrimesterStage(2);
                            setSelectedTrimester("second");
                        }} />
                    </Row>
                </TouchableOpacity>
                <GapColumn space={20} />
                <TouchableOpacity onPress={() => setSelectedTrimester("third")} style={[styles.container, {
                    borderColor: selectedTrimester === "third" ? Colors.primary : 'grey',
                    borderWidth: selectedTrimester === "third" ? 2 : 1,
                }]}>
                    <Row style={{
                        alignItems: 'center',
                        alignContent: 'center'
                    }}>
                        <CircleContainer color="#E8D9F9" radius={50}>
                            <FontAwesomeIcon icon={'heart'} size={20} color="#6E34D9" />
                        </CircleContainer>
                        <GapRow space={15} />
                        <Column style={{ flex: 1 }}>
                            <ThemedText type="subTitle" >Third Trimester</ThemedText>
                            <GapColumn space={5} />
                            <ThemedText type="small14" >Weeks 27-40</ThemedText>
                            <GapColumn space={5} />
                            <ThemedText type="small12">Final preparation</ThemedText>
                        </Column>
                        <RadioButton selected={selectedTrimester === "third"} onPress={() => {
                            setTrimesterStage(3);
                            setSelectedTrimester("third");
                        }} />
                    </Row>
                </TouchableOpacity>
                <GapColumn space={20} />
                <TouchableOpacity onPress={() => {
                    setSelectedTrimester("fourth")
                    setShowDatePicker(true)
                }} style={[styles.container, {
                    borderColor: selectedTrimester === "fourth" ? Colors.primary : 'grey',
                    borderWidth: selectedTrimester === "fourth" ? 2 : 1,
                }]}>
                    <Row style={{
                        alignItems: 'center',
                        alignContent: 'center'
                    }}>
                        <CircleContainer color="#F7EAE7" radius={30}>
                            <FontAwesomeIcon icon={'calendar-days'} size={12} color="#8A220F" />
                        </CircleContainer>
                        <GapRow space={10} />
                        <ThemedText type="defaultSemiBold">Know your due date?</ThemedText>
                    </Row>
                    <GapColumn space={15} />
                    <View style={styles.datePickerTrigger}>
                        <ThemedText type={date ? 'defaultSemiBold' : 'default'} style={date ? null : styles.dateText}>{date ? date.toLocaleDateString() : "DD/MM/YYYY"}</ThemedText>
                    </View>
                    <GapColumn space={10} />
                    <ThemedText type="small12">We'll calculate your trimester automatically</ThemedText>
                </TouchableOpacity>
                {renderDatePicker()}
                <GapColumn space={20} />
                <NormalButton buttonText="Continue" onPress={() => {
                    if ((trimesterStage === null || selectedTrimester === '') || dueDate === null) {
                        Alert.alert("Trimester Stage", "Please choose your trimester stage or type your due date if you know it.");
                        return;
                    }
                    router.push("/DietView");
                }} />
                <GapColumn space={50} />
            </ScrollView>
        </ThemedView>)
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 'auto',
        padding: 20,
        borderColor: 'grey',
        borderRadius: 10,
        alignContent: 'center',
        paddingHorizontal: 10,
        borderWidth: .5
    },
    datePickerTrigger: {
        borderWidth: .5,
        borderColor: 'grey',
        borderRadius: 10,
        padding: 15,
    },
    dateText: {
        color: 'grey'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
})
