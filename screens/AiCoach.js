import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, Alert } from "react-native";
import { askAI } from "../services/ai"; 
import { PremiumContext } from "../context/PremiumContext"; // Context'i ekledik

export default function AiCoach({ navigation }) { // navigation parametresini ekledik

  const { premium } = useContext(PremiumContext); // Premium durumunu çekiyoruz
  const [messages, setMessages] = useState([
    { from: "ai", text: "Merhaba Erkan! Bugün ne yapmak istiyorsun?" }
  ]);
  const [input, setInput] = useState("");

  const send = async () => {
    if (!input.trim()) return;

    // --- PREMIUM KONTROLÜ BAŞLANGIÇ ---
    const userMessagesCount = messages.filter(m => m.from === "user").length;
    
    // Eğer premium değilse ve 3 mesaj atmışsa engelle
    if (!premium && userMessagesCount >= 3) {
      Alert.alert(
        "Sınır Doldu",
        "Ücretsiz mesaj hakkın bitti. Premium alarak sınırsız koçluk desteği alabilirsin!",
        [
          { text: "Vazgeç", style: "cancel" },
          { text: "Premium Al", onPress: () => navigation.navigate("Payment") }
        ]
      );
      return;
    }
    // --- PREMIUM KONTROLÜ BİTİŞ ---

    const userMsg = input;
    setMessages(p => [...p, { from: "user", text: userMsg }]);
    setInput("");

    try {
      const response = await askAI(userMsg); 
      setMessages(p => [...p, { from: "ai", text: response }]);

    } catch (error) {
      console.log(error);
      setMessages(p => [...p, { from: "ai", text: "AI yanıt veremedi, bağlantını kontrol et." }]);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.hero}>
        <Image source={require("../assets/ai/coach.png")} style={styles.heroImg} />
        <View>
          <Text style={styles.heroTitle}>IRONFIT AI</Text>
          <Text style={styles.heroSub}>Kişisel fitness koçun</Text>
          {!premium && <Text style={{color: '#FFD700', fontSize: 12}}>⭐ Ücretsiz Sürüm (Sınır: 3 Mesaj)</Text>}
        </View>
      </View>

      <View style={styles.chat}>
        {messages.map((m, i) => (
          <View key={i} style={m.from === "ai" ? styles.ai : styles.user}>
            <Text style={styles.msg}>{m.text}</Text>
          </View>
        ))}
      </View>

      <View style={styles.inputRow}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Koça sor..."
          placeholderTextColor="#777"
          style={styles.input}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={send}>
          <Text style={{ fontWeight: "bold" }}>➤</Text>
        </TouchableOpacity>
      </View>
      <View style={{height: 50}} /> 
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 16 },
  hero: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  heroImg: { width: 90, height: 90, marginRight: 12 },
  heroTitle: { color: "#00FF9D", fontSize: 22, fontWeight: "bold" },
  heroSub: { color: "#ccc" },
  chat: { backgroundColor: "#0d0d0d", borderRadius: 20, padding: 12, marginVertical: 12 },
  ai: { backgroundColor: "#003320", padding: 12, borderRadius: 14, marginBottom: 6, alignSelf: "flex-start" },
  user: { backgroundColor: "#222", padding: 12, borderRadius: 14, marginBottom: 6, alignSelf: "flex-end" },
  msg: { color: "#fff" },
  inputRow: { flexDirection: "row", marginBottom: 20 },
  input: { flex: 1, backgroundColor: "#111", borderRadius: 20, color: "#fff", paddingHorizontal: 14, height: 45 },
  sendBtn: { backgroundColor: "#00FF9D", marginLeft: 6, borderRadius: 20, paddingHorizontal: 16, justifyContent: "center" }
});