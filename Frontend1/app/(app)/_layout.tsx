import { Text } from "react-native";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import BottomTabBar from "@/components/tabs-bar";

export default function AppLayout() {
  const { user, logout, loading } = useAuth();

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!user) {
    return <Redirect href="login" />;
  }

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </>
  );
}
