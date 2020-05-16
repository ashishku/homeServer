export const LOAD_ROOMS = "LOAD_ROOMS";

export type HomeServerStateProps = {children: any};
export type HomeServerStateType = {
  rooms?: any
};
export type HomeServerAction = { type: "LOAD_ROOMS", rooms: any[] };
export type HomeServerReducerType = (state: HomeServerStateType, action: HomeServerAction) => void;


