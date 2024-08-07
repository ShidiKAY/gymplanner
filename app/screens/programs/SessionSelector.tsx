// SessionSelector.tsx
import React from "react";
import { View, Text, Button, StyleSheet, FlatList } from "react-native";
import { sessions } from "@/app/data/sessions";
import { Session } from "@/types/SessionTypes";

interface SessionSelectorProps {
  selectedSessionIds: number[];
  onChange: (sessionIds: number[]) => void;
}

const SessionSelector: React.FC<SessionSelectorProps> = ({
  selectedSessionIds,
  onChange,
}) => {
  const handleToggleSession = (sessionId: number) => {
    const updatedSessionIds = selectedSessionIds.includes(sessionId)
      ? selectedSessionIds.filter((id) => id !== sessionId)
      : [...selectedSessionIds, sessionId];
    onChange(updatedSessionIds);
  };

  return (
    <FlatList
      data={sessions}
      renderItem={({ item }: { item: Session }) => (
        <View style={styles.sessionContainer}>
          <Text>{item.title}</Text>
          <Button
            title={
              selectedSessionIds.includes(item.id)
                ? "Désélectionner"
                : "Sélectionner"
            }
            onPress={() => handleToggleSession(item.id)}
          />
        </View>
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  sessionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
});

export default SessionSelector;
