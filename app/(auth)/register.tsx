import AuthInput from '@/components/AuthInput';
import { AuthButton, TextButton } from '@/components/Buttons';
import { GapColumn } from '@/components/Gap';
import { ThemedText } from '@/components/ThemedText';
import { ThemedScrollView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import appStyles from '@/constants/Styles';
import { useState } from 'react';
import { Image } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function RegisterScreen() {
    const insets = useSafeAreaInsets();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setisLoading] = useState(false);

    return (
        <ThemedScrollView style={[appStyles.screen, {
            paddingTop: insets.top + 10, paddingBottom: insets.bottom,
        }]}>
            <Image style={{
                alignSelf: 'center',
                height: 100, width: 100
            }} height={100} width={100} source={require('../../assets/images/preggy-no-bg.png')} />
            <ThemedText style={{
                alignSelf: 'center'
            }} type="title">Preggy</ThemedText>
            <ThemedText style={{
                alignSelf: 'center',
                alignContent: 'center',
                textAlign: 'center'
            }} >Your trusted companion for pregnancy nutrition safety</ThemedText>
            <GapColumn space={50} />
            <ThemedText style={{
                alignSelf: 'center'
            }} type="subtitle">Create Your Account</ThemedText>
            <ThemedText style={{
                alignSelf: 'center',
                alignContent: 'center',
                textAlign: 'center'
            }} >Join thousands of expecting mothers who trust SafeBump</ThemedText>
            <GapColumn space={50} />
            <AuthInput
                label="Full Name"
                placeholder="Enter your full name"
                value={email}
                onChangeText={setEmail} secureTextEntry={false} />
            <GapColumn space={10} />
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
            }} title="Forgot Password" textColor={Colors.primary} navigateTo="/forgot-password" />
            <AuthButton title="Register" navigateTo={"/RegisterOnboarding"} />
            <GapColumn space={30} />
            <TextButton style={{
                alignSelf: 'center'
            }} title="Already a User? Login" textColor={Colors.primary} navigateTo="/login" />
        </ThemedScrollView>
    );
}
