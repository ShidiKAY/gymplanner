import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  Swipeable,
  RectButton,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";

const SwipeableRow = ({ onEdit, onDelete, onCreateFrom, children }) => {
  const renderRightActions = (progress, dragX) => {
    return (
      <View style={styles.actions}>
        <RectButton
          onPress={onCreateFrom}
          style={[styles.actionButton, styles.createFromButton]}
        >
          <MaterialIcons name="add" size={24} color="white" />
          <Text style={styles.actionText}>Create</Text>
        </RectButton>
        <RectButton
          onPress={onEdit}
          style={[styles.actionButton, styles.editButton]}
        >
          <MaterialIcons name="edit" size={24} color="white" />
          <Text style={styles.actionText}>Edit</Text>
        </RectButton>
        <RectButton
          onPress={onDelete}
          style={[styles.actionButton, styles.deleteButton]}
        >
          <MaterialIcons name="delete" size={24} color="white" />
          <Text style={styles.actionText}>Delete</Text>
        </RectButton>
      </View>
    );
  };

  return (
    <GestureHandlerRootView>
      <Swipeable renderRightActions={renderRightActions}>{children}</Swipeable>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  actions: {
    flexDirection: "row",
    alignItems: "center",
    height: "97.78%",
  },
  actionButton: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: 60,
  },
  createFromButton: {
    backgroundColor: "#2196F3",
  },
  editButton: {
    backgroundColor: "#4caf50",
  },
  deleteButton: {
    backgroundColor: "#f44336",
  },
  actionText: {
    color: "white",
    fontWeight: "bold",
    marginTop: 5,
    fontSize: 12,
  },
});

export default SwipeableRow;
