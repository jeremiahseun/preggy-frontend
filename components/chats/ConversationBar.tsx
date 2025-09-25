import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, useColorScheme, View } from "react-native";
import { GapColumn } from "../Gap";
import { ThemedText } from "../ThemedText";
import { Text } from "react-native";

export default function NewConversationBar() {
    const isDark = useColorScheme() === 'dark';
    return (
        <View style={[styles.welcomeContainer, { backgroundColor: isDark ? '#1F2937' : '#F0FDF4' }]}>
            <Text style={styles.welcomeIcon}>❤️</Text>
            <ThemedText type='subTitle'>
                Welcome to your safety assistant
            </ThemedText>
            <GapColumn space={10} />
            <ThemedText style={[styles.welcomeSubtitle, { color: isDark ? '#D1D5DB' : '#6B7280' }]}>
                I'm here to help you make informed decisions about food safety during your pregnancy. Ask me about any food, ingredient, or safety concern!
            </ThemedText>
            <View style={styles.disclaimerContainer}>
                <Ionicons name="information-circle-outline" size={16} color="#3B82F6" />
                <Text style={[styles.disclaimerText, { color: isDark ? '#D1D5DB' : '#6B7280' }]}>
                    All advice is based on verified medical sources and updated regularly.
                </Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    disclaimerText: {
        fontSize: 12,
        marginLeft: 6,
        flex: 1,
        lineHeight: 16,
    },
    welcomeSubtitle: {
        fontSize: 14,
        lineHeight: 20,
        textAlign: 'center',
        marginBottom: 12,
    },
    disclaimerContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    welcomeContainer: {
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        alignItems: 'center',
    },
    welcomeIcon: {
        fontSize: 24,
        marginBottom: 12,
    },
})
