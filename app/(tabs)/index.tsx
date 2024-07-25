import React from "react";
import { View, StyleSheet } from "react-native";
import HomeScreen from "../screens/HomeScreen"; // Assure-toi que le chemin est correct

export default function IndexTab() {
  return (
    <View style={styles.container}>
      <HomeScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
