import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Fallback quotes used on web (CORS blocks zenquotes.io in browsers)
// and as a safety net if the API is unreachable on mobile
const fallbackQuotes = [
    { text: 'The present moment is the only moment available to us, and it is the door to all moments.', author: 'Thich Nhat Hanh' },
    { text: 'You have a treasure within you that is infinitely greater than anything the world can offer.', author: 'Eckhart Tolle' },
    { text: 'Meditation is not about stopping thoughts, but recognizing that we are more than our thoughts.', author: 'Arianna Huffington' },
    { text: 'The thing about meditation is: you become more and more you.', author: 'David Lynch' },
    { text: 'To the mind that is still, the whole universe surrenders.', author: 'Lao Tzu' },
    { text: 'Calm mind brings inner strength and self-confidence.', author: 'Dalai Lama' },
    { text: 'Peace comes from within. Do not seek it without.', author: 'Buddha' },
    { text: 'The quieter you become, the more you can hear.', author: 'Ram Dass' },
    { text: 'Within you, there is a stillness and a sanctuary to which you can retreat at any time.', author: 'Hermann Hesse' },
    { text: 'Breathe. Let go. And remind yourself that this very moment is the only one you know you have for sure.', author: 'Oprah Winfrey' },
];

function getRandomFallback() {
    return fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
}

async function fetchQuoteFromAPI() {
    const response = await fetch('https://zenquotes.io/api/random', {
        headers: { 'Accept': 'application/json' },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    return { text: data[0].q, author: data[0].a };
}

function DailyQuotes({ darkMode }) {
    const [quote, setQuote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [source, setSource] = useState(''); // 'api' | 'local'

    const loadQuote = async () => {
        setLoading(true);
        // Web: CORS blocks zenquotes.io — use local immediately
        if (Platform.OS === 'web') {
            setQuote(getRandomFallback());
            setSource('local');
            setLoading(false);
            return;
        }
        // Mobile: fetch from live API
        try {
            const apiQuote = await fetchQuoteFromAPI();
            setQuote(apiQuote);
            setSource('api');
        } catch {
            // API unreachable — fall back to local list silently
            setQuote(getRandomFallback());
            setSource('local');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadQuote();
    }, []);

    return (
        <View style={[styles.card, darkMode && styles.cardDark]}>
            <View style={styles.accentBar} />

            <View style={styles.topRow}>
                <View style={styles.sourceBadge}>
                    <Ionicons
                        name={source === 'api' ? 'globe-outline' : 'library-outline'}
                        size={11}
                        color="#6C63FF"
                    />
                    <Text style={[styles.sourceText, darkMode && styles.sourceTextDark]}>
                        {source === 'api' ? 'Live Quote' : 'Daily Quote'}
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={loadQuote}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    disabled={loading}
                >
                    <Ionicons
                        name="refresh-outline"
                        size={17}
                        color={loading ? '#ccc' : '#6C63FF'}
                    />
                </TouchableOpacity>
            </View>

            <Text style={[styles.bigQuote, darkMode && styles.bigQuoteDark]}>"</Text>

            {loading ? (
                <View style={styles.loaderWrap}>
                    <ActivityIndicator size="small" color="#6C63FF" />
                    <Text style={[styles.loadingText, darkMode && styles.loadingTextDark]}>
                        Fetching quote...
                    </Text>
                </View>
            ) : (
                <>
                    <Text style={[styles.quoteText, darkMode && styles.quoteTextDark]}>
                        {quote.text}
                    </Text>
                    <View style={styles.footer}>
                        <View style={[styles.divider, darkMode && styles.dividerDark]} />
                        <View style={styles.authorRow}>
                            <Ionicons name="person-circle-outline" size={16} color="#6C63FF" />
                            <Text style={[styles.author, darkMode && styles.authorDark]}>
                                {quote.author}
                            </Text>
                        </View>
                    </View>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: '100%',
        backgroundColor: '#F5F4FF',
        borderRadius: 20,
        paddingTop: 20,
        paddingBottom: 18,
        paddingHorizontal: 20,
        overflow: 'hidden',
        shadowColor: '#6C63FF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.18,
        shadowRadius: 10,
        elevation: 4,
    },
    cardDark: { backgroundColor: '#1E1B3A' },
    accentBar: {
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: 4,
        backgroundColor: '#6C63FF',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    sourceBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: '#EAE9FF',
        borderRadius: 20,
        paddingHorizontal: 8,
        paddingVertical: 3,
    },
    sourceText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#6C63FF',
        letterSpacing: 0.5,
        textTransform: 'uppercase',
    },
    sourceTextDark: { color: '#A89BFF' },
    bigQuote: {
        fontSize: 64,
        lineHeight: 56,
        color: '#6C63FF',
        fontWeight: '900',
        opacity: 0.25,
        marginBottom: -10,
    },
    bigQuoteDark: { color: '#A89BFF' },
    loaderWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 16,
    },
    loadingText: {
        fontSize: 13,
        color: '#999',
        fontStyle: 'italic',
    },
    loadingTextDark: { color: '#666' },
    quoteText: {
        fontSize: 15,
        lineHeight: 24,
        color: '#2D2D2D',
        fontStyle: 'italic',
        fontWeight: '500',
        letterSpacing: 0.2,
    },
    quoteTextDark: { color: '#DDD9FF' },
    footer: { marginTop: 16 },
    divider: {
        height: 1,
        backgroundColor: '#E0DCFF',
        marginBottom: 10,
    },
    dividerDark: { backgroundColor: '#2E2B50' },
    authorRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    author: {
        fontSize: 13,
        fontWeight: '700',
        color: '#6C63FF',
        letterSpacing: 0.3,
    },
    authorDark: { color: '#A89BFF' },
});

export default DailyQuotes;
