import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet} from "react-native";

// Due Date Content
export const DueDateContent = ({ dueDate, currentWeek, theme } : {
    dueDate: Date;
    currentWeek: number;
    theme: any;
}) => {
    const today = new Date();
    const totalWeeks = 40;
    const diffTime = dueDate.getTime() - today.getTime();
    const weeksRemaining = Math.ceil(diffTime / (7 * 24 * 60 * 60 * 1000));
    const daysRemaining = Math.ceil(diffTime / (24 * 60 * 60 * 1000));
    const progress = ((totalWeeks - weeksRemaining) / totalWeeks) * 100;

    return (
        <View style={styles.contentContainer}>
            <View style={[styles.dateCard, { backgroundColor: theme.primaryLight }]}>
                <Text style={[styles.dateText, { color: theme.primary }]}>
                    {dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </Text>
                <Text style={[styles.dateLabelText, { color: theme.textSec }]}>
                    Expected Due Date
                </Text>
            </View>

            <View style={styles.infoRows}>
                <View style={styles.infoRow}>
                    <Text style={[styles.infoLabel, { color: theme.textSec }]}>Days Remaining</Text>
                    <Text style={[styles.infoValue, { color: theme.text }]}>{daysRemaining} days</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={[styles.infoLabel, { color: theme.textSec }]}>Weeks Remaining</Text>
                    <Text style={[styles.infoValue, { color: theme.text }]}>{weeksRemaining} weeks</Text>
                </View>
            </View>

            <View style={styles.progressSection}>
                <View style={styles.progressHeader}>
                    <Text style={[styles.progressLabel, { color: theme.textSec }]}>Journey Progress</Text>
                    <Text style={[styles.progressPercent, { color: theme.secondary }]}>
                        {Math.round(progress)}%
                    </Text>
                </View>
                <View style={[styles.progressBar, { backgroundColor: theme.border }]}>
                    <View
                        style={[styles.progressFill, { width: `${progress}%`, backgroundColor: theme.secondary }]}
                    />
                </View>
            </View>

            <View style={[styles.statsContainer, { borderTopColor: theme.border }]}>
                <View style={styles.statItem}>
                    <Text style={[styles.statNumber, { color: theme.text }]}>{currentWeek}</Text>
                    <Text style={[styles.statLabel, { color: theme.textSec }]}>Current Week</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={[styles.statNumber, { color: theme.text }]}>2nd</Text>
                    <Text style={[styles.statLabel, { color: theme.textSec }]}>Trimester</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={[styles.statNumber, { color: theme.text }]}>{weeksRemaining}</Text>
                    <Text style={[styles.statLabel, { color: theme.textSec }]}>Weeks Left</Text>
                </View>
            </View>
        </View>
    );
};

// Current Week Content
export const CurrentWeekContent = ({ currentWeek, theme } : {
    currentWeek: number;
    theme: any;
}) => {
    const trimester = currentWeek <= 13 ? 1 : currentWeek <= 27 ? 2 : 3;
    const weekProgress = (currentWeek / 40) * 100;

    const milestones = [
        'Baby can hear sounds',
        'Lungs developing rapidly',
        'Baby is about 12 inches long',
    ];

    return (
        <View style={styles.contentContainer}>
            <View style={[styles.weekCard, { backgroundColor: theme.primary }]}>
                <Text style={styles.weekNumber}>Week {currentWeek}</Text>
                <Text style={styles.weekTrimester}>Trimester {trimester} • Second Trimester</Text>
            </View>

            <View style={styles.milestonesSection}>
                <View style={styles.milestonesHeader}>
                    <Ionicons name="heart" size={20} color={theme.secondary} />
                    <Text style={[styles.milestonesTitle, { color: theme.text }]}>
                        Baby's Development This Week
                    </Text>
                </View>

                {milestones.map((milestone, idx) => (
                    <View
                        key={idx}
                        style={[styles.milestoneItem, { backgroundColor: theme.secondaryLight }]}
                    >
                        <View style={[styles.milestoneDot, { backgroundColor: theme.secondary }]} />
                        <Text style={[styles.milestoneText, { color: theme.text }]}>{milestone}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.progressSection}>
                <View style={styles.progressHeader}>
                    <Text style={[styles.progressLabel, { color: theme.textSec }]}>Pregnancy Progress</Text>
                    <Text style={[styles.progressPercent, { color: theme.secondary }]}>
                        {Math.round(weekProgress)}%
                    </Text>
                </View>
                <View style={[styles.progressBar, { backgroundColor: theme.border }]}>
                    <View
                        style={[styles.progressFill, { width: `${weekProgress}%`, backgroundColor: theme.secondary }]}
                    />
                </View>
            </View>
        </View>
    );
};

// // Meal Plan Content
// const MealPlanContent = ({ mealPlan, theme } : {
//     mealPlan: string;
//     theme: any;
// }) => {
//     const mealSuggestions = {
//         'All Foods': {
//             breakfast: ['Greek yogurt with berries', 'Scrambled eggs with whole grain toast', 'Oatmeal with nuts'],
//             lunch: ['Grilled chicken salad', 'Salmon with quinoa', 'Turkey sandwich on whole grain'],
//             dinner: ['Lean beef stir-fry', 'Baked fish with vegetables', 'Chicken curry with brown rice'],
//         },
//         'Pescatarian': {
//             breakfast: ['Smoothie bowl with chia seeds', 'Avocado toast with eggs', 'Greek yogurt parfait'],
//             lunch: ['Tuna salad wrap', 'Shrimp pasta primavera', 'Salmon poke bowl'],
//             dinner: ['Grilled fish tacos', 'Seafood paella', 'Baked cod with roasted vegetables'],
//         },
//         'Vegetarian': {
//             breakfast: ['Veggie omelet', 'Whole grain pancakes with fruit', 'Quinoa breakfast bowl'],
//             lunch: ['Lentil soup with bread', 'Caprese sandwich', 'Buddha bowl with chickpeas'],
//             dinner: ['Vegetable stir-fry with tofu', 'Eggplant parmesan', 'Black bean burrito bowl'],
//         },
//     };

//     const meals = mealSuggestions[mealPlan];

//     return (
//         <View style={styles.contentContainer}>
//             <View style={[styles.planCard, { backgroundColor: theme.primaryLight }]}>
//                 <View>
//                     <Text style={[styles.planLabel, { color: theme.textSec }]}>Current Plan</Text>
//                     <Text style={[styles.planName, { color: theme.primary }]}>{mealPlan}</Text>
//                 </View>
//                 <Ionicons name="restaurant" size={32} color={theme.primary} />
//             </View>

//             {['breakfast', 'lunch', 'dinner'].map((mealType) => (
//                 <View key={mealType} style={styles.mealSection}>
//                     <Text style={[styles.mealTypeTitle, { color: theme.text }]}>
//                         {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
//                     </Text>
//                     {meals[mealType].map((meal, idx) => (
//                         <View
//                             key={idx}
//                             style={[styles.mealItem, { backgroundColor: theme.card, borderColor: theme.border }]}
//                         >
//                             <View style={[styles.mealNumber, { backgroundColor: theme.primary }]}>
//                                 <Text style={styles.mealNumberText}>{idx + 1}</Text>
//                             </View>
//                             <Text style={[styles.mealText, { color: theme.text }]}>{meal}</Text>
//                         </View>
//                     ))}
//                 </View>
//             ))}
//         </View>
//     );
// };

// Foods to Avoid Content
export const FoodsToAvoidContent = ({ foodsToAvoid, theme } : {
    foodsToAvoid: string[];
    theme: any;
}) => {
    if (foodsToAvoid.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <View style={[styles.emptyIcon, { backgroundColor: theme.secondaryLight }]}>
                    <Ionicons name="restaurant" size={40} color={theme.secondary} />
                </View>
                <Text style={[styles.emptyTitle, { color: theme.text }]}>No Food Restrictions</Text>
                <Text style={[styles.emptyText, { color: theme.textSec }]}>
                    You haven't added any foods to avoid yet
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.contentContainer}>
            <View style={[styles.alertCard, { backgroundColor: theme.secondaryLight }]}>
                <View style={styles.alertHeader}>
                    <Ionicons name="alert-circle" size={20} color={theme.secondary} />
                    <Text style={[styles.alertTitle, { color: theme.text }]}>Your Food Restrictions</Text>
                </View>
                <Text style={[styles.alertText, { color: theme.textSec }]}>
                    Based on your preferences, avoid these foods during pregnancy
                </Text>
            </View>

            {foodsToAvoid.map((food, idx) => (
                <View
                    key={idx}
                    style={[styles.avoidItem, { backgroundColor: theme.card, borderColor: '#FFB3BA' }]}
                >
                    <View style={styles.avoidIcon}>
                        <Ionicons name="close-circle" size={24} color="#FF4444" />
                    </View>
                    <Text style={[styles.avoidText, { color: theme.text }]}>{food}</Text>
                </View>
            ))}

            <View style={[styles.tipCard, { backgroundColor: theme.primaryLight }]}>
                <Text style={[styles.tipText, { color: theme.textSec }]}>
                    💡 <Text style={styles.tipBold}>Tip:</Text> Always check labels and ask about ingredients
                    when dining out
                </Text>
            </View>
        </View>
    );
};

// Medical Notes Content
export const MedicalNotesContent = ({ medicalNotes, theme } : {
    medicalNotes: string;
    theme: any;
}) => {
    return (
        <View style={styles.contentContainer}>
            <View style={[styles.alertCard, { backgroundColor: theme.primaryLight }]}>
                <View style={styles.alertHeader}>
                    <Ionicons name="document-text" size={20} color={theme.primary} />
                    <Text style={[styles.alertTitle, { color: theme.text }]}>Your Health Notes</Text>
                </View>
                <Text style={[styles.alertText, { color: theme.textSec }]}>
                    Important information to guide your nutrition
                </Text>
            </View>

            <View style={[styles.notesCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
                <Text style={[styles.notesText, { color: theme.text }]}>{medicalNotes}</Text>
            </View>

            <Text style={[styles.recommendationsTitle, { color: theme.text }]}>
                AI Recommendations
            </Text>

            <View style={[styles.recommendationCard, { backgroundColor: '#E8F5E9', borderColor: '#A5D6A7' }]}>
                <View style={styles.recommendationContent}>
                    <Text style={styles.recommendationIcon}>✓</Text>
                    <View style={styles.recommendationText}>
                        <Text style={[styles.recommendationLabel, { color: theme.text }]}>
                            Foods to Include
                        </Text>
                        <Text style={[styles.recommendationDesc, { color: theme.textSec }]}>
                            Spinach, lentils, lean red meat, fortified cereals (for iron). Whole grains,
                            vegetables, lean proteins (for blood sugar management)
                        </Text>
                    </View>
                </View>
            </View>

            <View style={[styles.recommendationCard, { backgroundColor: '#FFEBEE', borderColor: '#EF9A9A' }]}>
                <View style={styles.recommendationContent}>
                    <Text style={styles.recommendationIcon}>✗</Text>
                    <View style={styles.recommendationText}>
                        <Text style={[styles.recommendationLabel, { color: theme.text }]}>Foods to Limit</Text>
                        <Text style={[styles.recommendationDesc, { color: theme.textSec }]}>
                            Sugary snacks, white bread, sweetened beverages, processed foods high in refined
                            carbohydrates
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};


// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
    },
    header: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
    },
    menuContainer: {
        paddingHorizontal: 20,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
        borderWidth: 1,
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    menuTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 2,
    },
    menuSubtitle: {
        fontSize: 13,
    },
    handleContainer: {
        alignItems: 'center',
        paddingTop: 12,
    },
    handle: {
        width: 40,
        height: 4,
        borderRadius: 2,
    },
    sheetHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
    },
    sheetHeaderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    sheetIcon: {
        width: 40,
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    sheetTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    closeButton: {
        padding: 4,
    },
    sheetContent: {
        flex: 1,
        paddingHorizontal: 20,
    },
    contentContainer: {
        paddingVertical: 16,
    },
    dateCard: {
        borderRadius: 16,
        padding: 24,
        alignItems: 'center',
        marginBottom: 16,
    },
    dateText: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    dateLabelText: {
        fontSize: 13,
    },
    infoRows: {
        marginBottom: 16,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    infoLabel: {
        fontSize: 14,
    },
    infoValue: {
        fontSize: 14,
        fontWeight: '600',
    },
    progressSection: {
        marginBottom: 16,
    },
    progressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    progressLabel: {
        fontSize: 13,
    },
    progressPercent: {
        fontSize: 13,
        fontWeight: '600',
    },
    progressBar: {
        height: 8,
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        borderRadius: 4,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 16,
        borderTopWidth: 1,
    },
    statItem: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 11,
    },
    weekCard: {
        borderRadius: 16,
        padding: 24,
        alignItems: 'center',
        marginBottom: 20,
    },
    weekNumber: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 4,
    },
    weekTrimester: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.8)',
    },
    milestonesSection: {
        marginBottom: 20,
    },
    milestonesHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    milestonesTitle: {
        fontSize: 15,
        fontWeight: '600',
        marginLeft: 8,
    },
    milestoneItem: {
        flexDirection: 'row',
        padding: 16,
        borderRadius: 12,
        marginBottom: 8,
    },
    milestoneDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginTop: 6,
        marginRight: 12,
    },
    milestoneText: {
        flex: 1,
        fontSize: 14,
        lineHeight: 20,
    },
    planCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
        marginBottom: 20,
    },
    planLabel: {
        fontSize: 12,
        marginBottom: 4,
    },
    planName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    mealSection: {
        marginBottom: 20,
    },
    mealTypeTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 12,
        textTransform: 'capitalize',
    },
    mealItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 10,
        borderWidth: 1,
        marginBottom: 8,
    },
    mealNumber: {
        width: 32,
        height: 32,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    mealNumberText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 14,
    },
    mealText: {
        flex: 1,
        fontSize: 14,
    },
    emptyContainer: {
        alignItems: 'center',
        paddingVertical: 40,
    },
    emptyIcon: {
        width: 80,
        height: 80,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
    },
    emptyText: {
        fontSize: 14,
        textAlign: 'center',
    },
    alertCard: {
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    alertHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    alertTitle: {
        fontSize: 15,
        fontWeight: '600',
        marginLeft: 8,
    },
    alertText: {
        fontSize: 13,
        lineHeight: 18,
    },
    avoidItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
        borderWidth: 2,
        marginBottom: 12,
    },
    avoidIcon: {
        marginRight: 12,
    },
    avoidText: {
        flex: 1,
        fontSize: 15,
        fontWeight: '500',
    },
    tipCard: {
        borderRadius: 12,
        padding: 16,
        marginTop: 8,
    },
    tipText: {
        fontSize: 13,
        lineHeight: 18,
    },
    tipBold: {
        fontWeight: '600',
    },
    notesCard: {
        padding: 20,
        borderRadius: 12,
        borderWidth: 2,
        marginBottom: 20,
    },
    notesText: {
        fontSize: 14,
        lineHeight: 22,
    },
    recommendationsTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 12,
    },
    recommendationCard: {
        borderRadius: 12,
        padding: 16,
        borderWidth: 2,
        marginBottom: 12,
    },
    recommendationContent: {
        flexDirection: 'row',
    },
    recommendationIcon: {
        fontSize: 24,
        marginRight: 12,
    },
    recommendationText: {
        flex: 1,
    },
    recommendationLabel: {
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 4,
    },
    recommendationDesc: {
        fontSize: 13,
        lineHeight: 20,
    },
});
