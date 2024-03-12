import { StyleSheet } from "react-native";

const addWorkoutStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignContent: "center",
    padding: 20,
  },
  button: {
    backgroundColor: "orange",
    padding: 10,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 20,
    borderRadius: 17,
    borderColor: "orange",
    textAlign: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
  },
  inputText: {
    marginLeft: 12,
    fontSize: 12,
  },
  input: {
    height: 35,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 12,
    borderColor: "orange",
    textAlignVertical: "center",
    borderRadius: 7,
    marginBottom: 20,
  },
  date: {
    borderWidth: 1,
    padding: 10,
    fontSize: 15,
    borderColor: "orange",
    textAlignVertical: "center",
    height: 35,
    margin: 12,
    borderRadius: 7,
    flexDirection: "row",
  },
  icon: {
    color: "orange",
    fontSize: 12,
    textAlignVertical: "center",
  },
  workout: {
    height: 35,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 12,
  },
});

export default addWorkoutStyle;
