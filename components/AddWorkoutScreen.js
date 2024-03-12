import {
  View,
  TextInput,
  Pressable,
  Text,
  Alert,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import addWorkoutStyle from "../style/styleAddWorkout";
import OptionPicker from "./OptionPicker";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { Platform } from "react-native";

export default function AddWorkoutScreen({ checked }) {
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  // Font selection based on device operating system
  const fontFamily = Platform.select({
    ios: {
      fontFamily: "Helvetica Neue", // iOS specific fontFamily
    },
    android: {
      fontFamily: "Roboto", // Android specific fontFamily
    },
  });

  // Setting the values back to the initials state, when the component is focused
  useEffect(() => {
    if (isFocused) {
      setDistance("");
      setDuration("");
      setDate(null);
      setShowPicker(false);
      setSelectedOption(null);
    }
  }, [isFocused]);

  // Visibility of the Date Picker
  const toggleDatepicker = () => {
    setShowPicker(!showPicker);
  };

  // Choice of Date
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate || new Date());
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  // Alerts which control the conditions when the button "Add Workout" is pressed and return an alert when something is wrong
  const alert = () => {
    if (!distance.trim() || !duration.trim() || !date) {
      showAlert("Error", "Please fill in all fields");
      return;
    }

    if (selectedOption === null) {
      showAlert("Error", "Please pick your workout type");
      return;
    }

    if (isNaN(Number(distance)) || isNaN(Number(duration))) {
      showAlert("Error", "Distance and duration must be valid numbers.");
      return;
    }

    if (Number(distance) <= 0 || Number(duration) <= 0) {
      showAlert("Error", "Distance and duration must be positive numbers.");
      return;
    }
    saveWorkout();
  };

  const showAlert = (title, message) => {
    Alert.alert(title, message);
  };

  // Function to add new workout to list
  const saveWorkout = async () => {
    try {
      const oldWorkouts = await AsyncStorage.getItem("workouts");
      let listOfworkouts = oldWorkouts ? JSON.parse(oldWorkouts) : [];

      const newWorkout = {
        distance:
          checked === "Miles"
            ? parseFloat(distance) * 1.60934
            : parseFloat(distance),
        duration,
        date: date.toString(),
        selectedOption,
      };
      listOfworkouts.push(newWorkout);

      await AsyncStorage.setItem("workouts", JSON.stringify(listOfworkouts));
      navigation.navigate("List of workouts");
    } catch (error) {
      console.error("Error saving workout:", error);
    }
  };

  return (
    <View style={addWorkoutStyle.container}>
      {/* Choice of workout type */}
      <Text style={[addWorkoutStyle.inputText, fontFamily]}>Workout type</Text>
      <OptionPicker
        onSelect={handleOptionSelect}
        selectedOption={selectedOption}
      />
      {/* Entry of distance and adjust to chosen units */}
      <Text style={[addWorkoutStyle.inputText, fontFamily]}>
        Distance ({checked === "Miles" ? "mi" : "km"})
      </Text>
      <TextInput
        style={[addWorkoutStyle.input, fontFamily]}
        value={distance}
        onChangeText={(text) => {
          const modifiedText = text.replace(/,/g, ".");
          setDistance(modifiedText);
        }}
        onSubmitEditing={Keyboard.dismiss}
        placeholder={`Enter your distance (${
          checked === "Miles" ? "mi" : "km"
        })...`}
        keyboardType={"decimal-pad"}
        placeholderTextColor={"lightgrey"}
      />
      {/* Entry of duration */}
      <Text style={[addWorkoutStyle.inputText, fontFamily]}>
        Duration (min)
      </Text>
      <TextInput
        style={[addWorkoutStyle.input, fontFamily]}
        value={duration}
        onChangeText={(text) => {
          const modifiedText = text.replace(/,/g, ".");
          setDuration(modifiedText);
        }}
        onSubmitEditing={Keyboard.dismiss}
        placeholder="Enter your duration ..."
        keyboardType={"decimal-pad"}
        placeholderTextColor={"lightgrey"}
      />
      {/* Entry of date (use of calendar) */}
      <Text style={[addWorkoutStyle.inputText, fontFamily]}>Date</Text>
      <Pressable
        style={addWorkoutStyle.date}
        onPress={() => {
          Keyboard.dismiss();
          toggleDatepicker();
        }}
      >
        <Icon name="calendar" style={addWorkoutStyle.icon} />
        <Text
          style={[
            addWorkoutStyle.inputText,
            !date ? { color: "lightgrey" } : null,
            fontFamily,
          ]}
        >
          {date ? date.toLocaleDateString() : "Select the date ..."}
        </Text>
      </Pressable>
      {showPicker && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          is24Hour={true}
          display="inline"
          onChange={onChange}
        />
      )}
      {/* Button to add the workout and check the alerts and then navigate to "List of Workouts" */}
      <TouchableOpacity
        style={[addWorkoutStyle.button, fontFamily]}
        onPress={alert}
      >
        <Text style={addWorkoutStyle.buttonText}>Add Workout</Text>
      </TouchableOpacity>
    </View>
  );
}
