import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { sessions } from "@/app/data/sessions"; // Assure-toi que ce chemin est correct

const SessionDetail = () => {
  const route = useRoute();
  const { sessionId } = route.params as { sessionId: number };

  const session = sessions.find((s) => s.id === sessionId);

  if (!session) {
    return (
      <View style={styles.container}>
        <Text>Session not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{session.title}</Text>
      <Text style={styles.date}>{session.date}</Text>
      {/* Affiche les détails de la session */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f4f4",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  date: {
    fontSize: 18,
    color: "#555",
  },
});

export default SessionDetail;
