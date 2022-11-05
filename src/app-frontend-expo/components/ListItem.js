import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function ListItem(props) {
  function handleOnPress() {
    props.deleteItem(props.id);
  }

  return (
    <Pressable
      style={styles.listItem}
      android_ripple={{ color: "#F3FCF0" }}
      onPress={handleOnPress}
    >
      <Text style={styles.text}>{props.name}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: "#EE4266",
    padding: 10,
    color: "#F3FCF0",
    borderRadius: 20,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  text: {
    fontSize: 20,
    color: "#F3FCF0",
  },
});
