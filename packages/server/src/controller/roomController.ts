import { IRoom, IRoomCreateIOrJoinInput } from "@card-32/common/types/room";
import { v4 as uuidV4 } from "uuid";
import Room from "../models/Room";
import { rooms } from "../server";
import { logger } from "../utils/winston";

export const getPlayerIntoRoom = (joinInput: IRoomCreateIOrJoinInput) => {
  try {
    const { username, roomId } = joinInput;
    const room = rooms.find((room) => room.roomId === roomId);

    // player wants to create new room
    if (!room) {
      const playerId = uuidV4();
      const newPlayer = { username, playerId };
      const newRoom = new Room(roomId, [newPlayer], newPlayer) as IRoom;
      rooms.push(newRoom);
      const data = { room: newRoom, player: newPlayer };
      return { data };
    }

    // room exist push add player to the room
    // username check
    const usernameTaken = room.players.find(
      (player) => player.username === username
    );

    if (usernameTaken) {
      return { error: "Username taken" };
    }

    // room full check
    if (room.players.length === 4) {
      return { error: "Room is full" };
    }

    const playerId = uuidV4();
    const newPlayer = { username, playerId };
    room.players = [...room.players, newPlayer];

    const data = { room, player: newPlayer };
    return { data };
  } catch {
    logger.error("error in getPlayerIntoRoom");
    return { error: "Something went wrong" };
  }
};

export const getRoomOnLeaveOrDisconnect = (
  roomId: string,
  playerId: string
) => {
  try {
    const room = rooms.find((room) => room.roomId === roomId);
    if (!room) {
      return { room: undefined };
    }
    if (room.players.length === 1) {
      // last player wants to leave, remove the rooms from server
      rooms.splice(
        rooms.findIndex((room) => room.roomId === roomId),
        1
      );
      return { room: undefined };
    }
    room.players = room.players.filter(
      (player) => player.playerId !== playerId
    );
    return { room };
  } catch (err) {
    logger.error("error in getRoomOnLeaveOrDisconnect");
    return { room: undefined };
  }
};
