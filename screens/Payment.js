import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { PremiumContext } from "../context/PremiumContext";

export default function Payment({ navigation }) {
  const { setPremium } = useContext(PremiumContext);
  const [cardNo, setCardNo] = useState("");

  const handlePay = () => {
    // Kart numarası kontrolü (Simülasyon)
    if (cardNo.length < 16) {
      Alert.alert("Hata", "Lütfen geçerli bir kart numarası girin.");
      return;
    }
    
    // Ödeme başarılı simülasyonu: Premium statüsünü true yapıyoruz
    setPremium(true);
    
    Alert.alert(
      "Başarılı!", 
      "Artık Premium üyesisin. Koçunla sınırsız konuşabilirsin!", 
      [
        { 
          text: "Harika!", 
          onPress: () => {
            // MainTabs içindeki AI Koç sekmesine yönlendirme yapar
            navigation.navigate("MainTabs", { screen: "AI Koç" });
          } 
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Premium'a Geç</Text>
      <Text style={styles.sub}>Aylık sadece 99 TL</Text>

      <TextInput 
        placeholder="Kart Numarası (16 Hane)" 
        placeholderTextColor="#777"
        keyboardType="numeric"
        style={styles.input}
        onChangeText={setCardNo}
        maxLength={16}
      />
      
      <View style={{ flexDirection: "row", gap: 10 }}>
        <TextInput 
          placeholder="AA/YY" 
          placeholderTextColor="#777" 
          keyboardType="numeric"
          style={[styles.input, { flex: 1 }]} 
        />
        <TextInput 
          placeholder="CVV" 
          placeholderTextColor="#777" 
          keyboardType="numeric"
          secureTextEntry={true}
          style={[styles.input, { flex: 1 }]} 
        />
      </View>

      <TouchableOpacity style={styles.btn} onPress={handlePay}>
        <Text style={styles.btnText}>Güvenli Öde ve Başlat</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={{ marginTop: 20 }} 
        onPress={() => navigation.goBack()}
      >
        <Text style={{ color: "#777", textAlign: "center" }}>Vazgeç</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 20, justifyContent: "center" },
  title: { color: "#00FF9D", fontSize: 28, fontWeight: "bold", textAlign: "center" },
  sub: { color: "#ccc", textAlign: "center", marginBottom: 30 },
  input: { backgroundColor: "#111", color: "#fff", padding: 15, borderRadius: 10, marginBottom: 15 },
  btn: { backgroundColor: "#00FF9D", padding: 18, borderRadius: 10, alignItems: "center", marginTop: 10 },
  btnText: { color: "#000", fontWeight: "bold", fontSize: 16 }
});