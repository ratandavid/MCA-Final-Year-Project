import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppHeader from '../components/AppHeader';

function RemFav(props) {
    const meditation = props.meditation;

    if (!meditation) {
        return (
            <View style={styles.container}>
                <AppHeader onOpenSettings={props.onOpenSettings} onLogoPress={props.onBack} />
                <View style={styles.emptyWrapper}>
                    <Text style={styles.emptyText}>No meditation selected.</Text>
                    <TouchableOpacity style={styles.backButtonInline} onPress={props.onBack}>
                        <Text style={styles.backButtonInlineText}>Go back</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <AppHeader onOpenSettings={props.onOpenSettings} onLogoPress={props.onBack} />

            <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent}>
                <View style={styles.imageWrapper}>
                    <Image source={{ uri: meditation.image }} style={styles.image} />
                    <TouchableOpacity style={styles.backButton} onPress={props.onBack} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                        <Ionicons name="arrow-back" size={22} color="#fff" />
                    </TouchableOpacity>
                    <View style={styles.durationBadge}>
                        <Text style={styles.durationBadgeText}>{meditation.duration}</Text>
                    </View>
                </View>

                <View style={styles.detailBody}>
                    <Text style={styles.title}>{meditation.title}</Text>
                    <Text style={styles.description}>{meditation.description}</Text>

                    {meditation.benefits && (
                        <View style={styles.benefitsSection}>
                            <Text style={styles.sectionLabel}>How it helps reduce stress</Text>
                            <Text style={styles.benefitsText}>{meditation.benefits}</Text>
                        </View>
                    )}
                </View>
            </ScrollView>

            <View style={styles.favBar}>
                <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => props.onRemoveFavorite && props.onRemoveFavorite(meditation)}
                    activeOpacity={0.85}
                >
                    <Ionicons name="trash-outline" size={20} color="#fff" />
                    <Text style={styles.removeButtonText}>Remove from Fav</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    body: {
        flex: 1,
    },
    bodyContent: {
        paddingBottom: 100,
    },
    imageWrapper: {
        width: '100%',
        height: 280,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        backgroundColor: '#F1F0FF',
    },
    backButton: {
        position: 'absolute',
        top: 16,
        left: 16,
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: 'rgba(0,0,0,0.4)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    durationBadge: {
        position: 'absolute',
        bottom: 14,
        right: 14,
        backgroundColor: 'rgba(0,0,0,0.45)',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
    },
    durationBadgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
    detailBody: {
        padding: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#333',
        marginBottom: 12,
    },
    description: {
        fontSize: 15,
        lineHeight: 22,
        color: '#666',
        marginBottom: 24,
    },
    benefitsSection: {
        backgroundColor: '#F1F0FF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 28,
    },
    sectionLabel: {
        fontSize: 14,
        fontWeight: '700',
        color: '#6C63FF',
        marginBottom: 8,
    },
    benefitsText: {
        fontSize: 14,
        lineHeight: 21,
        color: '#555',
    },
    favBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    removeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingVertical: 14,
        borderRadius: 8,
        backgroundColor: '#E25C5C',
    },
    removeButtonText: {
        marginLeft: 8,
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
    emptyWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        textAlign: 'center',
        color: '#777',
    },
    backButtonInline: {
        marginTop: 20,
        alignSelf: 'center',
    },
    backButtonInlineText: {
        color: '#6C63FF',
        fontWeight: '600',
    },
});

export default RemFav;
