import React from "react";
import { StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const switches = {
  fan: (on: boolean) => {
    return {
      component: MaterialCommunityIcons,
      icon: on ? "fan" : "fan-off"
    };
  },
  bulb: (on: boolean) => {
    return {
      component: MaterialCommunityIcons,
      icon: on ? "lightbulb" : "lightbulb-off"
    };
  }
};
export function Switch ({type, on, handler}: {type: string, on: boolean, handler: () => void}) {
  const _switch = switches[type](on);

  return (
    <View style={styles.container}>
      <_switch.component name={_switch.icon} 
                         size={100} 
                         color="#6A5ACD" 
                         onPress={handler}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D8BFD8",
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 5
  }
});
