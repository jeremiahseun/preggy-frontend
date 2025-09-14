import { DimensionValue, useColorScheme } from "react-native";
import Column from "../Column";

type BorderContainerProps = {
    height?: DimensionValue;
    width?: DimensionValue;
    darkModeBorderColor: string;
    lightModeBorderColor: string;
    darkModeFillColor: string;
    lightModeFillColor: string;
    children?: React.ReactNode;
}

export default function BorderContainer({ height, width, darkModeBorderColor, lightModeBorderColor, darkModeFillColor, lightModeFillColor, children } : BorderContainerProps) {
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <Column style={{
            width: width ?? "100%",
            height: height ?? 'auto',
            borderRadius: 25,
            padding: 15,
            borderColor: isDarkMode ? darkModeBorderColor : lightModeBorderColor,
            borderWidth: 1,
            backgroundColor: isDarkMode ? darkModeFillColor : lightModeFillColor,
        }}>
            {children}
        </Column>
    )
}
