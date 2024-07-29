import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import SwipeableRow from "@/components/SwipeableRow";
import { bodyParts } from "@/app/data/bodyParts";
import { equipments } from "@/app/data/equipments";
import { categories } from "@/app/data/categories";

const ListItem = ({ item, onPress, onEdit, onDelete }) => {
  const bodyPart = bodyParts.find((part) => part.id === item.bodyPartId);
  const equipment = item.equipmentId
    ? equipments.find((equip) => equip.id === item.equipmentId)
    : null;
  const category = categories.find((cat) => cat.id === item.categoryId);

  return (
    <SwipeableRow onEdit={onEdit} onDelete={onDelete}>
      <TouchableOpacity onPress={onPress}>
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
      </TouchableOpacity>
    </SwipeableRow>
  );
};

const styles = StyleSheet.create({
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
});

export default ListItem;
