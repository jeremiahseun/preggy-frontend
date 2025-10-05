import { Ionicons } from "@expo/vector-icons";
import { useRef, useEffect } from "react";
import { Animated, Modal, View, TouchableOpacity, ScrollView, Text, StyleSheet } from "react-native";

// Bottom Sheet Component
const BottomSheet = ({ visible, onClose, title, icon, children, theme, bottomSheetHeight }: {
    visible: boolean;
    onClose: () => void;
    title: string;
    icon: any;
    children: React.ReactNode;
    theme: any;
    bottomSheetHeight: number;
}) => {
    const translateY = useRef(new Animated.Value(bottomSheetHeight)).current;

    useEffect(() => {
        if (visible) {
            Animated.spring(translateY, {
                toValue: 0,
                useNativeDriver: true,
                tension: 50,
                friction: 8,
            }).start();
        } else {
            Animated.timing(translateY, {
                toValue: bottomSheetHeight,
                duration: 250,
                useNativeDriver: true,
            }).start();
        }
    }, [visible]);

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <TouchableOpacity
                    style={styles.backdrop}
                    activeOpacity={1}
                    onPress={onClose}
                />
                <Animated.View
                    style={[
                        styles.bottomSheet,
                        { backgroundColor: theme.card, transform: [{ translateY }], height: bottomSheetHeight, },
                    ]}
                >
                    <View style={styles.handleContainer}>
                        <View style={[styles.handle, { backgroundColor: theme.border }]} />
                    </View>

                    <View style={[styles.sheetHeader, { borderBottomColor: theme.border }]}>
                        <View style={styles.sheetHeaderLeft}>
                            <View style={[styles.sheetIcon, { backgroundColor: theme.primary }]}>
                                <Ionicons name={icon} size={20} color="#FFFFFF" />
                            </View>
                            <Text style={[styles.sheetTitle, { color: theme.text }]}>{title}</Text>
                        </View>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <Ionicons name="close" size={24} color={theme.textSec} />
                        </TouchableOpacity>
                    </View>

                    <ScrollView
                        style={styles.sheetContent}
                        showsVerticalScrollIndicator={false}
                    >
                        {children}
                    </ScrollView>
                </Animated.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    bottomSheet: {
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,
    },
    handleContainer: {
        alignItems: 'center',
        paddingTop: 12,
    },
    handle: {
        width: 40,
        height: 4,
        borderRadius: 2,
    },
    sheetHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
    },
    sheetHeaderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    sheetIcon: {
        width: 40,
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    sheetTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    closeButton: {
        padding: 4,
    },
    sheetContent: {
        flex: 1,
        paddingHorizontal: 20,
    },
})

export default BottomSheet;
