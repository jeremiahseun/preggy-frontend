import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link, useRouter } from 'expo-router';
import { StyleSheet, Button, View } from 'react-native';
import { Camera, CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useEffect } from 'react';
import Column from '@/components/Column';
import { GapColumn } from '@/components/Gap';
import CircleContainer from '@/components/CircleContainer';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { TextButton } from '@/components/Buttons';
import appStyles from '@/constants/Styles';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';

export default function PhotoCheckScreen() {
    const [permission, requestPermission] = useCameraPermissions();
    const color = useThemeColor({ light: 'black', dark: 'white' }, 'text');
    const router = useRouter();

    useEffect(() => {
        if (permission && !permission.granted) {
            requestPermission();
        }
    }, [permission]);

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <ThemedView style={styles.container}>
                <ThemedText style={{ textAlign: 'center' }}>We need your permission to show the camera</ThemedText>
                <Button onPress={requestPermission} title="grant permission" />
            </ThemedView>
        );
    }

    return (
        <ThemedView style={styles.container}>
            <CameraView style={styles.camera} facing='back'>
            </CameraView>
            <GapColumn space={20} />
            <Column style={{ alignItems: 'center' }}>
                <ThemedText type="subTitle">Point camera at food</ThemedText>
                <ThemedText>Make sure the food is well lit and clearly visible</ThemedText>
            </Column>
            <GapColumn space={20} />
            <CircleContainer radius={70} color={Colors.primary} onPress={() => router.push('/(tabs)/home/analyzing-photo')}>
                <IconSymbol name="camera" size={30} color='white' />
            </CircleContainer>
            <GapColumn space={20} />
            <ThemedText>OR</ThemedText>
            <GapColumn space={20} />
            <TextButton style={{
                backgroundColor: '#F3F4F6FF',
                width: 'auto',
                paddingVertical: 15,
                paddingHorizontal: 70,
                borderRadius: 10
            }} title="Show from Gallery" navigateTo='/(tabs)/home/analyzing-photo' />
        </ThemedView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    camera: {
        width: '100%',
        height: 400,
        borderRadius: 16,
    },
});
