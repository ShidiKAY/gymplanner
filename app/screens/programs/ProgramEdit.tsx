// ProgramEdit.tsx
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { programs } from "@/app/data/programs";
import { TrainingProgram } from "@/types/ProgramTypes";

const ProgramEdit: React.FC<{ navigation: any }> = ({ navigation }) => {
  const route = useRoute();
  const { programId } = route.params as { programId: number };
  const [program, setProgram] = useState<TrainingProgram | undefined>(
    undefined
  );
  const [title, setTitle] = useState("");
  const [recurrence, setRecurrence] = useState("");

  useEffect(() => {
    const programToEdit = programs.find((p) => p.id === programId);
    if (programToEdit) {
      setProgram(programToEdit);
      setTitle(programToEdit.title);
      setRecurrence(programToEdit.recurrence);
    }
  }, [programId]);

  const handleSave = () => {
    if (program) {
      program.title = title;
      program.recurrence = recurrence;
      // Mettre à jour le programme dans vos données (à ajuster selon votre méthode de gestion de données)
      navigation.goBack();
    }
  };

  if (!program) {
    return <Text>Programme non trouvé</Text>;
  }

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

export default ProgramEdit;
