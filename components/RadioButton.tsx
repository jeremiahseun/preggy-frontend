import React from 'react';
import { TouchableOpacity, View, StyleSheet, useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';

interface RadioButtonProps {
  selected: boolean;
  onPress: () => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({ selected, onPress }) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const radioStyle = {
    ...styles.radio,
    borderColor: Colors.primary,
    backgroundColor: isDarkMode ? (selected ? Colors.primary : '#fff') : (selected ? Colors.primary : 'transparent')
  };

  const innerRadioStyle = {
    ...styles.innerRadio,
    backgroundColor: isDarkMode ? (selected ? '#fff' : Colors.primary) : (selected ? '#fff' : Colors.primary)
  }

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={radioStyle}>
        {selected && <View style={innerRadioStyle} />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  radio: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerRadio: {
    height: 12,
    width: 12,
    borderRadius: 6,
  },
});

export default RadioButton;
