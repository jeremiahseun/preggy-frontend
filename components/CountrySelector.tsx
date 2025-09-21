
import React, { useState, useEffect } from 'react';
import { View, Modal, TextInput, ActivityIndicator, Text, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { ThemedText } from './ThemedText';
import { Colors } from '@/constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import appStyles from '@/constants/Styles';
import { GapColumn } from './Gap';
import { ThemedView } from './ThemedView';

interface Country {
    name: string;
    code: string;
}

interface CountrySelectorProps {
    visible: boolean;
    onClose: () => void;
    onSelect: (country: Country) => void;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({ visible, onClose, onSelect }) => {
    const [loading, setLoading] = useState(true);
    const [countries, setCountries] = useState<Country[]>([]);
    const [search, setSearch] = useState('');
    const isDarkMode = useColorScheme() === 'dark';

    useEffect(() => {
        if (visible) {
            setLoading(true);
            const countriesData = require('@/assets/docs/countries.json');
            setCountries(countriesData);
            setLoading(false);
        }
    }, [visible]);

    const filteredCountries = countries.filter(country =>
        country.name.toLowerCase().includes(search.toLowerCase())
    );

    const renderItem = ({ item }: { item: Country }) => (
        <TouchableOpacity onPress={() => onSelect(item)} style={styles.itemContainer}>
            <ThemedText>{item.name}</ThemedText>
        </TouchableOpacity>
    );

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <ThemedView style={styles.modalContent}>
                    <View style={styles.header}>
                        <ThemedText type="subtitle">Select Country</ThemedText>
                        <TouchableOpacity onPress={onClose}>
                            <Icon name="close" size={24} color={isDarkMode ? Colors.dark.text : Colors.light.text} />
                        </TouchableOpacity>
                    </View>
                    <TextInput
                        style={appStyles.input}
                        placeholder="Search for your country"
                        placeholderTextColor='#9A9A9A'
                        value={search}
                        onChangeText={setSearch}
                    />
                    {loading ? (
                        <ActivityIndicator size="large" color={Colors.light.tint} />
                    ) : (
                        <FlashList style={{
                            paddingTop: 20
                        }}
                            data={filteredCountries}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.code}
                        />
                    )}
                </ThemedView>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '95%',
        height: '70%',
        borderRadius: 10,
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },

    itemContainer: {
        paddingVertical: 15,
        borderBottomWidth: .5,
    },
});

export default CountrySelector;
