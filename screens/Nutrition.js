import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from "react-native";

export default function Nutrition() {
  const DAILY = 2200;
  const [cal, setCal] = useState(650);
  const [protein, setProtein] = useState(40);
  const [carb, setCarb] = useState(70);
  const [fat, setFat] = useState(23);

  const [foodName, setFoodName] = useState("");
  const [foodCal, setFoodCal] = useState("");
  const [foods, setFoods] = useState([]);

  const addFood = () => {
    if (!foodName || !foodCal) return;
    const kcal = parseInt(foodCal);
    setFoods(prev => [...prev, { name: foodName, kcal }]);
    setCal(prev => prev + kcal);
    setFoodName("");
    setFoodCal("");
  };

  const percent = Math.min(cal / DAILY, 1);

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title}>Beslenme</Text>
      <Text style={styles.sub}>Günlük kalori ve makro takibi</Text>

      {/* Kalori */}
      <View style={styles.card}>
        <View style={styles.rowBetween}>
          <Text style={styles.cardTitle}>Günlük Kalori</Text>
          <Text style={styles.remain}>{DAILY - cal} kalan</Text>
        </View>
        <Text style={styles.big}>{cal} / {DAILY}</Text>
        <View style={styles.barBg}>
          <View style={[styles.barFill, { width: `${percent * 100}%` }]} />
        </View>
      </View>

      {/* Makrolar */}
      <View style={styles.macroRow}>
        <Macro title="Protein" val={protein} target={150} color="#00FF9D"/>
        <Macro title="Karbonhidrat" val={carb} target={200} color="#FFD700"/>
        <Macro title="Yağ" val={fat} target={60} color="#4DA6FF"/>
      </View>

      {/* Yemek Ekle */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Yemek Ekle</Text>
        <TextInput
          placeholder="Yemek adı"
          placeholderTextColor="#777"
          value={foodName}
          onChangeText={setFoodName}
          style={styles.input}
        />
        <TextInput
          placeholder="Kalori (kcal)"
          placeholderTextColor="#777"
          keyboardType="numeric"
          value={foodCal}
          onChangeText={setFoodCal}
          style={styles.input}
        />
        <TouchableOpacity style={styles.btn} onPress={addFood}>
          <Text style={styles.btnText}>Ekle</Text>
        </TouchableOpacity>
      </View>

      {/* Günlük Liste */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Bugün Yediklerin</Text>
        {foods.length === 0 && <Text style={{color:"#777"}}>Henüz eklenmedi</Text>}
        {foods.map((f,i)=>(
          <View key={i} style={styles.foodRow}>
            <Text style={styles.foodName}>{f.name}</Text>
            <Text style={styles.foodKcal}>{f.kcal} kcal</Text>
          </View>
        ))}
      </View>

    </ScrollView>
  );
}

function Macro({title,val,target,color}){
  const p = Math.min(val/target,1);
  return(
    <View style={styles.macroCard}>
      <Text style={styles.macroTitle}>{title}</Text>
      <Text style={[styles.macroVal,{color}]}>{val}g</Text>
      <View style={styles.barBgSmall}>
        <View style={[styles.barFillSmall,{width:`${p*100}%`,backgroundColor:color}]} />
      </View>
      <Text style={styles.macroTarget}>{target}g hedef</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{flex:1,backgroundColor:"#000",padding:16},
  title:{color:"#fff",fontSize:26,fontWeight:"bold"},
  sub:{color:"#777",marginBottom:10},

  card:{backgroundColor:"#111",borderRadius:20,padding:16,marginVertical:10},
  rowBetween:{flexDirection:"row",justifyContent:"space-between"},
  cardTitle:{color:"#00FF9D",fontWeight:"bold"},
  remain:{color:"#FFD700"},
  big:{color:"#fff",fontSize:26,marginVertical:6},

  barBg:{height:8,backgroundColor:"#222",borderRadius:10,overflow:"hidden"},
  barFill:{height:8,backgroundColor:"#00FF9D"},

  macroRow:{flexDirection:"row",justifyContent:"space-between"},
  macroCard:{backgroundColor:"#111",borderRadius:16,padding:12,width:"32%"},
  macroTitle:{color:"#ccc",fontSize:12},
  macroVal:{fontSize:20,fontWeight:"bold"},
  macroTarget:{color:"#777",fontSize:11},

  barBgSmall:{height:6,backgroundColor:"#222",borderRadius:10,overflow:"hidden",marginVertical:4},
  barFillSmall:{height:6},

  input:{backgroundColor:"#222",borderRadius:12,padding:12,color:"#fff",marginVertical:6},
  btn:{backgroundColor:"#00FF9D",borderRadius:14,padding:12,marginTop:6},
  btnText:{textAlign:"center",fontWeight:"bold"},

  foodRow:{flexDirection:"row",justifyContent:"space-between",marginTop:8},
  foodName:{color:"#fff"},
  foodKcal:{color:"#00FF9D"}
});
