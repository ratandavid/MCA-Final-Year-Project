import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

function MeditationCard(props) {
    const meditation = props.meditation;

    return (
        <TouchableOpacity
            style={styles.meditationCard}
            activeOpacity={0.85}
            onPress={() => props.onPress && props.onPress(meditation)}
        >
            <View style={styles.meditationImageWrapper}>
                <Image source={{ uri: meditation.image }} style={styles.meditationImage} />
                <View style={styles.durationBadge}>
                    <Text style={styles.durationBadgeText}>{meditation.duration}</Text>
                </View>
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.65)']}
                    style={styles.meditationGradient}
                >
                    <Text style={styles.meditationImageTitle}>{meditation.title}</Text>
                </LinearGradient>
                <View style={styles.playButton}>
                    <Ionicons name="play" size={18} color="#fff" />
                </View>
            </View>
            <View style={styles.meditationInfo}>
                <Text style={styles.meditationDescription}>{meditation.description}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    meditationCard: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 16,
        marginBottom: 18,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#eee',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 10,
        elevation: 4,
    },
    meditationImageWrapper: {
        width: '100%',
        height: 170,
    },
    meditationImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        backgroundColor: '#F1F0FF',
    },
    durationBadge: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(0,0,0,0.45)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 20,
    },
    durationBadgeText: {
        color: '#fff',
        fontSize: 11,
        fontWeight: '600',
    },
    meditationGradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '60%',
        justifyContent: 'flex-end',
        paddingHorizontal: 14,
        paddingBottom: 12,
    },
    meditationImageTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
    },
    playButton: {
        position: 'absolute',
        bottom: 12,
        right: 14,
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: '#6C63FF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    meditationInfo: {
        padding: 14,
    },
    meditationDescription: {
        fontSize: 13,
        color: '#777',
        lineHeight: 18,
    },
});

export default MeditationCard;
