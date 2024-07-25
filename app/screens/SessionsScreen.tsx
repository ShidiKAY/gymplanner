// /app/screens/SessionsScreen.tsx
import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

export default function SessionsScreen() {
  // Exemple de données de séances
  const sessions = [
    { id: "1", name: "Séance 1" },
    { id: "2", name: "Séance 2" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestion des Séances</Text>
      {sessions.map((session) => (
        <View key={session.id} style={styles.sessionContainer}>
          <Text>{session.name}</Text>
          <Button title="Voir les détails" onPress={() => {}} />
        </View>
      ))}
      <Button title="Ajouter une séance" onPress={() => {}} />
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
  sessionContainer: {
    marginBottom: 16,
  },
});
