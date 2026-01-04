import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack"; // Stack eklendi
import { Ionicons } from "@expo/vector-icons";

import Home from "./screens/Home";
import Workout from "./screens/Workout";
import AiCoach from "./screens/AiCoach";
import Nutrition from "./screens/Nutrition";
import Progress from "./screens/Progress";
import Profile from "./screens/Profile";
import Payment from "./screens/Payment"; // Payment eklendi

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator(); // Stack oluşturuldu

// Alt Menü Yapısı (Tab)
function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarStyle: { backgroundColor: "#0D0D0D", borderTopWidth: 0 },
      tabBarActiveTintColor: "#00FF9D",
      tabBarInactiveTintColor: "#777"
    }}>
      <Tab.Screen name="Ana" component={Home} options={{ tabBarIcon: ({ color }) => <Ionicons name="home" size={22} color={color} /> }} />
      <Tab.Screen name="Antrenman" component={Workout} options={{ tabBarIcon: ({ color }) => <Ionicons name="barbell" size={22} color={color} /> }} />
      <Tab.Screen name="AI Koç" component={AiCoach} options={{ tabBarIcon: ({ color }) => <Ionicons name="sparkles" size={22} color={color} /> }} />
      <Tab.Screen name="Beslenme" component={Nutrition} options={{ tabBarIcon: ({ color }) => <Ionicons name="nutrition" size={22} color={color} /> }} />
      <Tab.Screen name="İlerleme" component={Progress} options={{ tabBarIcon: ({ color }) => <Ionicons name="trending-up" size={22} color={color} /> }} />
      <Tab.Screen name="Profil" component={Profile} options={{ tabBarIcon: ({ color }) => <Ionicons name="person" size={22} color={color} /> }} />
    </Tab.Navigator>
  );
}

// Ana Navigasyon (Hem Tab hem de gizli ekranlar)
export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Ana uygulama (Alt menülü kısım) */}
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        
        {/* Ödeme Sayfası (Alt menüde görünmez, sadece yönlendirme ile açılır) */}
        <Stack.Screen 
          name="Payment" 
          component={Payment} 
          options={{ 
            headerShown: true, 
            headerTitle: "Premium Satın Al",
            headerStyle: { backgroundColor: '#0D0D0D' },
            headerTintColor: '#00FF9D'
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}