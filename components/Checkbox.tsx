import React from 'react';
import { TouchableOpacity, View, StyleSheet, useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';

interface CheckboxProps {
    isChecked: boolean;
    onValueChange: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ isChecked, onValueChange }) => {
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';

    const checkboxStyle = {
        ...styles.checkbox,
        backgroundColor: isChecked ? Colors.primary : (isDarkMode ? '#333' : '#fff'),
        borderColor: isChecked ? Colors.primary : (isDarkMode ? '#555' : '#ccc'),
    };

    return (
        <TouchableOpacity onPress={onValueChange} style={checkboxStyle}>
            {isChecked && <Icon name="checkmark" size={18} color="#fff" />}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 5,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
});

export default Checkbox;
