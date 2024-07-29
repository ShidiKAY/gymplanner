import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import SessionList from "./SessionList";
import SessionModelList from "./SessionModelList";

const SessionsTab = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("sessions");
  const [searchQuery, setSearchQuery] = useState("");

  const renderActiveTab = () => {
    if (activeTab === "sessions") {
      return <SessionList navigation={navigation} searchQuery={searchQuery} />;
    }
    return (
      <SessionModelList navigation={navigation} searchQuery={searchQuery} />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "sessions" && styles.activeTab]}
          onPress={() => setActiveTab("sessions")}
        >
          <Text style={styles.tabText}>Sessions</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "models" && styles.activeTab]}
          onPress={() => setActiveTab("models")}
        >
          <Text style={styles.tabText}>Models</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.searchBar}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {renderActiveTab()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#f8f8f8",
  },
  tab: {
    padding: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#007BFF",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  searchBar: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    margin: 10,
  },
});

export default SessionsTab;
