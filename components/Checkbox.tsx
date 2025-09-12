import { TouchableOpacity, View, Text } from 'react-native';
import styles from '@/constants/Styles';


type CheckboxProps = {
    label: string;
    checked: boolean;
    onToggle: () => void;
};

const Checkbox = ({ label, checked, onToggle }: CheckboxProps) => (
    <TouchableOpacity style={styles.checkboxContainer} onPress={onToggle}>
        <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
            {checked && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <Text style={styles.checkboxLabel}>{label}</Text>
    </TouchableOpacity>
);

export default Checkbox;
