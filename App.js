import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BirthdayList from "./screens/BirthdayList";
import BirthdayDetails from "./screens/BirthdayDetails";
import CreateBirthday from "./screens/CreateBirthday";
import ManageGuests from "./screens/ManageGuests";

// Creamos un Stack Navigator
const Stack = createStackNavigator();

export default function App() {
  // Creamos un estado para guardar los cumpleaños
  const [birthdays, setBirthdays] = useState([]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BirthdayList">
        <Stack.Screen name="BirthdayList">
          {(props) => (
            <BirthdayList
              {...props}
              birthdays={birthdays}
              setBirthdays={setBirthdays}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="CreateBirthday">
          {(props) => (
            <CreateBirthday
              {...props}
              birthdays={birthdays}
              setBirthdays={setBirthdays}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="BirthdayDetails" component={BirthdayDetails} />
        <Stack.Screen name="ManageGuests" component={ManageGuests} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
