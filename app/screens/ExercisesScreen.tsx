// /app/screens/ExercisesScreen.tsx
import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

export default function ExercisesScreen() {
  // Exemple de données d'exercices
  const exercises = [
    { id: "1", name: "Exercice A" },
    { id: "2", name: "Exercice B" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestion des Exercices</Text>
      {exercises.map((exercise) => (
        <View key={exercise.id} style={styles.exerciseContainer}>
          <Text>{exercise.name}</Text>
          <Button title="Voir les détails" onPress={() => {}} />
        </View>
      ))}
      <Button title="Ajouter un exercice" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  exerciseContainer: {
    marginBottom: 16,
  },
});
