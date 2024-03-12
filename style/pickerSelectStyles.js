import { StyleSheet } from "react-native";

const pickerSelectStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 20,
  },
  option: {
    alignItems: "center",
    justifyContent: "center",
    size: 20,
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
  },
});

export default pickerSelectStyles;
