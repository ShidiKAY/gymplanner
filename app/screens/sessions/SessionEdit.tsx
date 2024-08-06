import React, { useEffect, useState } from "react";
import { View, Alert, ActivityIndicator, StyleSheet } from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import SessionForm from "./SessionForm"; // Assurez-vous que le chemin est correct
import { sessions, updateSession } from "@/app/data/sessions"; // Importer les fonctions nécessaires
import { Session } from "@/types/SessionTypes";

type SessionEditRouteProp = RouteProp<{
  params: { sessionId: number };
}>;

const SessionEdit: React.FC = () => {
  const route = useRoute<SessionEditRouteProp>();
  const navigation = useNavigation();
  const { sessionId } = route.params;

  const [session, setSession] = useState<Session | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundSession = sessions.find((e) => e.id === sessionId);
    if (foundSession) {
      setSession(foundSession);
      setLoading(false);
    } else {
      // Envisagez de gérer le cas où l'exercice n'est pas trouvé
      Alert.alert("Error", "Session not found");
      navigation.goBack();
    }
  }, [sessionId, navigation]);

  const handleSave = (sessionData: Session) => {
    if (sessionId) {
      updateSession(sessionId, sessionData);
      Alert.alert("Session updated successfully");
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

  if (!session) {
    return (
      <View style={styles.container}>
        <Text>Session not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SessionForm session={session} onSave={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start", // Utiliser flex-start au lieu de center pour le contenu en haut
    alignItems: "stretch", // Utiliser stretch pour que le contenu utilise toute la largeur disponible
    padding: 16,
  },
});

export default SessionEdit;
