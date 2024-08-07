// ProgramCreate.tsx
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { programs } from "@/app/data/programs";
import { TrainingProgram } from "@/types/ProgramTypes";

const ProgramCreate: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [recurrence, setRecurrence] = useState("");

  const handleSave = () => {
    const newProgram: TrainingProgram = {
      id: programs.length + 1,
      title,
      weeks: [], // Initialiser avec une ou plusieurs semaines si nécessaire
      recurrence,
    };

    programs.push(newProgram); // Ajouter le programme aux données (à ajuster selon votre méthode de gestion de données)
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Titre</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />
      <Text style={styles.label}>Récurrence</Text>
      <TextInput
        style={styles.input}
        value={recurrence}
        onChangeText={setRecurrence}
      />
      <Button title="Enregistrer" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 16,
  },
});

export default ProgramCreate;
