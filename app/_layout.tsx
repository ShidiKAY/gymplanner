// app/screens/SessionsScreen.tsx

import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

export default function SessionsScreen() {
  const [sessionName, setSessionName] = useState("");

  const createSession = () => {
    console.log("Session Created:", sessionName);
    // Ajoutez la logique pour sauvegarder la séance
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Créer une Séance</Text>
      <TextInput
        style={styles.input}
        placeholder="Nom de la Séance"
        value={sessionName}
        onChangeText={setSessionName}
      />
      <Button title="Créer" onPress={createSession} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
});
