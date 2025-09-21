import { AuthButton } from '@/components/Buttons';
import { GapColumn } from '@/components/Gap';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import appStyles from '@/constants/Styles';
import { Image, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Onboarding3Screen() {
    const insets = useSafeAreaInsets();

    return (
        <ThemedView style={[appStyles.screen, styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <Image
                style={styles.image}
                source={require('../../assets/images/preggy-logo.png')} // Replace with a relevant image
            />
            <ThemedText type="title" style={styles.title}>AI-Powered Assistance</ThemedText>
            <ThemedText style={styles.subtitle}>Ask questions and get instant, evidence-based answers from our AI assistant.</ThemedText>
            <GapColumn space={30} />
            <AuthButton title="Get Started" navigateTo="/(auth)/register" />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 40,
    },
    title: {
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 16,
    },
});
