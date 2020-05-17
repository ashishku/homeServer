import React, { useReducer, useEffect } from "react";

import {HomeServerContext} from "./homeServer.context";
import {HomeServerReducer} from "./homeServer.reducer";
import {
  HomeServerStateProps,
  HomeServerStateType,
  LOAD_ROOMS
} from "../../types";

const URL = "http://192.168.100.196"

export function HomeServerState({children}: HomeServerStateProps) {
  const initialState: HomeServerStateType = {
    rooms: []
  };

  useEffect(() => {
    fetch(URL)
      .then(response => response.json())
      .then(data => dispatch({type: LOAD_ROOMS, rooms: data.rooms}));
  }, []);

  // @ts-ignore
  const [state, dispatch] = useReducer(HomeServerReducer, initialState);

  const onSwitchClick = (room, sw, on) => {
    const state  = on ? "on" : "off";
    const url = `${URL}/${room}/${sw}/${state}`;
    fetch(url)
      .then(response => response.json())
      .then(data => dispatch({type: LOAD_ROOMS, rooms: data.rooms}));
  };

  return (
    <HomeServerContext.Provider
      value={{
        rooms: state.rooms,
        onSwitchClick
      }}
    >
      {children}
    </HomeServerContext.Provider>
  );
}
