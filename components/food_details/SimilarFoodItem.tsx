import { Image, StyleSheet, View } from 'react-native';
import { ThemedText } from '../ThemedText';
import FoodTag from '../FoodTag';
import { GapColumn } from '../Gap';
import ImageView from '../widgets/ImageView';

type SimilarFoodItemProps = {
  image: string;
  name: string;
  type: 'safe' | 'limit' | 'avoid';
  description: string;
};

export default function SimilarFoodItem({ image, name, type, description }: SimilarFoodItemProps) {
  return (
    <View style={styles.container}>
          <ImageView height={100} width={150} uri={image} imageStyle={styles.image} />
      <GapColumn space={10} />
      <FoodTag type={type} />
      <GapColumn space={5} />
      <ThemedText type="defaultSemiBold">{name}</ThemedText>
      <ThemedText type="small12">{description}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 150,
    marginRight: 15,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 6,
  },
});
