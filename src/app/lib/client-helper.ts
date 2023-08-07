"use client";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { breakPoints } from "./constants";

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

const URL = "http://localhost:4000";

export const socket = io(URL, {
  autoConnect: false,
});

export function useWebSocket() {
  const [connected, setConnected] = useState(false);

  function onConnect() {
    setConnected(true);
  }

  function onDisconnect() {
    setConnected(false);
  }

  useEffect(() => {
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return {
    socket,
    connected,
  };
}
