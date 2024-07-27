// /app/screens/ExercisesCreate.tsx
import React, { useState } from "react";
import { View, Alert, ActivityIndicator, StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import ExerciseForm from "./ExerciseForm"; // Assurez-vous que le chemin est correct
import { createExercise } from "@/app/data/exercises"; // Assurez-vous que cette fonction existe
import { Exercise } from "@/types/ExerciseTypes";

type ExercisesCreateRouteProp = {
  params?: {
    createFromExercise?: Exercise;
  };
};

const ExercisesCreate: React.FC = () => {
  const route = useRoute<ExercisesCreateRouteProp>();
  const navigation = useNavigation();
  const createFromExercise = route.params?.createFromExercise;

  const [loading, setLoading] = useState(false);

  const handleSave = (exerciseData: Exercise) => {
    setLoading(true);
    createExercise(exerciseData)
      .then(() => {
        Alert.alert("Exercise created successfully");
        navigation.goBack(); // Retourne à l'écran précédent après la sauvegarde
      })
      .catch((error) => {
        Alert.alert("Error", "Failed to create exercise");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ExerciseForm
          exercise={createFromExercise} // Passe l'exercice existant pour pré-remplir le formulaire
          onSave={handleSave} // Fonction appelée lors de la sauvegarde
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default ExercisesCreate;
