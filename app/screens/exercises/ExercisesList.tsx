import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import SwipeableRow from "@/components/SwipeableRow"; // Importer le composant SwipeableRow
import SearchBar from "@/components/SearchBar"; // Assurez-vous que ce composant existe et est bien importé
import FloatingActionButton from "@/components/FloatingActionButton"; // Importer le bouton flottant
import { exercises } from "@/app/data/exercises"; // Importer la liste d'exercices
import GestureHandlerWrapper from "@/components/GestureHandlerWrapper"; // Importer le wrapper

const ExerciseList: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [filteredExercises, setFilteredExercises] =
    useState<Exercise[]>(exercises);

  const handleSearch = (query: string) => {
    const filtered = exercises.filter((exercise) =>
      exercise.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredExercises(filtered);
  };

  const handlePress = (exerciseId: number) => {
    navigation.navigate("screens/exercises/ExerciseDetail", { exerciseId });
  };

  const handleEdit = (exerciseId: number) => {
    const exercise = exercises.find((e) => e.id === exerciseId);
    if (exercise) {
      navigation.navigate("screens/exercises/ExerciseEdit", {
        exerciseId: exercise.id,
      });
    }
  };

  const handleAdd = () => {
    navigation.navigate("screens/exercises/ExerciseCreate", {});
  };

  const handleDelete = (exerciseId: number) => {
    console.log("Delete", exerciseId);
    // Implémentez la logique de suppression ici
  };

  const handleCreateFrom = (exerciseId: number) => {
    const exercise = exercises.find((e) => e.id === exerciseId);
    if (exercise) {
      navigation.navigate("screens/exercises/ExerciseCreateFrom", {
        createFromExercise: exercise,
      });
    }
  };

  const renderItem = ({ item }: { item: Exercise }) => (
    <SwipeableRow
      onEdit={() => handleEdit(item.id)}
      onDelete={() => handleDelete(item.id)}
      onCreateFrom={() => handleCreateFrom(item.id)}
    >
      <TouchableOpacity
        onPress={() => handlePress(item.id)}
        activeOpacity={0.9}
        active
        style={styles.touchable}
      >
        <View style={styles.item}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <View style={styles.detailsContainer}>
            <Text style={styles.detailText}>Category: {item.category}</Text>
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.detailText}>
              Repetitions: {item.repetitions}
            </Text>
            <Text style={styles.detailText}>
              Rest Time: {item.restTime} seconds
            </Text>
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.detailText}>
              Duration: {item.duration.start} - {item.duration.end} seconds
            </Text>
            <Text style={styles.detailText}>Intensity: {item.intensity}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </SwipeableRow>
  );

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar onSearch={handleSearch} />
      <FlatList
        data={filteredExercises}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <FloatingActionButton onPress={handleAdd} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    marginBottom: 12, // Réduction de l'espace entre les éléments
    backgroundColor: "white",
    padding: 12, // Réduction de la taille de la marge intérieure
    borderRadius: 8,
    elevation: 1, // Ombre légère
  },
  touchable: {
    borderRadius: 6, // Bordures arrondies
    overflow: "hidden", // Assure que les bordures arrondies sont respectées
    backgroundColor: "transparent", // Pas de fond supplémentaire pour éviter les bordures supplémentaires
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "gray",
    marginBottom: 4, // Réduction de l'espace sous la description
  },
  category: {
    fontSize: 14,
    color: "gray",
    marginBottom: 4, // Réduction de l'espace sous la catégorie
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  detailText: {
    fontSize: 12, // Réduction de la taille de la police des détails
    color: "#a8a8a8", // Éclaircissement de la couleur de la police
  },
});

export default ExerciseList;
