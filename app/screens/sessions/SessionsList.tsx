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
import { sessions, deleteSession } from "@/app/data/sessions";
import { bodyParts } from "@/app/data/bodyParts";
import { equipments } from "@/app/data/equipments";
import GestureHandlerWrapper from "@/components/GestureHandlerWrapper";

export const SessionsList: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [filteredSessions, setFilteredSessions] = useState<Session[]>(sessions);
  const [selectedSessionId, setSelectedSessionId] = useState<number | null>(
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
    Animated.parallel([
      Animated.timing(modalOpacity, {
        toValue:
          isModalVisible || isFilterModalVisible || isSortModalVisible ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(modalTranslateY, {
        toValue:
          isModalVisible || isFilterModalVisible || isSortModalVisible
            ? 0
            : 300,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isModalVisible, isFilterModalVisible, isSortModalVisible]);

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
    const session = sessions.find((s) => s.id === sessionId);
    if (session) {
      navigation.navigate("screens/sessions/SessionEdit", {
        sessionId: session.id,
      });
    }
  };

  const handleAdd = () => {
    navigation.navigate("screens/sessions/SessionCreate", {});
  };

  const handleDelete = (sessionId: number) => {
    setSelectedSessionId(sessionId);
    setIsModalVisible(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedSessionId !== null) {
      deleteSession(selectedSessionId);
      setFilteredSessions(
        filteredSessions.filter((session) => session.id !== selectedSessionId)
      );
      Alert.alert("Session deleted successfully");
    }
    setIsModalVisible(false);
    setSelectedSessionId(null);
  };

  const handleDeleteCancel = () => {
    setIsModalVisible(false);
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
    setFilteredSessions(filtered);
    setIsFilterModalVisible(false);
  };

  const resetFilters = () => {
    setSelectedBodyParts([]);
    setSelectedEquipment([]);
    setFilteredSessions(sessions);
  };

  const handleSort = () => {
    setIsSortModalVisible(true);
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

    return (
      <SwipeableRow
        onEdit={() => handleEdit(item.id)}
        onDelete={() => handleDelete(item.id)}
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
      grouped = filteredSessions.reduce((sections: any, session) => {
        const firstLetter = session.title[0].toUpperCase();
        if (!sections[firstLetter]) {
          sections[firstLetter] = [];
        }
        sections[firstLetter].push(session);
        return sections;
      }, {});
    } else if (sortBy === "bodyPart") {
      grouped = filteredSessions.reduce((sections: any, session) => {
        const bodyPart = bodyParts.find(
          (part) => part.id === session.bodyPartId
        )?.nameFr;
        if (!sections[bodyPart!]) {
          sections[bodyPart!] = [];
        }
        sections[bodyPart!].push(session);
        return sections;
      }, {});
    } else {
      grouped = { "": filteredSessions };
    }
    return Object.keys(grouped).map((title) => ({
      title,
      data: grouped[title],
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar onSearch={handleSearch} />
      <View style={styles.sortFilterContainer}>
        <TouchableOpacity style={styles.filterButton} onPress={handleFilter}>
          <FontAwesome name="filter" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSort} style={styles.sortButton}>
          <Text style={styles.sortText}>
            Trier par {sortBy === "alphabetical" ? "A-Z" : "Partie du corps"}
          </Text>
        </TouchableOpacity>
      </View>

      <GestureHandlerWrapper>
        <SectionList
          sections={groupedData()}
          keyExtractor={(item) => item.id?.toString() || ""}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          contentContainerStyle={styles.listContainer}
        />
      </GestureHandlerWrapper>

      <FloatingActionButton onPress={handleAdd} />

      {/* Modal de Suppression */}
      <Modal transparent visible={isModalVisible}>
        <View style={styles.modalBackground}>
          <Animated.View
            style={[
              styles.modal,
              {
                opacity: modalOpacity,
                transform: [{ translateY: modalTranslateY }],
              },
            ]}
          >
            <Text style={styles.modalText}>
              Êtes-vous sûr de vouloir supprimer cette session ?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={handleDeleteConfirm}
                style={styles.modalButton}
              >
                <Text style={styles.modalButtonText}>Confirmer</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleDeleteCancel}
                style={styles.modalButton}
              >
                <Text style={styles.modalButtonText}>Annuler</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>

      {/* Modal de Filtrage */}
      <Modal transparent visible={isFilterModalVisible}>
        <View style={styles.modalBackground}>
          <Animated.View
            style={[
              styles.modal,
              {
                opacity: modalOpacity,
                transform: [{ translateY: modalTranslateY }],
              },
            ]}
          >
            <Text style={styles.modalText}>Filtrer les sessions</Text>
            <ScrollView style={styles.modalScrollView}>
              <Text style={styles.filterTitle}>Parties du corps</Text>
              {bodyParts.map((part) => (
                <TouchableOpacity
                  key={part.id}
                  onPress={() => {
                    setSelectedBodyParts((prev) =>
                      prev.includes(part.id)
                        ? prev.filter((id) => id !== part.id)
                        : [...prev, part.id]
                    );
                  }}
                  style={styles.filterOption}
                >
                  <Text style={styles.filterOptionText}>
                    {part.nameFr}
                    {selectedBodyParts.includes(part.id) && " ✓"}
                  </Text>
                </TouchableOpacity>
              ))}
              <Text style={styles.filterTitle}>Équipements</Text>
              {equipments.map((equip) => (
                <TouchableOpacity
                  key={equip.id}
                  onPress={() => {
                    setSelectedEquipment((prev) =>
                      prev.includes(equip.id)
                        ? prev.filter((id) => id !== equip.id)
                        : [...prev, equip.id]
                    );
                  }}
                  style={styles.filterOption}
                >
                  <Text style={styles.filterOptionText}>
                    {equip.nameFr}
                    {selectedEquipment.includes(equip.id) && " ✓"}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={applyFilters}
                style={styles.modalButton}
              >
                <Text style={styles.modalButtonText}>Appliquer</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={resetFilters}
                style={styles.modalButton}
              >
                <Text style={styles.modalButtonText}>Réinitialiser</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setIsFilterModalVisible(false)}
                style={styles.modalButton}
              >
                <Text style={styles.modalButtonText}>Annuler</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>

      {/* Modal de Tri */}
      <Modal transparent visible={isSortModalVisible}>
        <View style={styles.modalBackground}>
          <Animated.View
            style={[
              styles.modal,
              {
                opacity: modalOpacity,
                transform: [{ translateY: modalTranslateY }],
              },
            ]}
          >
            <Text style={styles.modalText}>Trier par</Text>
            <TouchableOpacity
              onPress={() => applySort("alphabetical")}
              style={styles.modalButton}
            >
              <Text style={styles.modalButtonText}>A-Z</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => applySort("bodyPart")}
              style={styles.modalButton}
            >
              <Text style={styles.modalButtonText}>Partie du corps</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={resetSort} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Réinitialiser</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsSortModalVisible(false)}
              style={styles.modalButton}
            >
              <Text style={styles.modalButtonText}>Annuler</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  sortFilterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  filterButton: {
    backgroundColor: "#007bff",
    borderRadius: 5,
    padding: 10,
  },
  sortButton: {
    backgroundColor: "#007bff",
    borderRadius: 5,
    padding: 10,
  },
  sortText: {
    color: "#fff",
    fontSize: 16,
  },
  sectionHeader: {
    backgroundColor: "#eaeaea",
    padding: 10,
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  item: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#555",
  },
  detailText: {
    fontSize: 12,
    color: "#777",
  },
  touchable: {
    flex: 1,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modal: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
  },
  modalButton: {
    backgroundColor: "#007bff",
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 5,
  },
  modalButtonText: {
    color: "#fff",
  },
  modalScrollView: {
    width: "100%",
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
  },
  filterOption: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  filterOptionText: {
    fontSize: 14,
    color: "#333",
  },
  listContainer: {
    flexGrow: 1,
  },
});
