import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import axios from "axios";

const ChatWithAI: React.FC = () => {
  const [response, setResponse] = useState("");

  const askAI = async () => {
    try {
      const result = await axios.post("URL_DE_VOTRE_API_IA", {
        question: "Créer un programme de musculation",
      });
      setResponse(result.data.answer);
    } catch (error) {
      console.error("Erreur lors de la demande à l'IA", error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Demander à l'IA" onPress={askAI} />
      <Text style={styles.response}>{response}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  response: {
    marginTop: 20,
    fontSize: 16,
  },
});

export default ChatWithAI;
