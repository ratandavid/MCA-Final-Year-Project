import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppHeader from '../components/AppHeader';
import MeditationCard from '../components/MeditationCard';

function MyFav(props) {
    const favorites = props.favorites || [];

    return (
        <View style={styles.container}>
            <AppHeader onOpenSettings={props.onOpenSettings} onLogoPress={props.onBack} />

            <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent}>
                <Text style={styles.title}>My Favourites</Text>

                {favorites.length === 0 ? (
                    <View style={styles.emptyWrapper}>
                        <Ionicons name="heart-outline" size={48} color="#ccc" />
                        <Text style={styles.emptyText}>
                            You haven't added any meditations to your favourites yet.
                        </Text>
                    </View>
                ) : (
                    favorites.map((item) => (
                        <MeditationCard
                            key={item.title}
                            meditation={item}
                            onPress={props.onSelectMeditation}
                        />
                    ))
                )}
            </ScrollView>
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
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 32,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: '#333',
        marginBottom: 20,
    },
    emptyWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
    },
    emptyText: {
        marginTop: 12,
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
        paddingHorizontal: 30,
    },
});

export default MyFav;
