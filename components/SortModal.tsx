import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";

interface SortModalProps {
  visible: boolean;
  sortBy: string;
  onSort: (criteria: string) => void;
  onResetSort: () => void;
}

const SortModal: React.FC<SortModalProps> = ({
  visible,
  sortBy,
  onSort,
  onResetSort,
}) => {
  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.sortModalContainer}>
        <Text style={styles.sortModalTitle}>Sort by</Text>
        <TouchableOpacity
          onPress={() => onSort("alphabetical")}
          style={[
            styles.sortOption,
            sortBy === "alphabetical" && styles.selectedSortOption,
          ]}
        >
          <Text
            style={[
              styles.sortOptionText,
              sortBy === "alphabetical" && styles.selectedSortOptionText,
            ]}
          >
            Alphabetical
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onSort("bodyPart")}
          style={[
            styles.sortOption,
            sortBy === "bodyPart" && styles.selectedSortOption,
          ]}
        >
          <Text
            style={[
              styles.sortOptionText,
              sortBy === "bodyPart" && styles.selectedSortOptionText,
            ]}
          >
            Body Part
          </Text>
        </TouchableOpacity>
        <View style={styles.sortModalButtonContainer}>
          <TouchableOpacity
            onPress={onResetSort}
            style={styles.sortModalButton}
          >
            <Text style={styles.sortModalButtonText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  sortModalContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  sortModalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sortOption: {
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    backgroundColor: "#f0f0f0",
  },
  selectedSortOption: {
    backgroundColor: "#007BFF",
  },
  sortOptionText: {
    fontSize: 16,
  },
  selectedSortOptionText: {
    color: "#fff",
  },
  sortModalButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  sortModalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: "#007BFF",
  },
  sortModalButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default SortModal;
