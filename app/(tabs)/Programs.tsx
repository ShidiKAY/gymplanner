import React from "react";
import { View, StyleSheet } from "react-native";
import ProgramsScreen from "../screens/ProgramsScreen";

export default function ProgramsTab() {
  return (
    <View style={styles.container}>
      <ProgramsScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
