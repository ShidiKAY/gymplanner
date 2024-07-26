import React from "react";
import { View, Text, Button, FlatList } from "react-native";
import { useNavigation } from "expo-router";
import { Session } from "@/types";

const sessions: Session[] = [
  { id: "1", name: "Push Day", exercises: [] },
  // ...other sessions
];

export default function SessionsList() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Sessions</Text>
      <FlatList
        data={sessions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text>{item.name}</Text>
          </View>
        )}
      />
      <Button
        title="Create New Session"
        onPress={() => navigation.navigate("SessionForm")}
      />
    </View>
  );
}
