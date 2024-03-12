import { StyleSheet } from "react-native";

const settingStyle = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
  },
  headerText: {
    textAlign: "left",
    fontSize: 15,
    margin: 15,
  },
  settingText: {
    fontSize: 12,
    marginLeft: 10,
  },
});

export default settingStyle;
