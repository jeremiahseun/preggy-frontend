import { TouchableOpacity, View, Image, StyleSheet, useColorScheme } from "react-native";
import Row from "../Row";
import { ThemedText } from "../ThemedText";
import { GapColumn, GapRow } from "../Gap";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Column from "../Column";
import React from "react";
import { ShimmerProvider, Shimmer } from "react-native-fast-shimmer";
import { useRouter } from "expo-router";
import { getTrimesterName } from "./helpers";
import { Profile } from "@/src/interfaces/profile";

export default function ProfileCard({ profile, isLoading, isDarkMode }: {
    profile: Profile | null,
    isLoading: boolean
    isDarkMode: boolean
}) {

    return (
        <ShimmerProvider duration={1000}>
            {isLoading ? (
                <Shimmer style={{
                    height: 200,
                    borderRadius: 20,
                    marginHorizontal: 16,
                    marginTop: 16,
                    backgroundColor: isDarkMode ? '#171a1f' : '#F8F9FE',
                }}></Shimmer>
            ) : (
                profile ? <SectionCard profile={profile} /> : <View />
            )}
        </ShimmerProvider>

    )
}

function SectionCard({ profile }: { profile: any }) {
    const isDarkMode = useColorScheme() === 'dark';
    const router = useRouter()

    const dynamicStyles = StyleSheet.create({
        blueWhiteText: {
            color: isDarkMode ? '#FFFFFF' : '294988'
        },

    });


    return (
        <View style={[styles.profileCard, {
            backgroundColor: isDarkMode ? '#171a1f' : '#F8F9FE'
        }]}>
            <Row style={{ alignItems: 'center' }}>
                <Image
                    style={styles.profileImage}
                    source={{ uri: "https://cdn.pixabay.com/photo/2020/05/26/15/42/eagle-5223559_960_720.jpg" }}
                />
                <GapRow space={16} />
                <Column style={{ flex: 1 }}>
                    <ThemedText type="subtitle" style={styles.profileName}>
                        {profile.name || 'User'}
                    </ThemedText>
                    <GapColumn space={4} />
                    <ThemedText style={styles.profileLocation}>
                        📍 {profile.region}, {profile.country}
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
            <Row style={[styles.statsRow, {
                backgroundColor: isDarkMode ? '#171a1f' : 'FFFFFF',
                width: '100%',
            }]}>
                <View style={styles.statItem}>
                    <ThemedText style={[styles.statValue, dynamicStyles.blueWhiteText]}>
                        Week {profile.current_week}
                    </ThemedText>
                    <ThemedText style={styles.statLabel}>Current</ThemedText>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                    <ThemedText style={[styles.statValue, dynamicStyles.blueWhiteText]}>
                        {getTrimesterName(profile.trimester_stage)}
                    </ThemedText>
                    <ThemedText style={styles.statLabel}>Stage</ThemedText>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                    <ThemedText style={[styles.statValue, dynamicStyles.blueWhiteText]}>
                        {profile.due_date ?
                            new Date(profile.due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                            : 'N/A'
                        }
                    </ThemedText>
                    <ThemedText style={styles.statLabel}>Due Date</ThemedText>
                </View>
            </Row>
        </View>
    )
}


const styles = StyleSheet.create({
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
        alignItems: 'center',
        borderRadius: 12,
        paddingVertical: 16,
        gap: 5
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
        backgroundColor: '#E8EAED', marginHorizontal: 10
    },
})
