import BottomSheet from '@/components/BottomSheet';
import BoxContainer from '@/components/BoxContainer';
import Column from '@/components/Column';
import { GapColumn, GapRow } from '@/components/Gap';
import Row from '@/components/Row';
import { getTrimesterName, getMealPlanText } from '@/components/settings/helpers';
import ProfileCard from '@/components/settings/profile_card';
import { SettingItem, ToggleSettingItem } from '@/components/settings/SettingsItem';
import { DueDateContent, CurrentWeekContent, FoodsToAvoidContent, MedicalNotesContent } from '@/components/settings/SettingsItemComponents';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useProfileStore } from '@/providers/profile_store';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ScrollView,
    Image,
    View,
    StyleSheet,
    TouchableOpacity,
    Switch,
    Alert,
    useColorScheme,
    Dimensions
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


export default function SettingsScreen() {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const isDarkMode = useColorScheme() === 'dark';
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [dailyTipsEnabled, setDailyTipsEnabled] = useState(true);


    const { height: SCREEN_HEIGHT } = Dimensions.get('window');
    const bottomSheetHeight = SCREEN_HEIGHT * 0.5;

    const [activeSheet, setActiveSheet] = useState<string | null>(null);
    const isLoading = useProfileStore((state) => state.isLoading);

    const profile = useProfileStore((state) => state.profile);


    const theme = {
        bg: isDarkMode ? '#000000' : '#F8F9FA',
        card: isDarkMode ? '#1A1A1A' : '#FFFFFF',
        text: isDarkMode ? '#FFFFFF' : '#000000',
        textSec: isDarkMode ? '#A0A0A0' : '#666666',
        border: isDarkMode ? '#2A2A2A' : '#E5E5E5',
        primary: '#003A7C',
        secondary: '#FF9AAC',
        primaryLight: isDarkMode ? '#1A4A8C' : '#E6EFF8',
        secondaryLight: isDarkMode ? '#4D2A33' : '#FFE6EB',
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
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

    const dynamicStyles = StyleSheet.create({
        blueWhiteText: {
            color: isDarkMode ? '#FFFFFF' : '294988'
        },
        logoutButton: {
            marginHorizontal: 20,
            backgroundColor: isDarkMode ? '#8B0000' : '#FFEBEE',
            borderRadius: 16,
            padding: 15,
            borderWidth: 1,
            borderColor: '#FFCDD2',
        },
        logoutText: {
            fontSize: 16,
            fontWeight: '700',
            color: isDarkMode ? '#FFFFFF' : '44336',
        },
    })

    return (
        <View
            style={{ flex: 1 }}>
            <ScrollView
                style={styles.container} contentInsetAdjustmentBehavior="automatic" showsVerticalScrollIndicator={false}>

                <GapColumn space={20} />

                {/* Profile Card */}
                <ProfileCard profile={profile} isLoading={isLoading} isDarkMode={isDarkMode} />

                <GapColumn space={24} />

                {/* Pregnancy Information Section */}
                <View style={styles.section}>
                    <ThemedText style={styles.sectionTitle}>Pregnancy Information</ThemedText>
                    <GapColumn space={12} />

                    <SettingItem
                        icon="calendar-check"
                        title="Due Date"
                        value={profile?.due_date ? formatDate(profile.due_date) : 'Not set'}
                        onPress={() => {
                            setActiveSheet('dueDate');
                         }}
                        color="#E91E63"
                    />
                    <GapColumn space={10} />

                    <SettingItem
                        icon="chart-line"
                        title="Current Week"
                        value={profile?.current_week == null ? "No week" : `Week ${profile?.current_week} • ${getTrimesterName(profile?.trimester_stage)}`}
                        onPress={() => {
                            setActiveSheet('currentWeek');
                        }}
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
                        value={getMealPlanText(profile?.everyday_meals ?? null)}
                        onPress={() => {
                            setActiveSheet('mealPlan');
                        }}
                        color="#FF9800"
                    />
                    <GapColumn space={10} />

                    <SettingItem
                        icon="ban"
                        title="Foods to Avoid"
                        value={profile?.foods_to_avoid?.length
                            ? `${profile?.foods_to_avoid.length} item${profile?.foods_to_avoid.length > 1 ? 's' : ''}`
                            : 'None added'
                        }
                        onPress={() => {
                            setActiveSheet('foodsToAvoid');
                        }}
                        color="#F44336"
                    />
                    <GapColumn space={10} />

                    <SettingItem
                        icon="notes-medical"
                        title="Medical Notes"
                        value={profile?.anything_else || 'None added'}
                        onPress={() => {
                            setActiveSheet('medicalNotes');
                         }}
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
                        onPress={() => {
                            console.log("About...")
                         }}
                        color="#9E9E9E"
                    />
                </View>

                <GapColumn space={32} />

                {/* Logout Button */}
                <TouchableOpacity onPress={handleLogout} style={dynamicStyles.logoutButton}>
                    <Row style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <FontAwesomeIcon icon="sign-out-alt" size={18} color="#F44336" />
                        <GapRow space={10} />
                        <ThemedText style={dynamicStyles.logoutText}>Logout</ThemedText>
                    </Row>
                </TouchableOpacity>

                <GapColumn space={50} />
            </ScrollView>

            <BottomSheet
                visible={activeSheet === 'dueDate'}
                onClose={() => setActiveSheet(null)}
                title="Due Date"
                icon="calendar"
                theme={theme}
                bottomSheetHeight={bottomSheetHeight}
            >
                <DueDateContent dueDate={new Date(profile?.due_date ?? '') || new Date()} currentWeek={profile?.current_week || 0} theme={theme} />
            </BottomSheet>

            <BottomSheet
                visible={activeSheet === 'currentWeek'}
                onClose={() => setActiveSheet(null)}
                title="Current Week"
                icon="heart"
                theme={theme}
                bottomSheetHeight={bottomSheetHeight}
            >
                <CurrentWeekContent currentWeek={profile?.current_week || 0} theme={theme} />
            </BottomSheet>

            {/* <BottomSheet
                        visible={activeSheet === 'mealPlan'}
                        onClose={() => setActiveSheet(null)}
                        title="Meal Plan"
                        icon="restaurant"
                        theme={theme}
                        bottomSheetHeight={bottomSheetHeight}
                    >
                        <MealPlanContent mealPlan={mealPlan} theme={theme} />
                    </BottomSheet> */}

            <BottomSheet
                visible={activeSheet === 'foodsToAvoid'}
                onClose={() => setActiveSheet(null)}
                title="Foods to Avoid"
                icon="alert-circle"
                theme={theme}
                bottomSheetHeight={bottomSheetHeight}
            >
                <FoodsToAvoidContent foodsToAvoid={profile?.foods_to_avoid || []} theme={theme} />
            </BottomSheet>

            <BottomSheet
                visible={activeSheet === 'medicalNotes'}
                onClose={() => setActiveSheet(null)}
                title="Medical Notes"
                icon="document-text"
                theme={theme}
                bottomSheetHeight={bottomSheetHeight}
            >
                <MedicalNotesContent medicalNotes={profile?.anything_else || ''} theme={theme} />
            </BottomSheet>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    section: {
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        marginLeft: 4,
    },


});
