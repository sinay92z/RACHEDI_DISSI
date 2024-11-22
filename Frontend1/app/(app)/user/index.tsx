import { useAuth } from "@/context/AuthContext";
import { UserInterface } from "@/types/user.type";
import { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { Button } from "react-native-elements";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function UserInfos() {
  const [data, setData] = useState<UserInterface | null>(null);
  const [loading, setLoading] = useState(true);
  const { token, logout } = useAuth();

  const fetchUserInfos = async () => {
    try {
      const response = await fetch(`${API_URL}/users/info`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setData(userData);
      } else {
        console.error(
          "Erreur lors du chargement des informations :",
          response.status
        );
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfos();
  }, []);

  if (loading) {
    return <Text style={styles.loadingText}>Chargement...</Text>;
  }

  if (!data) {
    return (
      <Text style={styles.errorText}>Erreur de récupération des données.</Text>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Image
          source={{ uri: data.profilePictureUrl }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.email}>{data.email}</Text>
        <Button
          title="Se déconnecter"
          buttonStyle={styles.logoutButton}
          onPress={() => {
            logout();
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F1F2",
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    width: "100%",
    maxWidth: 350,
    alignItems: "center",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 4,
    borderColor: "#4CAF50",
  },
  name: {
    fontSize: 22,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: "#FF6347",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: "100%",
  },
  loadingText: {
    fontSize: 18,
    color: "#888",
  },
  errorText: {
    fontSize: 18,
    color: "#D32F2F",
  },
});
