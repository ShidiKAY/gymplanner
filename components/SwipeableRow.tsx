import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import GestureHandlerWrapper from "./GestureHandlerWrapper";
import { MaterialIcons } from "@expo/vector-icons";

const SwipeableRow: React.FC<{
  onEdit: () => void;
  onDelete: () => void;
  onCreateFrom: () => void;
  children: React.ReactNode;
}> = ({ onEdit, onDelete, onCreateFrom, children }) => {
  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>
  ) => {
    const translateX = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [100, 0],
    });

    const opacity = progress.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 1, 1],
    });

    return (
      <View style={styles.actions}>
        <Animated.View
          style={[
            styles.actionButton,
            styles.createFromButton,
            { transform: [{ translateX }], opacity },
          ]}
        >
          <TouchableOpacity onPress={onCreateFrom} style={styles.touchable}>
            <MaterialIcons name="add" size={24} color="white" />
            <Text style={styles.actionText}>Create</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
          style={[
            styles.actionButton,
            styles.editButton,
            { transform: [{ translateX }], opacity },
          ]}
        >
          <TouchableOpacity onPress={onEdit} style={styles.touchable}>
            <MaterialIcons name="edit" size={24} color="white" />
            <Text style={styles.actionText}>Edit</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
          style={[
            styles.actionButton,
            styles.deleteButton,
            { transform: [{ translateX }], opacity },
          ]}
        >
          <TouchableOpacity onPress={onDelete} style={styles.touchable}>
            <MaterialIcons name="delete" size={24} color="white" />
            <Text style={styles.actionText}>Delete</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  };

  return (
    <GestureHandlerWrapper>
      <Swipeable renderRightActions={renderRightActions}>{children}</Swipeable>
    </GestureHandlerWrapper>
  );
};

const styles = StyleSheet.create({
  actions: {
    flexDirection: "row",
    alignItems: "center",
    height: "100%",
  },
  actionButton: {
    justifyContent: "center",
    alignItems: "center",
    height: "98%",
    width: 60,
    padding: 0, // Supprimer le padding
    margin: 0, // Supprimer le margin
    borderRadius: 0, // Supprimer les bordures arrondies
  },
  touchable: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
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
