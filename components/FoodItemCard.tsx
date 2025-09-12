import BoxContainer from "./BoxContainer";
import CircleContainer from "./CircleContainer";
import Column from "./Column";
import FoodTag from "./FoodTag";
import { GapRow, GapColumn } from "./Gap";
import Row from "./Row";
import { ThemedText } from "./ThemedText";

type FoodItemCardProps = {
    type: 'safe' | 'limit' | 'avoid';
    title: string;
    description: string;
    source: string;
    date: string;
}


export default function FoodItemCard(props : FoodItemCardProps) {
    return (
        <BoxContainer style={{
            padding: 15,
            height: 'auto',
        }}>
            <Column>
                <Row>
                    <CircleContainer radius={48} color='#F2F7FDFF' />
                    <GapRow space={20} />
                    <Column style={{
                        flex: 1
                    }}>
                        <ThemedText type="subTitle">{props.title}</ThemedText>
                        <ThemedText type="default">{props.date}</ThemedText>
                    </Column>
                    <FoodTag type={props.type} />
                </Row>
                <GapColumn space={10} />
                <ThemedText type="default">{props.description}</ThemedText>
                <GapColumn space={10} />
                <ThemedText type="small">{props.source}</ThemedText>
            </Column>
        </BoxContainer>
    )
}
