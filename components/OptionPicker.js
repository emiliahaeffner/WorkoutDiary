import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import pickerSelectStyles from "../style/pickerSelectStyles";

// Picker for selecting from multiple options (Run, Bike, Swim)

const OptionPicker = ({ onSelect, selectedOption }) => {
  const handleOptionSelect = (option) => {
    onSelect(option);
  };

  return (
    <View style={pickerSelectStyles.container}>
      <OptionButton
        label="Run"
        icon="run"
        onPress={() => handleOptionSelect("Run")}
        selected={selectedOption === "Run"}
      />
      <OptionButton
        label="Bike"
        icon="bike"
        onPress={() => handleOptionSelect("Bike")}
        selected={selectedOption === "Bike"}
      />
      <OptionButton
        label="Swim"
        icon="swim"
        onPress={() => handleOptionSelect("Swim")}
        selected={selectedOption === "Swim"}
      />
    </View>
  );
};

// When the button is selected the color changes to orange

const OptionButton = ({ label, icon, onPress, selected }) => {
  const buttonStyle = {
    backgroundColor: selected ? "orange" : "#eae9e9", // Change color if selected
  };

  return (
    <TouchableOpacity
      style={[pickerSelectStyles.option, buttonStyle]}
      onPress={onPress}
    >
      <Icon name={icon} size={24} color="black" />
      <Text style={pickerSelectStyles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export default OptionPicker;
