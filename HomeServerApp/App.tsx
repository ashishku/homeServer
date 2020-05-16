import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import {HomeServerState} from "./contexts/homeServer/homeServer.state";
import {SwitchBoard} from "./components/switchBoard";

export default function App() {

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <HomeServerState>
          <SwitchBoard />
        </HomeServerState>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
