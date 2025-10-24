import { Image, StyleSheet, View } from 'react-native';
import { ThemedText } from '../ThemedText';
import FoodTag from '../FoodTag';
import { GapColumn } from '../Gap';
import Row from '../Row';
import { ThemedView } from '../ThemedView';

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
    <ThemedView style={styles.container}>
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
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    borderRadius: 6,
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
