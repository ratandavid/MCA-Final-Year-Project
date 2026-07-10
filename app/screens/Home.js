import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppHeader from '../components/AppHeader';
import MeditationCard from '../components/MeditationCard';
import DailyQuotes from '../components/DailyQuotes';

const meditations = [
    {
        title: 'Calm Mind',
        duration: '10 min',
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80',
        description: 'A 10-minute guided session at sunset to ease your thoughts and find stillness.',
        benefits: 'Slow, guided breathing during this session activates your body\'s relaxation response, lowering cortisol and heart rate. Just 10 minutes can quiet racing thoughts and leave you feeling noticeably calmer.',
        instructions: [
            'Find a quiet spot and sit or lie down comfortably.',
            'Close your eyes and take three slow, deep breaths.',
            'Breathe in for 4 counts, hold for 4, and exhale for 6.',
            'Let thoughts pass without judging them; gently return to your breath.',
            'Continue for 10 minutes, then slowly open your eyes.',
        ],
    },
    {
        title: 'Sleep Sounds',
        duration: '20 min',
        image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&q=80',
        description: 'Drift off under a starry night with soft ambient sounds for deep, restful sleep.',
        benefits: 'Gentle ambient sound masks intrusive thoughts and signals your nervous system to wind down. Better sleep directly lowers next-day stress hormone levels, helping you feel more resilient.',
        instructions: [
            'Dim the lights and get into bed in a comfortable position.',
            'Put on the ambient sound track at a low, soothing volume.',
            'Relax your body from your toes up to your shoulders.',
            'Focus on the sound instead of your thoughts as you drift off.',
            'Let yourself fall asleep naturally; the track will fade out.',
        ],
    },
    {
        title: 'Stress Relief',
        duration: '15 min',
        image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80',
        description: 'Breathe through a quiet forest soundscape to release tension and reset your mind.',
        benefits: 'Combining nature sounds with focused breathing interrupts the stress response and shifts your body out of "fight or flight." Regular practice builds long-term resilience to daily stressors.',
        instructions: [
            'Sit upright in a comfortable chair with your feet flat on the floor.',
            'Start the forest soundscape and let your shoulders drop.',
            'Inhale through your nose for 4 counts, exhale through your mouth for 6.',
            'Tense and release each muscle group, from feet to face.',
            'Sit with the sound for the remaining time, breathing naturally.',
        ],
    },
];

function Home(props) {
    const darkMode = props.darkMode;

    return (
        <View style={[styles.container, darkMode && styles.containerDark]}>
            <AppHeader onOpenSettings={props.onOpenSettings} />
            <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent}>
                <Text style={[styles.greeting, darkMode && styles.greetingDark]}>
                    Hello, {props.userName || 'there'}
                </Text>
                <DailyQuotes darkMode={darkMode} />

                <TouchableOpacity
                    style={[styles.reminderBanner, darkMode && styles.reminderBannerDark]}
                    onPress={props.onOpenReminders}
                    activeOpacity={0.82}
                >
                    <View style={styles.reminderIconWrap}>
                        <Ionicons name="notifications" size={22} color="#fff" />
                    </View>
                    <View style={styles.reminderTextWrap}>
                        <Text style={styles.reminderTitle}>Daily Reminder</Text>
                        <Text style={styles.reminderSub}>Schedule your meditation sessions</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#fff" style={{ opacity: 0.8 }} />
                </TouchableOpacity>

                <Text style={[styles.sectionTitle, darkMode && styles.sectionTitleDark]}>
                    Popular Meditations
                </Text>
                {meditations.map((item) => (
                    <MeditationCard
                        key={item.title}
                        meditation={item}
                        onPress={props.onSelectMeditation}
                    />
                ))}
            </ScrollView>
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
    },
    bodyContent: {
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: 32,
        paddingBottom: 32,
    },
    greeting: {
        fontSize: 24,
        fontWeight: '700',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    greetingDark: {
        color: '#fff',
    },
    reminderBanner: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#6C63FF',
        borderRadius: 16,
        paddingVertical: 14,
        paddingHorizontal: 16,
        marginTop: 20,
        shadowColor: '#6C63FF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 8,
        elevation: 5,
    },
    reminderBannerDark: {
        backgroundColor: '#4B44CC',
    },
    reminderIconWrap: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    reminderTextWrap: {
        flex: 1,
    },
    reminderTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 2,
    },
    reminderSub: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.75)',
    },
    sectionTitle: {
        width: '100%',
        fontSize: 18,
        fontWeight: '700',
        color: '#333',
        marginTop: 32,
        marginBottom: 12,
    },
    sectionTitleDark: {
        color: '#fff',
    },
});

export default Home;
