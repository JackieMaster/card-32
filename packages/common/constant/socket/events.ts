export const MAIN_NAMESPACE_EVENTS = {
  ACTIVE_ROOMS: "active::rooms",
  GLOBAL_SEND_MESSAGE: "global::send::message",
  GLOBAL_NEW_MESSAGE: "global::new::message",
  ROOM_DATA: "room::data",
  JOIN_ROOM: "join::room",
  JOIN_REQUEST: "join::request",
  JOIN_REQUEST_RESPONSE: "join::request::response",
  JOIN_REQUEST_ACCEPTED: "join::request::accepted",
  SEND_MESSAGE: "send::message",
  NEW_MESSAGE: "new::message",
  NEW_PLAYER_JOINED: "player::joined",
  LEAVE_ROOM: "leave::room",
  PLAYER_DISCONNECTED: "player::disconnected",
  START_GAME: "start::game",
  GET_CARDS: "get::cards",
  ON_BID: "on::bid",
  NEW_BID: "new::bid",
  CARD_DROPPED: "card::dropped",
  RECEIVE_DROPPED_CARD: "receive::dropped::card",
  ROUND_WINNER: "round::winner",
  CHANGE_ROOM_SETTINGS: "change::room::settings",
  NEW_ROOM_CREATOR: "new::room::creator",
};
