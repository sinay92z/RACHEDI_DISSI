import { useState, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  Button,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import PartyCard from "@/components/cards/events-card";
import { EventInterface } from "@/types/event.types";
import { useAuth } from "@/context/AuthContext";

export default function EventIndex() {
  const [events, setEvents] = useState<EventInterface[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const limit = 3;

  const fetchEvents = async (currentPage: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${apiUrl}/events?page=${currentPage}&limit=${limit}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setEvents((prevEvents) => [...prevEvents, ...data]);
        if (data.length < limit) {
          setHasMore(false);
        }
      } else {
        console.error(
          "Erreur lors du chargement des événements :",
          response.status
        );
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(page);
  }, [page]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {events.length === 0 && !isLoading ? (
          <Text style={styles.noEventsText}>Aucun événement disponible.</Text>
        ) : (
          events.map((event, index) => (
            <View key={index} style={styles.cardWrapper}>
              <PartyCard
                name={event.name}
                description={event.description}
                address={event.address}
                organizer={event.organizer.name}
                city={event.city}
                eventType={event.eventType}
                price={event.price}
                dateTime={new Date(event.dateTime).toLocaleDateString("fr-FR", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              />
            </View>
          ))
        )}

        {isLoading && <ActivityIndicator size="large" color="#582FFF" />}

        {hasMore && !isLoading && (
          <Button
            title="Charger plus"
            onPress={() => setPage((prevPage) => prevPage + 1)}
            color="#582FFF"
          />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F1F2",
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  cardWrapper: {
    marginBottom: 15,
  },
  noEventsText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
});
