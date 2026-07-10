import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppHeader from '../components/AppHeader';

function DarkTheme(props) {
    const darkMode = props.darkMode;

    return (
        <View style={[styles.container, darkMode && styles.containerDark]}>
            <AppHeader onOpenSettings={props.onOpenSettings} onLogoPress={props.onBack} />

            <View style={styles.body}>
                <View style={styles.content}>
                    <Text style={[styles.title, darkMode && styles.titleDark]}>Settings</Text>

                    <View style={[styles.row, darkMode && styles.rowDark]}>
                        <View style={styles.rowLeft}>
                            <View style={[styles.iconWrapper, darkMode && styles.iconWrapperDark]}>
                                <Ionicons
                                    name={darkMode ? 'moon' : 'moon-outline'}
                                    size={20}
                                    color={darkMode ? '#fff' : '#6C63FF'}
                                />
                            </View>
                            <View>
                                <Text style={[styles.rowLabel, darkMode && styles.rowLabelDark]}>Dark Theme</Text>
                                <Text style={[styles.rowSubtext, darkMode && styles.rowSubtextDark]}>
                                    {darkMode ? 'Enabled' : 'Disabled'}
                                </Text>
                            </View>
                        </View>
                        <Switch
                            value={darkMode}
                            onValueChange={props.onToggleDarkMode}
                            trackColor={{ false: '#ccc', true: '#6C63FF' }}
                            thumbColor="#fff"
                        />
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    containerDark: {
        backgroundColor: '#121212',
    },
    body: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: 32,
    },
    content: {
        width: '100%',
        maxWidth: 480,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: '#333',
        marginBottom: 20,
    },
    titleDark: {
        color: '#fff',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 16,
        backgroundColor: '#F8F8FA',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#eee',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
        elevation: 1,
    },
    rowDark: {
        backgroundColor: '#1E1E1E',
        borderColor: '#2A2A2A',
    },
    rowLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconWrapper: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: '#F1F0FF',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    iconWrapperDark: {
        backgroundColor: '#6C63FF',
    },
    rowLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    rowLabelDark: {
        color: '#fff',
    },
    rowSubtext: {
        fontSize: 12,
        color: '#999',
        marginTop: 2,
    },
    rowSubtextDark: {
        color: '#aaa',
    },
});

export default DarkTheme;
