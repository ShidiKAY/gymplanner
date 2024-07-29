// app/screens/tabs/SessionsTab.tsx

import React from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SessionsList } from "@/app/screens/sessions/SessionsList"; // Assurez-vous que le chemin est correct

export default function SessionsTab() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <SessionsList navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
