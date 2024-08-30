import React from "react";
import { View, Text, Button } from "react-native";

const BirthdayDetails = ({ route, navigation }) => {
  const { birthday } = route.params;

  return (
    <View>
      <Text>{birthday.name}</Text>
      <Text>{birthday.date}</Text>
      <Text>{birthday.time}</Text>
      <Text>{birthday.location}</Text>

      <Button
        title="Gestionar Invitados"
        onPress={() => navigation.navigate("ManageGuests", { birthday })}
      />
    </View>
  );
};

export default BirthdayDetails;
