import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function AppHeader(props) {
    const iconName = props.rightIcon || 'settings-outline';
    const onIconPress = props.onRightPress || props.onOpenSettings;

    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={props.onLogoPress} disabled={!props.onLogoPress}>
                <Image source={require('../assets/applogo.png')} style={styles.logo} />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.iconButton}
                onPress={onIconPress}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
                <Ionicons name={iconName} size={24} color="#333" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 12 : 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        backgroundColor: '#fff',
    },
    logo: {
        width: 32,
        height: 32,
        resizeMode: 'contain',
    },
    iconButton: {
        padding: 4,
    },
});

export default AppHeader;
