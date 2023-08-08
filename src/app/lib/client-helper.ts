"use client";
import { lazy, useCallback, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { appConstants, breakPoints } from "./constants";
import { getRandomInt } from "./server-helper";
import { faker } from "@faker-js/faker";

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function onResize() {
      if (window.innerWidth < breakPoints.sm) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }
    onResize();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  console.log("Is MObile", isMobile);

  return isMobile;
}

export function usePlayer() {
  const [player, setPlayer] = useState<{ id: string; name: string } | null>(
    null
  );

  function updatePlayerName(name: string) {
    setPlayer({
      ...player,
      name,
    });
  }

  const loadValue = useCallback(function loadvalue() {
    const info = localStorage.getItem(appConstants.playerInfoLocalStorage);
    try {
      if (!info || !Object.keys(JSON.parse(info))?.length) {
        const newInfo = {
          id: getRandomInt(),
          name: faker.lorem.word(),
        };
        console.log("Player info not found", newInfo);
        localStorage.setItem(
          appConstants.playerInfoLocalStorage,
          JSON.stringify(newInfo)
        );
      } else {
        setPlayer(JSON.parse(info));
      }
    } catch (error) {
      console.log("Error in saving player info", info, error);
      localStorage.removeItem(appConstants.playerInfoLocalStorage);
    }
  }, []);

  useEffect(() => {
    loadValue();
  }, [loadValue]);

  // Update value in local storage when the information is udpated.
  useEffect(() => {
    if (player) {
      localStorage.setItem(
        appConstants.playerInfoLocalStorage,
        JSON.stringify(player)
      );
    }
  }, [player]);

  return { player, updatePlayerName };
}

export function useWebSocket() {
  const URL = "http://localhost:4000";
  //const socket = io(URL);
  const [connected, setConnected] = useState(false);
  const [socket, setSocket] = useState<any | undefined>();

  function onConnect() {
    setConnected(true);
  }

  function onDisconnect() {
    setConnected(false);
  }

  useEffect(() => {
    const connection = io(URL);
    connection.on("connect", onConnect);
    connection.on("disconnect", onDisconnect);
    setSocket(connection);
    console.log(
      "on server_----------------------------------------------------------------------------------------------------------------------------------------------------------------------------"
    );
    return () => {
      connection.off("connect", onConnect);
      connection.off("disconnect", onDisconnect);
    };
  }, []);

  return {
    socket,
    connected,
  };
}

export function getUrlSearchParams(param: string) {
  const urlParams = new URLSearchParams(window?.location?.search);
  return urlParams.get(param);
}
