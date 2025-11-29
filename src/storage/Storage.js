import AsyncStorage from '@react-native-async-storage/async-storage';

// AsyncStorage'da tarihçenin saklanacağı anahtar
const HISTORY_KEY ='@AiDailyAssistant:history';//bu anahtarı kodun kendisi belirliyor ve kullanıyor dişardan herhangi bi yere girmiyoruz

/*
 * Yeni bir analiz sonucunu tarihçeye kaydeder.
 * @param {object} item - Kaydedilecek öğe ({ text: string, sentiment: string, date: string })*/
export async function saveHistory(item) {
    try {
        const existingHistory = await getHistory();
        
        // Yeni öğeye benzersiz bir id ekleyelim (zaman damgası)
        const newItem = { ...item, id: Date.now() }; 
        
        existingHistory.push(newItem); 

        await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(existingHistory));
        
    } catch (error) {
        console.error("Tarihçeye kaydederken hata oluştu:", error);
        throw error;
    }
}

/**
 * Tüm analiz tarihçesini döndürür.
 * @returns {Promise<Array<object>>} - Tarihçe kayıtlarının listesi.
 */
export async function getHistory() {
    try {
        const jsonValue = await AsyncStorage.getItem(HISTORY_KEY);
        // JSON yoksa (ilk defa çalışıyorsa) boş bir dizi döndür
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (error) {
        console.error("Tarihçe okunurken hata oluştu:", error);
        throw error;
    }
}

/**
 * Tüm analiz tarihçesini temizler.
 */
export async function clearHistory() {
    try {
        await AsyncStorage.removeItem(HISTORY_KEY);
    } catch (error) {
        console.error("Tarihçe temizlenirken hata oluştu:", error);
        throw error;
    }
}