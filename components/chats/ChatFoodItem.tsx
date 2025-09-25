import { FoodItem } from "@/src/interfaces/Conversations";
import { Ionicons } from "@expo/vector-icons";
import { View, TouchableOpacity, Text, useColorScheme, StyleSheet } from "react-native";
import FoodTag from "../FoodTag";

export default function ChatRenderFoodItem({foodItem} : {foodItem: FoodItem}) {
    const isDark = useColorScheme() === 'dark';
    return (
        <View style={[styles.foodCard, { backgroundColor: isDark ? '#2A2A2A' : '#F8F9FA' }]}>
            <View style={styles.foodHeader}>
                <FoodTag type={foodItem.status} />
                <Text style={[styles.foodName, { color: isDark ? '#FFFFFF' : '#1F2937' }]}>
                    {foodItem.name}
                </Text>
                {foodItem.status === 'limit' && (
                    <TouchableOpacity style={styles.guidelinesButton}>
                        <Text style={styles.guidelinesText}>Guidelines</Text>
                    </TouchableOpacity>
                )}
            </View>

            <Text style={[styles.foodDescription, { color: isDark ? '#D1D5DB' : '#6B7280' }]}>
                {foodItem.description}
            </Text>

            {foodItem.lastVerified && (
                <View style={styles.verifiedContainer}>
                    <Ionicons name="checkmark-circle-outline" size={16} color="#10B981" />
                    <Text style={[styles.verifiedText, { color: isDark ? '#9CA3AF' : '#6B7280' }]}>
                        Last verified: {foodItem.lastVerified}
                    </Text>
                </View>
            )}

            {foodItem.alternatives && (
                <View style={styles.alternativesContainer}>
                    <Text style={[styles.alternativesTitle, { color: isDark ? '#FFFFFF' : '#1F2937' }]}>
                        However, you can safely enjoy these delicious alternatives:
                    </Text>
                    <View style={[styles.alternativesList, { backgroundColor: isDark ? '#1F2937' : '#F0FDF4' }]}>
                        {foodItem.alternatives.map((alt: string, index: number) => (
                            <View key={index} style={styles.alternativeItem}>
                                <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                                <Text style={[styles.alternativeText, { color: isDark ? '#D1D5DB' : '#374151' }]}>
                                    {alt}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>
            )}

            {foodItem.guidelines && (
                <View style={styles.guidelinesContainer}>
                    <Text style={[styles.guidelinesTitle, { color: isDark ? '#FFFFFF' : '#1F2937' }]}>
                        Here's how to enjoy it safely:
                    </Text>
                    <View style={styles.guidelinesList}>
                        {foodItem.guidelines.map((guideline: string, index: number) => {
                            const [title, description] = guideline.split(' - ');
                            return (
                                <View
                                    key={index}
                                    style={[
                                        styles.guidelineItem,
                                        { backgroundColor: index === 0 ? (isDark ? '#1F2937' : '#F0FDF4') : (isDark ? '#2D1B0F' : '#FFFBEB') }
                                    ]}
                                >
                                    <Ionicons
                                        name={index === 0 ? "checkmark-circle" : "time-outline"}
                                        size={16}
                                        color={index === 0 ? "#10B981" : "#F59E0B"}
                                    />
                                    <View style={styles.guidelineContent}>
                                        <Text style={[styles.guidelineTitle, { color: isDark ? '#FFFFFF' : '#1F2937' }]}>
                                            {title}
                                        </Text>
                                        <Text style={[styles.guidelineDescription, { color: isDark ? '#D1D5DB' : '#6B7280' }]}>
                                            {description}
                                        </Text>
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                </View>
            )}

            {foodItem.trimester && (
                <View style={[styles.trimesterNote, { backgroundColor: isDark ? '#1E3A8A' : '#EFF6FF' }]}>
                    <Ionicons name="calendar-outline" size={16} color="#3B82F6" />
                    <View style={styles.trimesterContent}>
                        <Text style={[styles.trimesterTitle, { color: isDark ? '#93C5FD' : '#3B82F6' }]}>
                            {foodItem.trimester ? `${foodItem.trimester.trimesterStage} Trimester Note` : "No Trimester Info"}
                        </Text>
                        <Text style={[styles.trimesterText, { color: isDark ? '#DBEAFE' : '#1E40AF' }]}>
                            {foodItem.trimester ? `${foodItem.trimester.trimesterNote}` : "No Trimester Info"}
                        </Text>
                    </View>
                </View>
            )}

            {foodItem.benefits && (
                <View style={styles.benefitsContainer}>
                    <Text style={[styles.benefitsTitle, { color: isDark ? '#FFFFFF' : '#1F2937' }]}>
                        Benefits for pregnancy:
                    </Text>
                    <View style={styles.benefitsList}>
                        {foodItem.benefits.map((benefit: string, index: number) => (
                            <View key={index} style={styles.benefitItem}>
                                <View style={styles.benefitDot} />
                                <Text style={[styles.benefitText, { color: isDark ? '#D1D5DB' : '#374151' }]}>
                                    {benefit}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>
            )}

            {foodItem.sources && (
                <View style={[styles.sourcesContainer, { backgroundColor: isDark ? '#1F2937' : '#FFFFFF' }]}>
                    <View style={styles.sourcesHeader}>
                        <Ionicons name="library-outline" size={16} color="#3B82F6" />
                        <Text style={[styles.sourcesTitle, { color: isDark ? '#FFFFFF' : '#1F2937' }]}>
                            Medical Sources
                        </Text>
                        <TouchableOpacity>
                            <Text style={styles.viewAllText}>View All</Text>
                        </TouchableOpacity>
                    </View>

                    {foodItem.sources.slice(0, 3).map((source: any, index: number) => (
                        <View key={index} style={styles.sourceItem}>
                            <View style={[styles.sourceNumber, { backgroundColor: '#3B82F6' }]}>
                                <Text style={styles.sourceNumberText}>{index + 1}</Text>
                            </View>
                            <View style={styles.sourceContent}>
                                <Text style={[styles.sourceName, { color: isDark ? '#FFFFFF' : '#1F2937' }]}>
                                    {source.name}
                                </Text>
                                <Text style={[styles.sourceDescription, { color: isDark ? '#D1D5DB' : '#6B7280' }]}>
                                    {source.description}
                                </Text>
                                <View style={styles.sourceFooter}>
                                    <Text style={[styles.sourceUpdated, { color: isDark ? '#9CA3AF' : '#9CA3AF' }]}>
                                        Updated: {source.updated}
                                    </Text>
                                    {source.verified && (
                                        <View style={styles.verifiedBadge}>
                                            <Ionicons name="checkmark" size={12} color="#10B981" />
                                            <Text style={styles.verifiedBadgeText}>Verified</Text>
                                        </View>
                                    )}
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
            )}
        </View>
    )
}


const styles = StyleSheet.create({
    foodCard: {
        borderRadius: 12,
        padding: 16,
        marginTop: 12,
    },
    foodHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        gap: 10,
        flexWrap: 'wrap',
    },
    foodName: {
        fontSize: 16,
        fontWeight: '600',
        flex: 1,
    },
    guidelinesButton: {
        marginLeft: 'auto',
    },
    guidelinesText: {
        color: '#3B82F6',
        fontSize: 12,
        fontWeight: '500',
    },
    foodDescription: {
        fontSize: 14,
        marginBottom: 12,
    },
    verifiedContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    verifiedText: {
        fontSize: 12,
        marginLeft: 6,
    },
    alternativesContainer: {
        marginTop: 16,
    },
    alternativesTitle: {
        fontSize: 14,
        marginBottom: 12,
    },
    alternativesList: {
        borderRadius: 8,
        padding: 12,
    },
    alternativeItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    alternativeText: {
        fontSize: 14,
        marginLeft: 8,
        flex: 1,
    },
    guidelinesContainer: {
        marginTop: 16,
    },
    guidelinesTitle: {
        fontSize: 14,
        marginBottom: 12,
    },
    guidelinesList: {
        gap: 8,
    },
    guidelineItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 12,
        borderRadius: 8,
    },
    guidelineContent: {
        flex: 1,
        marginLeft: 8,
    },
    guidelineTitle: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 2,
    },
    guidelineDescription: {
        fontSize: 13,
    },
    trimesterNote: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 12,
        borderRadius: 8,
        marginTop: 16,
    },
    trimesterContent: {
        flex: 1,
        marginLeft: 8,
    },
    trimesterTitle: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 2,
    },
    trimesterText: {
        fontSize: 13,
    },
    benefitsContainer: {
        marginTop: 16,
    },
    benefitsTitle: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
    },
    benefitsList: {
        gap: 4,
    },
    benefitItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    benefitDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#10B981',
        marginTop: 6,
        marginRight: 8,
    },
    benefitText: {
        fontSize: 13,
        flex: 1,
    },
    sourcesContainer: {
        borderRadius: 8,
        padding: 16,
        marginTop: 16,
    },
    sourcesHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    sourcesTitle: {
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 6,
        flex: 1,
    },
    viewAllText: {
        color: '#3B82F6',
        fontSize: 14,
    },
    sourceItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    sourceNumber: {
        width: 24,
        height: 24,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    sourceNumberText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '600',
    },
    sourceContent: {
        flex: 1,
    },
    sourceName: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 2,
    },
    sourceDescription: {
        fontSize: 13,
        marginBottom: 4,
    },
    sourceFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    sourceUpdated: {
        fontSize: 11,
    },
    verifiedBadge: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    verifiedBadgeText: {
        color: '#10B981',
        fontSize: 11,
        marginLeft: 4,
        fontWeight: '600',
    },
})
