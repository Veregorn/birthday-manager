import React from "react";
import { View, Text, Button, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";

const BirthdayList = ({ birthdays, onDeleteBirthday }) => {
  const navigation = useNavigation();

  return (
    <View>
      <Button
        title="Nuevo Cumpleaños"
        onPress={() => navigation.navigate("CreateBirthday")}
      />
      <FlatList
        data={birthdays}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Button
              title="Ver Detalles"
              onPress={() =>
                navigation.navigate("BirthdayDetails", { birthday: item })
              }
            />
            <Button title="Borrar" onPress={() => onDeleteBirthday(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

export default BirthdayList;
