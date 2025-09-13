import { Image, StyleSheet, View } from 'react-native';
import { ThemedText } from '../ThemedText';
import FoodTag from '../FoodTag';
import { GapColumn } from '../Gap';
import Row from '../Row';

type FullWidthFoodItemProps = {
  image: string;
  name: string;
  type: 'safe' | 'limit' | 'avoid';
  description: string;
  date: string;
  source: string;
};

export default function FullWidthFoodItem({ image, name, type, description, date, source }: FullWidthFoodItemProps) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Row>
            <ThemedText type="subTitle" style={{flex: 1}}>{name}</ThemedText>
            <FoodTag type={type} />
        </Row>
        <ThemedText type="default">{date}</ThemedText>
        <GapColumn space={10} />
        <ThemedText type="default">{description}</ThemedText>
        <GapColumn space={10} />
        <ThemedText type="small12">{source}</ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    borderRadius: 6,
    backgroundColor: '#FAFAFBFF',
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: 150,
  },
  infoContainer: {
      padding: 15,
  }
});
