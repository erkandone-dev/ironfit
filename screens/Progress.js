import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from "react-native";

export default function Progress(){
  const TARGET = 75;

  const [weights, setWeights] = useState([
    { day: "1.Gün", kg: 85 },
    { day: "5.Gün", kg: 83 },
    { day: "10.Gün", kg: 82 }
  ]);

  const [input, setInput] = useState("");

  const current = weights[weights.length-1].kg;
  const left = current - TARGET;
  const lost = weights[0].kg - current;

  const addWeight = ()=>{
    if(!input) return;
    setWeights(prev => [...prev, { day: `${prev.length*5+5}.Gün`, kg: parseFloat(input) }]);
    setInput("");
  }

  return(
    <ScrollView style={styles.container}>

      <Text style={styles.title}>İlerleme</Text>
      <Text style={styles.sub}>Gelişimini takip et</Text>

      {/* ÜST KART */}
      <View style={styles.topRow}>
        <View style={styles.statGreen}>
          <Text style={styles.statTitle}>Mevcut Kilo</Text>
          <Text style={styles.statBig}>{current} kg</Text>
          <Text style={styles.green}>↓ {lost} kg azaldı</Text>
        </View>

        <View style={styles.stat}>
          <Text style={styles.statTitle}>Hedef Kilo</Text>
          <Text style={styles.statBig}>{TARGET} kg</Text>
          <Text style={styles.blue}>{left} kg kaldı</Text>
        </View>
      </View>

      {/* GRAFİK */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Kilo Grafiği</Text>
        <View style={styles.graph}>
          {weights.map((w,i)=>(
            <View key={i} style={styles.barWrap}>
              <View style={[styles.bar,{height:(w.kg-70)*4}]} />
              <Text style={styles.barText}>{w.kg}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* KİLO EKLE */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Yeni Kilo Ekle</Text>
        <TextInput
          placeholder="Kg gir"
          placeholderTextColor="#777"
          keyboardType="numeric"
          value={input}
          onChangeText={setInput}
          style={styles.input}
        />
        <TouchableOpacity style={styles.btn} onPress={addWeight}>
          <Text style={styles.btnText}>Ekle</Text>
        </TouchableOpacity>
      </View>

      {/* LİSTE */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Geçmiş Kayıtlar</Text>
        {weights.map((w,i)=>(
          <View key={i} style={styles.row}>
            <Text style={styles.rowText}>{w.day}</Text>
            <Text style={styles.rowKg}>{w.kg} kg</Text>
          </View>
        ))}
      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container:{flex:1,backgroundColor:"#000",padding:16},
  title:{color:"#fff",fontSize:26,fontWeight:"bold"},
  sub:{color:"#777",marginBottom:10},

  topRow:{flexDirection:"row",justifyContent:"space-between"},
  statGreen:{backgroundColor:"#003320",borderRadius:20,padding:14,width:"48%"},
  stat:{backgroundColor:"#111",borderRadius:20,padding:14,width:"48%"},
  statTitle:{color:"#ccc"},
  statBig:{color:"#fff",fontSize:28,fontWeight:"bold"},
  green:{color:"#00FF9D"},
  blue:{color:"#4DA6FF"},

  card:{backgroundColor:"#111",borderRadius:20,padding:16,marginVertical:10},
  cardTitle:{color:"#00FF9D",fontWeight:"bold",marginBottom:8},

  graph:{flexDirection:"row",alignItems:"flex-end",height:160},
  barWrap:{alignItems:"center",marginHorizontal:6},
  bar:{width:20,backgroundColor:"#00FF9D",borderRadius:6},
  barText:{color:"#fff",marginTop:4,fontSize:12},

  input:{backgroundColor:"#222",borderRadius:12,padding:12,color:"#fff"},
  btn:{backgroundColor:"#00FF9D",borderRadius:14,padding:12,marginTop:6},
  btnText:{textAlign:"center",fontWeight:"bold"},

  row:{flexDirection:"row",justifyContent:"space-between",marginVertical:6},
  rowText:{color:"#ccc"},
  rowKg:{color:"#00FF9D"}
});
