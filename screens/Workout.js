import React,{useState,useEffect} from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Workout({route}){

 const type = route?.params?.type || "muscle";
 const [started,setStarted] = useState(false);
 const [time,setTime] = useState(0);

 useEffect(()=>{
  if(!started) return;
  const t = setInterval(()=>setTime(x=>x+1),1000);
  return()=>clearInterval(t);
 },[started]);

 const format = s=>{
  const m = Math.floor(s/60);
  const sec = s%60;
  return `${m}:${sec<10?"0":""}${sec}`;
 }

 const programs = {
  fat:[
   {name:"Jump Rope",reps:"3x1 dk",img:require("../assets/fat/jumprope.png")},
   {name:"Mountain Climber",reps:"3x20",img:require("../assets/fat/climber.png")},
   {name:"Burpee",reps:"3x15",img:require("../assets/fat/burpee.png")}
  ],
  muscle:[
   {name:"Bench Press",reps:"4x10",img:require("../assets/muscle/bench.png")},
   {name:"Incline Dumbbell",reps:"3x12",img:require("../assets/muscle/incline.png")},
   {name:"Cable Fly",reps:"3x15",img:require("../assets/muscle/fly.png")}
  ],
  cardio:[
   {name:"Treadmill",reps:"15 dk",img:require("../assets/cardio/treadmill.png")},
   {name:"Cycling",reps:"12 dk",img:require("../assets/cardio/bike.png")}
  ],
  core:[
   {name:"Plank",reps:"3x40 sn",img:require("../assets/core/plank.png")},
   {name:"Crunch",reps:"3x20",img:require("../assets/core/crunch.png")}
  ]
 }

 const program = programs[type];

 return(
  <ScrollView style={styles.container}>

    <Text style={styles.title}>
     {type==="fat" && "Yağ Yakıcı Program"}
     {type==="muscle" && "Kas Geliştirme Programı"}
     {type==="cardio" && "Kardiyo Programı"}
     {type==="core" && "Core Programı"}
    </Text>

    <View style={styles.timerCard}>
      <Ionicons name="time" size={20} color="#00FF9D"/>
      <Text style={styles.timer}>{format(time)}</Text>
    </View>

    {program.map((x,i)=>(
      <View key={i} style={styles.moveCard}>
        <Image source={x.img} style={styles.img}/>
        <View style={{flex:1,marginLeft:10}}>
          <Text style={styles.moveName}>{x.name}</Text>
          <Text style={styles.moveReps}>{x.reps}</Text>
        </View>
      </View>
    ))}

    {!started && (
      <TouchableOpacity style={styles.startBtn} onPress={()=>{setStarted(true);setTime(0)}}>
        <Text style={styles.startText}>Antrenmanı Başlat</Text>
      </TouchableOpacity>
    )}

    {started && (
      <TouchableOpacity style={styles.finishBtn} onPress={()=>setStarted(false)}>
        <Text style={styles.finishText}>Antrenmanı Bitir</Text>
      </TouchableOpacity>
    )}

  </ScrollView>
 )
}

const styles = StyleSheet.create({
 container:{flex:1,backgroundColor:"#000",padding:16},
 title:{color:"#fff",fontSize:24,fontWeight:"bold",marginBottom:10},
 timerCard:{flexDirection:"row",alignItems:"center",backgroundColor:"#111",borderRadius:20,padding:14,marginBottom:10},
 timer:{color:"#00FF9D",fontSize:20,marginLeft:8},
 moveCard:{backgroundColor:"#1a1a1a",borderRadius:18,padding:12,marginBottom:10,flexDirection:"row",alignItems:"center"},
 img:{width:52,height:52,borderRadius:12},
 moveName:{color:"#fff"},
 moveReps:{color:"#00FF9D"},
 startBtn:{backgroundColor:"#00FF9D",padding:16,borderRadius:20,marginTop:12},
 startText:{color:"#000",textAlign:"center",fontWeight:"bold",fontSize:16},
 finishBtn:{backgroundColor:"#8B0000",padding:16,borderRadius:20,marginTop:12},
 finishText:{color:"#fff",textAlign:"center",fontWeight:"bold",fontSize:16}
});
