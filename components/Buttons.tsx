import appStyles from '@/constants/Styles';
import { Link, LinkProps, RelativePathString, useRouter } from 'expo-router';
import { TouchableOpacity, Text, View } from 'react-native';

type AuthButtonProps = {
    title: string;
    navigateTo: LinkProps['href']
    style?: object;
    textStyle?: object;
    textColor?: string;
};

function AuthButton({ title, navigateTo, style, textStyle }: AuthButtonProps) {
    const router = useRouter();
    return (

        <TouchableOpacity style={[appStyles.button, style]} onPress={() => router.push(navigateTo)}>
            <Text style={[appStyles.buttonText, textStyle]}>{title}</Text>
        </TouchableOpacity>

    );
}

function TextButton({ title, navigateTo, textColor, style }: AuthButtonProps) {
    const router = useRouter();

    return (
        <TouchableOpacity onPress={() => router.push(navigateTo)}>
            <Text style={[style, appStyles.buttonText, { color: textColor ?? "#000"}]}>{title}</Text>
        </TouchableOpacity>
    );
}

export { AuthButton, TextButton };
