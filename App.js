import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import SettingScreen from "./components/SettingScreen";
import AddWorkoutScreen from "./components/AddWorkoutScreen";
import ListOfWorkoutsScreen from "./components/ListOfWorkoutsScreen";

const Tab = createBottomTabNavigator();

export default function App({}) {
  const [units, setUnits] = useState("Kilometers");
  const [checked, setChecked] = React.useState("Kilometers");

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Add workout") {
              iconName = focused ? "add-circle" : "add-circle-outline";
            } else if (route.name === "Settings") {
              iconName = focused ? "cog" : "cog-outline";
            } else if (route.name === "List of workouts") {
              iconName = focused ? "list-circle" : "list-circle-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "orange",
          tabBarInactiveTintColor: "lightgray",
          headerTitleAlign: "left",
        })}
      >
        <Tab.Screen name="Add workout">
          {() => (
            <AddWorkoutScreen
              units={units}
              setUnits={setUnits}
              checked={checked}
              setChecked={setChecked}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="List of workouts">
          {() => (
            <ListOfWorkoutsScreen
              units={units}
              setUnits={setUnits}
              checked={checked}
              setChecked={setChecked}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Settings">
          {() => (
            <SettingScreen
              units={units}
              setUnits={setUnits}
              checked={checked}
              setChecked={setChecked}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
