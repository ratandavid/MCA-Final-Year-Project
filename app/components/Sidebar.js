import React, { useEffect, useRef } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SIDEBAR_WIDTH = SCREEN_WIDTH * 0.75;

const menuItems = [
    { key: 'settings', label: 'Settings', icon: 'settings-outline' },
    { key: 'favourite', label: 'Favourite', icon: 'heart-outline' },
    { key: 'reminders', label: 'Daily Reminders', icon: 'notifications-outline' },
];

function Sidebar(props) {
    const slideAnim = useRef(new Animated.Value(-SIDEBAR_WIDTH)).current;

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: props.visible ? 0 : -SIDEBAR_WIDTH,
            duration: 250,
            useNativeDriver: true,
        }).start();
    }, [props.visible]);

    return (
        <Modal visible={props.visible} transparent animationType="fade" onRequestClose={props.onClose}>
            <View style={styles.overlay}>
                <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={props.onClose} />
                <Animated.View style={[styles.panel, { transform: [{ translateX: slideAnim }] }]}>
                    <View style={styles.header}>
                        <Text style={styles.userName}>{props.userName || 'there'}</Text>
                        <Text style={styles.subtitle}>Would you like to change the settings?</Text>
                    </View>

                    {menuItems.map((item) => (
                        <TouchableOpacity
                            key={item.key}
                            style={styles.menuItem}
                            onPress={() => props.onSelectItem && props.onSelectItem(item.key)}
                        >
                            <Ionicons name={item.icon} size={22} color="#333" />
                            <Text style={styles.menuItemText}>{item.label}</Text>
                        </TouchableOpacity>
                    ))}

                    <TouchableOpacity style={styles.logoutButton} onPress={props.onLogout} activeOpacity={0.85}>
                        <Ionicons name="log-out-outline" size={20} color="#fff" />
                        <Text style={styles.logoutButtonText}>Log Out</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        flexDirection: 'row',
    },
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    panel: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: SIDEBAR_WIDTH,
        backgroundColor: '#fff',
        paddingTop: 60,
        paddingHorizontal: 20,
    },
    header: {
        marginBottom: 24,
    },
    userName: {
        fontSize: 20,
        fontWeight: '700',
        color: '#333',
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 13,
        color: '#888',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f1f1',
    },
    menuItemText: {
        marginLeft: 14,
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    logoutButton: {
        position: 'absolute',
        left: 20,
        right: 20,
        bottom: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E25C5C',
        paddingVertical: 13,
        borderRadius: 24,
        shadowColor: '#E25C5C',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4,
    },
    logoutButtonText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#fff',
        fontWeight: '700',
    },
});

export default Sidebar;
