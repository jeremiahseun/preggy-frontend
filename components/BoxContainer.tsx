import { useThemeColor } from "@/hooks/useThemeColor";
import { Platform, useColorScheme, ViewStyle, TouchableOpacity, TouchableOpacityProps } from "react-native"

import { StyleProp } from 'react-native';
type BoxContainerProps = {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
} & TouchableOpacityProps;


export default function BoxContainer({ children, style, ...props }: BoxContainerProps) {
    const color = useThemeColor({ light: 'white', dark: '#171a1f' }, 'background');
    const isDarkMode = useColorScheme() === 'dark';

    return (
        <TouchableOpacity style={[{
            height: 160,
            width: 'auto',
            borderRadius: 16,
            ...Platform.select({
                ios: {
                    shadowColor: isDarkMode ? 'grey' : '#171a1f',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 1,
                },
                android: {
                    elevation: 3,
                },
            }),

            backgroundColor: color
        }, style]}
            {...props}
        >
            {children}
        </TouchableOpacity>
    )
}
