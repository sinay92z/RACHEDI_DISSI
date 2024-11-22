import { EventCardProps, EventInterface } from "@/types/event.types";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Card, Icon } from "react-native-elements";

const EventCard = ({
  name,
  address,
  dateTime,
  price,
  description,
  organizer,
  city,
  eventType,
}: EventCardProps) => {
  return (
    <Card containerStyle={styles.cardContainer}>
      <Text style={styles.cardTitle}>{name}</Text>
      <Card.Divider />
      <View style={styles.cardContent}>
        <View style={styles.detailRow}>
          <Icon name="location-on" color="#582FFF" style={styles.icon} />
          <Text style={styles.detailText}>{address}</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="calendar-today" color="#582FFF" style={styles.icon} />
          <Text style={styles.detailText}>{dateTime}</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="person" color="#582FFF" style={styles.icon} />
          <Text style={styles.detailText}>Organisé par {organizer}</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="store" color="#582FFF" style={styles.icon} />
          <Text style={styles.detailText}>
            {city.name}, {city.region}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="category" color="#582FFF" style={styles.icon} />
          <Text style={styles.detailText}>Type: {eventType.type}</Text>
        </View>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>{price} €</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>S'inscrire</Text>
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
    borderColor: "#582FFF",
    borderWidth: 2,
  },
  cardTitle: {
    color: "#582FFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  cardContent: {
    marginTop: 10,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center", // Centrer verticalement l'icône et le texte
    marginVertical: 5,
  },
  icon: {
    marginRight: 8, // Espacement entre l'icône et le texte
  },
  detailText: {
    fontSize: 14,
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginVertical: 10,
  },
  priceContainer: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#582FFF",
    borderRadius: 20,
    width: 70,
    alignSelf: "flex-end",
  },
  priceText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#582FFF",
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EventCard;
