import React, { useState, useEffect } from 'react';
import { View, FlatList, Alert, StyleSheet } from 'react-native';
import { Appbar, Text } from 'react-native-paper';
import { getHistory, clearHistory } from '../storage/Storage';
import ResultCard from '../components/ResultCard';

export default function HistoryScreen({ navigation }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  // Geçmişi yükle
  const loadHistory = async () => {
    try {
      const data = await getHistory();
      setHistory(data || []);
    } catch (error) {
      console.error("loadHistory error:", error);
      Alert.alert('Hata', 'Geçmiş verileri yüklenemedi.');
    }
  };

  // Geçmişi temizle
  const handleClearHistory = () => {
    Alert.alert(
      'Uyarı',
      'Geçmişi silmek istediğinize emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Sil',
          style: 'destructive',
          onPress: async () => {
            try {
              await clearHistory();
              setHistory([]);
            } catch (err) {
              console.error("clearHistory error:", err);
              Alert.alert("Hata", "Geçmiş silinemedi.");
            }
          },
        },
      ]
    );
  };

  // Her bir item için ResultCard render
  const renderItem = ({ item }) => (
    <View style={styles.cardWrapper}>
      <ResultCard
        emotion={item.sentiment || "neutral"}
        summary={item.summary || "-"}
        suggestion={item.suggestion || "-"}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Haftalık Özet" />
        <Appbar.Action icon="- delete" onPress={handleClearHistory} />
      </Appbar.Header>

      {history.length > 0 ? (
        <FlatList
          data={history}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Henüz geçmiş yok.</Text>
        </View>
      )}
    </View>
  );
}

// Stil
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E1F5FE', // açık mavi HomeScreen uyumlu
  },
  header: {
    backgroundColor: '#03A9F4', // HomeScreen header rengi
  },
  listContainer: {
    paddingTop: 5,
    paddingBottom: 10,
    paddingHorizontal: 12,
   
   
  },
  cardWrapper: {
    width: '100%', 
    marginBottom: 5, // kartlar arası boşluk
    
  },
  emptyContainer: {
  
    justifyContent: 'center',
    alignItems: 'center',
     
  },
  emptyText: {
    fontSize: 16,
    color: '#555',
  },
});
