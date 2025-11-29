import { HUGGING_FACE_API_KEY } from '@env';

// api.js dosyasında:
const API_URL = "https://router.huggingface.co/hf-inference/models/savasy/bert-base-turkish-sentiment-cased";

// (generateSummary ve generateSuggestion fonksiyonları aynı kalacak)
function generateSummary(sentiment) {
  switch (sentiment) {
    case "positive":
      return "Bugün genel olarak iyi ve motive bir ruh halindesin.";
    case "negative":
      return "Bugün biraz zorlayıcı bir gün geçirmiş olabilirsin.";
    default:
      return "Bugün dengeli ve nötr bir ruh halindesin.";
  }
}

function generateSuggestion(sentiment) {
  switch (sentiment) {
    case "positive":
      return "Bu enerjiyi sürdürmek için kısa bir yürüyüş yapabilirsin!";
    case "negative":
      return "Kendine 10 dakikalık bir mola verip rahatlamayı deneyebilirsin.";
    default:
      return "Günü sakin bir tempoda devam ettirmek iyi gelebilir.";
  }
}


export async function analyzeSentiment(text) {
  if (!HUGGING_FACE_API_KEY)
    throw new Error("API anahtarı bulunamadı!");

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${HUGGING_FACE_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ inputs: text })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Hatası: ${response.status} - ${errorText}`);
  }

  const data = await response.json();

  console.log("API Data:", data); // Gelen veriyi kontrol etmeye devam

  // 🛑 DÜZELTİLMİŞ KISIM: Veri işleme mantığı daha güvenli hale getirildi.
  // Gelen veri ne olursa olsun, ilk sonucun label ve score'unu almayı deniyoruz.
  let resultObject = null;

  if (Array.isArray(data)) {
    if (Array.isArray(data[0])) {
      // Çift katmanlı dizi (En olası format)
      resultObject = data[0][0]; 
    } else {
      // Tek katmanlı dizi
      resultObject = data[0]; 
    }
  } else if (data && data.label) {
    // Tek obje
    resultObject = data;
  }
  
  if (!resultObject || !resultObject.label)
    throw new Error("API'dan geçerli bir duygu etiketi alınamadı: " + JSON.stringify(data));


  // API'den gelen etiketi (örn: 'POSITIVE') doğrudan kullan ve küçük harfe çevir.
  const sentiment = resultObject.label.toLowerCase();

  return {
    emotion: sentiment, 
    summary: generateSummary(sentiment), 
    suggestion: generateSuggestion(sentiment),
    score: resultObject.score 
  };
}