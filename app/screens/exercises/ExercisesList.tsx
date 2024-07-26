import React from "react";
import { View, Text, Button, FlatList } from "react-native";
import { useNavigation } from "expo-router";
import { Exercise } from "@/types";

const exercises: Exercise[] = [
  {
    id: "1",
    title: "Squat",
    intensity: 100,
    repetitions: 10,
    durationStart: 0,
    durationEnd: 60,
    restTime: 30,
  },
  // ...other exercises
];

export default function ExercisesList() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Exercises</Text>
      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text>{item.title}</Text>
          </View>
        )}
      />
      <Button
        title="Create New Exercise"
        onPress={() => navigation.navigate("ExerciseForm")}
      />
    </View>
  );
}
