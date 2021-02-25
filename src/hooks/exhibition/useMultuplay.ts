import { useCallback, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { AreaName } from "~/types/exhibition";

export type UpdateResponse = UpdatePayload & {
  updatedAt: number;
};

export type UpdatePayload = {
  accessory: "fried_egg" | "pancake" | null;
  area: AreaName;
  position: { x: number; y: number; z: number };
  rotation: { y: number };
  state: "idle" | "run" | "walk";
};

const socket = io(
  process.env.NODE_ENV === "production"
    ? "https://multiplay.creamsoda.in"
    : "http://localhost:5000",
  {
    autoConnect: false,
    path: "/a/dream",
  }
);

//

const join = (payload?: string) => {
  socket.connect();
  socket.emit("join", payload);
};

const leave = () => {
  socket.emit("leave");
  socket.disconnect();
};

const update = (payload: UpdatePayload) => {
  socket.emit("update", payload);
};

//

export const useMultiplay = () => {
  const [players, setPlayers] = useState<Record<
    string,
    UpdateResponse | null
  > | null>(null);
  const [lastUpdate, setLastUpdate] = useState<UpdatePayload | null>(null);

  // Helper

  const convertPlayerIdsToState = useCallback(
    (playerIds: string[]) => {
      return playerIds.reduce(
        (xs, x) => ({ ...xs, [x]: players?.[x] || null }),
        {}
      );
    },
    [players]
  );

  const handleSocketDisconnect = useCallback(() => {
    setPlayers(null);
  }, []);

  const handleSocketJoin = useCallback(
    (playerIds: string[]) => {
      setPlayers(convertPlayerIdsToState(playerIds));

      if (lastUpdate) {
        update(lastUpdate);
      }
    },
    [convertPlayerIdsToState, lastUpdate]
  );

  const handleSocketLeave = useCallback(
    (playerIds?: string[]) => {
      if (!playerIds) {
        return;
      }

      setPlayers(convertPlayerIdsToState(playerIds));
    },
    [convertPlayerIdsToState]
  );

  const handleSocketUpdate = useCallback(
    ({ playerId, payload }: { playerId: string; payload: UpdateResponse }) => {
      if (!players) {
        return;
      }

      setPlayers({
        ...players,
        [playerId]: payload,
      });
    },
    [players]
  );

  // Sockets

  useEffect(() => {
    socket.on("disconnect", handleSocketDisconnect);
    socket.on("joined", handleSocketJoin);
    socket.on("leaved", handleSocketLeave);
    socket.on("updated", handleSocketUpdate);

    return () => {
      socket.off("disconnect", handleSocketDisconnect);
      socket.off("joined", handleSocketJoin);
      socket.off("leaved", handleSocketLeave);
      socket.off("updated", handleSocketUpdate);
    };
  }, [lastUpdate, players]);

  // Events

  const handleLeave = useCallback(() => {
    leave();
    setPlayers(null);
  }, []);

  const handleUpdate = useCallback((payload: UpdatePayload) => {
    setLastUpdate(payload);

    if (!socket.connected) {
      return;
    }

    update(payload);
  }, []);

  //

  return {
    join,
    leave: handleLeave,
    players,
    update: handleUpdate,
  };
};