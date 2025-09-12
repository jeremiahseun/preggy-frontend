import { Camera } from "expo-camera";


export async function checkCameraPermission(): Promise<boolean> {
    const { status } = await Camera.getCameraPermissionsAsync();
    return status === 'granted';
}
