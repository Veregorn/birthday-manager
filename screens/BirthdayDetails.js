import React from "react";
import { View, Text, Button } from "react-native";

const BirthdayDetails = ({ route, navigation }) => {
  const { birthday } = route.params;

  return (
    <View>
      <Text>Nombre: {birthday.name}</Text>
      <Text>Fecha: {birthday.date}</Text>
      <Text>Hora: {birthday.time}</Text>
      <Text>Lugar: {birthday.location}</Text>
      <Text>Número de Invitados: {birthday.attendees.length}</Text>
      <Text>Lista de Invitados:</Text>
      {/* {birthday.attendees.length === 0 && <Text>No hay invitados</Text>}
      {birthday.attendees.map((guest, index) => (
        <Text key={index}>{guest.name}</Text>
      ))} */}

      <Button
        title="Gestionar Invitados"
        onPress={() => navigation.navigate("ManageGuests", { birthday })}
      />
    </View>
  );
};

export default BirthdayDetails;
