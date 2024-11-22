import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Tab, Text, TabView } from "@rneui/themed";
import EventIndex from "@/app/(app)/events";
import { UserInterface } from "@/types/user.type";
import SearchEvent from "@/app/(app)/events/search-events";
import UserInfos from "@/app/(app)/user";

const BottomTabBar = ({ user }: { user: UserInterface }) => {
  const [index, setIndex] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.tabViewContainer}>
        <TabView value={index} onChange={setIndex} animationType="spring">
          <TabView.Item style={styles.pageStyle}>
            <EventIndex />
          </TabView.Item>
          <TabView.Item style={styles.pageStyle}>
            <SearchEvent />
          </TabView.Item>
          <TabView.Item style={styles.pageStyle}>
            <Text>Search</Text>
          </TabView.Item>
          <TabView.Item style={styles.pageStyle}>
            <UserInfos />
          </TabView.Item>
        </TabView>
      </View>
      <Tab
        value={index}
        onChange={setIndex}
        indicatorStyle={styles.tabIndicator}
        variant="primary"
        containerStyle={styles.tabBar}
      >
        <Tab.Item
          title="Events"
          titleStyle={styles.tabTitle}
          icon={{ name: "celebration", type: "material", color: "white" }}
        />
        <Tab.Item
          title="Search"
          titleStyle={styles.tabTitle}
          icon={{ name: "search", type: "material", color: "white" }}
        />
        <Tab.Item
          title="Favorite"
          titleStyle={styles.tabTitle}
          icon={{ name: "heart", type: "ionicon", color: "white" }}
        />
        <Tab.Item
          title={user ? user.name : "Account"}
          titleStyle={styles.tabTitle}
          icon={{ name: "person", type: "material", color: "white" }}
        />
      </Tab>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F1F2",
  },
  tabViewContainer: {
    flex: 1,
    marginTop: 60,
  },
  tabBar: {
    backgroundColor: "#582FFF",
    height: 80,
    paddingBottom: 15,
  },
  tabIndicator: {
    backgroundColor: "white",
    height: 3,
  },
  tabTitle: {
    fontSize: 12,
  },
  pageStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BottomTabBar;
