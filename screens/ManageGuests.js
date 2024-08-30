import React, { useState } from "react";
import { View, Text, FlatList, Button } from "react-native";

const ManageGuests = ({ route, navigation }) => {
  const { birthday } = route.params;
  const [guests, setGuests] = useState(birthday.attendees);

  const confirmAttendance = (guestId) => {
    const updatedGuests = guests.map((guest) =>
      guest.id === guestId ? { ...guest, attending: true } : guest,
    );
    setGuests(updatedGuests);
  };

  const registerPayment = (guestId) => {
    const updatedGuests = guests.map((guest) =>
      guest.id === guestId ? { ...guest, paid: true } : guest,
    );
    setGuests(updatedGuests);
  };

  return (
    <View>
      <Text>Invitados</Text>
      {guests.length === 0 && <Text>Aún no tienes invitados</Text>}
      <FlatList
        data={guests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Button
              title={
                item.attending
                  ? "Asistencia Confirmada"
                  : "Confirmar Asistencia"
              }
              onPress={() => confirmAttendance(item.id)}
              disabled={item.attending}
            />
            <Button
              title={item.paid ? "Pago Realizado" : "Registrar Pago"}
              onPress={() => registerPayment(item.id)}
              disabled={item.paid}
            />
          </View>
        )}
      />
      <Button
        title="Añadir Invitado"
        onPress={() => navigation.navigate("createGuest", { birthday })}
      />
    </View>
  );
};

export default ManageGuests;
