import React, { useEffect, useState } from "react";
import { View, Alert, ActivityIndicator, StyleSheet, Text } from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import ProgramForm from "@/app/screens/programs/ProgramForm"; // Assurez-vous que le chemin est correct
import { programs, updateProgram } from "@/app/data/programs"; // Importer les fonctions nécessaires
import { TrainingProgram } from "@/types/ProgramTypes";

type ProgramEditRouteProp = RouteProp<{
  params: { programId: number };
}>;

const ProgramEdit: React.FC = () => {
  const route = useRoute<ProgramEditRouteProp>();
  const navigation = useNavigation();
  const { programId } = route.params;

  const [program, setProgram] = useState<TrainingProgram | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundProgram = programs.find((p) => p.id === programId);
    if (foundProgram) {
      setProgram(foundProgram);
      setLoading(false);
    } else {
      // Gérer le cas où le programme n'est pas trouvé
      Alert.alert("Erreur", "Programme non trouvé");
      navigation.goBack();
    }
  }, [programId, navigation]);

  const handleSave = (programData: TrainingProgram) => {
    if (programId) {
      updateProgram({ ...programData, id: programId });
      Alert.alert("Succès", "Programme mis à jour avec succès");
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

  if (!program) {
    return (
      <View style={styles.container}>
        <Text>Programme non trouvé.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ProgramForm
        program={program}
        onSave={handleSave}
        onCancel={() => navigation.goBack()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start", // Contenu en haut
    alignItems: "stretch", // Utiliser toute la largeur disponible
    padding: 16,
  },
});

export default ProgramEdit;
