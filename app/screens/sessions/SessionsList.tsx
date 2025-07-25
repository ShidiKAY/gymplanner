import React, { useState } from "react";
import {
  View,
  Text,
  SectionList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Image,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import SwipeableRow from "@/components/SwipeableRow";
import SearchBar from "@/components/SearchBar";
import FloatingActionButton from "@/components/FloatingActionButton";
import ModalComponent from "@/components/ModalComponent";
import { sessions, deleteSession } from "@/app/data/sessions";
import { bodyParts } from "@/app/data/bodyParts";
import { equipments } from "@/app/data/equipments";
import { categories } from "@/app/data/categories";
import FilterModal from "@/components/FilterModal";
import SortModal from "@/components/SortModal";
import ListItem from "@/components/listitems/ListItem";
import SectionHeader from "@/components/listitems/SectionHeader";
import {
  GestureHandlerRootView,
  RectButton,
} from "react-native-gesture-handler";
import { Session } from "@/types/SessionTypes";

const SessionsList: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [filteredSessions, setFilteredSessions] = useState<Session[]>(sessions);
  const [selectedSessionId, setSelectedSessionId] = useState<number | null>(
    null
  );
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [isSortModalVisible, setIsSortModalVisible] = useState(false);
  const [selectedBodyParts, setSelectedBodyParts] = useState<number[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<number[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState<string>("alphabetical");

  const handleSearch = (query: string) => {
    const filtered = sessions.filter((session) =>
      session.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredSessions(filtered);
  };

  const handlePress = (sessionId: number) => {
    navigation.navigate("screens/sessions/SessionDetail", { sessionId });
  };

  const handleEdit = (sessionId: number) => {
    navigation.navigate("screens/sessions/SessionEdit", { sessionId });
  };

  const handleAdd = () => {
    navigation.navigate("screens/sessions/SessionCreate", {});
  };

  const handleDelete = (sessionId: number) => {
    setSelectedSessionId(sessionId);
    // Show confirmation modal
  };

  const handleCreateFrom = (sessionId: number) => {
    const session = sessions.find((e) => e.id === sessionId);
    if (session) {
      session.title = "Copy of " + session.title;

      navigation.navigate("screens/sessions/SessionCreateFrom", {
        createFromSession: session,
      });
    }
  };

  const handleDeleteConfirm = () => {
    if (selectedSessionId !== null) {
      deleteSession(selectedSessionId);
      setFilteredSessions(
        filteredSessions.filter((session) => session.id !== selectedSessionId)
      );
    }
    setSelectedSessionId(null);
  };

  const handleDeleteCancel = () => {
    setSelectedSessionId(null);
  };

  const handleFilter = () => {
    setIsFilterModalVisible(true);
  };

  const applyFilters = () => {
    let filtered = sessions;
    if (selectedBodyParts.length > 0) {
      filtered = filtered.filter((session) =>
        selectedBodyParts.includes(session.bodyPartId)
      );
    }
    if (selectedEquipment.length > 0) {
      filtered = filtered.filter((session) =>
        selectedEquipment.includes(session.equipmentId!)
      );
    }
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((session) =>
        selectedCategories.includes(session.categoryId!)
      );
    }
    setFilteredSessions(filtered);
    setIsFilterModalVisible(false);
  };

  const resetFilters = () => {
    setSelectedBodyParts([]);
    setSelectedEquipment([]);
    setSelectedCategories([]);
    setFilteredSessions(sessions);
  };

  const handleSort = () => {
    setIsSortModalVisible(true);
  };

  const getSections = (exercises, sortBy) => {
    if (sortBy === "alphabetical") {
      const groupedByLetter = exercises.reduce((acc, exercise) => {
        const firstLetter = exercise.title.charAt(0).toUpperCase();
        if (!acc[firstLetter]) {
          acc[firstLetter] = [];
        }
        acc[firstLetter].push(exercise);
        return acc;
      }, {});

      return Object.keys(groupedByLetter).map((letter) => ({
        title: letter,
        data: groupedByLetter[letter],
      }));
    } else if (sortBy === "bodyPart") {
      const groupedByBodyPart = exercises.reduce((acc, exercise) => {
        const bodyPart =
          bodyParts.find((part) => part.id === exercise.bodyPartId)?.nameFr ||
          "Uncategorized";
        if (!acc[bodyPart]) {
          acc[bodyPart] = [];
        }
        acc[bodyPart].push(exercise);
        return acc;
      }, {});

      return Object.keys(groupedByBodyPart).map((bodyPart) => ({
        title: bodyPart,
        data: groupedByBodyPart[bodyPart],
      }));
    }
    return []; // Default empty array if sortBy is not recognized
  };

  const applySort = (criteria: string) => {
    setSortBy(criteria);
    let sorted = [...filteredSessions];
    if (criteria === "alphabetical") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (criteria === "bodyPart") {
      sorted.sort((a, b) => a.bodyPartId - b.bodyPartId);
    }
    setFilteredSessions(sorted);
    setIsSortModalVisible(false);
  };

  const resetSort = () => {
    setSortBy("alphabetical");
    setFilteredSessions(
      filteredSessions.sort((a, b) => a.title.localeCompare(b.title))
    );
    setIsSortModalVisible(false);
  };

  const renderSectionHeader = ({ section: { title } }: any) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{title}</Text>
    </View>
  );

  const renderItem = ({ item }: { item: Session }) => {
    const bodyPart = bodyParts.find((part) => part.id === item.bodyPartId);
    const equipment = item.equipmentId
      ? equipments.find((equip) => equip.id === item.equipmentId)
      : null;
    const category = categories.find((cat) => cat.id === item.categoryId);

    return (
      <SwipeableRow
        onEdit={() => handleEdit(item.id)}
        onDelete={() => handleDelete(item.id)}
      >
        <RectButton onPress={() => handlePress(item.id)}>
          <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            {bodyPart && (
              <View style={styles.itemDetail}>
                <Image source={bodyPart.icon} style={styles.icon} />
                <Text style={styles.itemText}>{bodyPart.title}</Text>
              </View>
            )}
            {equipment && (
              <View style={styles.itemDetail}>
                <Image source={equipment.icon} style={styles.icon} />
                <Text style={styles.itemText}>{equipment.title}</Text>
              </View>
            )}
            {category && (
              <View style={styles.itemDetail}>
                <Text style={styles.itemText}>{category.name}</Text>
              </View>
            )}
          </View>
        </RectButton>
      </SwipeableRow>
    );
  };
  const sections = getSections(filteredSessions, sortBy);

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
        <GestureHandlerRootView>
          <SectionList
            sections={sections}
            keyExtractor={(item) => item.id.toString()}
            renderSectionHeader={({ section: { title } }) => (
              <SectionHeader title={title} />
            )}
            keyExtractor={(item) => item.id.toString()}
            renderSectionHeader={({ section: { title } }) => (
              <SectionHeader title={title} />
            )}
            renderItem={({ item }) => (
              <ListItem
                item={item}
                onPress={() => handlePress(item.id)}
                onEdit={() => handleEdit(item.id)}
                onDelete={() => handleDelete(item.id)}
                onCreateFrom={() => handleCreateFrom(item.id)}
              />
            )}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No sessions found</Text>
            }
          />
        </GestureHandlerRootView>
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

        <ModalComponent
          visible={selectedSessionId !== null}
          onClose={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
          title="Confirm Delete"
          confirmText="Delete"
          cancelText="Cancel"
        >
          <Text>Are you sure you want to delete this session?</Text>
        </ModalComponent>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
  },
  sectionHeader: {
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemContainer: {
    padding: 10,
  },
  itemTitle: {
    fontSize: 16,
  },
  itemDetail: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  itemText: {
    fontSize: 14,
  },
  emptyText: {
    textAlign: "center",
    padding: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
  },
  buttonText: {
    color: "#fff",
    marginLeft: 5,
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
  filterButton: {
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 8,
  },
});

export default SessionsList;
