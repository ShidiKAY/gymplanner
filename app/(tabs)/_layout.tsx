import { Tabs } from "expo-router";
import React from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: true,
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
              library="Ionicons"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Programs"
        options={{
          headerShown: true,
          title: "Programmes",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "list" : "list-outline"}
              color={color}
              library="Ionicons"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Sessions"
        options={{
          headerShown: true,
          title: "Séssions",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "fitness" : "fitness-outline"}
              color={color}
              library="Ionicons"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Exercises"
        options={{
          headerShown: true,
          title: "Exercices",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "barbell" : "barbell-outline"}
              color={color}
              library="Ionicons"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Progress"
        options={{
          headerShown: true,
          title: "Progrés",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "trending-up" : "trending-up-outline"}
              color={color}
              library="Ionicons"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Calendar"
        options={{
          headerShown: true,
          title: "Calendrier",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "calendar" : "calendar-outline"}
              color={color}
              library="Ionicons"
            />
          ),
        }}
      />
    </Tabs>
  );
}
