import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
} from "react-native";

interface FilterModalProps {
  visible: boolean;
  bodyParts: { id: number; nameFr: string }[];
  equipments: { id: number; nameFr: string }[];
  selectedBodyParts: number[];
  selectedEquipment: number[];
  onBodyPartSelect: (id: number) => void;
  onEquipmentSelect: (id: number) => void;
  onApplyFilters: () => void;
  onResetFilters: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  bodyParts,
  equipments,
  selectedBodyParts,
  selectedEquipment,
  onBodyPartSelect,
  onEquipmentSelect,
  onApplyFilters,
  onResetFilters,
}) => {
  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.filterModalContainer}>
        <Text style={styles.filterModalTitle}>Filter by Body Part</Text>
        <ScrollView>
          {bodyParts.map((bodyPart) => (
            <TouchableOpacity
              key={bodyPart.id}
              onPress={() => onBodyPartSelect(bodyPart.id)}
              style={[
                styles.filterOption,
                selectedBodyParts.includes(bodyPart.id) &&
                  styles.selectedFilterOption,
              ]}
            >
              <Text
                style={[
                  styles.filterOptionText,
                  selectedBodyParts.includes(bodyPart.id) &&
                    styles.selectedFilterOptionText,
                ]}
              >
                {bodyPart.nameFr}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Text style={styles.filterModalTitle}>Filter by Equipment</Text>
        <ScrollView>
          {equipments.map((equipment) => (
            <TouchableOpacity
              key={equipment.id}
              onPress={() => onEquipmentSelect(equipment.id)}
              style={[
                styles.filterOption,
                selectedEquipment.includes(equipment.id) &&
                  styles.selectedFilterOption,
              ]}
            >
              <Text
                style={[
                  styles.filterOptionText,
                  selectedEquipment.includes(equipment.id) &&
                    styles.selectedFilterOptionText,
                ]}
              >
                {equipment.nameFr}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={styles.filterModalButtonContainer}>
          <TouchableOpacity
            onPress={onApplyFilters}
            style={styles.filterModalButton}
          >
            <Text style={styles.filterModalButtonText}>Apply</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onResetFilters}
            style={styles.filterModalButton}
          >
            <Text style={styles.filterModalButtonText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  filterModalContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  filterModalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  filterOption: {
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    backgroundColor: "#f0f0f0",
  },
  selectedFilterOption: {
    backgroundColor: "#007BFF",
  },
  filterOptionText: {
    fontSize: 16,
  },
  selectedFilterOptionText: {
    color: "#fff",
  },
  filterModalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  filterModalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: "#007BFF",
  },
  filterModalButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default FilterModal;
