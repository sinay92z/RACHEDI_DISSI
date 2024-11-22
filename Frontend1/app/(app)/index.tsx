import BottomTabBar from "@/components/tabs-bar";
import { useAuth } from "@/context/AuthContext";
import { Text, View, Image } from "react-native";

export default function Index() {
  const { user } = useAuth();
  return user ? <BottomTabBar user={user} /> : <Text>No user available</Text>;
}
