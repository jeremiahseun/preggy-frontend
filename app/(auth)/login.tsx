import AuthInput from '@/components/AuthInput';
import { AuthButton, TextButton } from '@/components/Buttons';
import { GapColumn } from '@/components/Gap';
import { ThemedText } from '@/components/ThemedText';
import { ThemedScrollView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import appStyles from '@/constants/Styles';
import { useState } from 'react';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function LoginScreen() {
    const insets = useSafeAreaInsets();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setisLoading] = useState(false);
    return (
        <ThemedScrollView style={[appStyles.container, {
            paddingTop: insets.top + 30, paddingBottom: insets.bottom,
        }]}>
            <ThemedText type="title">Welcome Back</ThemedText>
            <GapColumn space={50} />
            <AuthInput
                label="Email Address"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail} secureTextEntry={false} />
            <GapColumn space={10} />
            <AuthInput
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TextButton style={{
                alignSelf: 'flex-end'
            }} title="Forgot Password" textColor={Colors.primary} navigateTo="/(auth)/forgot-password" />
            <AuthButton title="Sign In" navigateTo={"/(tabs)/home"} />
            <GapColumn space={30} />
            <TextButton style={{
                alignSelf: 'center'
            }} title="Create New Account" textColor={Colors.primary} navigateTo="/(auth)/register" />
        </ThemedScrollView>
    );
}
