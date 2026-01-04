import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const programs = [
 {title:"Yağ Yakıcı", time:"30 dk", type:"fat", img: require("../assets/home/fatburn.jpg")},
 {title:"Kas Geliştir", time:"45 dk", type:"muscle", img: require("../assets/home/muscle.jpg")},
 {title:"Kardiyo", time:"25 dk", type:"cardio", img: require("../assets/home/cardio.jpg")},
 {title:"Core", time:"20 dk", type:"core", img: require("../assets/home/core.jpg")}
];

export default function Home({navigation}){

 return(
  <ScrollView style={styles.container}>

    <Image source={require("../assets/home/hero.jpg")} style={styles.heroImg}/>

    <View style={styles.heroOverlay}>
      <Text style={styles.heroTitle}>IRONFIT</Text>
      <Text style={styles.heroSub}>Bugün kendinin en iyi versiyonu ol</Text>
      <TouchableOpacity style={styles.heroBtn} onPress={()=>navigation.navigate("Antrenman")}>
        <Text style={styles.heroBtnText}>Antrenmana Başla</Text>
      </TouchableOpacity>
    </View>

    <Text style={styles.section}>Popüler Programlar</Text>

    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{paddingLeft:16}}>
      {programs.map(p=>(
        <TouchableOpacity
          key={p.title}
          style={styles.programCard}
          onPress={()=>navigation.navigate("Antrenman",{type:p.type})}
        >
          <Image source={p.img} style={styles.programImg}/>
          <Text style={styles.programTitle}>{p.title}</Text>
          <Text style={styles.programTime}>{p.time}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>

    <View style={styles.grid}>
      {[
        {icon:"barbell", label:"Antrenman", screen:"Antrenman"},
        {icon:"nutrition", label:"Beslenme", screen:"Beslenme"},
        {icon:"trending-up", label:"İlerleme", screen:"İlerleme"},
        {icon:"sparkles", label:"AI Koç", screen:"AI Koç"}
      ].map(x=>(
        <TouchableOpacity key={x.label} style={styles.gridBtn} onPress={()=>navigation.navigate(x.screen)}>
          <Ionicons name={x.icon} size={26} color="#00FF9D"/>
          <Text style={styles.gridText}>{x.label}</Text>
        </TouchableOpacity>
      ))}
    </View>

    <View style={styles.motivation}>
      <Text style={styles.mTitle}>🔥 Bugünün Motivasyonu</Text>
      <Text style={styles.mText}>"Disiplin seni hedefe götürür."</Text>
    </View>

    <View style={styles.premium}>
      <Text style={styles.pTitle}>IRONFIT PREMIUM</Text>
      <Text style={styles.pSub}>AI Koç, kişisel plan, diyetler</Text>
      <TouchableOpacity style={styles.pBtn}>
        <Text style={styles.pBtnText}>Premium’a Geç</Text>
      </TouchableOpacity>
    </View>

    <Text style={styles.section}>Hızlı Antrenmanlar</Text>
    {programs.map(p=>(
      <TouchableOpacity key={p.title} style={styles.miniCard}
        onPress={()=>navigation.navigate("Antrenman",{type:p.type})}>
        <Image source={p.img} style={styles.miniImg}/>
        <View>
          <Text style={styles.miniTitle}>{p.title}</Text>
          <Text style={styles.miniTime}>{p.time}</Text>
        </View>
      </TouchableOpacity>
    ))}

    <View style={{height:60}}/>

  </ScrollView>
 )
}

const styles = StyleSheet.create({
 container:{flex:1,backgroundColor:"#000"},
 heroImg:{width:"100%",height:260},
 heroOverlay:{position:"absolute",top:140,width:"100%",padding:16,backgroundColor:"rgba(0,0,0,0.6)"},
 heroTitle:{color:"#00FF9D",fontSize:28,fontWeight:"bold"},
 heroSub:{color:"#fff",marginVertical:4},
 heroBtn:{backgroundColor:"#00FF9D",padding:12,borderRadius:14,marginTop:6},
 heroBtnText:{textAlign:"center",fontWeight:"bold"},
 section:{color:"#fff",fontSize:18,fontWeight:"bold",margin:16},
 programCard:{backgroundColor:"#111",borderRadius:20,marginRight:12,padding:12,width:140},
 programImg:{width:120,height:90,borderRadius:12},
 programTitle:{color:"#fff",marginTop:6},
 programTime:{color:"#00FF9D",fontSize:12},
 grid:{flexDirection:"row",flexWrap:"wrap",justifyContent:"space-around",padding:16},
 gridBtn:{backgroundColor:"#111",borderRadius:20,padding:16,width:"45%",alignItems:"center",marginBottom:12},
 gridText:{color:"#fff",marginTop:6},
 motivation:{backgroundColor:"#1a1a1a",margin:16,borderRadius:20,padding:16},
 mTitle:{color:"#00FF9D",fontWeight:"bold"},
 mText:{color:"#fff",marginTop:6},
 premium:{backgroundColor:"#3a1600",margin:16,borderRadius:22,padding:16},
 pTitle:{color:"#FFD700",fontWeight:"bold"},
 pSub:{color:"#ccc",marginVertical:4},
 pBtn:{backgroundColor:"#FFD700",padding:12,borderRadius:14,marginTop:8},
 pBtnText:{textAlign:"center",fontWeight:"bold"},
 miniCard:{flexDirection:"row",backgroundColor:"#111",marginHorizontal:16,marginBottom:12,borderRadius:18,padding:10,alignItems:"center"},
 miniImg:{width:70,height:50,borderRadius:10,marginRight:10},
 miniTitle:{color:"#fff"},
 miniTime:{color:"#00FF9D",fontSize:12}
});
