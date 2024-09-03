import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BirthdayList from "./screens/BirthdayList";
import BirthdayDetails from "./screens/BirthdayDetails";
import CreateBirthday from "./screens/CreateBirthday";
import ManageGuests from "./screens/ManageGuests";
import { db } from "./firebaseConfig";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

// Creamos un Stack Navigator
const Stack = createStackNavigator();

export default function App() {
  // Extraemos la lista de cumpleaños de la base de datos de Firestore y la almacenamos en un estado
  const [birthdays, setBirthdays] = useState([]);

  // Obtenemos la lista de cumpleaños de la base de datos de Firestore
  const fetchBirthdays = async () => {
    try {
      const birthdaysCollection = collection(db, "birthdays");
      const birthdaysSnapshot = await getDocs(birthdaysCollection);
      const birthdaysList = birthdaysSnapshot.docs.map((doc) => doc.data());
      setBirthdays(birthdaysList);
    } catch (error) {
      console.log("Error while fetching birthdays:", error);
    }
  };

  // Manejo del borrado de un cumpleaños
  const handleDeleteBirthday = async (id) => {
    try {
      await deleteDoc(doc(db, "birthdays", id));
      setBirthdays(birthdays.filter((birthday) => birthday.id !== id));
    } catch (error) {
      console.log("Error while deleting birthday:", error);
    }
  };

  // Obtenemos la lista de cumpleaños al cargar la aplicación
  useEffect(() => {
    fetchBirthdays();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BirthdayList">
        <Stack.Screen name="BirthdayList">
          {(props) => (
            <BirthdayList
              {...props}
              birthdays={birthdays}
              onDeleteBirthday={handleDeleteBirthday}
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
