import { NormalButton, RouteNormalButton } from "@/components/Buttons";
import CircleContainer from "@/components/CircleContainer";
import Column from "@/components/Column";
import { GapColumn, GapRow } from "@/components/Gap";
import Row from "@/components/Row";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import appStyles from "@/constants/Styles";
import { useState, useEffect } from "react";
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Platform,
    Modal,
    Button,
    Alert,
    Animated,
    LayoutAnimation,
    UIManager
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import RadioButton from "@/components/RadioButton";
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from "expo-router";
import { useProfileStore } from "@/providers/profile_store";
import { useThemeColor } from '@/hooks/useThemeColor';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function TrimesterView() {
    const insets = useSafeAreaInsets();
    const [date, setDate] = useState<Date | null>(null);
    const currentDate = new Date();
    const futureDate = new Date(currentDate);
    futureDate.setFullYear(futureDate.getFullYear() + 1);

    const { isLoading, error, updateTrimesterDetails } = useProfileStore();

    const [selectedOption, setSelectedOption] = useState<'first' | 'second' | 'third' | 'dueDate' | null>(null);
    const [selectedWeek, setSelectedWeek] = useState<number | 'unsure' | null>(null);
    const [showWeekSelector, setShowWeekSelector] = useState<'first' | 'second' | 'third' | null>(null);
    const [dueDate, setDueDate] = useState<Date | null>(null);
    const [modalContent, setModalContent] = useState<'date' | 'week' | null>(null);

    const router = useRouter();
    const backgroundColor = useThemeColor({}, 'background');
    const textColor = useThemeColor({}, 'text');

    const getWeekRange = (trimester: 'first' | 'second' | 'third') => {
        switch (trimester) {
            case 'first': return { start: 1, end: 12 };
            case 'second': return { start: 13, end: 26 };
            case 'third': return { start: 27, end: 40 };
            default: return { start: 1, end: 12 };
        }
    };

    const handleTrimesterSelect = (trimester: 'first' | 'second' | 'third') => {
        setSelectedOption(trimester);
        setShowWeekSelector(trimester);
        setSelectedWeek(null);
        setDueDate(null);
        setModalContent('week');
    };

    const handleDueDateSelect = () => {
        setSelectedOption('dueDate');
        setShowWeekSelector(null);
        setSelectedWeek(null);
        setModalContent('date');
    };

    const onDateChange = (event: any, selectedDate?: Date) => {
        const newDate = selectedDate || date;
        if (Platform.OS === 'android') {
            setModalContent(null);
        }
        setDate(newDate);
        setDueDate(newDate);
    };

    const renderPickerModal = () => {
        const handleClose = () => setModalContent(null);

        let modalTitle = '';
        let modalSubtitle = '';
        let pickerContent = null;

        if (modalContent === 'date') {
            modalTitle = 'Select Your Due Date';
            pickerContent = (
                <DateTimePicker
                    testID="dateTimePicker"
                    maximumDate={futureDate}
                    minimumDate={currentDate}
                    value={date || new Date()}
                    mode={'date'}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={onDateChange}
                />
            );
        } else if (modalContent === 'week' && showWeekSelector) {
            const { start, end } = getWeekRange(showWeekSelector);
            const weeks = Array.from({ length: end - start + 1 }, (_, i) => start + i);
            modalTitle = 'Which week are you in?';
            modalSubtitle = "It's okay if you're not sure about the exact week";
            pickerContent = (
                <View style={[styles.pickerContainer, { backgroundColor }]}>
                    <Picker
                        selectedValue={selectedWeek}
                        onValueChange={(itemValue) => setSelectedWeek(itemValue)}
                        style={[styles.picker, { color: textColor }]}
                    >
                        <Picker.Item label="Select week..." value={null} />
                        {weeks.map((week) => (
                            <Picker.Item key={week} label={`Week ${week}`} value={week} />
                        ))}
                        <Picker.Item label="I'm not sure" value="unsure" color={Colors.primary} />
                    </Picker>
                </View>
            );
        }

        if (!pickerContent) return null;

        if (modalContent === 'date' && Platform.OS === 'android') {
            return pickerContent;
        }

        return (
            <Modal
                transparent={true}
                animationType="slide"
                visible={modalContent !== null}
                onRequestClose={handleClose}
            >
                <TouchableOpacity style={styles.modalContainer} activeOpacity={1} onPressOut={handleClose}>
                    <TouchableOpacity activeOpacity={1} style={[styles.modalContent, { backgroundColor }]}>
                        <ThemedText type="defaultSemiBold" style={styles.weekLabel}>{modalTitle}</ThemedText>
                        {modalSubtitle ? <ThemedText type="small12" style={styles.weekHint}>{modalSubtitle}</ThemedText> : null}
                        <GapColumn space={10} />
                        {pickerContent}
                        <GapColumn space={20} />
                        <NormalButton buttonText="Done" onPress={handleClose} />
                    </TouchableOpacity>
                </TouchableOpacity>
            </Modal>
        );
    };

    const handleContinue = async () => {
        let params = {};
        switch (selectedOption) {
            case 'first':
            case 'second':
            case 'third':
                if (!selectedWeek) {
                    Alert.alert("Week Selection", "Please select a week or choose 'I'm not sure' to continue.");
                    return;
                }
                const trimesterMap = { 'first': 1, 'second': 2, 'third': 3 };
                if (selectedWeek === 'unsure') {
                    params = { trimester: trimesterMap[selectedOption!] };
                } else {
                    params = { trimester: trimesterMap[selectedOption!], current_week: selectedWeek };
                }
                break;
            case 'dueDate':
                if (!date) {
                    Alert.alert("Due Date", "Please select a valid due date.");
                    return;
                }
                params = { dueDate: date };
                break;
            default:
                Alert.alert("Trimester Stage", "Please select an option to continue.");
                return;
        }

        await updateTrimesterDetails(params);

        if (!error) {
            router.push("/DietView");
        } else {
            Alert.alert("Trimester", error);
        }
    };

    const isReadyToContinue = () => {
        if (selectedOption === 'dueDate') {
            return date !== null;
        }
        if (selectedOption && ['first', 'second', 'third'].includes(selectedOption)) {
            return selectedWeek !== null;
        }
        return false;
    };

    return (
        <ThemedView style={[appStyles.screen, { paddingTop: insets.top + 30, paddingBottom: insets.bottom }, appStyles.column]}>
            <ThemedText type="title">Trimester Stage</ThemedText>
            <ThemedText type="defaultSemiBold">Let's personalize your experience</ThemedText>

            <GapColumn space={30} />
            <Row style={{ alignContent: 'space-between', alignItems: 'center' }}>
                <ThemedText style={{ flex: 1 }} type="small14">Step 2 of 3</ThemedText>
                <ThemedText type="small14">67%</ThemedText>
            </Row>
            <GapColumn space={10} />
            <View style={styles.progressBar}>
                <View style={styles.progressFill}></View>
            </View>
            <GapColumn space={10} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <GapColumn space={50} />

                <Column style={styles.headerContainer}>
                    <CircleContainer color="#EAEBF3" radius={80}>
                        <FontAwesomeIcon icon={'person-pregnant'} size={32} color="#294988" />
                    </CircleContainer>
                    <GapColumn space={10} />
                    <ThemedText style={{ alignSelf: 'center' }} type="subtitle">
                        How far along are you?
                    </ThemedText>
                    <GapColumn space={10} />
                    <ThemedText style={styles.description}>
                        Each stage of pregnancy has unique nutritional needs. This helps us provide the most relevant guidance for you and your baby.
                    </ThemedText>
                    <GapColumn space={40} />
                </Column>

                {/* First Trimester */}
                <TouchableOpacity
                    onPress={() => handleTrimesterSelect("first")}
                    style={[styles.container, { borderColor: selectedOption === "first" ? Colors.primary : '#E2E8F0', borderWidth: selectedOption === "first" ? 2 : 1, }]}
                >
                    <Row style={styles.optionRow}>
                        <CircleContainer color="#FFBFD9" radius={50}>
                            <FontAwesomeIcon icon={'seedling'} size={20} color="#FF2056" />
                        </CircleContainer>
                        <GapRow space={15} />
                        <Column style={{ flex: 1 }}>
                            <ThemedText type="subTitle">First Trimester</ThemedText>
                            <GapColumn space={5} />
                            <ThemedText type="small14">Weeks 1-12</ThemedText>
                            <GapColumn space={5} />
                            <ThemedText type="small12">Early development stage</ThemedText>
                        </Column>
                        <RadioButton
                            selected={selectedOption === "first"}
                            onPress={() => handleTrimesterSelect("first")}
                        />
                    </Row>
                    {(selectedWeek !== null && selectedOption === "first" && selectedWeek !== 'unsure') && <Column style={{alignSelf: 'center', alignContent: 'center', alignItems: 'center'}}>
                        <GapColumn space={15} />
                        <ThemedText type={'defaultSemiBold'}>You selected Week {selectedWeek}</ThemedText>
                    </Column> }
                </TouchableOpacity>
                <GapColumn space={20} />

                {/* Second Trimester */}
                <TouchableOpacity
                    onPress={() => handleTrimesterSelect("second")}
                    style={[styles.container, { borderColor: selectedOption === "second" ? Colors.primary : '#E2E8F0', borderWidth: selectedOption === "second" ? 2 : 1, }]}
                >
                    <Row style={styles.optionRow}>
                        <CircleContainer color="#E1DFFF" radius={50}>
                            <FontAwesomeIcon icon={'baby'} size={20} color="#1A17E6" />
                        </CircleContainer>
                        <GapRow space={15} />
                        <Column style={{ flex: 1 }}>
                            <ThemedText type="subTitle">Second Trimester</ThemedText>
                            <GapColumn space={5} />
                            <ThemedText type="small14">Weeks 13-26</ThemedText>
                            <GapColumn space={5} />
                            <ThemedText type="small12">Growth & development</ThemedText>
                        </Column>
                        <RadioButton
                            selected={selectedOption === "second"}
                            onPress={() => handleTrimesterSelect("second")}
                        />
                    </Row>
                    {(selectedWeek !== null && selectedOption === "second" && selectedWeek !== 'unsure') && <Column style={{ alignSelf: 'center', alignContent: 'center', alignItems: 'center' }}>
                        <GapColumn space={15} />
                        <ThemedText type={'defaultSemiBold'}>You selected Week {selectedWeek}</ThemedText>
                    </Column>}
                </TouchableOpacity>
                <GapColumn space={20} />

                {/* Third Trimester */}
                <TouchableOpacity
                    onPress={() => handleTrimesterSelect("third")}
                    style={[styles.container, { borderColor: selectedOption === "third" ? Colors.primary : '#E2E8F0', borderWidth: selectedOption === "third" ? 2 : 1, }]}
                >
                    <Row style={styles.optionRow}>
                        <CircleContainer color="#E8D9F9" radius={50}>
                            <FontAwesomeIcon icon={'baby-carriage'} size={20} color="#6E34D9" />
                        </CircleContainer>
                        <GapRow space={15} />
                        <Column style={{ flex: 1 }}>
                            <ThemedText type="subTitle">Third Trimester</ThemedText>
                            <GapColumn space={5} />
                            <ThemedText type="small14">Weeks 27-40</ThemedText>
                            <GapColumn space={5} />
                            <ThemedText type="small12">Final preparation</ThemedText>
                        </Column>
                        <RadioButton
                            selected={selectedOption === "third"}
                            onPress={() => handleTrimesterSelect("third")}
                        />
                    </Row>
                    {(selectedWeek !== null && selectedOption === "third" && selectedWeek !== 'unsure') && <Column style={{ alignSelf: 'center', alignContent: 'center', alignItems: 'center' }}>
                        <GapColumn space={15} />
                        <ThemedText type={'defaultSemiBold'}>You selected Week {selectedWeek}</ThemedText>
                    </Column>}
                </TouchableOpacity>
                <GapColumn space={20} />

                {/* Due Date Option */}
                <TouchableOpacity
                    onPress={handleDueDateSelect}
                    style={[styles.container, { borderColor: selectedOption === "dueDate" ? Colors.primary : '#E2E8F0', borderWidth: selectedOption === "dueDate" ? 2 : 1, }]}
                >
                    <Row style={styles.optionRow}>
                        <CircleContainer color="#F7EAE7" radius={30}>
                            <FontAwesomeIcon icon={'calendar-days'} size={12} color="#8A220F" />
                        </CircleContainer>
                        <GapRow space={10} />
                        <ThemedText type="defaultSemiBold">Know your due date?</ThemedText>
                    </Row>
                    <GapColumn space={15} />
                    <TouchableOpacity
                        style={styles.datePickerTrigger}
                        onPress={handleDueDateSelect}
                    >
                        <ThemedText
                            type={date ? 'defaultSemiBold' : 'default'}
                            style={date ? null : styles.dateText}
                        >
                            {date ? date.toLocaleDateString() : "DD/MM/YYYY"}
                        </ThemedText>
                    </TouchableOpacity>
                    <GapColumn space={10} />
                    <ThemedText type="small12">We'll calculate your trimester automatically</ThemedText>
                </TouchableOpacity>
                {renderPickerModal()}
                <GapColumn space={30} />

                <NormalButton
                    buttonText="Continue"
                    isLoading={isLoading}
                    onPress={handleContinue}
                    buttonStyle={[!isReadyToContinue() && styles.disabledButton]}
                />
                <GapColumn space={50} />
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 20,
        borderRadius: 12,
        borderWidth: 1,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    headerContainer: { alignSelf: 'center', alignContent: 'center', alignItems: 'center' },
    description: { textAlign: 'center', paddingHorizontal: 20, lineHeight: 22 },
    optionRow: { alignItems: 'center', alignContent: 'center' },
    progressBar: { backgroundColor: '#f0f0f0', width: '100%', height: 10, borderRadius: 10 },
    progressFill: { backgroundColor: Colors.primary, width: '67%', height: 10, borderRadius: 10 },
    datePickerTrigger: { borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 10, padding: 15, backgroundColor: '#F8F9FA' },
    dateText: { color: '#9CA3AF' },
    modalContainer: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
    modalContent: { padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20 },
    weekLabel: { fontSize: 16, marginBottom: 4 },
    weekHint: { color: '#6B7280', marginBottom: 8 },
    pickerContainer: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        backgroundColor: '#F8F9FA',
    },
    picker: {
        width: '100%',
        height: Platform.OS === 'ios' ? 215 : 50,
    },
    disabledButton: { opacity: 0.5 },
});
