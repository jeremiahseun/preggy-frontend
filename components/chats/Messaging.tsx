import { Ionicons } from "@expo/vector-icons";
import { View, GestureResponderEvent, useColorScheme, TextInput, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Column from "../Column";
import { GapRow } from "../Gap";
import { ThemedText } from "../ThemedText";
import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";


function MessageLimitReached() {
    const insets = useSafeAreaInsets();
    const isDark = useColorScheme() === 'dark';

    const dynamicStyles = StyleSheet.create({
        inputContainer: {
            backgroundColor: isDark ? '#1F1F1F' : '#FFFFFF',
            borderTopColor: isDark ? '#333333' : '#E5E7EB',
        },
        textInput: {
            backgroundColor: isDark ? '#2A2A2A' : '#F9FAFB',
            color: isDark ? '#FFFFFF' : '#1F2937',
            borderColor: isDark ? '#374151' : '#D1D5DB',
        },
    });

    return (
        <View style={[styles.inputContainer, dynamicStyles.inputContainer, {
            paddingBottom: insets.bottom
        }]}>
            <Ionicons name="lock-closed-outline" size={32} color="#F59E0B" />
            <GapRow space={15} />
            <Column style={{
                width: '100%',
                flex: 1
            }}>
                <ThemedText>Message Limit Reached</ThemedText>
                <ThemedText type='small12'>
                    You've used all your free messages. Upgrade to Pro for unlimited chats and priority support.
                </ThemedText>
            </Column>
        </View>
    )
}


function MessageInput({
    message,
    setMessage,
    sendMessage,
}: {
    message: string,
    setMessage: (text: string) => void,
    sendMessage: (event: GestureResponderEvent) => void,
}) {
    const insets = useSafeAreaInsets();
    const isDark = useColorScheme() === 'dark';

    const dynamicStyles = StyleSheet.create({
            inputContainer: {
                backgroundColor: isDark ? '#1F1F1F' : '#FFFFFF',
                borderTopColor: isDark ? '#333333' : '#E5E7EB',
            },
            textInput: {
                backgroundColor: isDark ? '#2A2A2A' : '#F9FAFB',
                color: isDark ? '#FFFFFF' : '#1F2937',
                borderColor: isDark ? '#374151' : '#D1D5DB',
            },
        });

    return (
        <View style={[styles.inputContainer, dynamicStyles.inputContainer, {
            paddingBottom: insets.bottom
        }]}>
            <TextInput
                style={[styles.textInput, dynamicStyles.textInput]}
                value={message}
                onChangeText={setMessage}
                placeholder="Ask about any food safety concern..."
                placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
                multiline
                maxLength={500}
                autoComplete={'name'}
                autoCapitalize='sentences'
            />

            <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                <Ionicons name="send" size={20} color="#FFFFFF" />
            </TouchableOpacity>
        </View>
    )
}

export {MessageInput, MessageLimitReached}


const styles = StyleSheet.create({
    textInput: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 12,
        maxHeight: 100,
        marginRight: 12,
        fontSize: 16,
    },
    sendButton: {
        backgroundColor: Colors.primary,
        borderRadius: 20,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 4,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderTopWidth: 1,
    },
})
