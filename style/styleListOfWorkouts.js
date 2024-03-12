import { StyleSheet } from "react-native";

const listOfWorkoutsStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  workoutItem: {
    marginBottom: 10,
    padding: 15,
    backgroundColor: "#fde9c8",
    borderWidth: 1,
    borderColor: "orange",
    borderRadius: 5,
  },
  clearButton: {
    backgroundColor: "orange",
    padding: 10,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 20,
    borderRadius: 17,
    borderColor: "orange",
    textAlign: "center",
  },
  clearButtonText: {
    color: "white",
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
  },
  iconContainer: {
    marginRight: 50,
    marginLeft: 30,
  },
  sumContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 20,
  },
  sumButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffab23",
    borderRadius: 10,
    marginRight: 5,
    borderColor: "orange",
    borderWidth: 1,
    padding: 9,
    paddingBottom: 7,
    paddingTop: 7,
  },
  sumButtonText: {
    marginLeft: 5,
    fontSize: 12,
    fontWeight: "bold",
    color: "white",
  },
});

export default listOfWorkoutsStyle;
