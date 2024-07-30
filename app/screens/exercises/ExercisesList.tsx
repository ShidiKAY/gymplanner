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
import { exercises, deleteExercise } from "@/app/data/exercises";
import { bodyParts } from "@/app/data/bodyParts";
import { equipments } from "@/app/data/equipments";
import { categories } from "@/app/data/categories";
import GestureHandlerWrapper from "@/components/GestureHandlerWrapper";
import FilterModal from "@/components/FilterModal";
import SortModal from "@/components/SortModal";
import SectionHeader from "@/components/listitems/SectionHeader";
import ListItem from "@/components/listitems/ListItem";
import {
  GestureHandlerRootView,
  RectButton,
} from "react-native-gesture-handler";

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

  const scrollEnabled = useRef(true);
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

  const renderItem = ({ item }: { item: Exercise }) => {
    const bodyPart = bodyParts.find((part) => part.id === item.bodyPartId);
    const equipment = item.equipmentId
      ? equipments.find((equip) => equip.id === item.equipmentId)
      : null;

    return (
      <SwipeableRow
        onEdit={() => handleEdit(item.id)}
        onDelete={() => handleDelete(item.id)}
        onCreateFrom={() => handleCreateFrom(item.id)}
      >
        <RectButton
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
        </RectButton>
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
    return Object.keys(grouped).map((title) => ({
      title,
      data: grouped[title],
    }));
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <SearchBar onSearch={handleSearch} />
        <View style={styles.sortFilterContainer}>
          <RectButton style={styles.filterButton} onPress={handleFilter}>
            <FontAwesome name="filter" size={24} color="white" />
          </RectButton>
          <RectButton onPress={handleSort} style={styles.sortButton}>
            <Text style={styles.sortText}>
              Trier par {sortBy === "alphabetical" ? "A-Z" : "Partie du corps"}
            </Text>
            {/* <FontAwesome name="sort-down" size={24} color="white" /> */}
          </RectButton>
        </View>

        {/* <GestureHandlerWrapper>
        <SectionList
          sections={groupedData()}
          keyExtractor={(item) => item.id?.toString() || ""}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          contentContainerStyle={styles.listContainer}
        />
      </GestureHandlerWrapper> */}
        <GestureHandlerWrapper>
          <SectionList
            sections={groupedData()}
            keyExtractor={(item) => item.id?.toString() || ""}
            renderItem={renderItem}
            contentContainerStyle={styles.listContainer}
            renderSectionHeader={({ section: { title } }) => (
              <SectionHeader title={title} />
            )}
            scrollEnabled={scrollEnabled}
            renderItem={({ item }) => {
              const bodyPart = bodyParts.find(
                (part) => part.id === item.bodyPartId
              );
              const equipment = item.equipmentId
                ? equipments.find((equip) => equip.id === item.equipmentId)
                : null;
              return (
                <ListItem
                  item={item}
                  onPress={handlePress}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  bodyPart={bodyPart}
                  equipment={equipment}
                />
              );
            }}
            scrollEnabled={scrollEnabled.current}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No exercises found</Text>
            }
          />
        </GestureHandlerWrapper>

        <FloatingActionButton onPress={handleAdd} />

        <FilterModal
          visible={isFilterModalVisible}
          bodyParts={bodyParts}
          equipments={equipments}
          selectedBodyParts={selectedBodyParts}
          selectedEquipment={selectedEquipment}
          onBodyPartSelect={(id) =>
            setSelectedBodyParts((prev) =>
              prev.includes(id)
                ? prev.filter((partId) => partId !== id)
                : [...prev, id]
            )
          }
          onEquipmentSelect={(id) =>
            setSelectedEquipment((prev) =>
              prev.includes(id)
                ? prev.filter((equipId) => equipId !== id)
                : [...prev, id]
            )
          }
          onApplyFilters={applyFilters}
          onResetFilters={resetFilters}
        />

        <SortModal
          visible={isSortModalVisible}
          sortBy={sortBy}
          onSort={applySort}
          onResetSort={resetSort}
        />

        <Modal visible={isModalVisible} transparent={true} animationType="fade">
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
                <RectButton
                  onPress={handleDeleteConfirm}
                  style={styles.modalButton}
                >
                  <Text style={styles.modalButtonText}>Yes</Text>
                </RectButton>
                <RectButton
                  onPress={handleDeleteCancel}
                  style={styles.modalButton}
                >
                  <Text style={styles.modalButtonText}>No</Text>
                </RectButton>
              </View>
            </Animated.View>
          </View>
        </Modal>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f8f8f8",
  },
  filterButton: {
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 8,
  },
  listContainer: {
    paddingBottom: 20, // fin de la liste des exercices
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
    backgroundColor: "#f5f5f5",
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    width: "80%",
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: "#007BFF",
    marginHorizontal: 5,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  sortFilterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 8,
    // Ajout des dimensions pour ajuster la taille
    height: 40, // Ajustez cette valeur selon vos besoins
    width: "auto", // Permet à la largeur de s'ajuster automatiquement
  },
  sortText: {
    color: "#fff",
    marginRight: 5,
  },
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

export default ExerciseList;
