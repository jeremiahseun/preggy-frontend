import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';
import { StyleSheet, Button, View } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useEffect, useRef } from 'react';
import Column from '@/components/Column';
import { GapColumn } from '@/components/Gap';
import CircleContainer from '@/components/CircleContainer';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { TextButton } from '@/components/Buttons';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import { usePhotoCheckStore } from '@/providers/photo_check_store';

export default function PhotoCheckScreen() {
    const [permission, requestPermission] = useCameraPermissions();
    const color = useThemeColor({ light: 'black', dark: 'white' }, 'text');
    const router = useRouter();
    const cameraRef = useRef<CameraView>(null);
    const { confirmFoodPhoto } = usePhotoCheckStore();

    useEffect(() => {
        if (permission && !permission.granted) {
            requestPermission();
        }
    }, [permission]);

    const handleConfirmPhoto = async (image: { uri: string; type: string; name: string }) => {
        router.push('/(tabs)/home/analyzing-photo');
        await confirmFoodPhoto(image);
    };

    const takePicture = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            if (photo) {
                handleConfirmPhoto({ uri: photo.uri, type: 'image/jpeg', name: 'photo.jpg' });
            }
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const asset = result.assets[0];
            handleConfirmPhoto({ uri: asset.uri, type: asset.type || 'image/jpeg', name: asset.fileName || 'photo.jpg' });
        }
    };

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
            <CameraView style={styles.camera} facing='back' ref={cameraRef}>
            </CameraView>
            <GapColumn space={20} />
            <Column style={{ alignItems: 'center' }}>
                <ThemedText type="subTitle">Point camera at food</ThemedText>
                <ThemedText>Make sure the food is well lit and clearly visible</ThemedText>
            </Column>
            <GapColumn space={20} />
            <CircleContainer radius={70} color={Colors.primary} onPress={takePicture}>
                <IconSymbol name="camera" size={30} color='white' />
            </CircleContainer>
            <GapColumn space={20} />
            <ThemedText>OR</ThemedText>
            <GapColumn space={20} />
            <TextButton
            navigateTo={'/'}
                style={{
                    backgroundColor: '#F3F4F6FF',
                    width: 'auto',
                    paddingVertical: 15,
                    paddingHorizontal: 70,
                    borderRadius: 10
                }}
                title="Show from Gallery"
                onPress={pickImage}
            />
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
