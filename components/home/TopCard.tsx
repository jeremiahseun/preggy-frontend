import { StyleSheet, useColorScheme, Image, View } from "react-native"
import { ThemedText } from "../ThemedText";
import Row from "../Row";
import { GapColumn } from "../Gap";
import Column from "../Column";
import React, { useEffect } from "react";
import { ShimmerProvider, Shimmer } from 'react-native-fast-shimmer';
import { useProfileStore } from "@/providers/profile_store";
import { ThemedView } from "../ThemedView";
import { Profile } from "@/src/interfaces/profile";
import { getPregnancyProgress, getReadableDate, getTrimesterStage } from "@/src/utils/helpers";

export default function TopCard() {
    const isDarkMode = useColorScheme() === 'dark';
    const profile = useProfileStore((state) => state.profile);
    const isLoading = useProfileStore((state) => state.isLoading);
    const fetchProfile = useProfileStore((state) => state.fetchProfile);


    useEffect(() => {
        // Fetch profile when component mounts
        if (profile === null) {
            fetchProfile();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const shimmerStyle = React.useMemo(() => ({
        height: 200,
        borderRadius: 20,
        marginHorizontal: 16,
        marginTop: 16,
        backgroundColor: isDarkMode ? '#171a1f' : '#F8F9FE',
    }), [isDarkMode]);

    return (
        <ShimmerProvider duration={1000}>
            {isLoading ? (
                <Shimmer style={shimmerStyle}></Shimmer>
            ) : (
                profile ? <SectionCard profile={profile} /> : <TryAgainCard />
            )}
        </ShimmerProvider>
    )
}

function TryAgainCard() {
    return (
        <ThemedView>
            <GapColumn space={24} />
            <View style={{
                borderRadius: 20,
                padding: 20,
                borderWidth: 1,
                borderColor: '#E8EAED',
                backgroundColor: '#F8F9FE',
                marginHorizontal: 16,
                marginTop: 16,
            }}>
                <ThemedText type="subtitle">Unable to load profile. Please try again.</ThemedText>
            </View>
        </ThemedView>
    )
}


function SectionCard({ profile }: { profile: Profile }) {
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <ThemedView>
            <GapColumn space={24} />
            <View style={[styles.heroCard, {
                backgroundColor: isDarkMode ? '#171a1f' : '#F8F9FE',
            }]}>
                <Row style={{ alignItems: 'flex-start' }}>
                    <Column style={{ flex: 1 }}>
                        <ThemedText type="subtitle">Hello {profile.name?.split(" ")[0]}! 👋</ThemedText>
                        <GapColumn space={8} />
                        <View style={styles.pregnancyBadge}>
                            <ThemedText style={styles.badgeText}>{profile?.current_week == null ? "No week" : `Week ${profile?.current_week}`} • {profile?.trimester_stage == null ? "No Trimester logged" : `${getTrimesterStage(profile?.trimester_stage)}`}</ThemedText>
                        </View>
                        <GapColumn space={12} />
                        <ThemedText style={styles.dueText}>Due Date: {profile?.due_date === null ? "No due date" : getReadableDate(profile?.due_date)}</ThemedText>
                    </Column>
                    <Image
                        style={styles.profileImage}
                        source={{ uri: "https://cdn.pixabay.com/photo/2020/05/26/15/42/eagle-5223559_960_720.jpg" }}
                    />
                </Row>

                {/* Progress Bar */}
                <GapColumn space={20} />
                <View style={styles.progressContainer}>
                    <Row style={{ justifyContent: 'space-between', marginBottom: 8 }}>
                        <ThemedText style={styles.progressLabel}>Pregnancy Progress</ThemedText>
                        <ThemedText style={[styles.progressPercentage, isDarkMode && {
                            color: 'white'
                        }]}>{profile?.current_week === null ? "No week" : getPregnancyProgress(profile?.current_week)}</ThemedText>
                    </Row>
                    <View style={styles.progressBar}>
                        <View style={[styles.progressFill, { width: profile?.current_week === null ? 0 : getPregnancyProgress(profile?.current_week) }]} />
                    </View>
                </View>
            </View>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    heroCard: {
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: '#E8EAED',
    },
    pregnancyBadge: {
        backgroundColor: '#294988',
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20,
        alignSelf: 'flex-start',
    },
    badgeText: {
        color: '#FFFFFF',
        fontSize: 13,
        fontWeight: '600',
    },
    dueText: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
    profileImage: {
        width: 56,
        height: 56,
        borderRadius: 28,
        borderWidth: 3,
        borderColor: '#FFFFFF',
    },
    progressContainer: {
        marginTop: 4,
    },
    progressLabel: {
        fontSize: 13,
        color: '#666',
        fontWeight: '500',
    },
    progressPercentage: {
        fontSize: 13,
        color: '#294988',
        fontWeight: '700',
    },
    progressBar: {
        height: 8,
        backgroundColor: '#E8EAED',
        borderRadius: 10,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#4CAF50',
        borderRadius: 10,
    },
})
