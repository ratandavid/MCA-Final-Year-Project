import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, ScrollView, Alert, Platform, LogBox, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppHeader from '../components/AppHeader';

// Suppress the Expo Go push-notification warning — we only use local scheduling
LogBox.ignoreLogs([
    'expo-notifications: Android Push notifications',
    'expo-notifications` functionality is not fully supported',
]);

const STORAGE_KEY = '@daily_reminders';

// Show notification banner even when app is in foreground
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

function getToday() {
    return new Date().toISOString().split('T')[0];
}

function generateId() {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function getNextRoundedTime() {
    const now = new Date();
    const minutes = now.getMinutes();
    const roundUp = minutes < 30 ? 30 - minutes : 60 - minutes;
    now.setMinutes(now.getMinutes() + roundUp, 0, 0);
    let hours = now.getHours();
    const mins = now.getMinutes();
    const period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours}:${mins === 0 ? '00' : mins} ${period}`;
}

function parseSecondsUntil(dateString, timeStr) {
    const cleaned = timeStr.trim().toUpperCase();
    const isPM = cleaned.includes('PM');
    const isAM = cleaned.includes('AM');
    const digits = cleaned.replace(/[APM\s]/g, '');
    const [hourStr, minuteStr = '0'] = digits.split(':');
    let hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);
    if (isPM && hour !== 12) hour += 12;
    if (isAM && hour === 12) hour = 0;
    const [year, month, day] = dateString.split('-').map(Number);
    const triggerDate = new Date(year, month - 1, day, hour, minute, 0);
    return Math.floor((triggerDate.getTime() - Date.now()) / 1000);
}

async function setupNotifications() {
    try {
        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('reminders', {
                name: 'Meditation Reminders',
                importance: Notifications.AndroidImportance.HIGH,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#6C63FF',
                sound: 'default',
            });
        }
        const { status } = await Notifications.requestPermissionsAsync();
        return status === 'granted';
    } catch {
        return false;
    }
}

async function scheduleLocalNotification(dateString, reminder) {
    try {
        const secondsUntil = parseSecondsUntil(dateString, reminder.time);
        if (secondsUntil <= 0) return null;
        const notifId = await Notifications.scheduleNotificationAsync({
            content: {
                title: 'Meditation Reminder 🧘',
                body: `Time for: ${reminder.activity}`,
                sound: 'default',
                data: { reminderId: reminder.id },
            },
            trigger: {
                seconds: secondsUntil,
                channelId: 'reminders',
            },
        });
        return notifId;
    } catch {
        return null;
    }
}

async function cancelLocalNotification(notifId) {
    try {
        if (notifId) await Notifications.cancelScheduledNotificationAsync(notifId);
    } catch {}
}

function DailyReminder(props) {
    const darkMode = props.darkMode;
    const [selectedDate, setSelectedDate] = useState(getToday());
    const [reminders, setReminders] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [activityText, setActivityText] = useState('');
    const [timeText, setTimeText] = useState('');
    const [notifPermission, setNotifPermission] = useState(false);
    const alertedIds = useRef(new Set());

    // Setup notification channel & permission on mount
    useEffect(() => {
        setupNotifications().then(setNotifPermission);
    }, []);

    // Load persisted reminders from AsyncStorage on mount
    useEffect(() => {
        (async () => {
            try {
                const stored = await AsyncStorage.getItem(STORAGE_KEY);
                if (stored) setReminders(JSON.parse(stored));
            } catch {}
        })();
    }, []);

    // In-app alert fallback — polls every 30s when app is open
    useEffect(() => {
        const check = () => {
            const now = new Date();
            Object.entries(reminders).forEach(([date, items]) => {
                items.forEach((item) => {
                    if (alertedIds.current.has(item.id)) return;
                    const seconds = parseSecondsUntil(date, item.time);
                    if (seconds >= 0 && seconds <= 30) {
                        alertedIds.current.add(item.id);
                        Alert.alert('Meditation Reminder 🧘', `Time for: ${item.activity}`);
                    }
                });
            });
        };
        check();
        const interval = setInterval(check, 30000);
        return () => clearInterval(interval);
    }, [reminders]);

    const saveToStorage = async (updated) => {
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch {
            Alert.alert('Storage Error', 'Could not save reminder.');
        }
    };

    const dayReminders = reminders[selectedDate] || [];

    const markedDates = Object.keys(reminders).reduce((acc, date) => {
        if (reminders[date].length > 0) {
            acc[date] = { marked: true, dotColor: '#6C63FF' };
        }
        return acc;
    }, {
        [selectedDate]: { selected: true, selectedColor: '#6C63FF' },
    });

    const handleAddReminder = async () => {
        if (!activityText.trim() || !timeText.trim()) return;

        const secondsUntil = parseSecondsUntil(selectedDate, timeText.trim());
        if (secondsUntil <= 0) {
            Alert.alert('Invalid Time', 'Please choose a future time for the reminder.');
            return;
        }

        const reminder = {
            id: generateId(),
            time: timeText.trim(),
            activity: activityText.trim(),
            notifId: null,
        };

        // Schedule OS notification
        reminder.notifId = await scheduleLocalNotification(selectedDate, reminder);

        const updated = { ...reminders };
        updated[selectedDate] = [...(updated[selectedDate] || []), reminder];
        setReminders(updated);
        await saveToStorage(updated);

        setActivityText('');
        setTimeText('');
        setModalVisible(false);

        Alert.alert(
            'Reminder Set ✓',
            reminder.notifId
                ? `You will receive a notification at ${reminder.time} for "${reminder.activity}".`
                : `Reminder saved at ${reminder.time} for "${reminder.activity}". You'll get an in-app alert when the time comes.`,
        );
    };

    const deleteReminder = async (id) => {
        const updated = { ...reminders };
        const target = (updated[selectedDate] || []).find((r) => r.id === id);
        await cancelLocalNotification(target?.notifId);
        updated[selectedDate] = (updated[selectedDate] || []).filter((item) => item.id !== id);
        if (updated[selectedDate].length === 0) delete updated[selectedDate];
        alertedIds.current.delete(id);
        setReminders(updated);
        await saveToStorage(updated);
    };

    const [storageVisible, setStorageVisible] = useState(false);
    const [storageData, setStorageData] = useState([]);

    const viewStorageData = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            const pairs = await AsyncStorage.multiGet(keys);
            const parsed = pairs.map(([key, value]) => {
                let parsed = value;
                try { parsed = JSON.stringify(JSON.parse(value), null, 2); } catch {}
                return { key, value: parsed };
            });
            setStorageData(parsed);
            setStorageVisible(true);
        } catch {
            Alert.alert('Error', 'Could not read storage.');
        }
    };

    const openModal = () => {
        setTimeText(getNextRoundedTime());
        setActivityText('');
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setTimeText('');
        setActivityText('');
    };

    return (
        <View style={[styles.container, darkMode && styles.containerDark]}>
            <AppHeader onOpenSettings={props.onOpenSettings} onLogoPress={props.onBack} />

            <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent}>
                <View style={styles.titleRow}>
                    <Text style={[styles.title, darkMode && styles.titleDark]}>Daily Reminders</Text>
                    <View style={[styles.permBadge, notifPermission ? styles.permBadgeOn : styles.permBadgeOff]}>
                        <Ionicons
                            name={notifPermission ? 'notifications' : 'notifications-off-outline'}
                            size={12}
                            color={notifPermission ? '#fff' : '#E25C5C'}
                        />
                        <Text style={[styles.permText, notifPermission ? styles.permTextOn : styles.permTextOff]}>
                            {notifPermission ? 'Notifications On' : 'Notifications Off'}
                        </Text>
                    </View>
                </View>

                <Calendar
                    style={[styles.calendar, darkMode && styles.calendarDark]}
                    current={selectedDate}
                    markedDates={markedDates}
                    onDayPress={(day) => setSelectedDate(day.dateString)}
                    theme={{
                        todayTextColor: '#6C63FF',
                        selectedDayBackgroundColor: '#6C63FF',
                        arrowColor: '#6C63FF',
                        dotColor: '#6C63FF',
                        backgroundColor: darkMode ? '#1E1E1E' : '#fff',
                        calendarBackground: darkMode ? '#1E1E1E' : '#fff',
                        dayTextColor: darkMode ? '#E0E0E0' : '#2d4150',
                        textDisabledColor: darkMode ? '#555' : '#d9e1e8',
                        monthTextColor: darkMode ? '#fff' : '#2d4150',
                    }}
                />

                <View style={styles.listHeader}>
                    <Text style={[styles.sectionTitle, darkMode && styles.sectionTitleDark]}>
                        Activities on {selectedDate}
                    </Text>
                    <TouchableOpacity style={styles.addButton} onPress={openModal}>
                        <Ionicons name="add" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>

                {dayReminders.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Ionicons name="notifications-off-outline" size={40} color={darkMode ? '#555' : '#ccc'} />
                        <Text style={[styles.emptyText, darkMode && styles.emptyTextDark]}>No reminders for this day.</Text>
                        <Text style={[styles.emptySubText, darkMode && styles.emptySubTextDark]}>Tap + to schedule an activity.</Text>
                    </View>
                ) : (
                    dayReminders.map((item) => (
                        <View style={[styles.reminderCard, darkMode && styles.reminderCardDark]} key={item.id}>
                            <View style={styles.accentBar} />
                            <View style={styles.bellWrap}>
                                <Ionicons name="notifications" size={18} color="#fff" />
                            </View>
                            <View style={styles.cardBody}>
                                <Text style={[styles.cardActivity, darkMode && styles.cardActivityDark]} numberOfLines={1}>
                                    {item.activity}
                                </Text>
                                <View style={styles.cardTimeRow}>
                                    <Ionicons name="time-outline" size={13} color="#6C63FF" />
                                    <Text style={styles.cardTime}>{item.time}</Text>
                                    {item.notifId && (
                                        <Ionicons name="checkmark-circle" size={13} color="#4CAF50" style={{ marginLeft: 4 }} />
                                    )}
                                </View>
                            </View>
                            <TouchableOpacity
                                style={styles.deleteBtn}
                                onPress={() => deleteReminder(item.id)}
                                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                            >
                                <Ionicons name="trash-outline" size={17} color="#E25C5C" />
                            </TouchableOpacity>
                        </View>
                    ))
                )}
                {/* Storage Evidence Button */}
                <TouchableOpacity style={styles.storageBtn} onPress={viewStorageData}>
                    <Ionicons name="server-outline" size={16} color="#fff" />
                    <Text style={styles.storageBtnText}>View Local Storage Data</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Storage Evidence Modal */}
            <Modal visible={storageVisible} transparent animationType="slide" onRequestClose={() => setStorageVisible(false)}>
                <View style={styles.modalOverlay}>
                    <View style={[styles.modalCard, darkMode && styles.modalCardDark, { maxHeight: '85%' }]}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                            <Text style={[styles.modalTitle, darkMode && styles.modalTitleDark]}>AsyncStorage Data</Text>
                            <TouchableOpacity onPress={() => setStorageVisible(false)}>
                                <Ionicons name="close" size={22} color={darkMode ? '#fff' : '#333'} />
                            </TouchableOpacity>
                        </View>
                        <Text style={[styles.modalDate, darkMode && styles.modalDateDark]}>
                            {storageData.length} key(s) stored on device
                        </Text>
                        <ScrollView style={{ marginTop: 8 }}>
                            {storageData.length === 0 ? (
                                <Text style={{ color: '#999', textAlign: 'center', padding: 20 }}>No data in storage yet.</Text>
                            ) : (
                                storageData.map(({ key, value }) => (
                                    <View key={key} style={[styles.storageRow, darkMode && styles.storageRowDark]}>
                                        <View style={styles.storageKeyRow}>
                                            <Ionicons name="key-outline" size={13} color="#6C63FF" />
                                            <Text style={styles.storageKey}>{key}</Text>
                                        </View>
                                        <Text style={[styles.storageValue, darkMode && styles.storageValueDark]}>{value}</Text>
                                    </View>
                                ))
                            )}
                        </ScrollView>
                    </View>
                </View>
            </Modal>

            <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={closeModal}>
                <View style={styles.modalOverlay}>
                    <View style={[styles.modalCard, darkMode && styles.modalCardDark]}>
                        <Text style={[styles.modalTitle, darkMode && styles.modalTitleDark]}>Add Reminder</Text>
                        <Text style={[styles.modalDate, darkMode && styles.modalDateDark]}>{selectedDate}</Text>

                        <TextInput
                            style={[styles.input, darkMode && styles.inputDark]}
                            placeholder="Time (e.g. 7:00 AM)"
                            placeholderTextColor={darkMode ? '#666' : '#aaa'}
                            value={timeText}
                            onChangeText={setTimeText}
                        />
                        <TextInput
                            style={[styles.input, darkMode && styles.inputDark]}
                            placeholder="Activity (e.g. Calm Mind meditation)"
                            placeholderTextColor={darkMode ? '#666' : '#aaa'}
                            value={activityText}
                            onChangeText={setActivityText}
                        />

                        <View style={styles.modalActions}>
                            <TouchableOpacity style={styles.modalCancelButton} onPress={closeModal}>
                                <Text style={[styles.modalCancelText, darkMode && styles.modalCancelTextDark]}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalSaveButton} onPress={handleAddReminder}>
                                <Text style={styles.modalSaveText}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    containerDark: { backgroundColor: '#121212' },
    body: { flex: 1 },
    bodyContent: { paddingHorizontal: 24, paddingTop: 24, paddingBottom: 32 },
    titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
    title: { fontSize: 22, fontWeight: '700', color: '#333' },
    titleDark: { color: '#fff' },
    permBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, borderRadius: 20, paddingHorizontal: 8, paddingVertical: 4 },
    permBadgeOn: { backgroundColor: '#6C63FF' },
    permBadgeOff: { backgroundColor: '#FFF0F0', borderWidth: 1, borderColor: '#E25C5C' },
    permText: { fontSize: 10, fontWeight: '700' },
    permTextOn: { color: '#fff' },
    permTextOff: { color: '#E25C5C' },
    calendar: { borderRadius: 12, borderWidth: 1, borderColor: '#eee', marginBottom: 24 },
    calendarDark: { borderColor: '#2A2A2A' },
    listHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 },
    sectionTitle: { fontSize: 16, fontWeight: '700', color: '#333', flex: 1 },
    sectionTitleDark: { color: '#fff' },
    addButton: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#6C63FF', alignItems: 'center', justifyContent: 'center' },
    emptyState: { alignItems: 'center', paddingVertical: 36, gap: 8 },
    emptyText: { fontSize: 15, color: '#aaa', fontWeight: '600', marginTop: 4 },
    emptyTextDark: { color: '#555' },
    emptySubText: { fontSize: 13, color: '#ccc' },
    emptySubTextDark: { color: '#444' },
    reminderCard: {
        flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff',
        borderRadius: 14, marginBottom: 12, overflow: 'hidden',
        shadowColor: '#6C63FF', shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1, shadowRadius: 8, elevation: 3,
    },
    reminderCardDark: { backgroundColor: '#1E1E1E' },
    accentBar: { width: 4, alignSelf: 'stretch', backgroundColor: '#6C63FF' },
    bellWrap: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#6C63FF', alignItems: 'center', justifyContent: 'center', marginLeft: 12, marginRight: 12 },
    cardBody: { flex: 1, paddingVertical: 14 },
    cardActivity: { fontSize: 15, fontWeight: '700', color: '#2D2D2D', marginBottom: 4 },
    cardActivityDark: { color: '#E0E0E0' },
    cardTimeRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    cardTime: { fontSize: 12, color: '#6C63FF', fontWeight: '600' },
    deleteBtn: { padding: 14 },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', alignItems: 'center', justifyContent: 'center', padding: 24 },
    modalCard: { width: '100%', maxWidth: 400, backgroundColor: '#fff', borderRadius: 16, padding: 20 },
    modalCardDark: { backgroundColor: '#1E1E1E' },
    modalTitle: { fontSize: 18, fontWeight: '700', color: '#333', marginBottom: 4 },
    modalTitleDark: { color: '#fff' },
    modalDate: { fontSize: 13, color: '#999', marginBottom: 16 },
    modalDateDark: { color: '#666' },
    input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 12, color: '#333' },
    inputDark: { borderColor: '#444', backgroundColor: '#2A2A2A', color: '#E0E0E0' },
    modalActions: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 8 },
    modalCancelButton: { paddingVertical: 10, paddingHorizontal: 16 },
    modalCancelText: { color: '#777', fontWeight: '600' },
    modalCancelTextDark: { color: '#aaa' },
    modalSaveButton: { backgroundColor: '#6C63FF', borderRadius: 8, paddingVertical: 10, paddingHorizontal: 18, marginLeft: 8 },
    modalSaveText: { color: '#fff', fontWeight: '600' },
    storageBtn: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
        backgroundColor: '#4CAF50', borderRadius: 10, paddingVertical: 12,
        marginTop: 24, gap: 8,
    },
    storageBtnText: { color: '#fff', fontWeight: '700', fontSize: 14 },
    storageRow: {
        backgroundColor: '#F5F4FF', borderRadius: 8, padding: 12,
        marginBottom: 10, borderLeftWidth: 3, borderLeftColor: '#6C63FF',
    },
    storageRowDark: { backgroundColor: '#1E1B3A' },
    storageKeyRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 },
    storageKey: { fontSize: 12, fontWeight: '700', color: '#6C63FF' },
    storageValue: { fontSize: 11, color: '#444', fontFamily: 'monospace' },
    storageValueDark: { color: '#ccc' },
});

export default DailyReminder;
