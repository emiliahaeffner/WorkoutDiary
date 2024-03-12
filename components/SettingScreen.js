import * as React from "react";
import { View, Text } from "react-native";
import { RadioButton } from "react-native-paper";
import settingStyle from "../style/styleSettings";
import { Platform } from "react-native";

// Radiobutton to choose the unit "kilometers" or "miles"

export default function SettingScreen({ setUnits, setChecked, checked }) {
  const handleUnitChange = (unit) => {
    setChecked(unit);
    setUnits(unit);
  };

  // Font selection based on device operating system
  const fontFamily = Platform.select({
    ios: {
      fontFamily: "Helvetica Neue", // iOS specific fontFamily
    },
    android: {
      fontFamily: "Roboto", // Android specific fontFamily
    },
  });
  return (
    <View style={settingStyle.container}>
      <Text style={[settingStyle.headerText, fontFamily]}>Units</Text>
      <View style={settingStyle.innerContainer}>
        <RadioButton
          value="Kilometers"
          checked="checked"
          status={checked === "Kilometers" ? "checked" : "unchecked"}
          onPress={() => handleUnitChange("Kilometers")}
          color="orange"
        />
        <Text style={[settingStyle.settingText, fontFamily]}>Kilometers</Text>
      </View>
      <View style={settingStyle.innerContainer}>
        <RadioButton
          value="Miles"
          status={checked === "Miles" ? "checked" : "unchecked"}
          onPress={() => handleUnitChange("Miles")}
          color="orange"
        />
        <Text style={[settingStyle.settingText, fontFamily]}>Miles</Text>
      </View>
    </View>
  );
}
