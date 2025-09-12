import { useThemeColor } from "@/hooks/useThemeColor";
import { Platform, useColorScheme, View, ViewProps } from "react-native"

export default function BoxContainer({ children, style }: ViewProps) {
    const color = useThemeColor({ light: 'white', dark: '#171a1f' }, 'background');
    const isDarkMode = useColorScheme() === 'dark';

    return (
        <View style={[{
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
        }, style]}>
            {children}
        </View>
    )
}
