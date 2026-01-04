import React,{useState,useContext} from "react";
import { View,Text,TextInput,TouchableOpacity,StyleSheet,ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../context/AuthContext";

export default function Login({goRegister}){
 const { login } = useContext(AuthContext);
 const [email,setEmail] = useState("");
 const [pass,setPass] = useState("");

 return(
  <ImageBackground
    source={{uri:"https://images.unsplash.com/featured/?gym"}}
    style={{flex:1}}
  >
   <LinearGradient colors={["rgba(0,0,0,0.9)","rgba(0,0,0,0.6)"]} style={{flex:1,justifyContent:"center"}}>
    <View style={styles.card}>

      <Text style={styles.logo}>IRONFIT</Text>
      <Text style={styles.subtitle}>Profesyonel Fitness Koçunuz</Text>

      <TextInput placeholder="E-posta" placeholderTextColor="#888"
        value={email} onChangeText={setEmail} style={styles.input}/>

      <TextInput placeholder="Şifre" secureTextEntry placeholderTextColor="#888"
        value={pass} onChangeText={setPass} style={styles.input}/>

      <TouchableOpacity style={styles.btn} onPress={()=>login(email,pass)}>
        <Text style={styles.btnText}>Giriş Yap</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={goRegister}>
        <Text style={styles.link}>Hesabın yok mu? Kayıt Ol</Text>
      </TouchableOpacity>

    </View>
   </LinearGradient>
  </ImageBackground>
 )
}

const styles = StyleSheet.create({
 card:{margin:20,backgroundColor:"rgba(20,20,20,0.85)",borderRadius:24,padding:24},
 logo:{color:"#00FF9D",fontSize:40,textAlign:"center",fontWeight:"bold"},
 subtitle:{color:"#aaa",textAlign:"center",marginBottom:20},
 input:{backgroundColor:"#111",color:"#fff",borderRadius:14,padding:14,marginVertical:6},
 btn:{backgroundColor:"#00FF9D",padding:14,borderRadius:14,marginTop:10},
 btnText:{textAlign:"center",fontWeight:"bold"},
 link:{color:"#aaa",textAlign:"center",marginTop:14}
});