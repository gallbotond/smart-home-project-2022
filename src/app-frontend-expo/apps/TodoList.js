import {
  View,
  Text,
  StyleSheet,
  FlatList,
  StatusBar,
  Button,
} from "react-native";
import React, { useState } from "react";

import ListItem from "../components/ListItem";
import InputItem from "../components/InputItem";

export default function App() {
  const [list, setList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  function addTextHandler(input) {
    setList((prev) =>
      input ? [...prev, { name: input, id: Math.random().toString() }] : prev
    );
  }

  function deleteItem(id) {
    setList((prev) => prev.filter((item) => item.id !== id));
  }

  function SwitchIsModalVisible() {
    setIsModalVisible((prev) => (prev ? false : true));
    console.log(isModalVisible);
  }

  console.log(list);

  return (
    <View style={styles.appContainer}>
      <StatusBar />
      <View style={styles.sectionContainer}>
        <Button
          color="#540D6E"
          title="Add New Item"
          onPress={SwitchIsModalVisible}
        />
      </View>
      <InputItem
        SwitchIsModalVisible={SwitchIsModalVisible}
        isModalVisible={isModalVisible}
        addTextHandler={addTextHandler}
      />
      <View
        style={StyleSheet.compose(
          styles.sectionContainer,
          styles.listContainer
        )}
      >
        <Text style={styles.listText}>List:</Text>
        <FlatList
          data={list}
          renderItem={(data) => {
            return (
              <ListItem
                name={data.item.name}
                id={data.item.id}
                deleteItem={deleteItem}
              />
            );
          }}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 10,
    backgroundColor: "#FFD23F",
  },
  sectionContainer: {
    margin: 10,
    padding: 20,
    backgroundColor: "#F3FCF0",
    width: "100%",
    borderColor: "#1F271B",
    borderWidth: 3,
    borderRadius: 10,
  },
  listText: {
    fontSize: 35,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 20,
  },
  listContainer: {
    height: "80%",
  },
});
