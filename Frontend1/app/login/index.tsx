import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button, Text } from "@rneui/themed";
import { router } from "expo-router";
import { useAuth } from "@/context/AuthContext";

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error } = useAuth();

  const handleLogin = async () => {
    await login(email, password);
    if (!error) {
      router.push("/");
    }
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <Input
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
      <Button
        title="Se connecter"
        onPress={handleLogin}
        loading={loading}
        containerStyle={styles.buttonContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  buttonContainer: {
    marginTop: 20,
    width: "100%",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
});
