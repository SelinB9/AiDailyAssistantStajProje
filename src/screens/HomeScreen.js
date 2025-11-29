import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { analyzeSentiment } from '../utils/api';
import { saveHistory } from '../storage/Storage';
import ResultCard from '../components/ResultCard';

const HomeScreen = ({ navigation }) => {
    const [inputText, setInputText] = useState('');
    const [emotion, setEmotion] = useState(null);
    const [summary, setSummary] = useState('');
    const [suggestion, setSuggestion] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const isResultVisible = emotion !== null;

    const handleAnalyze = async () => {
        if (!inputText.trim()) return;

        setIsLoading(true);
        setEmotion(null);
        setSummary('');
        setSuggestion('');

        try {
            const result = await analyzeSentiment(inputText);

            // Ekranda göstermek için state'leri güncelle
            setEmotion(result.emotion);
            setSummary(result.summary);
            setSuggestion(result.suggestion);

            // Geçmişe kaydetme: API'den gelen verilerle doğru anahtarlar kullanılıyor
            await saveHistory({
                text: inputText, 
                sentiment: result.emotion,     // API'den gelen emotion anahtarı
                summary: result.summary,       // API'den gelen summary
                suggestion: result.suggestion, // API'den gelen suggestion
                date: new Date().toISOString() 
            });

        } catch (error) {
            console.error("Analiz hatası:", error);
            //  DÜZELTME: setSentiment yerine setEmotion kullanıldı.
            setEmotion("error"); 
            setSummary("Bir hata oluştu.");
            setSuggestion("Lütfen tekrar deneyin.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.mainTitle} variant="headlineMedium">AI GÜNLÜK ASİSTAN</Text>
                <Text style={styles.subTitle} variant="titleMedium">Duygu Analizi</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.formContainer}>
                    <TextInput
                        label="Lütfen metninizi buraya girin..."
                        value={inputText}
                        onChangeText={setInputText}
                        mode="outlined"
                        multiline
                        numberOfLines={5}
                        style={styles.input}
                    />

                    <Button
                        mode="contained"
                        onPress={handleAnalyze}
                        loading={isLoading}
                        disabled={!inputText.trim() || isLoading}
                        style={[styles.button, { backgroundColor: '#00BCD4' }]}
                        labelStyle={styles.buttonLabel}
                    >
                        {isLoading ? 'ANALİZ EDİLİYOR...' : 'DUYGU ANALİZİ YAP'}
                    </Button>
                </View>

                {isResultVisible && (
                    <ResultCard emotion={emotion} summary={summary} suggestion={suggestion} />
                )}

                <Button
                    icon="history"
                    mode="text"
                    onPress={() => navigation.navigate('History')}
                    labelStyle={{ color: '#00838F', fontWeight: 'bold' }}
                    style={styles.historyButton}
                >
                    Analiz Tarihçesini Gör
                </Button>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#E0F7FA' },
    header: { paddingTop: 50, paddingBottom: 25, backgroundColor: '#B2EBF2', alignItems: 'center', borderBottomLeftRadius: 15, borderBottomRightRadius: 15, elevation: 2, marginBottom: 20 },
    mainTitle: { fontWeight: '900', color: '#006064' },
    subTitle: { color: '#00838F', marginTop: 5, fontWeight: '600' },
    content: { paddingHorizontal: 20, paddingVertical: 10, alignItems: 'center' },
    formContainer: { width: '100%', maxWidth: 400, backgroundColor: '#FFF', padding: 15, borderRadius: 10, elevation: 3, marginBottom: 30 },
    input: { marginBottom: 20, backgroundColor: '#FFF' },
    button: { paddingVertical: 10, borderRadius: 12, elevation: 6 },
    buttonLabel: { fontSize: 18, fontWeight: 'bold' },
    historyButton: { marginTop: 30 }
});

export default HomeScreen;