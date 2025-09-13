import { Colors } from "@/constants/Colors";
import { useState } from "react";
import { ActivityIndicator, View, Image, StyleSheet } from "react-native";

type ImageViewProps = {
    uri: string;
    height?: number;
    width?: number;
    borderRadius?: number;
}

export default function ImageView({ uri, height, width, borderRadius } : ImageViewProps) {
    const [isLoading, setIsLoading] = useState(false);
    return (
        <View style={[styles.imageContainer, height ? { height } : undefined, width ? { width } : undefined, borderRadius ? { borderRadius } : undefined]}>
            <Image
                resizeMode='cover'
                source={{ uri: uri }}
                style={[styles.image, height ? { height } : undefined, width ? { width } : undefined, borderRadius ? { borderRadius } : undefined]}
                onLoadStart={() => setIsLoading(true)}
                onLoadEnd={() => setIsLoading(false)}
            />
            {isLoading && (
                <ActivityIndicator
                    style={styles.activityIndicator}
                    size="large"
                    color={Colors.primary}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        width: '100%',
        height: 300,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 16,
    },
    activityIndicator: {
        position: 'absolute',
    },
});
