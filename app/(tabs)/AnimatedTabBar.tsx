import React from 'react';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { View, StyleSheet } from 'react-native';

export default function AnimatedTabBar({ visible, children, style, ...props }: any) {
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateY: withTiming(visible ? 0 : 100, { duration: 300 }) },
        ],
        opacity: withTiming(visible ? 1 : 0, { duration: 300 }),
    }), [visible]);

    return (
        <Animated.View style={[styles.tabBar, animatedStyle, style]} {...props}>
            {children}
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10,
    },
});
