// ExerciseEdit.tsx
import React from "react";
import { View, Alert } from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import ExerciseForm from "./ExerciseForm"; // Assurez-vous d'importer le bon fichier
import { exercises, updateExercise, addExercise } from "@/app/data/exercises"; // Assurez-vous d'importer les fonctions nécessaires
import { Exercise } from "@/types/ExerciseTypes";

type ExerciseEditRouteProp = RouteProp<{
  params: { exerciseId?: number; createFromId?: number };
}>;

const ExerciseEdit: React.FC = () => {
  const route = useRoute<ExerciseEditRouteProp>();
  const navigation = useNavigation();
  const { exerciseId, createFromId } = route.params;

  const exercise =
    exercises.find((e) => e.id === exerciseId) ||
    (createFromId ? exercises.find((e) => e.id === createFromId) : undefined);

  const handleSave = (exerciseData: Exercise) => {
    if (exerciseId) {
      // Met à jour l'exercice existant
      updateExercise(exerciseId, exerciseData);
      Alert.alert("Exercise updated successfully");
    } else {
      // Ajoute un nouvel exercice
      addExercise(exerciseData);
      Alert.alert("Exercise added successfully");
    }
    navigation.goBack(); // Retourne à l'écran précédent
  };

  return (
    <View style={{ flex: 1 }}>
      <ExerciseForm exercise={exercise} onSave={handleSave} />
    </View>
  );
};

export default ExerciseEdit;
