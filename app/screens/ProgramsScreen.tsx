// /app/screens/ProgramsScreen.tsx
import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

export default function ProgramsScreen() {
  // Exemple de données de programmes
  const programs = [
    { id: "1", name: "Programme A" },
    { id: "2", name: "Programme B" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestion des Programmes</Text>
      {programs.map((program) => (
        <View key={program.id} style={styles.programContainer}>
          <Text>{program.name}</Text>
          <Button title="Voir les détails" onPress={() => {}} />
        </View>
      ))}
      <Button title="Ajouter un programme" onPress={() => {}} />
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
  programContainer: {
    marginBottom: 16,
  },
});
