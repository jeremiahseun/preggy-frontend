import { StyleSheet } from 'react-native';

const appStyles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 16,
        padding: 24,
    },
    column: {
        flexDirection: 'column'
    },
    row: {
        flexDirection: 'row'
    },
    circle: {
        width: 48,
        height: 48,
        borderRadius: 50, // or 999
        backgroundColor: 'grey',
    },
    screen: {
        flex: 1,
        padding: 24,
    },
    authContainer: {
        flex: 1,
        padding: 24,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
    },
    scrollContainer: {
        padding: 24,
        backgroundColor: '#FFFFFF',
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1E293B',
        textAlign: 'center',
        marginBottom: 40,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        color: '#475569',
        marginBottom: 8,
        fontWeight: '500',
    },
    input: {
        backgroundColor: '#F8FAFC',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 8,
        padding: 16,
        fontSize: 16,
        color: '#1E293B',
        width: '100%',
    },
    button: {
        backgroundColor: '#0F172A',
        padding: 18,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    forgotPassword: {
        textAlign: 'right',
        color: '#0F172A',
        fontWeight: '600',
        marginBottom: 20,
    },
    switchAuthText: {
        textAlign: 'center',
        marginTop: 24,
        color: '#475569',
        fontSize: 16,
    },
    infoText: {
        fontSize: 16,
        color: '#475569',
        textAlign: 'center',
        marginBottom: 30,
        lineHeight: 24,
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        padding: 10,
    },
    backButtonText: {
        fontSize: 24,
        color: '#1E293B',
    },
    // SignUp Screen Specific Styles
    signupHeader: {
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 12,
    },
    appName: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#1E293B',
    },
    tagline: {
        fontSize: 16,
        color: '#475569',
        textAlign: 'center',
        marginTop: 8,
    },
    signupFormContainer: {
        backgroundColor: '#F8FAFC',
        borderRadius: 12,
        padding: 20,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        marginBottom: 20,
    },
    createAccountTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#1E293B',
    },
    createAccountSubtitle: {
        fontSize: 14,
        color: '#475569',
        textAlign: 'center',
        marginTop: 4,
        marginBottom: 24,
    },
    passwordHint: {
        fontSize: 12,
        color: '#64748B',
        marginTop: -12,
        marginBottom: 16,
        paddingLeft: 4,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#0F172A',
        marginRight: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    checkboxChecked: {
        backgroundColor: '#0F172A',
    },
    checkmark: {
        color: 'white',
        fontSize: 12,
    },
    checkboxLabel: {
        fontSize: 14,
        color: '#334155',
        flex: 1, // To wrap text
    },
    trustedContainer: {
        backgroundColor: '#E0F2FE',
        borderRadius: 8,
        padding: 16,
        marginTop: 20,
        alignItems: 'center',
    },
    trustedTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#0C4A6E',
        marginBottom: 16,
    },
    trustedItemsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    trustedItem: {
        alignItems: 'center',
        maxWidth: 90,
    },
    trustedIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    trustedIcon: {
        fontSize: 18,
    },
    trustedText: {
        fontSize: 12,
        color: '#0C4A6E',
        textAlign: 'center',
    },
    createAccountButton: {
        backgroundColor: '#A8B2C3', // A muted color as in the screenshot
        marginTop: 0,
    },
    createAccountButtonText: {
        color: '#1E293B',
    },
    signInLink: {
        color: '#0F172A',
        fontWeight: 'bold'
    }
});

export default appStyles;
