import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { TouchableOpacity, View, Text, useColorScheme, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ChatHeader() {
    const insets = useSafeAreaInsets();
    const isDark = useColorScheme() === 'dark';

     const dynamicStyles = StyleSheet.create({
            container: {
             backgroundColor: isDark ? '#000000' : '#FFFFFF',
            },
            header: {
                backgroundColor: isDark ? '#1F1F1F' : '#FFFFFF',
                borderBottomColor: isDark ? '#333333' : '#E5E7EB',
            },
        });



    return (
        <View style={[styles.header, dynamicStyles.header, {
            paddingTop: insets.top + 10
        }]}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color={isDark ? '#FFFFFF' : '#1F2937'} />
            </TouchableOpacity>

            <View style={styles.headerContent}>
                <Text style={[styles.headerTitle, { color: isDark ? '#FFFFFF' : '#1F2937' }]}>
                    AI Safety Assistant
                </Text>
                <View style={styles.statusContainer}>
                    <View style={styles.onlineIndicator} />
                    <Text style={[styles.statusText, { color: isDark ? '#10B981' : '#10B981' }]}>
                        Always here to help
                    </Text>
                </View>
            </View>

            <TouchableOpacity style={styles.menuButton}>
                <Ionicons name="ellipsis-vertical" size={24} color={isDark ? '#FFFFFF' : '#1F2937'} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
    },
    backButton: {
        marginRight: 12,
    },
    headerContent: {
        flex: 1,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 2,
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    onlineIndicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#10B981',
        marginRight: 6,
    },
    statusText: {
        fontSize: 14,
    },
    menuButton: {
        marginLeft: 12,
    },
})
