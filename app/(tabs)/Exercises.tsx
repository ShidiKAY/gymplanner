import React from "react";
import { View, StyleSheet } from "react-native";
import ExercisesScreen from "../screens/ExercisesScreen";

export default function ExercisesTab() {
  return (
    <View style={styles.container}>
      <ExercisesScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
