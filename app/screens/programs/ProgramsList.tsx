// ProgramsList.tsx
import React from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import { TrainingProgram } from "@/types/ProgramTypes";
import { programs } from "@/app/data/programs"; // Vos données d'exemple

const ProgramsList: React.FC<{ navigation: any }> = ({ navigation }) => {
  const handlePress = (programId: number) => {
    navigation.navigate("screens/programs/ProgramDetail", { programId });
  };

  const handleAdd = () => {
    navigation.navigate("screens/programs/ProgramCreate");
  };

  const handleEdit = (programId: number) => {
    navigation.navigate("screens/programs/ProgramEdit", { programId });
  };

  const handleDelete = (programId: number) => {
    // Logique pour supprimer le programme
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={programs}
        renderItem={({ item }: { item: TrainingProgram }) => (
          <View style={styles.programContainer}>
            <Text style={styles.programTitle}>{item.title}</Text>
            <Button
              title="Voir les détails"
              onPress={() => handlePress(item.id)}
            />
            <Button title="Modifier" onPress={() => handleEdit(item.id)} />
            <Button title="Supprimer" onPress={() => handleDelete(item.id)} />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <Button title="Ajouter un programme" onPress={handleAdd} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  programContainer: {
    marginBottom: 16,
  },
  programTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ProgramsList;
