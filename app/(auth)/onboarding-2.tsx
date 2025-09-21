import { AuthButton, TextButton } from '@/components/Buttons';
import { GapColumn } from '@/components/Gap';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import appStyles from '@/constants/Styles';
import { Image, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Onboarding2Screen() {
    const insets = useSafeAreaInsets();

    return (
        <ThemedView style={[appStyles.screen, styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <Image
                style={styles.image}
                source={require('../../assets/images/preggy-logo.png')} // Replace with a relevant image
            />
            <ThemedText type="title" style={styles.title}>Personalized Meal Plans</ThemedText>
            <ThemedText style={styles.subtitle}>Get weekly, stage-based diet recommendations tailored to your needs.</ThemedText>
            <GapColumn space={30} />
            <AuthButton title="Continue" navigateTo="/(auth)/onboarding-3" />
            <GapColumn space={10} />
            <TextButton title="Skip" navigateTo="/(auth)/register" textColor={Colors.primary} />
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
