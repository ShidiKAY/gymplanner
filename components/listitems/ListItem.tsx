import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import SwipeableRow from "@/components/SwipeableRow";

const ListItem = ({
  item,
  onPress,
  onEdit,
  onDelete,
  onCreateFrom,
  bodyPart,
  equipment,
}) => {
  return (
    <SwipeableRow
      onEdit={() => onEdit(item.id)}
      onDelete={() => onDelete(item.id)}
      onCreateFrom={() => onCreateFrom(item.id)}
    >
      <TouchableOpacity
        onPress={() => onPress(item.id)}
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

const styles = StyleSheet.create({
  touchable: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
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
    color: "#888",
  },
});

export default ListItem;
