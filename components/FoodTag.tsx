import { View } from "react-native";
import { ThemedText } from "./ThemedText";

type FoodTagProps = {
    type: 'safe' | 'limit' | 'avoid';
}


export default function FoodTag({ type }: FoodTagProps) {
    return <View style={{
        width: 70,
        height: 40,
        backgroundColor: type === 'limit' ? '#F4A462FF' : type === 'safe' ? '#50E2C3FF' : '#F5635BFF',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center'
    }}>
        <ThemedText style={{
            color: type === 'avoid' ? 'white' : 'black',
            fontWeight: 'bold',
        }} type="defaultSemiBold">
            {type === 'limit' ? 'LIMIT' : type === 'safe' ? 'SAFE' : 'AVOID'}
        </ThemedText>
    </View>
}
