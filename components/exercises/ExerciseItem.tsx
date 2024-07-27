import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Exercise } from "@/types/ExerciseTypes";

interface ExerciseItemProps {
  exercise: Exercise;
  onPress: () => void;
}

const ExerciseItem: React.FC<ExerciseItemProps> = ({ exercise, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <Text style={styles.title}>{exercise.title}</Text>
      <Text>{exercise.description}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ExerciseItem;
