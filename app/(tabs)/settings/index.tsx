import BoxContainer from '@/components/BoxContainer';
import Column from '@/components/Column';
import { GapColumn, GapRow } from '@/components/Gap';
import Row from '@/components/Row';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    ScrollView,
    Image,
    View,
    StyleSheet,
    TouchableOpacity,
    Switch,
    Alert
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Mock profile data - replace with actual data from your state management
const mockProfile = {
    id: '1',
    name: 'Bola',
    country: 'Nigeria',
    region: 'Lagos',
    trimester_stage: 2,
    current_week: 24,
    due_date: '2026-03-15',
    everyday_meals: 'all' as const,
    foods_to_avoid: ['Peanuts', 'Raw Eggs'],
    anything_else: 'Mild gestational diabetes',
    created_at: '2025-09-01',
};

export default function SettingsScreen() {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [dailyTipsEnabled, setDailyTipsEnabled] = useState(true);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getTrimesterName = (stage: number | null) => {
        switch (stage) {
            case 1: return '1st Trimester';
            case 2: return '2nd Trimester';
            case 3: return '3rd Trimester';
            default: return 'Not specified';
        }
    };

    const getMealPlanText = (mealPlan: string | null) => {
        switch (mealPlan) {
            case 'all': return 'All Foods';
            case 'pescatarian': return 'Pescatarian';
            case 'vegetarian': return 'Vegetarian';
            default: return 'Not specified';
        }
    };

    const handleLogout = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Logout', style: 'destructive', onPress: () => {
                        // Handle logout logic here
                        console.log('Logging out...');
                    }
                }
            ]
        );
    };

    const SettingItem = ({
        icon,
        title,
        value,
        onPress,
        showArrow = true,
        color = '#294988'
    }: {
        icon: IconProp;
        title: string;
        value?: string;
        onPress?: () => void;
        showArrow?: boolean;
        color?: string;
    }) => (
        <TouchableOpacity onPress={onPress} disabled={!onPress}>
            <BoxContainer style={[styles.settingItem, {
                height: 'auto'
            }]}>
                <Row style={{ alignItems: 'center', flex: 1 }}>
                    <View style={[styles.settingIcon, { backgroundColor: color + '15' }]}>
                        <FontAwesomeIcon icon={icon} size={18} color={color} />
                    </View>
                    <GapRow space={14} />
                    <Column style={{ flex: 1 }}>
                        <ThemedText style={styles.settingTitle}>{title}</ThemedText>
                        {value && (
                            <ThemedText style={styles.settingValue}>{value}</ThemedText>
                        )}
                    </Column>
                    {showArrow && (
                        <FontAwesomeIcon icon={'chevron-right'} size={16} color="#CCCCCC" />
                    )}
                </Row>
            </BoxContainer>
        </TouchableOpacity>
    );

    const ToggleSettingItem = ({
        icon,
        title,
        value,
        onValueChange,
        color = '#294988'
    }: {
        icon: IconProp;
        title: string;
        value: boolean;
        onValueChange: (value: boolean) => void;
        color?: string;
    }) => (
        <BoxContainer style={[styles.settingItem, {
            height: 'auto'
        }]}>
            <Row style={{ alignItems: 'center', flex: 1 }}>
                <View style={[styles.settingIcon, { backgroundColor: color + '15' }]}>
                    <FontAwesomeIcon icon={icon} size={18} color={color} />
                </View>
                <GapRow space={14} />
                <ThemedText style={[styles.settingTitle, { flex: 1 }]}>{title}</ThemedText>
                <Switch
                    value={value}
                    onValueChange={onValueChange}
                    trackColor={{ false: '#E0E0E0', true: '#4CAF50' }}
                    thumbColor={value ? '#FFFFFF' : '#F4F3F4'}
                />
            </Row>
        </BoxContainer>
    );

    return (
        <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <GapColumn space={24} />

                {/* Header */}
                <Row style={{ alignItems: 'center', paddingHorizontal: 20 }}>
                    <ThemedText type="title" style={styles.headerTitle}>Settings</ThemedText>
                </Row>

                <GapColumn space={28} />

                {/* Profile Card */}
                <View style={styles.profileCard}>
                    <Row style={{ alignItems: 'center' }}>
                        <Image
                            style={styles.profileImage}
                            source={{ uri: "https://cdn.pixabay.com/photo/2020/05/26/15/42/eagle-5223559_960_720.jpg" }}
                        />
                        <GapRow space={16} />
                        <Column style={{ flex: 1 }}>
                            <ThemedText type="subtitle" style={styles.profileName}>
                                {mockProfile.name || 'User'}
                            </ThemedText>
                            <GapColumn space={4} />
                            <ThemedText style={styles.profileLocation}>
                                📍 {mockProfile.region}, {mockProfile.country}
                            </ThemedText>
                        </Column>
                        <TouchableOpacity onPress={() => router.push('/settings/edit-profile' as any)}>
                            <View style={styles.editButton}>
                                <FontAwesomeIcon icon={'pen'} size={14} color="#294988" />
                            </View>
                        </TouchableOpacity>
                    </Row>

                    <GapColumn space={20} />

                    {/* Stats Row */}
                    <Row style={styles.statsRow}>
                        <View style={styles.statItem}>
                            <ThemedText style={styles.statValue}>
                                Week {mockProfile.current_week}
                            </ThemedText>
                            <ThemedText style={styles.statLabel}>Current</ThemedText>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <ThemedText style={styles.statValue}>
                                {getTrimesterName(mockProfile.trimester_stage)}
                            </ThemedText>
                            <ThemedText style={styles.statLabel}>Stage</ThemedText>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <ThemedText style={styles.statValue}>
                                {mockProfile.due_date ?
                                    new Date(mockProfile.due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                                    : 'N/A'
                                }
                            </ThemedText>
                            <ThemedText style={styles.statLabel}>Due Date</ThemedText>
                        </View>
                    </Row>
                </View>

                <GapColumn space={24} />

                {/* Pregnancy Information Section */}
                <View style={styles.section}>
                    <ThemedText style={styles.sectionTitle}>Pregnancy Information</ThemedText>
                    <GapColumn space={12} />

                    <SettingItem
                        icon="calendar-check"
                        title="Due Date"
                        value={mockProfile.due_date ? formatDate(mockProfile.due_date) : 'Not set'}
                        onPress={() => { }}
                        color="#E91E63"
                    />
                    <GapColumn space={10} />

                    <SettingItem
                        icon="chart-line"
                        title="Current Week"
                        value={`Week ${mockProfile.current_week} • ${getTrimesterName(mockProfile.trimester_stage)}`}
                        onPress={() => { }}
                        color="#2196F3"
                    />
                </View>

                <GapColumn space={24} />

                {/* Dietary Preferences Section */}
                <View style={styles.section}>
                    <ThemedText style={styles.sectionTitle}>Dietary Preferences</ThemedText>
                    <GapColumn space={12} />

                    <SettingItem
                        icon="utensils"
                        title="Meal Plan"
                        value={getMealPlanText(mockProfile.everyday_meals)}
                        onPress={() => { }}
                        color="#FF9800"
                    />
                    <GapColumn space={10} />

                    <SettingItem
                        icon="ban"
                        title="Foods to Avoid"
                        value={mockProfile.foods_to_avoid?.length
                            ? `${mockProfile.foods_to_avoid.length} item${mockProfile.foods_to_avoid.length > 1 ? 's' : ''}`
                            : 'None added'
                        }
                        onPress={() => { }}
                        color="#F44336"
                    />
                    <GapColumn space={10} />

                    <SettingItem
                        icon="notes-medical"
                        title="Medical Notes"
                        value={mockProfile.anything_else || 'None added'}
                        onPress={() => { }}
                        color="#9C27B0"
                    />
                </View>

                <GapColumn space={24} />

                {/* Notifications Section */}
                <View style={styles.section}>
                    <ThemedText style={styles.sectionTitle}>Notifications</ThemedText>
                    <GapColumn space={12} />

                    <ToggleSettingItem
                        icon="bell"
                        title="Push Notifications"
                        value={notificationsEnabled}
                        onValueChange={setNotificationsEnabled}
                        color="#4CAF50"
                    />

                    <GapColumn space={10} />

                    <ToggleSettingItem
                        icon="lightbulb"
                        title="Daily Tips"
                        value={dailyTipsEnabled}
                        onValueChange={setDailyTipsEnabled}
                        color="#FFC107"
                    />
                </View>

                <GapColumn space={24} />

                {/* App Settings Section */}
                <View style={styles.section}>
                    <ThemedText style={styles.sectionTitle}>App Settings</ThemedText>
                    <GapColumn space={12} />

                    <SettingItem
                        icon="shield-alt"
                        title="Privacy & Security"
                        onPress={() => { }}
                        color="#3F51B5"
                    />
                    <GapColumn space={10} />

                    <SettingItem
                        icon="file-alt"
                        title="Terms & Conditions"
                        onPress={() => { }}
                        color="#607D8B"
                    />
                    <GapColumn space={10} />

                    <SettingItem
                        icon="question-circle"
                        title="Help & Support"
                        onPress={() => { }}
                        color="#00BCD4"
                    />
                    <GapColumn space={10} />

                    <SettingItem
                        icon="info-circle"
                        title="About"
                        value="Version 1.0.0"
                        onPress={() => { }}
                        color="#9E9E9E"
                    />
                </View>

                <GapColumn space={32} />

                {/* Logout Button */}
                <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                    <Row style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <FontAwesomeIcon icon="sign-out-alt" size={18} color="#F44336" />
                        <GapRow space={10} />
                        <ThemedText style={styles.logoutText}>Logout</ThemedText>
                    </Row>
                </TouchableOpacity>

                <GapColumn space={50} />
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: '700',
    },
    profileCard: {
        backgroundColor: '#F8F9FE',
        marginHorizontal: 20,
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: '#E8EAED',
    },
    profileImage: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 3,
        borderColor: '#FFFFFF',
    },
    profileName: {
        fontSize: 20,
        fontWeight: '700',
    },
    profileLocation: {
        fontSize: 14,
        color: '#666',
    },
    editButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#E8EAED',
    },
    statsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statValue: {
        fontSize: 15,
        fontWeight: '700',
        color: '#294988',
        marginBottom: 4,
        textAlign: 'center',
    },
    statLabel: {
        fontSize: 12,
        color: '#888',
    },
    statDivider: {
        width: 1,
        height: 30,
        backgroundColor: '#E8EAED',
    },
    section: {
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#333',
        marginLeft: 4,
    },
    settingItem: {
        padding: 16,
    },
    settingIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    settingTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#333',
    },
    settingValue: {
        fontSize: 13,
        color: '#888',
        marginTop: 2,
    },
    logoutButton: {
        marginHorizontal: 20,
        backgroundColor: '#FFEBEE',
        borderRadius: 16,
        padding: 18,
        borderWidth: 1,
        borderColor: '#FFCDD2',
    },
    logoutText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#F44336',
    },
});
