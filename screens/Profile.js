
import { AuthContext } from "../context/AuthContext";
import React,{useContext,useState} from "react";
import { View, Text, StyleSheet, TouchableOpacity, Switch, Alert, ScrollView } from "react-native";
import { PremiumContext } from "../context/PremiumContext";

export default function Profile(){

 const {premium,setPremium} = useContext(PremiumContext);
 const [dark,setDark] = useState(true);
 const [lang,setLang] = useState("TR");
 const { logout } = useContext(AuthContext);

 return(
  <ScrollView style={[styles.container,{backgroundColor:dark?"#000":"#111"}]}>

    <Text style={styles.title}>Profil</Text>

    {/* KULLANICI */}
    <View style={styles.userCard}>
      <Text style={styles.name}>Erkan D.</Text>
      <Text style={styles.level}>{premium ? "Premium Üye" : "Ücretsiz Üye"}</Text>
    </View>

    {/* PREMIUM */}
    <View style={styles.premiumCard}>
      <Text style={styles.premiumTitle}>IRONFIT Premium</Text>
      <Text style={styles.premiumSub}>AI Koç • Özel Programlar • Diyetler</Text>

      {!premium && (
        <TouchableOpacity style={styles.premiumBtn} onPress={()=>setPremium(true)}>
          <Text style={styles.premiumBtnText}>Premium’a Yükselt</Text>
        </TouchableOpacity>
      )}

      {premium && <Text style={styles.active}>Premium Aktif ✔</Text>}
    </View>

    {/* AYARLAR */}
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Uygulama Ayarları</Text>

      <View style={styles.row}>
        <Text style={styles.rowText}>Karanlık Tema</Text>
        <Switch value={dark} onValueChange={setDark} thumbColor="#00FF9D"/>
      </View>

      <View style={styles.row}>
        <Text style={styles.rowText}>Dil</Text>
        <TouchableOpacity onPress={()=>setLang(lang==="TR"?"EN":"TR")}>
          <Text style={styles.lang}>{lang}</Text>
        </TouchableOpacity>
      </View>
    </View>

    {/* HESAP */}
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Hesap</Text>

      {["Abonelik Yönetimi","Bildirim Ayarları","Gizlilik"].map(x=>(
        <TouchableOpacity
          key={x}
          style={styles.option}
          onPress={()=>Alert.alert(x,"Bu ayar yakında aktif edilecek.")}>
          <Text style={styles.optionText}>{x}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.logout} onPress={logout}>
  <Text style={styles.logoutText}>Çıkış Yap</Text>
</TouchableOpacity>
    </View>

  </ScrollView>
 )
}

const styles = StyleSheet.create({
  container:{flex:1,padding:16},
  title:{color:"#fff",fontSize:26,fontWeight:"bold",marginBottom:10},

  userCard:{backgroundColor:"#1a1a1a",borderRadius:18,padding:16},
  name:{color:"#fff",fontSize:20},
  level:{color:"#00FF9D",marginTop:4},

  premiumCard:{backgroundColor:"#3a1600",borderRadius:20,padding:16,marginVertical:10},
  premiumTitle:{color:"#FFD700",fontSize:18,fontWeight:"bold"},
  premiumSub:{color:"#ccc",marginVertical:6},
  premiumBtn:{backgroundColor:"#FFD700",padding:12,borderRadius:14},
  premiumBtnText:{textAlign:"center",fontWeight:"bold"},
  active:{color:"#00FF9D",marginTop:6},

  card:{backgroundColor:"#111",borderRadius:20,padding:16,marginVertical:10},
  cardTitle:{color:"#00FF9D",fontWeight:"bold",marginBottom:6},

  row:{flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginVertical:8},
  rowText:{color:"#ccc"},
  lang:{color:"#00FF9D",fontWeight:"bold"},

  option:{backgroundColor:"#1a1a1a",borderRadius:14,padding:12,marginVertical:4},
  optionText:{color:"#fff"},

  logout:{backgroundColor:"#660000",borderRadius:14,padding:12,marginTop:10},
  logoutText:{color:"#fff",textAlign:"center"}
});
