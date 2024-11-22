import { SearchBar } from "@rneui/base";
import { View, StyleSheet, Text, ScrollView, Button } from "react-native";
import { useEffect, useState } from "react";
import EventCard from "@/components/cards/events-card";
import { EventInterface } from "@/types/event.types";
import { useAuth } from "@/context/AuthContext";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function SearchEvent() {
  const [events, setEvents] = useState<EventInterface[]>([]);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { token } = useAuth();

  // Fonction de recherche
  const handleSearch = async (text: string, currentPage: number) => {
    if (text === "" || text.length < 3) {
      setEvents([]); // Reset events if less than 3 characters
      return;
    }

    try {
      const data = await fetch(
        `${API_URL}/events/search?message=${text}&page=${currentPage}&limit=2`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      const response = await data.json();
      if (response.length < 2) {
        setHasMore(false); // Si moins de 2 événements sont retournés, cela signifie qu'il n'y a plus de résultats.
      }
      setEvents((prevEvents) => [...prevEvents, ...response]);
    } catch (error) {
      console.error("Erreur lors de la recherche d'événements", error);
    }
  };

  useEffect(() => {
    if (searchText !== "" && searchText.length >= 3) {
      handleSearch(searchText, page);
    }
  }, [searchText, page]);

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search events"
        lightTheme
        round
        value={searchText}
        onChangeText={(text) => {
          setSearchText(text);
          setPage(1); // Reset page to 1 when the search term changes
          setHasMore(true); // Reset pagination
          setEvents([]); // Clear events to start fresh
        }}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.inputStyle}
        containerStyle={styles.searchContainer}
        placeholderTextColor="#888"
      />

      {searchText === "" ? (
        <Text style={styles.searchText}>Recherchez un événement ...</Text>
      ) : searchText.length < 3 ? (
        <Text style={styles.searchText}>
          Tapez au moins 3 caractères pour commencer la recherche.
        </Text>
      ) : (
        <ScrollView>
          {events.length > 0 ? (
            events.map((event, index) => (
              <View key={index} style={styles.cardWrapper}>
                <EventCard
                  name={event.name}
                  description={event.description}
                  address={event.address}
                  organizer={event.organizer.name}
                  city={event.city}
                  eventType={event.eventType}
                  price={event.price}
                  dateTime={new Date(event.dateTime).toLocaleDateString(
                    "fr-FR",
                    {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                />
              </View>
            ))
          ) : (
            <Text style={styles.searchText}>Aucun événement trouvé.</Text>
          )}

          {hasMore && (
            <Button
              title="Charger plus"
              onPress={() => setPage((prevPage) => prevPage + 1)}
              color="#582FFF"
            />
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 10,
    width: "100%",
    flex: 1,
  },
  searchContainer: {
    backgroundColor: "#fff",
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    paddingHorizontal: 10,
  },
  inputContainer: {
    backgroundColor: "#f0f0f0",
    borderRadius: 25,
  },
  inputStyle: {
    fontSize: 16,
    color: "#333",
  },
  searchText: {
    marginTop: 20,
    fontSize: 18,
    color: "#333",
    textAlign: "center",
  },
  cardWrapper: {
    marginBottom: 15,
  },
});
