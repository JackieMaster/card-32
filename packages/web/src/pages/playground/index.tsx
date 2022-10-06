import { MAIN_NAMESPACE_EVENTS } from "@card-32/common/constant/socket/events";
import {
  IRoomJoinRequestInput,
  TRoomJoinRequestStatus,
} from "@card-32/common/types/room";
import React, { useEffect, useState } from "react";
import Modal from "../../components/atoms/modal/Modal";
import { showToastMessage } from "../../components/atoms/toast";
import Board from "../../components/organisms/board";
import Chat from "../../components/organisms/chat";
import PlaygroundSidebar from "../../components/organisms/playground/PlaygroundSidebar";
import { useRoomContext } from "../../contexts/RoomProvider";
import { useSocketContext } from "../../contexts/SocketProvider";
import { removeDataOnLocalStorage } from "../../utils/localStorage";

const Playground: React.FC = () => {
  const { setRoom } = useRoomContext();
  const { socket } = useSocketContext();
  const [chatBoxVisible, setChatBoxVisible] = useState(false);
  const [newJoinRequest, setNewJoinRequest] = useState<
    IRoomJoinRequestInput | undefined
  >(undefined);

  useEffect(() => {
    if (!socket) return;

    // new player joined
    socket.on(MAIN_NAMESPACE_EVENTS.NEW_PLAYER_JOINED, ({ message, room }) => {
      setRoom(room);
      showToastMessage({
        position: "bottom-left",
        message,
      });
    });

    // new room join request
    socket.on(
      MAIN_NAMESPACE_EVENTS.JOIN_REQUEST,
      (data: IRoomJoinRequestInput) => {
        setNewJoinRequest(data);
      }
    );

    // player leave
    socket.on(MAIN_NAMESPACE_EVENTS.LEAVE_ROOM, ({ message, room }) => {
      setRoom(room);
      showToastMessage({
        position: "bottom-left",
        message,
      });
    });

    // player disconnect
    socket.on(
      MAIN_NAMESPACE_EVENTS.PLAYER_DISCONNECTED,
      ({ message, room }) => {
        setRoom(room);
        showToastMessage({
          position: "bottom-left",
          message,
        });
      }
    );

    return () => {
      socket.off(MAIN_NAMESPACE_EVENTS.NEW_PLAYER_JOINED);
      socket.off(MAIN_NAMESPACE_EVENTS.LEAVE_ROOM);
      socket.off(MAIN_NAMESPACE_EVENTS.PLAYER_DISCONNECTED);
      socket.off(MAIN_NAMESPACE_EVENTS.JOIN_REQUEST);
    };
  }, [socket, setRoom]);

  useEffect(() => {
    // close request modal after 10 second
    if (newJoinRequest) {
      setTimeout(() => {
        setNewJoinRequest(undefined);
      }, 10000);
    }
  }, [newJoinRequest]);

  useEffect(() => {
    // remove localstorage data on window close
    window.onbeforeunload = () => {
      removeDataOnLocalStorage();
    };
  }, []);

  const sendJoinRequestResponse = (status: TRoomJoinRequestStatus) => {
    if (!socket) return;
    socket.emit(MAIN_NAMESPACE_EVENTS.JOIN_REQUEST_RESPONSE, {
      status,
      joinRequest: newJoinRequest,
    });
    setNewJoinRequest(undefined);
  };

  return (
    <div className="w-full h-screen flex flex-col sm:flex-row gap-1 relative">
      {/* left sidebar */}
      <PlaygroundSidebar />
      {/* board & chat */}
      <Board />
      <div className="hidden xl:block xl:w-[320px]">
        <Chat socket={socket} />
      </div>
      <button
        className="absolute xl:hidden z-20 bottom-[23%] right-5 shadow-md sm:top-2 w-12 h-12 rounded-full btn-primary flex items-center justify-center
        bg-zinc-900 sm:bg-zinc-800 border-zinc-700
        "
        onClick={() => {
          setChatBoxVisible(!chatBoxVisible);
        }}
      >
        {chatBoxVisible ? (
          <i className="fa-solid fa-xmark"></i>
        ) : (
          <i className="fa-solid fa-message"></i>
        )}
      </button>

      {/* floating chat box */}
      <div
        className={`w-full border-2 rounded border-zinc-700 z-10 h-full sm:h-[90%] absolute sm:w-[320px] sm:right-16 sm:mt-14 ${
          chatBoxVisible ? "block" : "hidden"
        }`}
      >
        <Chat socket={socket} />
      </div>

      {/* join request accept/reject modal */}
      <Modal
        visible={!!newJoinRequest}
        onClose={() => setNewJoinRequest(undefined)}
      >
        <div className="flex flex-col gap-8 items-center">
          <p className="text-xl font-bold">
            <span className="text-primary">{newJoinRequest?.username}</span>{" "}
            wants to join.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex flex-col gap-2 items-center">
              <button
                className="btn-primary rounded-full bg-lime-500 w-10 h-10 flex items-center justify-center"
                onClick={() => sendJoinRequestResponse("accepted")}
              >
                <i className="fa-solid fa-check"></i>
              </button>
              <p className="text-xs">Accept</p>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <button
                className="btn-primary rounded-full bg-red-500 w-10 h-10 flex items-center justify-center"
                onClick={() => sendJoinRequestResponse("rejected")}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
              <p className="text-xs">Reject</p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Playground;
