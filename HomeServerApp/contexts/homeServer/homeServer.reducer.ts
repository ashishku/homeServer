import {
  HomeServerStateType,
  HomeServerAction,
  HomeServerReducerType,
  LOAD_ROOMS
} from "../../types";


export const HomeServerReducer:HomeServerReducerType = (state: HomeServerStateType, action: HomeServerAction) => {
  switch (action.type) {
    case LOAD_ROOMS:
      return {...state, rooms: action.rooms};
    default:
      return state;
  }
};

