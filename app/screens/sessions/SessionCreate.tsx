// /app/screens/SessionsCreate.tsx
import React, { useState } from "react";
import { View, Alert, ActivityIndicator, StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import SessionForm from "./SessionForm"; // Assurez-vous que le chemin est correct
import { createSession } from "@/app/data/sessions"; // Assurez-vous que cette fonction existe
import { Session } from "@/types/SessionTypes";

type SessionsCreateRouteProp = {
  params?: {
    createFromSession?: Session;
  };
};

const SessionsCreate: React.FC = () => {
  const route = useRoute<SessionsCreateRouteProp>();
  const navigation = useNavigation();
  const createFromSession = route.params?.createFromSession;

  const [loading, setLoading] = useState(false);

  const handleSave = (sessionData: Session) => {
    setLoading(true);
    createSession(sessionData)
      .then(() => {
        Alert.alert("Session created successfully");
        navigation.goBack(); // Retourne à l'écran précédent après la sauvegarde
      })
      .catch((error) => {
        Alert.alert("Error", "Failed to create session");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <SessionForm
          session={createFromSession} // Passe l'exercice existant pour pré-remplir le formulaire
          onSave={handleSave} // Fonction appelée lors de la sauvegarde
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default SessionsCreate;
