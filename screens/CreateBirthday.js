import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import firestore from "firebase/firestore";

const validationSchema = yup.object().shape({
  name: yup.string().required("El nombre es obligatorio"),
  location: yup.string().required("El lugar es obligatorio"),
});

const CreateBirthday = ({ navigation, setBirthdays, birthdays }) => {
  const [guests, setGuests] = useState([]);
  const [guestName, setGuestName] = useState("");

  const handleAddGuest = () => {
    if (guestName.trim() !== "") {
      setGuests([
        ...guests,
        {
          id: Date.now().toString(),
          name: guestName,
          attending: false,
          paid: false,
        },
      ]);
      setGuestName("");
    }
  };

  const handleFormSubmit = (values) => {
    /* const newBirthday = {
      id: Date.now().toString(),
      name: values.name,
      location: values.location,
      date: format(values.date, "dd/MM/yyyy", { locale: es }),
      time: format(values.time, "HH:mm"),
      attendees: guests,
    };

    try {
      const updatedBirthdays = Array.isArray(birthdays) ? [...birthdays] : [];
      updatedBirthdays.push(newBirthday);
      setBirthdays(updatedBirthdays);
      navigation.navigate("BirthdayList");
    } catch (error) {
      console.log("Error while updating birthdays list:", error);
    } */
    firestore.collection("birthdays").add({
      name: values.name,
      location: values.location,
      date: format(values.date, "dd/MM/yyyy", { locale: es }),
      time: format(values.time, "HH:mm"),
      attendees: guests,
    });
  };

  return (
    <Formik
      initialValues={{
        name: "",
        location: "",
        date: new Date(),
        time: new Date(),
      }}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        setFieldValue,
      }) => (
        <View>
          <Text>Nombre del Cumpleaños</Text>
          <TextInput
            onChangeText={handleChange("name")}
            onBlur={handleBlur("name")}
            value={values.name}
          />
          {errors.name && <Text>{errors.name}</Text>}

          <Text>Fecha</Text>
          <DateTimePicker
            value={values.date}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setFieldValue("date", selectedDate || values.date);
            }}
          />

          <Text>Hora</Text>
          <DateTimePicker
            value={values.time}
            mode="time"
            display="default"
            onChange={(event, selectedTime) => {
              setFieldValue("time", selectedTime || values.time);
            }}
          />

          <Text>Lugar</Text>
          <TextInput
            onChangeText={handleChange("location")}
            onBlur={handleBlur("location")}
            value={values.location}
          />
          {errors.location && <Text>{errors.location}</Text>}

          <Text>Invitados</Text>
          <TextInput
            onChangeText={setGuestName}
            value={guestName}
            placeholder="Nombre del invitado"
          />
          <Button title="Añadir Invitado" onPress={handleAddGuest} />
          <FlatList
            data={guests}
            keyExtractor={(item) => item}
            renderItem={({ item }) => <Text>{item.name}</Text>}
          />

          <Button onPress={handleSubmit} title="Crear Cumpleaños" />
        </View>
      )}
    </Formik>
  );
};

export default CreateBirthday;
