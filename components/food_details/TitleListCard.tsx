import Column from "../Column";
import { GapColumn } from "../Gap";
import { ThemedText } from "../ThemedText";
import AlertIcon from '@/assets/icons/alert.svg';
import LeafIcon from '@/assets/icons/leaf.svg';
import CheckIcon from '@/assets/icons/check.svg';
import Row from "../Row";

type TitleListCardProps = {
    title: string;
    information: string[];
    type?: 'safe' | 'limit' | 'avoid';
}

export default function TitleListCard({ title, information }: TitleListCardProps) {
    return (
        <Column style={{
            width: "100%",
            height: 'auto',
            borderRadius: 6,
            padding: 15,
            backgroundColor: '#FAFAFBFF',
        }}>
            <Row>

            <ThemedText type="subTitle">{title}</ThemedText>
            </Row>
            <GapColumn space={5} />
            {
                information.map((item, index) => {
                    return <ThemedText key={index} type="default">{item}</ThemedText>
                })
            }
        </Column>
    )

}
