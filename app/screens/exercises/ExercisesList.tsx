import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  SectionList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Alert,
  Animated,
  Image,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import SwipeableRow from "@/components/SwipeableRow";
import SearchBar from "@/components/SearchBar";
import FloatingActionButton from "@/components/FloatingActionButton";
import {
  exercises,
  deleteExercise,
  bodyParts,
  equipmentList,
} from "@/app/data/exercises";
import GestureHandlerWrapper from "@/components/GestureHandlerWrapper";

const ExerciseList: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [filteredExercises, setFilteredExercises] =
    useState<Exercise[]>(exercises);
  const [selectedExerciseId, setSelectedExerciseId] = useState<number | null>(
    null
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [isSortModalVisible, setIsSortModalVisible] = useState(false);
  const [selectedBodyParts, setSelectedBodyParts] = useState<number[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState<string>("alphabetical");

  const modalOpacity = useRef(new Animated.Value(0)).current;
  const modalTranslateY = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    if (isModalVisible) {
      Animated.parallel([
        Animated.timing(modalOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(modalTranslateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(modalOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(modalTranslateY, {
          toValue: 300,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isModalVisible]);

  const handleSearch = (query: string) => {
    const filtered = exercises.filter((exercise) =>
      exercise.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredExercises(filtered);
  };

  const handlePress = (exerciseId: number) => {
    navigation.navigate("screens/exercises/ExerciseDetail", { exerciseId });
  };

  const handleEdit = (exerciseId: number) => {
    const exercise = exercises.find((e) => e.id === exerciseId);
    if (exercise) {
      navigation.navigate("screens/exercises/ExerciseEdit", {
        exerciseId: exercise.id,
      });
    }
  };

  const handleAdd = () => {
    navigation.navigate("screens/exercises/ExerciseCreate", {});
  };

  const handleDelete = (exerciseId: number) => {
    setSelectedExerciseId(exerciseId);
    setIsModalVisible(true);
  };

  const handleCreateFrom = (exerciseId: number) => {
    const exercise = exercises.find((e) => e.id === exerciseId);
    if (exercise) {
      navigation.navigate("screens/exercises/ExerciseCreateFrom", {
        createFromExercise: exercise,
      });
    }
  };

  const handleDeleteConfirm = () => {
    if (selectedExerciseId !== null) {
      deleteExercise(selectedExerciseId);
      setFilteredExercises(
        filteredExercises.filter(
          (exercise) => exercise.id !== selectedExerciseId
        )
      );
      Alert.alert("Exercise deleted successfully");
    }
    setIsModalVisible(false);
    setSelectedExerciseId(null);
  };

  const handleDeleteCancel = () => {
    setIsModalVisible(false);
    setSelectedExerciseId(null);
  };

  const handleFilter = () => {
    setIsFilterModalVisible(true);
  };

  const applyFilters = () => {
    let filtered = exercises;
    if (selectedBodyParts.length > 0) {
      filtered = filtered.filter((exercise) =>
        selectedBodyParts.includes(exercise.bodyPartId)
      );
    }
    if (selectedEquipment.length > 0) {
      filtered = filtered.filter((exercise) =>
        selectedEquipment.includes(exercise.equipmentId!)
      );
    }
    setFilteredExercises(filtered);
    setIsFilterModalVisible(false);
  };

  const resetFilters = () => {
    setSelectedBodyParts([]);
    setSelectedEquipment([]);
    setFilteredExercises(exercises);
  };

  const handleSort = () => {
    setIsSortModalVisible(true);
  };

  const applySort = (criteria: string) => {
    setSortBy(criteria);
    let sorted = [...filteredExercises];
    if (criteria === "alphabetical") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (criteria === "bodyPart") {
      sorted.sort((a, b) => a.bodyPartId - b.bodyPartId);
    }
    setFilteredExercises(sorted);
    setIsSortModalVisible(false);
  };

  const resetSort = () => {
    setSortBy("alphabetical");
    setFilteredExercises(
      filteredExercises.sort((a, b) => a.title.localeCompare(b.title))
    );
    setIsSortModalVisible(false);
  };

  const renderSectionHeader = ({ section: { title } }: any) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{title}</Text>
    </View>
  );

  const renderItem = ({ item }: { item: Exercise }) => {
    const bodyPart = bodyParts.find((part) => part.id === item.bodyPartId);
    const equipment = item.equipmentId
      ? equipmentList.find((equip) => equip.id === item.equipmentId)
      : null;

    return (
      <SwipeableRow
        onEdit={() => handleEdit(item.id)}
        onDelete={() => handleDelete(item.id)}
        onCreateFrom={() => handleCreateFrom(item.id)}
      >
        <TouchableOpacity
          onPress={() => handlePress(item.id)}
          activeOpacity={0.9}
          style={styles.touchable}
        >
          <View style={styles.item}>
            <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description} numberOfLines={2}>
                {item.description}
              </Text>
              <Text style={styles.detailText}>
                {bodyPart?.nameFr}
                {equipment && ` • ${equipment.nameFr}`}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </SwipeableRow>
    );
  };

  const groupedData = () => {
    let grouped;
    if (sortBy === "alphabetical") {
      grouped = filteredExercises.reduce((sections: any, exercise) => {
        const firstLetter = exercise.title[0].toUpperCase();
        if (!sections[firstLetter]) {
          sections[firstLetter] = [];
        }
        sections[firstLetter].push(exercise);
        return sections;
      }, {});
    } else if (sortBy === "bodyPart") {
      grouped = filteredExercises.reduce((sections: any, exercise) => {
        const bodyPart = bodyParts.find(
          (part) => part.id === exercise.bodyPartId
        )?.nameFr;
        if (!sections[bodyPart!]) {
          sections[bodyPart!] = [];
        }
        sections[bodyPart!].push(exercise);
        return sections;
      }, {});
    } else {
      grouped = { "": filteredExercises };
    }
    return Object.keys(grouped).map((key) => ({
      title: key,
      data: grouped[key],
    }));
  };

  return (
    <GestureHandlerWrapper>
      <SafeAreaView style={styles.container}>
        <View style={styles.searchBarContainer}>
          <SearchBar onSearch={handleSearch} />
          <TouchableOpacity onPress={handleFilter} style={styles.filterButton}>
            <FontAwesome name="filter" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSort} style={styles.sortButton}>
            <FontAwesome name="sort" size={24} color="#000" />
          </TouchableOpacity>
        </View>
        <SectionList
          sections={groupedData()}
          keyExtractor={(item) => item.id?.toString() || ""}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          contentContainerStyle={styles.listContainer}
          ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        />
        <FloatingActionButton onPress={handleAdd} />
        <Modal
          visible={isModalVisible}
          animationType="fade"
          transparent={true}
          onRequestClose={handleDeleteCancel}
        >
          <View style={styles.modalContainer}>
            <Animated.View
              style={[
                styles.modalContent,
                {
                  opacity: modalOpacity,
                  transform: [{ translateY: modalTranslateY }],
                },
              ]}
            >
              <Text style={styles.modalText}>
                Are you sure you want to delete this exercise?
              </Text>
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                  onPress={handleDeleteConfirm}
                  style={styles.modalButton}
                >
                  <Text style={styles.modalButtonText}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleDeleteCancel}
                  style={[styles.modalButton, styles.modalCancelButton]}
                >
                  <Text
                    style={[styles.modalButtonText, styles.modalCancelText]}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </View>
        </Modal>
        <Modal
          visible={isFilterModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setIsFilterModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <ScrollView>
                <Text style={styles.modalText}>Filter by body part</Text>
                {bodyParts.map((part) => (
                  <TouchableOpacity
                    key={part.id}
                    onPress={() =>
                      setSelectedBodyParts((prev) =>
                        prev.includes(part.id)
                          ? prev.filter((id) => id !== part.id)
                          : [...prev, part.id]
                      )
                    }
                    style={[
                      styles.filterOption,
                      selectedBodyParts.includes(part.id) &&
                        styles.filterOptionSelected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.filterOptionText,
                        selectedBodyParts.includes(part.id) &&
                          styles.filterOptionTextSelected,
                      ]}
                    >
                      {part.nameFr}
                    </Text>
                  </TouchableOpacity>
                ))}
                <Text style={styles.modalText}>Filter by equipment</Text>
                {equipmentList.map((equip) => (
                  <TouchableOpacity
                    key={equip.id}
                    onPress={() =>
                      setSelectedEquipment((prev) =>
                        prev.includes(equip.id)
                          ? prev.filter((id) => id !== equip.id)
                          : [...prev, equip.id]
                      )
                    }
                    style={[
                      styles.filterOption,
                      selectedEquipment.includes(equip.id) &&
                        styles.filterOptionSelected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.filterOptionText,
                        selectedEquipment.includes(equip.id) &&
                          styles.filterOptionTextSelected,
                      ]}
                    >
                      {equip.nameFr}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                  onPress={applyFilters}
                  style={styles.modalButton}
                >
                  <Text style={styles.modalButtonText}>Apply Filters</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={resetFilters}
                  style={[styles.modalButton, styles.modalCancelButton]}
                >
                  <Text
                    style={[styles.modalButtonText, styles.modalCancelText]}
                  >
                    Reset Filters
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          visible={isSortModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setIsSortModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Sort by</Text>
              <TouchableOpacity
                onPress={() => applySort("alphabetical")}
                style={[
                  styles.sortOption,
                  sortBy === "alphabetical" && styles.sortOptionSelected,
                ]}
              >
                <Text
                  style={[
                    styles.sortOptionText,
                    sortBy === "alphabetical" && styles.sortOptionTextSelected,
                  ]}
                >
                  Alphabetical
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => applySort("bodyPart")}
                style={[
                  styles.sortOption,
                  sortBy === "bodyPart" && styles.sortOptionSelected,
                ]}
              >
                <Text
                  style={[
                    styles.sortOptionText,
                    sortBy === "bodyPart" && styles.sortOptionTextSelected,
                  ]}
                >
                  Body Part
                </Text>
              </TouchableOpacity>
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                  onPress={resetSort}
                  style={[styles.modalButton, styles.modalCancelButton]}
                >
                  <Text
                    style={[styles.modalButtonText, styles.modalCancelText]}
                  >
                    Reset Sort
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </GestureHandlerWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f8f8f8",
  },
  filterButton: {
    marginLeft: 10,
  },
  sortButton: {
    marginLeft: 10,
  },
  listContainer: {
    paddingBottom: 100,
  },
  touchable: {
    marginHorizontal: 0,
    marginVertical: 1,
  },
  item: {
    backgroundColor: "#fff",
    // borderRadius: 8,
    flexDirection: "row",
    overflow: "hidden",
    // borderBottomWidth: 1, // Bordure inférieure
    // borderBottomColor: "#ccc", // Couleur de la bordure
  },
  itemSeparator: {
    // height: 1,
    // backgroundColor: "#ccc", // Couleur de la séparation
    // marginHorizontal: 10, // Pour espacer la bordure des côtés
  },
  thumbnail: {
    width: 90,
    height: 90,
    // borderRadius: 8,
  },
  textContainer: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
  detailText: {
    fontSize: 14,
    color: "#666",
  },
  sectionHeader: {
    backgroundColor: "#f8f8f8",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  modalText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    flex: 1,
    padding: 10,
    backgroundColor: "#ff6b6b",
    borderRadius: 5,
    margin: 5,
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  modalCancelButton: {
    backgroundColor: "#ccc",
  },
  modalCancelText: {
    color: "#000",
  },
  filterOption: {
    padding: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 5,
    marginVertical: 5,
  },
  filterOptionSelected: {
    backgroundColor: "#ff6b6b",
  },
  filterOptionText: {
    fontSize: 16,
    textAlign: "center",
  },
  filterOptionTextSelected: {
    color: "#fff",
  },
  sortOption: {
    padding: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 5,
    marginVertical: 5,
  },
  sortOptionSelected: {
    backgroundColor: "#ff6b6b",
  },
  sortOptionText: {
    fontSize: 16,
    textAlign: "center",
  },
  sortOptionTextSelected: {
    color: "#fff",
  },
});

export default ExerciseList;
