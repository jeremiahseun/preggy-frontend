import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { View, Switch, StyleSheet, TouchableOpacity } from "react-native";
import BoxContainer from "../BoxContainer";
import { GapRow } from "../Gap";
import Row from "../Row";
import { ThemedText } from "../ThemedText";
import Column from "../Column";

    const ToggleSettingItem = ({
        icon,
        title,
        value,
        onValueChange,
        color = '#294988'
    }: {
        icon: IconProp;
        title: string;
        value: boolean;
        onValueChange: (value: boolean) => void;
        color?: string;
    }) => (
        <BoxContainer style={[styles.settingItem, {
            height: 'auto'
        }]}>
            <Row style={{ alignItems: 'center', flex: 1 }}>
                <View style={[styles.settingIcon, { backgroundColor: color + '15' }]}>
                    <FontAwesomeIcon icon={icon} size={18} color={color} />
                </View>
                <GapRow space={14} />
                <ThemedText style={[styles.settingTitle, { flex: 1 }]}>{title}</ThemedText>
                <Switch
                    value={value}
                    onValueChange={onValueChange}
                    trackColor={{ false: '#E0E0E0', true: '#4CAF50' }}
                    thumbColor={value ? '#FFFFFF' : '#F4F3F4'}
                />
            </Row>
        </BoxContainer>
    );


 const SettingItem = ({
        icon,
        title,
        value,
        onPress,
        showArrow = true,
        color = '#294988'
    }: {
        icon: IconProp;
        title: string;
        value?: string;
        onPress?: () => void;
        showArrow?: boolean;
        color?: string;
    }) => (
        <BoxContainer
            onPress={onPress}
            disabled={!onPress}
            style={[styles.settingItem, {
                height: 'auto'
            }]}
        >
            <Row style={{ alignItems: 'center', flex: 1 }}>
                <View style={[styles.settingIcon, { backgroundColor: color + '15' }]}>
                    <FontAwesomeIcon icon={icon} size={18} color={color} />
                </View>
                <GapRow space={14} />
                <Column style={{ flex: 1 }}>
                    <ThemedText style={styles.settingTitle}>{title}</ThemedText>
                    {value && (
                        <ThemedText style={styles.settingValue}>{value}</ThemedText>
                    )}
                </Column>
                {showArrow && (
                    <FontAwesomeIcon icon={'chevron-right'} size={16} color="#CCCCCC" />
                )}
            </Row>
        </BoxContainer>
    );

    export {SettingItem, ToggleSettingItem}


    const styles = StyleSheet.create({
        settingItem: {
            padding: 16,
        },
        settingIcon: {
            width: 40,
            height: 40,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
        },
        settingTitle: {
            fontSize: 15,
            fontWeight: '600',
        },
        settingValue: {
            fontSize: 13,
            color: '#888',
            marginTop: 2,
        },
    })
