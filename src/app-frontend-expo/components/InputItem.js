import { View, TextInput, Button, Modal, StyleSheet } from "react-native";
import { useState } from "react";

export default function InputItem(props) {
  const [input, setInput] = useState("");

  function buttonHandler() {
    props.addTextHandler(input);
    setInput("");
    props.SwitchIsModalVisible();
  }

  return (
    <Modal visible={props.isModalVisible} animationType="slide">
      <View style={styles.modal}>
        <View style={styles.margin}>
          <TextInput
            style={styles.textInput}
            onChangeText={setInput}
            value={input}
          />
        </View>
        <View style={styles.margin}>
          <Button color="#540D6E" title="Add Text" onPress={buttonHandler} />
        </View>
        <View style={styles.margin}>
          <Button
            color="#EE4266"
            title="Cancel"
            onPress={() => {
              setInput("");
              props.SwitchIsModalVisible();
            }}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FFD23F"
  },
  margin: {
    margin: 10,
  },
  textInput: {
    backgroundColor: "#F3FCF0",
    borderColor: "#1F271B",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
  },
});
