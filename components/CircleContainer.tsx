import appStyles from "@/constants/Styles";
import { View } from "react-native";

type CircleContainerProps = {
    color?: string;
    radius: number;
    children?: React.ReactNode;
}

export default function CircleContainer({ color, radius, children }: CircleContainerProps) {
    return (
        <View style={[appStyles.circle, {
            backgroundColor: color ?? 'black',
            width: radius,
            height: radius,
            borderRadius: radius / 2,
            alignItems: 'center',
            justifyContent: 'center'
        }]}>
            {children}
        </View>
    )
}
