import appStyles from '@/constants/Styles';
import { ExternalPathString, LinkProps, RelativePathString, useRouter } from 'expo-router';
import { TouchableOpacity, Text, GestureResponderEvent, View, ColorValue, ActivityIndicator, StyleSheet, StyleProp, ViewStyle, useColorScheme } from 'react-native';
import { IconSymbol, IconSymbolName } from './ui/IconSymbol';
import Row from './Row';
import { ThemedText } from './ThemedText';
import { GapRow } from './Gap';
import { Colors } from '@/constants/Colors';

type AuthButtonProps = {
    title: string;
    onPress?: () => void;
    navigateTo: LinkProps['href']
    style?: object;
    textStyle?: object;
    textColor?: string;
    type?: 'push' | 'replace' | 'dismissTo';
};

function RouteNormalButton({ title, navigateTo, onPress, style, textStyle, type = 'push' }: AuthButtonProps) {
    const router = useRouter();
    return (
        <TouchableOpacity style={[appStyles.button, style]} onPress={onPress ? () => onPress : () => type === 'push' ? router.push(navigateTo) : type === 'replace' ? router.replace(navigateTo) : router.dismissTo(navigateTo)}>
            <Text style={[appStyles.buttonText, textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
}

function AuthButton({ title, navigateTo, style, textStyle }: AuthButtonProps) {
    const router = useRouter();
    return (
        <TouchableOpacity style={[appStyles.button, style]} onPress={() => router.push(navigateTo)}>
            <Text style={[appStyles.buttonText, textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
}

function TextButton({ title, navigateTo, onPress, textColor, style, type = 'push' }: AuthButtonProps) {
    const router = useRouter();
    const isDarkMode = useColorScheme() === 'dark';

    return (
        <TouchableOpacity onPress={() => {
            if (onPress) {
                console.log("onPress called")
                onPress();
            }
            type === 'push' ? router.push(navigateTo) : type === 'replace' ? router.replace(navigateTo) : router.dismissTo(navigateTo)
        }}>
            <Text style={[appStyles.buttonText, { color: textColor ?? (isDarkMode ? "grey" : "000") }, style]}>{title}</Text>
        </TouchableOpacity>
    );
}

type IconButtonProps = {
    title: string;
    iconName: IconSymbolName;
    onPress: () => void;
    buttonColor?: string;
    textColor?: string;
    style?: object;
    isLoading?: boolean
};

function IconButton({ title, iconName, onPress, isLoading, buttonColor, textColor, style }: IconButtonProps) {
    return (
        <TouchableOpacity
            style={[{
                backgroundColor: buttonColor ?? '#FAFAFBFF',
                padding: 15,
                borderRadius: 6,
                alignItems: 'center',
                justifyContent: 'center'
            }, style]}
            onPress={onPress}
        >
            {
                isLoading ? (
                    <View style={[appStyles.row, {
                        alignItems: 'center',
                        justifyContent: "center"
                    }]}>

                        <ActivityIndicator color="#FFFFFF" size="small" />
                    </View>
                ) : (
                    <Row style={{ alignItems: 'center' }}>
                        <IconSymbol name={iconName} size={18} color={textColor ?? '#000'} />
                        <GapRow space={10} />
                        <ThemedText style={{ color: textColor ?? '#000' }} type="defaultSemiBold">{title}</ThemedText>
                    </Row>
                )
            }
        </TouchableOpacity>
    );
}

type NormalButtonProps = {
    isLoading?: boolean,
    onPress: (event: GestureResponderEvent) => void,
    buttonText: string,
    buttonColor?: ColorValue | undefined,
    buttonStyle?: StyleProp<ViewStyle>

}

function NormalButton({ isLoading, onPress, buttonText, buttonColor, buttonStyle }: NormalButtonProps) {
    return (
        <View style={{
            width: '100%'
        }}>
            {isLoading ? (
                <View style={[styles.loadingButton, { backgroundColor: buttonColor ?? Colors.primary }]}>
                    <ActivityIndicator color="#FFFFFF" size="small" />
                </View>
            ) : (
                <TouchableOpacity style={[styles.loginButton, buttonStyle]} onPress={onPress}>
                    <ThemedText style={styles.loginButtonText}>{buttonText}</ThemedText>
                </TouchableOpacity>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    loginButton: {
        backgroundColor: Colors.primary,
        borderRadius: 16,
        paddingVertical: 18,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
    },
    loginButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
    },
    loadingButton: {
        borderRadius: 16,
        paddingVertical: 18,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
    },
})

export { AuthButton, TextButton, IconButton, RouteNormalButton, NormalButton };
