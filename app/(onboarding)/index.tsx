import { NormalButton } from "@/components/Buttons";
import CircleContainer from "@/components/CircleContainer";
import Column from "@/components/Column";
import { GapColumn } from "@/components/Gap";
import Row from "@/components/Row";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import appStyles from "@/constants/Styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { TouchableOpacity, useColorScheme, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CountrySelector from "@/components/CountrySelector";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export default function RegisterOnboarding() {
    const insets = useSafeAreaInsets();
    const isDarkMode = useColorScheme() === 'dark'

    const [modalVisible, setModalVisible] = useState(false);
    const [country, setCountry] = useState<{ name: string, code: string } | null>(null);

    return (<ThemedView style={[appStyles.screen, {
        paddingTop: insets.top + 30, paddingBottom: insets.bottom,
    }, appStyles.column]}>
        <ThemedText type="title">Welcome to Preggy</ThemedText>
        <ThemedText type="defaultSemiBold">Let's personalize your experience</ThemedText>

        <GapColumn space={30} />
        <Row style={{
            alignContent: 'space-between',
            alignItems: 'center'
        }}>
            <ThemedText style={{ flex: 1 }} type="small14">Step 1 of 3</ThemedText>
            <ThemedText type="small14">33%</ThemedText>
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
                width: '33%',
                height: 10,
                borderRadius: 10
            }}></View>
        </View>
        <GapColumn space={60} />
        <Column style={{
            alignSelf: 'center',
            alignContent: 'center',
            alignItems: 'center'
        }}>

            <CircleContainer color="#EAEBF3" radius={80}>
                <FontAwesomeIcon icon={'globe'} size={32} color="#294988" />
            </CircleContainer>
            <GapColumn space={10} />
            <ThemedText style={{
                alignSelf: 'center'
            }} type="subtitle">Where are you located?</ThemedText>
            <GapColumn space={10} />
            <ThemedText style={{

                textAlign: 'center',
                paddingHorizontal: 20
            }}>This helps us provide safety guidelines specific to your region's food standards and regulations.</ThemedText>
            <GapColumn space={40} />
        </Column>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={[{
            width: '100%',
            height: 55,
            borderColor: 'grey',
            borderRadius: 10,
            alignContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 10,
            borderWidth: .5
        }, appStyles.row]}>
            <ThemedText type={country ? 'defaultSemiBold' : 'default'} style={{ flex: 1 }}>{country ? country.name : 'Select your country'}</ThemedText>
            <Ionicons name="arrow-down-outline"></Ionicons>
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
        <NormalButton title="Continue" navigateTo={"/TrimesterView"} />
        <CountrySelector
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            onSelect={(selectedCountry) => {
                setCountry(selectedCountry);
                setModalVisible(false);
            }}
        />
    </ThemedView>)
}
