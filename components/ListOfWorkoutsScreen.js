import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import listOfWorkoutsStyle from "../style/styleListOfWorkouts";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Platform } from "react-native";

const ListOfWorkoutsScreen = ({ units, setUnits, checked }) => {
  const [workoutlist, setWorkoutlist] = useState([]);
  const [sumDistance, setSumDistance] = useState({});

  // Font selection based on device operating system
  const fontFamily = Platform.select({
    ios: {
      fontFamily: "Helvetica Neue", // iOS specific fontFamily
    },
    android: {
      fontFamily: "Roboto", // Android specific fontFamily
    },
  });

  useFocusEffect(
    React.useCallback(() => {
      getWorkouts();
    }, [])
  );

  useEffect(() => {
    calculateSumDistance();
  }, [workoutlist, checked]);

  const calculateSumDistance = () => {
    const sum = {};
    workoutlist.forEach((workout) => {
      // Convert distance to kilometers by default
      let distanceInKm = parseFloat(workout.distance);
      let distanceInMi = parseFloat(workout.distance) * 0.621371;

      // Initialize the sum for the workout type if it doesn't exist
      if (!sum[workout.selectedOption]) {
        sum[workout.selectedOption] = 0;
      }

      // Add the distance to the sum for the workout type
      if (checked === "Miles") {
        sum[workout.selectedOption] += distanceInMi;
      } else {
        sum[workout.selectedOption] += distanceInKm;
      }
    });

    // Round the sum to two decimals
    for (const key in sum) {
      sum[key] = sum[key].toFixed(2);
    }

    setSumDistance(sum);
  };

  // examples which are displayed in the List of Workouts
  const exampleWorkouts = [
    {
      Icon: "run",
      selectedOption: "Run",
      distance: 5,
      duration: 30,
      date: new Date("2022-03-01").toISOString(),
    },
    {
      Icon: "swim",
      selectedOption: "Swim",
      distance: 1,
      duration: 45,
      date: new Date("2022-03-04").toISOString(),
    },
    {
      Icon: "bike",
      selectedOption: "Bike",
      distance: 7,
      duration: 2,
      date: new Date("2022-03-07").toISOString(),
    },
  ];

  // get the Data from the Async storage
  const getWorkouts = async () => {
    try {
      const workouts = await AsyncStorage.getItem("workouts");
      if (workouts) {
        const parsedWorkouts = JSON.parse(workouts);
        const allWorkouts = [...exampleWorkouts, ...parsedWorkouts];

        setWorkoutlist(allWorkouts);
      } else {
        setWorkoutlist(exampleWorkouts);
      }
    } catch (error) {
      console.error("Error getting workouts:", error);
    }
  };

  // Clearig the List of Workouts
  const clearWorkouts = async () => {
    try {
      await AsyncStorage.removeItem("workouts");
      setWorkoutlist(exampleWorkouts);
    } catch (error) {
      console.error("Error clearing workoutlist:", error);
    }
  };

  // Displaying the data from the Async Storage
  const renderWorkoutItem = ({ item }) => (
    <View style={listOfWorkoutsStyle.workoutItem}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {item.selectedOption === "Run" && (
          <Icon
            name="run"
            size={25}
            color="black"
            style={[listOfWorkoutsStyle.iconContainer, fontFamily]}
          />
        )}
        {item.selectedOption === "Swim" && (
          <Icon
            name="swim"
            size={25}
            color="black"
            style={[listOfWorkoutsStyle.iconContainer, fontFamily]}
          />
        )}
        {item.selectedOption === "Bike" && (
          <Icon
            name="bike"
            size={25}
            color="black"
            style={[listOfWorkoutsStyle.iconContainer, fontFamily]}
          />
        )}
        <View>
          <Text style={fontFamily}>
            {/* Adjust the displayed distance according to the chosen unit */}
            {`Distance: ${
              checked === "Miles"
                ? (item.distance * 0.621371).toFixed(2) + " mi"
                : (item.distance * 1).toFixed(2) + " km"
            }`}
          </Text>
          <Text style={fontFamily}>{`Duration: ${item.duration} min`}</Text>
          <Text style={fontFamily}>{`Date: ${new Date(
            item.date
          ).toLocaleDateString()}`}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={listOfWorkoutsStyle.container}>
      <View style={listOfWorkoutsStyle.sumContainer}>
        {Object.keys(sumDistance).map((type) => (
          <View key={type} style={listOfWorkoutsStyle.sumButton}>
            <Icon name={type.toLowerCase()} size={20} color="white" />
            <Text style={[listOfWorkoutsStyle.sumButtonText, fontFamily]}>
              {/* Adjust the displayed distance according to the chosen unit */}
              {checked === "Miles"
                ? `${sumDistance[type]} mi`
                : `${sumDistance[type]} km`}
            </Text>
          </View>
        ))}
      </View>
      {workoutlist.length > 0 ? (
        <>
          {/* Display the List of Workouts (from Async storage) */}
          <FlatList
            data={workoutlist}
            renderItem={renderWorkoutItem}
            keyExtractor={(item, index) => index.toString()}
          />
          {/* Clear button */}
          <TouchableOpacity
            style={[listOfWorkoutsStyle.clearButton, fontFamily]}
            onPress={clearWorkouts}
          >
            <Text style={listOfWorkoutsStyle.clearButtonText}>
              Clear Added Workouts
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          {/* Display just example workouts if no further workouts can be found */}
          <FlatList
            data={exampleWorkouts}
            renderItem={renderWorkoutItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </>
      )}
    </View>
  );
};

export default ListOfWorkoutsScreen;
