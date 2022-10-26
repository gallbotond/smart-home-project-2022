import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";

export default function App() {
  const [sensors, setSensors] = useState([]);
  const [input, setInput] = useState("");

  const sensorInputHandler = (text) => {
    // console.log(text);
    setInput(text);
  };

  const sensorAddHandler = () => {
    setSensors((currentSensors) => [...currentSensors, input]);
    setInput("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.view}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="ex. Living Room Temperature"
            placeholderTextColor={"gray"}
            onChangeText={sensorInputHandler}
          />
          <Button
            style={styles.button}
            onPress={sensorAddHandler}
            title="Add Sensor"
          />
        </View>
        <View style={styles.list}>
          <Text style={styles.text}>Your Sensors:</Text>
          {sensors.map((sensor, i) => (
            <Text style={styles.listItem} key={i}>
              {sensor}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
  },
  text: {
    color: "white",
    marginBottom: 10,
    marginTop: 10,
  },
  textInput: {
    color: "white",
    marginTop: 30,
    flex: 2,
  },
  button: {
    flex: 1,
  },
  view: {
    borderColor: "green",
    borderWidth: 2,
    padding: 20,
    borderRadius: 40,
    flex: 1,
    margin: 0,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 50,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    paddingBottom: 16,
  },
  list: {
    alignItems: "flex-start",
  },
  listItem: {
    color: "white",
    backgroundColor: "green",
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
});
