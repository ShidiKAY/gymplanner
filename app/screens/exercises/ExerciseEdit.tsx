import React, { useEffect, useState } from "react";
import { View, Alert, ActivityIndicator, StyleSheet } from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import ExerciseForm from "./ExerciseForm"; // Assurez-vous que le chemin est correct
import { exercises, updateExercise } from "@/app/data/exercises"; // Importer les fonctions nécessaires
import { Exercise } from "@/types/ExerciseTypes";

type ExerciseEditRouteProp = RouteProp<{
  params: { exerciseId: number };
}>;

const ExerciseEdit: React.FC = () => {
  const route = useRoute<ExerciseEditRouteProp>();
  const navigation = useNavigation();
  const { exerciseId } = route.params;

  const [exercise, setExercise] = useState<Exercise | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundExercise = exercises.find((e) => e.id === exerciseId);
    if (foundExercise) {
      setExercise(foundExercise);
      setLoading(false);
    } else {
      // Envisagez de gérer le cas où l'exercice n'est pas trouvé
      Alert.alert("Error", "Exercise not found");
      navigation.goBack();
    }
  }, [exerciseId, navigation]);

  const handleSave = (exerciseData: Exercise) => {
    if (exerciseId) {
      updateExercise(exerciseId, exerciseData);
      Alert.alert("Exercise updated successfully");
    }
    navigation.goBack();
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!exercise) {
    return (
      <View style={styles.container}>
        <Text>Exercise not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ExerciseForm exercise={exercise} onSave={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start", // Utiliser flex-start au lieu de center pour le contenu en haut
    alignItems: "stretch", // Utiliser stretch pour que le contenu utilise toute la largeur disponible
    padding: 16,
  },
});

export default ExerciseEdit;
