import appStyles from "@/constants/Styles";
import { View, TextInput, Text, KeyboardTypeOptions } from "react-native";
import { ThemedText } from "./ThemedText";

class AuthInputProps {
    label?: string;
    placeholder?: string;
    value?: string;
    keyboardType?: KeyboardTypeOptions | undefined
    autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined
    onChangeText?: (text: string) => void;
    secureTextEntry: boolean = false;
};

const AuthInput = (props: AuthInputProps) => (
    <View style={appStyles.inputContainer}>
         <ThemedText>{props.label}</ThemedText>
        <TextInput
            style={appStyles.input}
            placeholder={props.placeholder}
            value={props.value}
            onChangeText={props.onChangeText}
            secureTextEntry={props.secureTextEntry}
            autoCapitalize={props.autoCapitalize ?? "none"}
            keyboardType={props.keyboardType}
            placeholderTextColor="#9A9A9A"
        />
    </View>
);

export default AuthInput;
