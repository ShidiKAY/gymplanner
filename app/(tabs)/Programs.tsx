// app/screens/tabs/ProgramsTab.tsx

import React from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ProgramsList from "@/app/screens/programs/ProgramsList"; // Assurez-vous que le chemin est correct

export default function ProgramsTab() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ProgramsList navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
