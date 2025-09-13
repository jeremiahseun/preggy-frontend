import appStyles from "@/constants/Styles";
import { Pressable, View } from "react-native";

type CircleContainerProps = {
    color?: string;
    radius: number;
    children?: React.ReactNode;
    onPress?: () => void;
}

export default function CircleContainer({ color, radius, children, onPress }: CircleContainerProps) {
    return (
        <Pressable onPress={onPress} style={[appStyles.circle, {
            backgroundColor: color ?? 'black',
            width: radius,
            height: radius,
            borderRadius: radius / 2,
            alignItems: 'center',
            justifyContent: 'center'
        }]}>
            {children}
        </Pressable>
    )
}
