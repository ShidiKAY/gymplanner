// /app/screens/ProgressScreen.tsx
import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

export default function ProgressScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Suivi de la Progression</Text>
      <Text>Affichage des données de progression ici...</Text>
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
});
