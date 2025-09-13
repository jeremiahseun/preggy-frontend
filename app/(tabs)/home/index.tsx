import BoxContainer from '@/components/BoxContainer';
import CircleContainer from '@/components/CircleContainer';
import Column from '@/components/Column';
import FoodItemCard from '@/components/FoodItemCard';
import FoodTag from '@/components/FoodTag';
import { GapColumn, GapRow } from '@/components/Gap';
import Row from '@/components/Row';
import { ThemedText } from '@/components/ThemedText';
import { ThemedScrollView, ThemedView } from '@/components/ThemedView';
import appStyles from '@/constants/Styles';
import { Link } from 'expo-router';
import { FlatList, Image, Platform, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const recentChecksList = [
    {
        name: "Green Apples",
        description: "Excellent source of fiber and vitamin C. Safe to eat during pregnancy.",
        type: "safe",
        date: "2 hours ago",
        source: "Source: NHS, WHO • Verified Today",
    }, {
        name: "Soft Cheeses",
        description: "Some soft cheeses like Brie and Camembert can contain Listeria. Avoid unless specified pasteurized.",
        type: "avoid",
        date: "3 hours ago",
        source: "Source: FDA, CDC • Verified Today",
    },
    {
        name: "Canned Tuna",
        description: "Good source of Omega-3s, but limit intake due to mercury content. Max 2-3 servings per week.",
        type: "limit",
        date: "5 hours ago",
        source: "Source: EPA, FDA • Verified Today",
    },
    {
        name: "Cooked Salmon",
        description: "Rich in Omega-3 fatty acids, beneficial for baby's brain development. Safe to eat.",
        type: "safe",
        date: "1 day ago",
        source: "Source: American Pregnancy Association • Verified Yesterday",
    },
    {
        name: "Deli Meats",
        description: "Can carry Listeria. Avoid unless heated to steaming hot before consumption.",
        type: "avoid",
        date: "1 day ago",
        source: "Source: USDA • Verified Yesterday",
    },
    {
        name: "Coffee",
        description: "Limit caffeine intake to 200mg per day (about one 12-ounce cup).",
        type: "limit",
        date: "2 days ago",
        source: "Source: American College of Obstetricians and Gynecologists • Verified 2 days ago",
    },
    {
        name: "Pasteurized Milk",
        description: "Excellent source of calcium and vitamin D. Safe and recommended.",
        type: "safe",
        date: "3 days ago",
        source: "Source: NHS • Verified 3 days ago",
    },

]

export default function HomeScreen() {
    const insets = useSafeAreaInsets();

    const renderListHeader = () => (
        <ThemedView>
            <GapColumn space={30} />
            <Row>
                <Column style={{
                    flex: 1
                }}>
                    <ThemedText type="title">Hello Bola,</ThemedText>
                    <ThemedText type="defaultSemiBold">24 weeks pregnant</ThemedText>
                </Column>
                <Image style={{
                    width: 49,
                    height: 49,
                    borderRadius: 1000,
                }} source={{ uri: "https://cdn.pixabay.com/photo/2020/05/26/15/42/eagle-5223559_960_720.jpg" }} />
            </Row>
            <GapColumn space={30} />
            <TextInput
                style={appStyles.input}
                placeholder='Search food or ask a question'
                placeholderTextColor='#9A9A9A'
            />
            <GapColumn space={30} />
            <ThemedText type="subtitle">Quick Check</ThemedText>
            <GapColumn space={10} />
            <Row style={{
                flex: 1,
            }}>
                <Link href={'/home/photo-check'} asChild>
                    <BoxContainer style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1,
                        paddingHorizontal: 5
                    }}>
                        <CircleContainer radius={48} color='#F2F7FDFF' />
                        <GapColumn space={20} />
                        <ThemedText style={{
                            textAlign: 'center'
                        }} type="subTitle">Photo Check</ThemedText>
                        <ThemedText style={{
                            textAlign: 'center'
                        }} type="default">Scan food with camera</ThemedText>
                    </BoxContainer>
                </Link>
                <GapRow space={20} />
                <Link href={'/chats'} asChild>
                    <BoxContainer style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1,
                        paddingHorizontal: 15
                    }}>
                        <CircleContainer radius={48} color='#F2F7FDFF' />
                        <GapColumn space={20} />
                        <ThemedText style={{
                            textAlign: 'center'
                        }} type="subTitle">AI Safety Chat</ThemedText>
                        <ThemedText style={{
                            textAlign: 'center'
                        }} type="default">Chat about safety</ThemedText>
                    </BoxContainer>
                </Link>
            </Row>
            <GapColumn space={20} />
            <Row>
                <ThemedText style={{
                    flex: 1
                }} type="subtitle">Recent Checks</ThemedText>
                <ThemedText type="link">View All</ThemedText>
            </Row>
            <GapColumn space={20} />
        </ThemedView>
    )

    return (
        <ThemedView style={[{
            paddingTop: insets.top,
            flex: 1,
            paddingHorizontal: 24
        }]}>
            <FlatList
                data={recentChecksList}
                keyExtractor={(item) => item.name}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <GapColumn space={20} />}
                renderItem={({ item }) => <FoodItemCard type={
                    item.type === 'safe' ? 'safe' : item.type === 'limit' ? 'limit' : 'avoid'
                } date={item.date} title={item.name} source={item.source} description={item.description} />}
                ListHeaderComponent={renderListHeader}
                ListFooterComponent={() => <GapColumn space={50} />}
            >
            </FlatList>
        </ThemedView>
    );
}
