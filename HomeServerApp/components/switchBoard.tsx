import React, { useContext } from "react";
import { StyleSheet, View, SectionList, Text } from "react-native";

import {Switch} from "./switch";
import {HomeServerContext} from "../contexts/homeServer/homeServer.context";

export function SwitchBoard () {
  // @ts-ignore
  const {rooms, onSwitchClick} = useContext(HomeServerContext);

  const roomsToRender = rooms.map(rm => {
    return {
      id: rm.id,
      label: rm.label,
      data: rm.switches || []
    }
  });

  return (
    <View style={styles.container}>
      <SectionList
          style={styles.section}
          sections={roomsToRender}
          renderItem={({item, section}) => <Switch type={item.type} on={item.on} handler={onSwitchClick.bind(null, section.id, item.id, !item.on)} />}
          renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.label}</Text>}
        />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20
  },
  section: {
    flex: 1,
    alignSelf: "stretch",
    height: 40
  },
  sectionHeader: {
    flex: 1,
    alignSelf: "stretch",
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    fontSize: 30,
    fontWeight: "bold",
    backgroundColor: "gray",
    color: "#E6E6FA"
  }
});
