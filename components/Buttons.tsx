import appStyles from '@/constants/Styles';
import { ExternalPathString, LinkProps, RelativePathString, useRouter } from 'expo-router';
import { TouchableOpacity, Text, GestureResponderEvent } from 'react-native';
import { IconSymbol, IconSymbolName } from './ui/IconSymbol';
import Row from './Row';
import { ThemedText } from './ThemedText';
import { GapRow } from './Gap';

type AuthButtonProps = {
    title: string;
    onPress?: () => void;
    navigateTo: LinkProps['href']
    style?: object;
    textStyle?: object;
    textColor?: string;
    type?: 'push' | 'replace' | 'dismissTo';
};

function NormalButton({ title, navigateTo, onPress, style, textStyle, type = 'push' }: AuthButtonProps) {
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

function TextButton({ title, navigateTo, textColor, style, type = 'push' }: AuthButtonProps) {
    const router = useRouter();

    return (
        <TouchableOpacity onPress={() => type === 'push' ? router.push(navigateTo) : type === 'replace' ? router.replace(navigateTo) : router.dismissTo(navigateTo)}>
            <Text style={[appStyles.buttonText, { color: textColor ?? "#000" }, style]}>{title}</Text>
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
};

function IconButton({ title, iconName, onPress, buttonColor, textColor, style }: IconButtonProps) {
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
            <Row style={{ alignItems: 'center' }}>
                <IconSymbol name={iconName} size={18} color={textColor ?? '#000'} />
                <GapRow space={10} />
                <ThemedText style={{ color: textColor ?? '#000' }} type="defaultSemiBold">{title}</ThemedText>
            </Row>
        </TouchableOpacity>
    );
}

export { AuthButton, TextButton, IconButton, NormalButton };
