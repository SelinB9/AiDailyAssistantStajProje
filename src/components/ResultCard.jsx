import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';

// Yardımcı: Metnin ilk harfini büyük yap
const capitalizeFirstLetter = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
};

// Helper: emoji
const getSentimentEmoji = (emotion) => {
    const e = emotion?.toLowerCase(); 
    switch (e) {
        case 'positive': return '🐱 Pozitif';
        case 'negative': return '😿 Negatif';
        case 'neutral': return '🙃 Nötr';
        case 'error': return '❌ HATA';
        default: return '🙃 Nötr';
    }
};

const ResultCard = ({ emotion, summary, suggestion, text }) => { // text prop'u eklendi
    return (
        <Card style={styles.card}>
            <Card.Content style={styles.cardContent}>
                <Text variant="titleLarge" style={styles.resultTitle}>SONUÇ</Text>

                <Text
                    variant="displaySmall"
                    style={[
                        styles.resultText,
                        emotion === "negative"
                            ? { color: "red" }
                            : emotion === "positive"
                                ? { color: "green" }
                                : { color: "#006064" }
                    ]}
                >
                    {getSentimentEmoji(emotion)}
                </Text>

                {/* Eğer geçmişten geliyorsa, metni de gösterelim */}
                {text && (
                    <Text style={styles.detailText}>
                        **Metin:** {text}
                    </Text>
                )}

                <Text style={styles.detailText}>
                    Duygu: <Text style={{ fontWeight: "bold" }}>{capitalizeFirstLetter(emotion)}</Text>
                </Text>

                <Text style={styles.detailText}>
                    Özet: {summary}
                </Text>

                <Text style={styles.detailText}>
                    Öneri: {suggestion}
                </Text>
            </Card.Content>
        </Card>
    );
};


const styles = StyleSheet.create({
card: { 
       width: "100%"
    },
 cardContent: { 
        alignItems: 'center',
        paddingVertical: 5,
     paddingHorizontal: 10,
    
    },
 resultTitle: { 
        marginBottom: 2,
    },
 resultText: { 
        textAlign: 'center', 
        marginTop: 2, 
        fontSize: 24, 
        fontWeight: 'bold' 
    },
    detailText: { 
        marginTop: 2, 
        fontSize: 14 
    }
});
export default ResultCard;