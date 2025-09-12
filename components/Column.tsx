
import appStyles from "@/constants/Styles";
import { type ViewProps, View } from "react-native";

export default function Column({ children, style }: ViewProps) {
    return <View style={[appStyles.column, style]}>
        {children}
    </View>
}
