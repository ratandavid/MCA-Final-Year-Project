import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, ScrollView, Share } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppHeader from '../components/AppHeader';

function Cardview(props) {
    const meditation = props.meditation;
    const [activeTab, setActiveTab] = useState('about');
    const isFavorite = props.isFavorite;

    const handleShare = () => {
        if (!meditation) return;
        Share.share({
            message: `${meditation.title} (${meditation.duration}) - ${meditation.description}`,
        });
    };

    return (
        <View style={styles.container}>
            <AppHeader rightIcon="share-social-outline" onRightPress={handleShare} onLogoPress={props.onBack} />

            {!meditation ? (
                <View style={styles.emptyWrapper}>
                    <Text style={styles.emptyText}>No meditation selected.</Text>
                    <TouchableOpacity style={styles.backButtonInline} onPress={props.onBack}>
                        <Text style={styles.backButtonInlineText}>Go back</Text>
                    </TouchableOpacity>
                </View>
            ) : (
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

                        <View style={styles.tabRow}>
                            <TouchableOpacity
                                style={[styles.tabPill, activeTab === 'about' && styles.tabPillActive]}
                                onPress={() => setActiveTab('about')}
                            >
                                <Text style={[styles.tabPillText, activeTab === 'about' && styles.tabPillTextActive]}>
                                    About
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.tabPill, activeTab === 'instructions' && styles.tabPillActive]}
                                onPress={() => setActiveTab('instructions')}
                            >
                                <Text style={[styles.tabPillText, activeTab === 'instructions' && styles.tabPillTextActive]}>
                                    Instructions
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {activeTab === 'about' ? (
                            <View>
                                <Text style={styles.description}>{meditation.description}</Text>
                                {meditation.benefits && (
                                    <View style={styles.benefitsSection}>
                                        <Text style={styles.sectionLabel}>How it helps reduce stress</Text>
                                        <Text style={styles.benefitsText}>{meditation.benefits}</Text>
                                    </View>
                                )}
                            </View>
                        ) : (
                            <View>
                                {(meditation.instructions || []).map((step, index) => (
                                    <View style={styles.stepRow} key={index}>
                                        <View style={styles.stepNumber}>
                                            <Text style={styles.stepNumberText}>{index + 1}</Text>
                                        </View>
                                        <Text style={styles.stepText}>{step}</Text>
                                    </View>
                                ))}
                            </View>
                        )}
                    </View>
                </ScrollView>
            )}

            {meditation && (
                <View style={styles.favBar}>
                    <TouchableOpacity
                        style={[styles.favButton, isFavorite && styles.favButtonActive]}
                        onPress={props.onToggleFavorite}
                        activeOpacity={0.85}
                    >
                        <Ionicons
                            name={isFavorite ? 'heart' : 'heart-outline'}
                            size={20}
                            color={isFavorite ? '#fff' : '#6C63FF'}
                        />
                        <Text style={[styles.favButtonText, isFavorite && styles.favButtonTextActive]}>
                            {isFavorite ? 'Added to Fav' : 'Add to Fav'}
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
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
    favButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingVertical: 14,
        borderRadius: 8,
        backgroundColor: '#F1F0FF',
        borderWidth: 1,
        borderColor: '#6C63FF',
    },
    favButtonActive: {
        backgroundColor: '#6C63FF',
        borderColor: '#6C63FF',
    },
    favButtonText: {
        marginLeft: 8,
        fontSize: 16,
        fontWeight: '600',
        color: '#6C63FF',
    },
    favButtonTextActive: {
        color: '#fff',
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
        marginBottom: 16,
    },
    tabRow: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    tabPill: {
        paddingVertical: 8,
        paddingHorizontal: 18,
        borderRadius: 20,
        backgroundColor: '#F1F0FF',
        marginRight: 10,
    },
    tabPillActive: {
        backgroundColor: '#6C63FF',
    },
    tabPillText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#6C63FF',
    },
    tabPillTextActive: {
        color: '#fff',
    },
    description: {
        fontSize: 15,
        lineHeight: 22,
        color: '#666',
        marginBottom: 24,
    },
    stepRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    stepNumber: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#6C63FF',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
        marginTop: 2,
    },
    stepNumberText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '700',
    },
    stepText: {
        flex: 1,
        fontSize: 14,
        lineHeight: 21,
        color: '#555',
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

export default Cardview;
