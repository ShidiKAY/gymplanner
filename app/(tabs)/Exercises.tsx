// app/screens/tabs/ExercisesTab.tsx

import React from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ExercisesList from "@/app/screens/exercises/ExercisesList"; // Assurez-vous que le chemin est correct

export default function ExercisesTab() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ExercisesList navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
