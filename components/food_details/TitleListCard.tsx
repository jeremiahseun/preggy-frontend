import Column from "../Column";
import { GapColumn, GapRow } from "../Gap";
import { ThemedText } from "../ThemedText";
import AlertIcon from '@/assets/icons/alert.svg';
import LeafIcon from '@/assets/icons/leaf.svg';
import CheckIcon from '@/assets/icons/check.svg';
import Row from "../Row";
import { useColorScheme } from "react-native";

type TitleListCardProps = {
    title: string;
    information: string[];
    type: 'safe' | 'limit' | 'avoid';
}

export default function TitleListCard({ title, information, type }: TitleListCardProps) {
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <Column style={{
            backgroundColor: isDarkMode ? '#171a1f' : '#FAFAFBFF',
            width: "100%",
            height: 'auto',
            borderRadius: 6,
            padding: 15,
        }}>
            <Row>
                {type === 'safe' ? <LeafIcon color={'#4AC477FF'} width={20} height={20} /> : <AlertIcon color={'#FF0000'} width={20} height={20} />}
                <GapRow space={10}/>
            <ThemedText type="subTitle">{title}</ThemedText>
            </Row>
            <GapColumn space={5} />
            {
                information.map((item, index) => {
                    return <Row key={index} style={{
                        alignItems: 'center'
                    }}>
                        {type === 'safe' ? <CheckIcon color={'#4AC477FF'} width={16} height={16} /> : <AlertIcon color={'#FF0000'} width={16} height={16} />}
                        <GapRow space={10} />
                        <ThemedText key={index} type="default">{item}</ThemedText>
                    </Row>
                })
            }
        </Column>
    )

}
